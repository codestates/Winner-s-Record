import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import Signup from "./pages/Signup";
import Profile from "./pages/Mypage";
import Landing from "./pages/Landing";
import Edit from "./pages/Edit";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Post from "./pages/Post";

// styles
import "./reset.css";
import "./styles/main.scss";
import Entry from "./pages/Entry";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/post/:postId">
            <Post />
          </Route>
          <Route path="/post/:postId/entry">
            <Entry />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/redirect">
            <Redirect />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path={"/profile/:userId"}>
            <Profile />
          </Route>
          <Route path="/profile/edit">
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
