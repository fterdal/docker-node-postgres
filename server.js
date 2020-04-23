const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

const db = new Client();

const app = express();
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  const apples = db.query("SELECT * FROM apples");
  console.log(apples);
  res.send(`
    <div>
      <h1>It is alive! 🧟‍♂️ ⚡️</h1>
      <ul>
        apples go here...
      </ul>
    </div>
  `);
});

app.use((req, res) => {
  res.status(404).send("<h1>There's nothing here... 👻 🤷‍♀️</h1>");
});

const PORT = process.env.PORT || 8080;

async function init() {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("failed to connect to the database");
    console.error(err);
  }
}
init();
