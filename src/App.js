import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Landing from './Components/Landing/Landing';

function App() {

  return (
    <div className="App poppins">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
