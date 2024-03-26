const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = 5002;//
//const dotenv = require("dotenv");


app.get("/", (req, res) => {
    res.send("Our first express server");
  });

const verifyToken = (req, res, next) => {
   
    try{
  const headerToken = req.headers["authorization"];
  console.log(headerToken);
  if(!headerToken) {
    return res.status(401).json({
      message: "Unauthorized  access"
    });
  }
    const decode = jwt.verify(headerToken, process.env.jwToken );
    // console.log("this");
    // console.log(decode._id); 

    req.userId = decode._id;
    next();
  
    }catch(error) {
        console.log(error);
        res.status(500).json({
            errorMessage: "Something went wrong"
        });
    }
};

app.use(express.json()); 
app.use(cors()); 
   const JobSchema = new mongoose.Schema({
//vaha 2 field daaloge toh model ke schema me bhi dalna padega na?yes i know, do fast baby break dona yar plz 2 min ka kaam h yaar ok
    CompanyName: {
      type: String,
      required: true,
    },
    LogoUrl: {
      type: String,
      required: true,
      unique: true,
    },
    Position: {
      type: String,
      required: true,
      
    },
    MonthlySalary: {
      type: String,
      required: true,
    },
      
    JobType: {
        type: String,
        required: true,
      },

    LocationType: {
        type: String,
        required: true,
      },
  
    JobLocation: {
        type: String,
        required: true,
      },
      JobDescription: {
        type: String,
        required: true,
      },
      AboutCompany: {
        type: String,
        required: true,
      },
      Skills: {
        type: Array,
        required: true
        
      },
      Information: {
        type: String,
        required: true,
      },
      refUserId: {
        type: mongoose.ObjectId,
    },
},
{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })

const model = mongoose.model("model", JobSchema);
app.get("/myjobs", async (req, res) => {
    try {
      const data = await model.find({});
      res.json(data); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ 
        message: "Something went wrong!",
      });
    }
  });

app.post('/Jobs',verifyToken, async (req, res, next) => {
    try { 
      console.log(req.body);
        const { 
            CompanyName, 
            LogoUrl,
            Position,
            MonthlySalary,
            JobType,
            LocationType,
            JobLocation,   
            JobDescription, 
            AboutCompany,
            Skills,
            Information,
            refUserId} = req.body;

        if (
            !CompanyName ||
            !LogoUrl ||
            !Position ||
            !MonthlySalary ||
            !JobType ||
            !LocationType||
            !JobLocation ||
            !JobDescription ||
            !AboutCompany||
            !Skills||
            !Information||
            !refUserId
        ) {//information is missing here
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        } 
        console.log("checkpoint1");
      const userId = req.userId; 
      const Jobdata = await model.create({
        CompanyName,
        LogoUrl,
        Position,
        MonthlySalary,
        JobType,
        LocationType,
        JobLocation,
        JobDescription,
        AboutCompany,
        Skills,
        Information,
        refUserId: userId
      });
      await Jobdata.save();
    //   console.log(Jobdata); 
    console.log("checkpoint2");

      res.json({
        status: "Job created successfully"
      }); 
    } catch (error) {
      console.log(error);
      next(error);
      res.status(500).json({
        status: 'FAILED', 
        message: 'Something went wrong!'
     
      });
    }
  });

  app.get('/getJobById', async (req, res, next) => { 
    try{
        const id = req.query.id;
        //console.log( req.query.id);
        const jobdetail = await model.findById(id);
        if(!jobdetail) {
          return res.status(400).json({
            errorMessage: "Bad request",
        });
        }
        res.json({data: jobdetail});
    }catch(error) {
      next(error);
     
    }
  });

  app.patch('/updateJobById', verifyToken, async (req, res, next) => {
    try {
        const jobId = req.query.id;
        const userId = req.userId; 
        //console.log(jobId);
        //console.log(userId);

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad request"
            });
        }
        const isJobExist = await model.findOne({ 
            _id: jobId,
            refUserId: userId
        });

        if (!isJobExist) {
            return res.status(400).json({
                errorMessage: "Job not found"
            });
        }
        const { 
          CompanyName, 
          LogoUrl,
          Position,
          MonthlySalary,
          JobType,
          LocationType,
          JobLocation,
          JobDescription,
          AboutCompany,
          Skills,
          Information
        } = req.body;
      if (
          !CompanyName ||//
          !LogoUrl ||
          !Position ||
          !MonthlySalary ||
          !JobType ||
          !LocationType||
          !JobLocation ||
          !JobDescription ||
          !AboutCompany||
          !Skills||
          !Information
        
      ) {
          return res.status(400).json({
              errorMessage: "not good request"
          });
      } 

      await model.updateOne(
        { _id: jobId, refUserId: userId},
        {
          $set: {
          CompanyName, 
          LogoUrl,
          Position,
          MonthlySalary,
          JobType,
          LocationType,
          JobLocation,
          JobDescription,
          AboutCompany,
          Skills,
          Information
          }
        })
        res.json({
          message: "Job updated successfully"
        })
    } catch (error) {
        next(error);
    }
});



  app.listen(PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Server is up"))
      .catch((error) => console.log(error));
  });

  app.get("/getAlljobs", async (req, res, next) => {
    try {
        const Position = req.query.Position || " ";
        const skills = req.query.Skills; 
        let filter = {};
        
        if (skills) {
            let filteredSkills = skills.split(",");
            const caseInsensitive = filteredSkills.map((element) => new RegExp(element, "i"));
            console.log(caseInsensitive);
            filter = { Skills: { $in: caseInsensitive } }; 
        }
        // console.log(filter);
        const jobSort = await model.find(
            {
                Position: { $regex: Position, $options: "i" },
                ...filter,
            },
            { CompanyName: 1, Position: 1 }
        );

        res.json({ data: jobSort });

    } catch (error) {
        next(error);
    }
});
