const express = require("express");
const path = require("path");
const cors = require("cors");
const recipesRouter = require("./routers/recipes");
const usersRouter = require("./routers/users");
const { handleError } = require("./utils/error");
const auth = require("./middleware/auth");
const publicDir = path.join(__dirname, "./public");

function loggingMiddleware(req, res, next) {
  const { method, path } = req;
  console.log(
    `Request made to: ${method} ${path} at ${new Date().toISOString()}`
  );

  next();
}
const app = express();
app.use(cors());
app.use(loggingMiddleware);
app.use(express.static(publicDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth.initialize());

app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/users", usersRouter);

app.use(handleError);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
