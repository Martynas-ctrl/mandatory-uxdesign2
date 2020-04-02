import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Components/Main.js';
import Quiz from './Components/Quiz.js';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <main>
          <Route path='/' exact><Main /></Route>
          <Route path='/Quiz'><Quiz /></Route>
        </main>
      </div>
    </Router>
  );
}

export default App;