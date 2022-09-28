const http = require('http');

const history = [];

const server = http.createServer((req, res) => {
    history.push(req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    history.forEach(item => res.write(`${item}</br>`));
    res.end();
});

server.listen(8080);
