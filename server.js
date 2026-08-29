const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = process.env.PORT || 8000;

const types = {
    '.html': 'text/html',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png'
};

http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';

    const file = path.join(root, urlPath);
    if (!file.startsWith(root)) {
        res.writeHead(403);
        return res.end('forbidden');
    }

    fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end('not found');
        }
        res.writeHead(200, {
            'Content-Type': types[path.extname(file)] || 'application/octet-stream'
        });
        res.end(data);
    });
}).listen(port, () => console.log('listening on http://localhost:' + port));