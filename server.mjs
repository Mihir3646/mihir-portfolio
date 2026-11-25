import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 8080);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

const allowed = (path) => (
  path === '/index.html' || path === '/robots.txt' ||
  path.startsWith('/assets/') || path.startsWith('/projects/') ||
  path.startsWith('/resume/')
);

createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
  }
  let path;
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    path = decodeURIComponent(url.pathname);
  } catch { res.writeHead(400).end(); return; }
  if (path === '/') path = '/index.html';
  if (!allowed(path)) { res.writeHead(404).end('Not found'); return; }
  const file = resolve(root, '.' + path);
  if (!file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    const stat = statSync(file);
    if (!stat.isFile()) throw new Error('Not a file');
    res.writeHead(200, {
      'Content-Type': contentTypes[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600',
    });
    if (req.method === 'HEAD') res.end();
    else createReadStream(file).pipe(res);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, '0.0.0.0', () => console.log(`Portfolio server listening on ${port}`));
