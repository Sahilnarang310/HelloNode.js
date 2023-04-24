const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/home') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome home\n');
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to About Us page\n');
  } else if (req.url === '/node') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to my Node Js project\n');
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found\n');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
