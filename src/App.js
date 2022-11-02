import React, {useState} from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Singup";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="*"  element={<Home  showAlert={showAlert}/>} />
          <Route path="/About" element={<About   showAlert={showAlert}/>} />
          <Route path="/Login" element={<Login   showAlert={showAlert}/>} />
          <Route path="/Signup" element={<Signup   showAlert={showAlert}/>} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
