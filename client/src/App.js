import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import EditDoc from "./pages/EditDoc";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Post from "./pages/Post";
import CreateDoc from "./pages/CreateDoc";
import Ranking from "./pages/Ranking";
import TournamentMain from "./pages/TournamentMain";
import Entry from "./pages/Entry";
import Chat from "./pages/Chat";

// styles
import "./reset.css";
import "./styles/main.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./modules/userInfo";
import { setLogin } from "./modules/isLogin";
import axios from "axios";
import Result from "./pages/TournamentResult";
import Tournament from "./pages/Tournament";
import EditMap from "./components/Post/EditMap";

function App() {
  const dispatch = useDispatch();
  const getUserInfo = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://localhost:8080/auth/me", { headers: { Authorization } })
      .then((res) => {
        console.log(res.data);
        dispatch(setLogin());
        dispatch(setUserInfo(res.data));
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/maptest" component={EditMap} />
          <Route path="/chattest" component={Chat} />

          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/post/:postId" component={Post} />
          <Route path="/post/:postId/entry">
            <Entry />
          </Route>
          <Route path="/post/:postId/tournament">
            <Tournament />
          </Route>
          <Route path="/post/:postId/result">
            <Result />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route exact path="/tournament">
            <TournamentMain />
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
          <Route path="/doc">
            <CreateDoc />
          </Route>
          <Route path="/edit/:docId">
            <EditDoc />
          </Route>
          <Route path="/ranking">
            <Ranking />
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
