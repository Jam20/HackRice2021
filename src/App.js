import './App.css';
import Home from './screens/HomeScreen';

function App() {
  const browserHistory = createBrowserHistory()
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route  path='/' component={HomeScreen}/>
        {/* <Routes>
        <Route exact path='/' component={HomeScreen}/>
        <Route exact path='/home' component={HomeScreen}/>  
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;