
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import { BrowserRouter,Route, Routes,} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Getuser from './components/Getuser';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);
  function showAlert(message, type) {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }
  return (
     <>
     <NoteState showAlert={showAlert}>
     <BrowserRouter>
     <Navbar />
     <Alert alert={alert}/>
     <div className='container'>
     <Routes>
      <Route exact path='/' element={<Home showAlert={showAlert} />}/>
      <Route exact path='/about' element= {<About/>} />
      <Route exact path='/login' element= {<Login showAlert={showAlert}/>} />
      <Route exact path='/signup' element= {<Signup showAlert={showAlert} />} />
      <Route exact path='/getuser' element= {<Getuser/>} />
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </>
  );

}

export default App;
