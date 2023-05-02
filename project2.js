const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url);
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send message</button></form>'
    );

    if (fs.existsSync('message2.txt')) {
      const message = fs.readFileSync('message2.txt', 'utf-8');
      res.write('<p>Message: ' + message + '</p>');
    }

    res.write('</body></html>');
    return res.end();
  }
  if (url === '/login' && method === 'GET') {
    res.write('<html>');
    res.write('<head><title>Login</title><head>');
    res.write(
      '<body><form action="/login" method="POST"><input type="text" name="username"><button type="submit">Login</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/login' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const username = parseBody.split('=')[1];
      // Store the username in the browser's local storage
      res.setHeader('Set-Cookie', `username=${username}; HttpOnly`);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      // Get the username from the browser's local storage
      const cookies = req.headers.cookie ? req.headers.cookie.split('; ') : [];
      const usernameCookie = cookies.find(cookie => cookie.startsWith('username='));
      const username = usernameCookie ? usernameCookie.split('=')[1] : 'Anonymous';
      // Save the message with the username
      fs.appendFile('message2.txt', `${username}: ${message}\n`, () => {
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

server.listen(5000);
