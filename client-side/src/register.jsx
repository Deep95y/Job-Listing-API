
const Register = () => {

    return(
<>
<div className="main" style={{height:'100vh',width:'100vw',display:'flex',flexDirection:'row',}}>
        <div className="left" style={{marginLeft:'50px'}}>
      <h1>Create an account</h1>
      <h3>Your personal job finder is here</h3><br/>
      <input type = "text" placeholder="Name"></input><br/><br/>
      <input type = "text" placeholder="Email"></input><br/><br/>
      <input type = "text" placeholder="Mobile"></input><br/><br/>
      <input type = "text" placeholder="Password"></input><br/><br/>
      <div style={{display:'flex', flexWrap:'wrap'}}>
      <input type = "checkbox"></input>
      <p>By creating an account, I agree to our terms of use and privacy policy</p><br/></div>
      <button type = "submit">Create Account</button><br/>
      <p>Don’t have an account?< a href ="sign in">Sign in</a></p>
      </div>
      
      <div className="right" style={{display:'flex',float:'right',marginLeft:'60px'}}>
          <img src = "welcome-img.png" style={{height:'600px',width:'600px'}} />
         <div className="text" style={{position:'absolute', color:'white', marginLeft:'15%',fontSize:'20px',marginTop:'30px'}}>Your Personal Job Finder</div>
      </div>
     
      </div>
      </>
    );
}
export default Register;
