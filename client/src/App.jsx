import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import  Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

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
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
          <Route path="/admin/edit-post/:id" element ={<ProtectedRoute><EditPost/></ProtectedRoute>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
