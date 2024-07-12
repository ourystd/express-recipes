import express from "express";

function build() {
  const app = express();

  app.get("/", (req, res) => {
    res.json({ hell: "yeah !" });
  });

  return app;
}

export { build };
