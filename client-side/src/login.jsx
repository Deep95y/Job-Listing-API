

const Login = () => {
    return(
<>
<div className="main" style={{height:'100vh',width:'100vw',display:'flex',flexDirection:'row',}}>
        <div className="left" style={{marginLeft:'50px'}}>
      <h1>Already have an account?</h1>
      <h3>Your personal job finder is here</h3><br/>
     
      <input type = "text" placeholder="Email"></input><br/><br/>
      <input type = "text" placeholder="Password"></input><br/><br/>
      <button type = "submit">Create Account</button><br/>
      <p>Already have an account?< a href ="sign in">Sign up</a></p>
      </div>

      <div className="right" style={{display:'flex',float:'right',marginLeft:'60px'}}>
          <img src = "welcome-img.png" style={{height:'600px',width:'600px'}} />
         <div className="text" style={{position:'absolute', color:'white', marginLeft:'15%',fontSize:'20px',marginTop:'30px'}}>Your Personal Job Finder</div>
      </div>
      </div>
      </>
);
}
export default Login;

