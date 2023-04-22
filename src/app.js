const express = require("express");
const path = require("path");
const app = express();
const hbs=require("hbs");

require("./db/conn");

const port = process.env.PORT || 8000;

const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/trade", (req, res) => {
  res.render("trade");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("*", (req, res) => {
  res.send("404 Error Page");
});

// create user in database
app.post("/register.hbs", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirm_password;
    if (password === cpassword) {
      const registerUser = new Register(
        {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirm_password: cpassword,
        });
      const registered = await registerUser.save();
      res.status(201).render("index");
    } else {
      req.send("Password not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/index.hbs", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email });
    if (useremail.password === password) {
      res.status(201).render("trade");
    } else {
      req.send("Invalid login details");
    }
  } catch (error) {
    res.status(400).send("Invalid email or password");
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
