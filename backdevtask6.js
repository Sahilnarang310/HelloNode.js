
const server = http.createServer((req, res) => {
  console.log('My name is Sahil Narang');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Your name is Sahil Narang');
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
