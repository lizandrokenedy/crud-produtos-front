import React from 'react'
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Rotas from './rotas'


function App() {
  return (
    <HashRouter>
      <div className="container">
        <Navbar />
        <Rotas />
      </div>
      </HashRouter>
  );
}

export default App;
