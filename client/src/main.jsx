import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Post from './pages/Post.jsx'
import { AuthProvider } from './context/useAuth.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>
  },
  {
    path : "/auth/login",
    element : <Login/>
  },
  {
    path : "/auth/signup",
    element : <Signup />
  },
  {
    path : "/create/post",
    element : <Post />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
