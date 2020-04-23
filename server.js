const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

console.log("process.env.DATABASE", process.env.DATABASE);

const db = new Client({
  host: "db",
  database: process.env.DATABASE,
  // database: process.env.DATABASE || "fruit_store",
  user: "postgres",
});

const app = express();
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res, next) => {
  const { rows: apples } = await db.query("SELECT * FROM apples");
  console.log(apples);
  res.send(`
    <div>
      <h1>It is alive! 🧟‍♂️ ⚡️</h1>
      <form action="/" method="POST">
        <input name="fruitname" type="text" placeholder="fruit name">
        <button type="submit">Submit</button>
      </form>
      <ul>
        ${apples.map((apple) => `<li>${apple.name}</li>`).join("")}
      </ul>
    </div>
  `);
});

app.post("/", async (req, res, next) => {
  console.log("req.body", req.body);
  const { fruitname } = req.body;
  console.log("fruitname", fruitname);
  await db.query("INSERT INTO apples (name) VALUES ($1)", [fruitname]);
  res.redirect("/");
});

app.use((req, res) => {
  res.status(404).send("<h1>There's nothing here... 👻 🤷‍♀️</h1>");
});

const PORT = process.env.PORT || 8080;

async function sync() {
  db.query("CREATE TABLE IF NOT EXISTS apples (name TEXT)");
}

async function init() {
  try {
    await db.connect();
    await sync();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("failed to connect to the database");
    console.error(err);
  }
}
init();
