import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './comps/login';
import Home from './comps/home';
import { ContexProvider } from './contex';

function App() {
  return (
    
    <div className="App d-flex align-items-center">
<ContexProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
</ContexProvider>
    </div>
  );
}

export default App;
