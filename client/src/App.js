import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Landing from "./pages/Landing";
import Edit from "./pages/Edit";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Post from "./pages/Post";

// styles
import "./reset.css";
import "./styles/main.scss";
import PostMap from "./components/Post/PostMap";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/maptest" component={PostMap} />
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/post/:postId">
            <Post />
          </Route>
          <Route path="/main">
            <Main />
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
          <Route path="/mypage/edit">
            <Edit />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
