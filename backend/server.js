const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "todomanager",
  password: "wave",
  database: "todo_app",
});

app.get("/", (req, res) => {
  const sql = "SELECT * from tasks;";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/add", (req, res) => {
  const sql = "INSERT INTO tasks(`name`, `description`) VALUES(?);";

  const values = [req.body.name, req.body.description];

  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.put("/update", (req, res) => {
  const sql = "Update tasks set name=?,  description=? where id=?;";
  const values = [req.body.name, req.body.description, req.body.id];
  console.log("updating ");
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.post("/delete", (req, res) => {
  const sql = "Delete from tasks where id=?;";
  const values = [req.body.id];
  console.log("deleting " + req.body.id);
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.listen(8080, () => {
  console.log("listening");
});
