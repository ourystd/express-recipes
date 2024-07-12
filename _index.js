const express = require("express");
const path = require("path");

const app = express();

function loggingMiddleware(req, res, next) {
  const { method, path } = req;
  console.log(
    `Request made to: ${method} ${path} at ${new Date().toISOString()}`
  );

  next();
}

app.use(loggingMiddleware);
const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  //   console.log(req);
  //   console.log(req, res);
  res.send("Welcome back baby");
  //   res.send(`Welcome`);
});

app.get("/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.get("/*", (req, res) => {
  res.status(404).send(`Not Found`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
