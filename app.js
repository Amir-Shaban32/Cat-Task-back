const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const getQuery = parsedUrl.query;

  const a = parseFloat(getQuery.a);
  const b = parseFloat(getQuery.b);

  if (!isNaN(a) && !isNaN(b)) {
    res.writeHead(200, 'cloud calculator');

    if (pathName === '/add') {
      res.end(JSON.stringify({ result: a + b }))
    } else if (pathName === '/subtract') {
      res.end(JSON.stringify({ result: a - b }))
    } else if (pathName === '/multiply') {
      res.end(JSON.stringify({ result: a * b }))
    } else if (pathName === '/divide') {
      res.end(JSON.stringify({ result: a / b }))
    } else {
      res.writeHead(400);
      res.end("Invalid parameters");
    }
  } else {
    res.writeHead(404);
    res.end("Not found!");
  }
});

server.listen(3000, () => console.log("listining to port 3000"))
