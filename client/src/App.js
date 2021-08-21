import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { LoginWithoutButton, Login, Logout } from "./components/auth/auth0";
import Header from "./components/Header";
import Home from "./Home";
import AskQuestion from "./components/AskQuestion";
import ShowQuestion from "./components/ShowQuestion";
import Edit from "./components/Edit";
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
          <Home />
        </Route>
        <Route path="/ask-question" exact>
          <Header />
          <AskQuestion />
        </Route>
        <Route path="/edit/:id" component={ Edit } />
        <Route path="/:id" component={ ShowQuestion } />
        </Switch>
    </Router>
  );
}


export default App;
