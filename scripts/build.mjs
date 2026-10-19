import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Liquid } from 'liquidjs';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const read = (file) => readFile(path.join(root, file), 'utf8');

// Render the upstream Jekyll/Liquid source with the existing Node toolchain.
// No client-side page generation or replacement design system.
export async function build(base) {
  const config = parse(await read('_config.yml'));
  base = base ?? config.baseurl ?? '';
  base = base.replace(/\/$/, '');
  if (base && (!base.startsWith('/') || base.includes('..'))) throw new Error('Invalid base path');
  const relativeURL = (value) => {
    const url = String(value ?? '');
    if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(url)) return url;
    return `${base}/${url.replace(/^\/+/, '')}`;
  };
  const liquid = new Liquid({ root: path.join(root, '_includes'), jekyllInclude: true, ownPropertyOnly: true });
  liquid.registerFilter('relative_url', relativeURL);
  liquid.registerFilter('absolute_url', (url) => new URL(relativeURL(url), config.url).href);
  liquid.registerFilter('jsonify', (value) => JSON.stringify(value ?? null));
  liquid.registerFilter('normalize_whitespace', (value) => String(value ?? '').replace(/\s+/g, ' ').trim());
  const data = {};
  for (const file of await readdir(path.join(root, '_data'))) {
    if (file.endsWith('.yml')) data[path.basename(file, '.yml')] = parse(await read(`_data/${file}`));
  }
  const site = { ...config, baseurl: base, time: new Date(), data };
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const folder of ['css', 'js', 'assets', 'licenses']) {
    await cp(path.join(root, folder), path.join(output, folder), { recursive: true });
  }
  // Use the original font-family names, leaving the upstream CSS unchanged.
  const fonts = [
    ['inter', 'Inter', 'wght', '100 900'],
    ['jetbrains-mono', 'JetBrains Mono', 'wght', '100 800'],
    ['source-serif-4', 'Source Serif 4', 'opsz', '200 900'],
  ];
  await mkdir(path.join(output, 'assets/fonts'), { recursive: true });
  let fontCSS = '';
  for (const [name, family, axes, weights] of fonts) {
    const folder = path.join(root, 'node_modules/@fontsource-variable', name);
    const file = `${name}-latin-${axes}-normal.woff2`;
    await cp(path.join(folder, 'files', file), path.join(output, 'assets/fonts', file));
    await cp(path.join(folder, 'LICENSE'), path.join(output, 'assets/fonts', `${name}-LICENSE.txt`));
    fontCSS += `@font-face{font-family:"${family}";font-style:normal;font-weight:${weights};font-display:swap;src:url("../assets/fonts/${file}") format("woff2")}\n`;
  }
  await writeFile(path.join(output, 'css/fonts.css'), fontCSS);
  const icons = path.join(root, 'node_modules/@fortawesome/fontawesome-free');
  for (const folder of ['css', 'webfonts']) {
    await cp(path.join(icons, folder), path.join(output, 'assets/fontawesome', folder), { recursive: true });
  }
  await cp(path.join(icons, 'LICENSE.txt'), path.join(output, 'assets/fontawesome/LICENSE.txt'));
  const academicIcons = path.join(root, 'node_modules/academicons');
  for (const folder of ['css', 'fonts']) {
    await cp(path.join(academicIcons, folder), path.join(output, 'assets/academicons', folder), { recursive: true });
  }
  for (const source of ['index.html', 'service.html', 'search.json']) {
    const raw = await read(source);
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) throw new Error(`Missing front matter: ${source}`);
    const page = { ...parse(match[1]), url: source === 'index.html' ? '/' : `/${source}` };
    if (page.permalink) page.url = page.permalink;
    const context = { site, page };
    let html = await liquid.parseAndRender(raw.slice(match[0].length), context);
    if (page.layout) html = await liquid.parseAndRender(await read(`_layouts/${page.layout}.html`), { ...context, content: html });
    if (source.endsWith('.json')) JSON.parse(html);
    const destination = page.url.endsWith('/') ? `${page.url}index.html` : page.url;
    const file = path.join(output, destination);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  await writeFile(path.join(output, '.nojekyll'), '');
  console.log(`Built original Liquid templates into dist (base: ${base || '/'})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const flag = process.argv.indexOf('--base');
  await build(flag >= 0 ? process.argv[flag + 1] : process.env.BASE_PATH);
}
