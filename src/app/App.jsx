import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Adminaction from "../component/Adminaction"
import Admin from "../pages/Admin.jsx";
import Bar from "../component/Bar.jsx";
import Login from "../component/Login.jsx";
import { useEffect, useState } from "react";





export default function App() {

  const [login, setLogin] = useState(false);

  
  useEffect(()=>{
    const key = localStorage.getItem("stmToken")
    console.log(key);
    if(key !== null){
      setLogin(true);
    }
    else{
      setLogin(false);
    }

  },[]);

  // console.log(localStorage.getItem("stmToken"))


  return (
    <div>
      {
        login ?
          <Bar />
          :
          <div>
            <Routes>
              <Route path="*" element={<Navigate to={'/login'} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
      }


      

      {/* <Routes>
        <Route path="*" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Login/>}/> */}
      {/* <Route path="/orderDetails" element={<Bar/>}/>
        <Route path="/Adminaction" element={<Adminaction/>}/> */}
      {/* </Routes> */}

    </div>

  )
}