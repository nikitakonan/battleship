import { readFile } from 'node:fs/promises';
import { createServer, type OutgoingHttpHeaders } from 'node:http';
import { dirname, resolve } from 'node:path';

export const httpServer = createServer(async function (req, res) {
  const __dirname = resolve(dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);

  try {
    const data = await readFile(file_path);
    const headers: OutgoingHttpHeaders = {};
    if (file_path.endsWith('.js')) {
      headers['Content-Type'] = 'application/javascript';
    }
    res.writeHead(200, headers);
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end(JSON.stringify(err));
    return;
  }
});
