import './App.css';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
