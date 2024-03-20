const Mainpage = () => {
    return(
        <>
        <div className="main" style={{display:'flex', flexDirection:'column',width: '100vw', height:'100vh'}}>
        <div className="navbar" style={{width: '1400px', height:'130px', borderRadius: '0px, 0px, 62px, 55px',background:'#ED5353',display:'flex', flexDirection:'row'}}>
            <div style={{marginLeft:'20px', marginTop:'20px',fontSize:'20px',color:'white'}}>Jobfinder</div>
            
            <div style={{marginLeft:'70%',marginTop:'20px',color:'white'}}>Logout</div>
            <div style={{marginLeft:'20px',marginTop:'20px',color:'white'}}>Hello! Recruiter</div>
         
        </div>
        <div className="status" style={{width: '1080px',height: '230px',top: '171px',left: '208px',background:'lightblue',margin:'auto',marginTop:'30px'}}>
           <div style={{marginLeft:'30%',marginTop:'5%'}}><input type = "text" placeholder="Search" style={{ height:'30px', width:'500px',borderRadius:'12px'}}></input></div><br/>
           <div style={{marginLeft:'30%'}}><input type = "dropdown" placeholder="Skills" style={{ height:'30px', width:'100px',borderRadius:'12px'}}></input></div>
           <div style={{marginLeft:'50%'}}><button type = "button" style={{background:'#ED5353',color:'white',height:'30px', width:'100px'}}>+ Add job</button></div>
           <div style={{marginLeft:'50%'}}><button type = "button" style={{background:'white',color:'#ED5353'}}>Clear</button></div>
        </div>
        </div>
        </>
    );
}
export default Mainpage;