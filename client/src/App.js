import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Redirect from "./pages/Redirect";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Main from "./pages/Main";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import CreateTournament from "./pages/CreateTournament";
import Ranking from "./pages/Ranking";
import TournamentMain from "./pages/TournamentMain";
import Entry from "./pages/Entry";
import Chat from "./pages/Chat";

// styles
import "./styles/main.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./modules/userInfo";
import { setLogin } from "./modules/isLogin";
import axios from "axios";
import Result from "./pages/TournamentResult";
import Tournament from "./pages/Tournament";
import Chatroom from "./pages/Chatroom";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const dispatch = useDispatch();
  const getUserInfo = () => {
    const Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get("http://ec2-3-35-18-23.ap-northeast-2.compute.amazonaws.com/auth/me", {
        headers: { Authorization },
      })
      .then((res) => {
        dispatch(setLogin());
        dispatch(setUserInfo(res.data));
      });
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app--container">
      <Router>
        <Switch>
          <Route path="/loading" component={LoadingIndicator} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/chat" component={Chat} />
          <Route path="/chat/:roomId" component={Chatroom} />
          <Route exact path="/post/:postId" component={Post} />
          <Route exact path="/post/:postId/entry">
            <Entry />
          </Route>
          <Route exact path="/post/:postId/tournament">
            <Tournament />
          </Route>
          <Route exact path="/post/:postId/result">
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
          <Route path={"/profile/:userId"} component={Profile} />
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/create-tournament">
            <CreateTournament />
          </Route>
          <Route path="/edit-post/:docId">
            <EditPost />
          </Route>
          <Route path="/ranking">
            <Ranking />
          </Route>
          <Route path="/">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
