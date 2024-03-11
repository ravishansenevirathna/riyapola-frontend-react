import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adminaction from "../component/Adminaction"
import Admin from "../pages/Admin.jsx";
import Bar from "../component/Bar.jsx";

 


export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Bar/>}/>
        <Route path="/Adminaction" element={<Adminaction/>}/>
        
      </Routes>
      </BrowserRouter>
      
      {/* <Adminaction/> */}
        {/*<Admin/>*/}
    
    </div>
    
  )
}