const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send message</button></form>'
    );

    if (fs.existsSync('message1.txt')) {
      const message = fs.readFileSync('message1.txt', 'utf-8');
      res.write('<p>Message: ' + message + '</p>');
    }

    res.write('</body></html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message1.txt', message, () => {
        const enteredMessage = message;
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first page</title><head>');
  res.write('<body><h1>Hello from my node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(4000);
