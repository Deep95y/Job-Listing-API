
const Addjob = () => {
    return(
        <>

        <div className="main" style={{height:'100vh',width:'100vw',display:'flex',flexDirection:'row'}}>
        <div className="left" style={{display:'flex', flexDirection:'column',float:'left', marginLeft:'40px'}}>
        <h2>Add job description</h2>
       <div ><label for = "Company Name">Company Name:</label> 
        <input type ="text" placeholder="Enter your company name here"></input></div><br/>
       <div> <label for = "Add logo URL">Add logo URL:</label>
        <input type ="text" placeholder="Enter job position"></input></div><br/>
        <div><label for = "Job position">Job position:</label>
        <input type ="text" placeholder="Enter Amount in rupees"></input></div><br/>
        <div><label for = "Monthly salary">Monthly salary:</label>
        <input type ="dropdown" placeholder="Select"></input></div><br/>
        <div><label for = "Job Type">Job Type:</label>
        <input type ="dropdown" placeholder="Select"></input></div><br/>
        <div><label for = "Remote/office">Remote/office:</label>
        <input type ="text" placeholder="Location"></input></div><br/>
        <div><label for = "Location">Location:</label>
        <input type ="text" placeholder="Job Description"></input></div><br/>
        <div><label for = "Job Description">Job Description:</label>
        <input type ="text" placeholder="Type the job description"></input></div><br/>
       <div><label for = "About Company">About Company:</label>
        <input type ="text" placeholder="Type about your company"></input></div><br/>
       <div><label for = "Skills Required">Skills Required:</label>
        <input type ="text" placeholder="Enter the must have skills"></input></div><br/>
        <div><label for = "Information">Information:</label>
        <input type ="text" placeholder="Enter the additional information"></input></div><br/>
        <div style={{flexWrap:'wrap',marginLeft:'40%'}}><button type = "submit">Cancel</button>
        <button type = "submit" style={{marginLeft:'20px',background:'#ED5353'}}>+ Add jobs</button></div><br/>      
        </div>
        <div className="right" style={{display:'flex', float:'right'}}>
            <img src = "second.png" style={{height:'600px',width:'600px',marginLeft:'60%'}}/>
            <div style={{position:'absolute',marginLeft:'40%',color:'white',marginTop:'20px',fontSize:'20px'}}>Recruiter add job details here</div>
        </div>
        </div>
        </>
    );
}

export default Addjob;