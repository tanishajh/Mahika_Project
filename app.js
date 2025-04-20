const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Business = require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/mahikaproject");
  console.log("connected to database");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const PORT = process.env.PORT || 3000;



app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add-business", (req, res) => {
  res.render("add-buisness");
});
app.post("/add-business", async (req, res) => {
  const { name, businessName, location, products, contactno, email } = req.body;
  const businessData = new Business({
    name,
    businessName,
    location,
    products,
    contactno,
    email,
  });
  console.log(businessData);
  await businessData.save();
  res.redirect("/home");
});

app.get("/businesses", async (req, res) => {
  try {
    const allBusinesses = await Business.find();
    res.render("businesses", { businesses: allBusinesses });
  } catch (err) {
    console.error("Error fetching businesses:", err);
    res.status(500).send("Failed to fetch businesses.");
  }
});

app.post("/delete-business/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the business by ID
    await Business.findByIdAndDelete(id);

    console.log(`Business with ID ${id} deleted successfully.`);

    // Redirect back to the businesses page after deletion
    res.redirect("/businesses");
  } catch (err) {
    console.error("Error deleting business:", err);
    res.status(500).send("Failed to delete the business.");
  }
});

app.listen(PORT, () => {
  console.log("app is listening on port 3000");
});
