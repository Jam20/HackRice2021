import './App.css';
import React from 'react'

import HomeScreen from "./screens/HomeScreen" 
import MainScreen from "./screens/MainScreen"
import {Router, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'

function App() {
  let browserHistory = createBrowserHistory()
  let currentAnalysis
  function fileChangeHandler(analysis){
    currentAnalysis = analysis
    browserHistory.push('/main')
  }
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route exact path='/' component={({children}) => <HomeScreen onFileChange = {(analysis) => fileChangeHandler(analysis)}/> }/>
        <Route exact path='/home' component={({children}) => <HomeScreen onFileChange = {(analysis) => fileChangeHandler(analysis)}/> }/>
        <Route exact path='/main' component={({children}) => <MainScreen analysis = {currentAnalysis}/> }/>
        {/* <Routes>
        <Route exact path='/' component={HomeScreen}/>
        <Route exact path='/home' component={HomeScreen}/>  
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;