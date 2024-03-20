const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.MONGODB_URL)
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = 5000;

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        required: true,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const isLoggedIn = (req, res, next) => {
    console.log(req.headers);
  try {
    const jwtToken = req.headers.jwtoken;  
    console.log(jwtToken);
    let userDetail = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY);
    if (!userDetail) {
      req.user = userDetail;
      next(); 
      throw new Error(); 
    }
  } catch (error) { 
    return res.json({
      message: "You are not logged in! please login",
    });
  }
};


app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Our first express server");
  console.log(req);
});

const users = mongoose.model("users", userSchema); 

app.get("/pupil", async (req, res) => {
  try {
    console.log(mongoose.connection.readyState);
    const users = await users.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json({
      message: "Something went wrong!",
    });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const {Name, Email, Password, Mobile} = req.body;
    if (!Name || !Email || !Password || !Mobile) {
        return res.status(400).json({
            errorMessage: "Bad request",
        });
    }
    const user = await users.findOne({ Email });
    if (user) { 
      return res.json({
        status: "User with this email exist, please login",
      });
    }
    const encryptedPass = await bcrypt.hash(Password, 10);
    console.log(encryptedPass);
    await users.create({
      Name,
      Email,
      Password: encryptedPass,
      Mobile
    });
    res.json({
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong!",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.status(400).json({
            errorMessage: "Bad Request! Invalid credentials",
        });
    }
    const user = await users.findOne({ Email }); 
    if (!user) {
      return res.json({
        status: "User with this email doesnt exist. please signup",
      });
    }
    const passwordmatch = await bcrypt.compare(Password, user.Password);
   
    if (!passwordmatch) {
      return res.json({
        status: "incorrect credential",
      });
    } 
    console.log(process.env.jwToken);
    const jwToken = jwt.sign(user.toJSON(), process.env.jwToken, {
    expiresIn: 300000, 
    });
    console.log(jwToken);
     return res.json({
     status: "Login successful", 
     jwToken,    
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
});

app.get("/profile", isLoggedIn, async (req, res) => {
  try {
    res.json({
      status: "PROFILE PAGE",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
});

app.get("/admin/dashboard", isLoggedIn, async (req, res) => {
  try {
    res.json({
      status: "ADMIN DASHBOARD PAGE",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(process.env.MONGODB_URL);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Server is up"))
    .catch((error) => console.log(error));
});






