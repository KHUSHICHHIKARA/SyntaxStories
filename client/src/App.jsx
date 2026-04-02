import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import  Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <main style={{padding:"1rem"}}/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/admin/login" element={<LoginPage/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
