const http = require("http");

// custom file
const routes = require("./routes");

// function requestListener(req, res) {}
// http.createServer(requestListener);

// // anonymous function
// http.createServer(function (req, res) {});

// next gen js
const server = http.createServer(routes);

server.listen(3010);
