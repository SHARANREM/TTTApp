import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css"
import Login from "./pages/Login";
import Main from "./pages/Main";
import StudentPage from "./pages/StudentPage";
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/main" element={<Main />}/>
      <Route path="/studpage" element={<StudentPage />}/>
    </Routes>
    </>
  )
}

export default App
