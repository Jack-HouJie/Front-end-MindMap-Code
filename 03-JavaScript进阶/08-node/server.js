const fs = require("fs");
const path = require("path");
let http = require('http');

let server = http.createServer(function (request, response) {
  let { url } = request;

  fs.readFile('src' + url, (err, data) => {
    if (err) {
      response.write(err.code);
    } else {
      response.write(data);
    }
    response.end();
  });

});

server.listen(8081);