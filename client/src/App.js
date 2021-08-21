import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { LoginWithoutButton, Login, Logout } from "./components/auth/auth0";
import Header from "./components/Header";
import Box from "./components/Box.jsx";
import AskQuestion from "./components/AskQuestion";
import ShowQuestion from "./components/ShowQuestion";
function App() {
  const { isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated);
  return (
     <Router>
        <Switch>
        <Route path="/" exact>
          {
            // isAuthenticated ? <Header /> : <LoginWithoutButton />
          }
          <Header />
          <ShowQuestion />
        </Route>
        <Route path="/ask-question" exact>
          <Header />
          <AskQuestion />
        </Route>
        </Switch>
    </Router>
  );
}


export default App;
