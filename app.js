const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(session(sessionOptions));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add-business", (req, res) => {
  res.render("add-buisness");
});

app.get("/businesses", async (req, res) => {
  res.render("businesses");
});

app.listen(PORT, () => {
  console.log("app is listening on port 3000");
});
