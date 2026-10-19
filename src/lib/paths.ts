export function assetPath(src: string): string {
  if (!src.startsWith('/') || src.startsWith('//')) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`;
}
