import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Landing from "./pages/Landing";

// styles
import "./reset.css";
import "./styles/main.scss";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/mypage">
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
