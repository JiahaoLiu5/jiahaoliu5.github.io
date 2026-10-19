import { watch } from 'node:fs';
import { createServer } from 'vite';
import { build } from './build.mjs';

await build();
const portFlag = process.argv.indexOf('--port');
const server = await createServer({
  root: 'dist',
  server: { host: '0.0.0.0', port: portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 5173, strictPort: process.argv.includes('--strictPort') },
});
await server.listen();
server.printUrls();

let timer;
let building = false;
let pending = false;
async function rebuild() {
  if (building) { pending = true; return; }
  building = true;
  try { await build(); } catch (error) { console.error(error); }
  finally {
    building = false;
    if (pending) { pending = false; await rebuild(); }
    else server.ws.send({ type: 'full-reload' });
  }
}
for (const entry of ['_config.yml', '_data', '_includes', '_layouts', 'index.html', 'service.html', 'search.json', 'css', 'js', 'assets']) {
  watch(entry, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}
