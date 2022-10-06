const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title> Enter Message </title></header>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunkOfData) => {
      body.push(chunkOfData);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        // res.writeHead(302, {})
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  //process.exit() to hard exit your process and end event loop;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My first Page </title></header>");
  res.write("<body><h1>Hello from server</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
