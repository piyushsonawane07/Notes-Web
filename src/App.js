import React,{useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import LoadingBar from 'react-top-loading-bar'
import Alert from './components/Alert';

function App() {

  const [progress, setProgress] = useState(0);
  const [alert,setAlert] = useState(null);

  function setAlertState(message,type) {
    setAlert({
      message: message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  return (
    <>
    <LoadingBar color="#FFC107" height={3} progress={progress} onLoaderFinished={() => setProgress(0)} />
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home setAlertState={setAlertState}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signup">
                <Signup setProgress={setProgress} setAlertState={setAlertState}/>
              </Route>
              <Route exact path="/login">
                <Login setProgress={setProgress} setAlertState={setAlertState}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
