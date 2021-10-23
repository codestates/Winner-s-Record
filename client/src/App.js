import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// styles
import "./reset.css";
import "./styles/main.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
