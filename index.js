const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const filename = "." + parsedUrl.pathname;

  if (filename == "./") {
    fs.readFile("./index.html", function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("index.html not accessed")
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    })
  } else {
    fs.readFile(filename, function(err, data) {
      if (err) {
        fs.readFile("./404.html", function(err, data) {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
          }
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          return res.end("404 Not Found");
        });
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end()
    })
  }
}).listen(8080);