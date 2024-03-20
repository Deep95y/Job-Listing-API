import React from "react";
import Register from './register';
import Login from './login';
import Addjob from './addjob';
import Mainpage from './mainpage';
import {Routes, Route} from 'react-router-dom';

const App = () => {
    return (
      <>
         <main>
  <Routes>
    <Route path ="/" element ={<Register/>} />
    <Route path ="/Register" element ={<Register/>} />
    <Route path ="/Login" element ={<Login/>} />
    <Route path ="/Addjob" element ={<Addjob/>} />
    <Route path ="/Mainpage" element ={<Mainpage/>} />
    <Route path ="." element ={<h1>404 Route not found</h1>} />
  </Routes> 
  
  </main>


     {/* <Register/> */}
     {/* <Login/> */}
     {/* <Addjob/> */}
     {/* <Mainpage/> */}
      </>
    );
}
export default App;