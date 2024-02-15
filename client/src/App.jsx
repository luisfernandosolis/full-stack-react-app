import {BrowserRouter, Routes,Route} from 'react-router-dom';

import HomePage from "./pages/HomePage"
import TaskForm from './pages/TaskForm'

import NavBar from './components/NavBar';


function App() {
  return (
      <BrowserRouter>
      <div className='container mx-auto px-10'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/task/:id' element={<TaskForm/>}/>
          <Route path='/task/new' element={<TaskForm/>}/>
        </Routes>
      </div>
      </BrowserRouter>
  )
}

export default App
