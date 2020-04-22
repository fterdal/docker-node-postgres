const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.send("<h1>It is alive! 🧟‍♂️ ⚡️</h1>");
});

app.use((req, res) => {
  res.status(404).send("<h1>There's nothing here... 👻 🤷‍♀️</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
