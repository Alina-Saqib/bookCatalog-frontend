
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import BrowseBooks from './components/Books/BrowseBooks'
import AddBook from './components/Books/AddBook'

function App() {


  return (
    <>
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
