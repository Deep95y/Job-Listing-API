const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

console.log(process.env.MONGODB_URL);

const PORT = 5001;
// Use built-in express middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

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
  Mobile: {
    type: String,
    required: true,
    
  },
  Password: {
    type: String,
    required: true,
  },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });

const users = mongoose.model("users", userSchema);

app.get("/api/health", (req, res) => {
  console.log("health");
  res.json({
    service: "joblisting server",
    status: "active",
    time: new Date()
  });
});
  
app.use(express.json())
app.post('/data', async (req, res) => {
  const { Name, Password, Email, Mobile } = req.body;
  console.log(req);
  try { 
    const data = await users.create({
      Name,
      Password,
      Email,
      Mobile 
    });
    console.log(data);
    res.json({
      status: 'SUCCESS'
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'FAILED', 
      message: 'Something went wrong!'
    });
  }
});
//abhi jobsdata me ek aur document add kiya mene, yeah sunona tum anydesk pe aonahaa
app.get("/datas", async (req, res,) => {
  try {
    console.log(mongoose.connection.readyState);
    const data = await users.find({});
    console.log(data);
    res.json(data); 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
