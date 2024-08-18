
import './App.css';
import MainLayout from './layout/MainLayout';
import Signup from './page/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/Login';
import Profile from './page/Profile/Profile';
import Home from './page/Home/Home';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'login',
    element: <Login />
  },
  
])
function App() {

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
