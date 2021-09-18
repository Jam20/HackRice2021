import './App.css';
import React from 'react'
import Home from './pages/HomeScreen';

import {
   Router,
   Route
  } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import HomeScreen from "./screens/HomeScreen" 

function App() {
  const browserHistory = createBrowserHistory()
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route exact path='/' component={HomeScreen}/>
        <Route exact path='/home' component={HomeScreen}/>  
      </Router>
    </div>
  );
}

export default App;
