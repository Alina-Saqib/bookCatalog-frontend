
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import BrowseBooks from './components/Books/BrowseBooks'
import AddBook from './components/Books/AddBook';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/books" element={<BrowseBooks/>}/>
      <Route path="/add-book" element={<AddBook/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  
    
      
    </>
  )
}

export default App
