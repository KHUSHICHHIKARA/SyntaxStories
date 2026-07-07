import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import CategoryPage from "./pages/CategoryPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <main style={{padding:"1rem"}}/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/post/:slug" element={<PostPage/>} />
          <Route path="/admin/login" element={<LoginPage/>} />
          <Route path="/admin/register" element={<RegisterPage/>} />
          <Route path="/category/:categoryName" element={<CategoryPage/>}/>
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
          <Route path="/admin/edit-post/:slug" element ={<ProtectedRoute><EditPost/></ProtectedRoute>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
