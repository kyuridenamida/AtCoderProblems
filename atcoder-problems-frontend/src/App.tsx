import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Container } from "reactstrap";

import ACRanking from "./pages/ACRanking";
import FastestRanking from "./pages/FastestRanking";
import FirstRanking from "./pages/FirstRanking";
import ShortRanking from "./pages/ShortRanking";
import SumRanking from "./pages/SumRanking";
import LanguageOwners from "./pages/LanguageOwners";
import ListPage from "./pages/ListPage";
import UserPage from "./pages/UserPage";
import TablePage from "./pages/TablePage";
import NavigationBar from "./components/NavigationBar";
import StreakRanking from "./pages/StreakRanking";
import { List } from "immutable";
import ContestCreatePage from "./pages/Internal/VirtualContest/ContestCreatePage";
import ShowContest from "./pages/Internal/VirtualContest/ShowContest";
import UserConfigPage from "./pages/Internal/MyAccountPage";
import RecentContestList from "./pages/Internal/VirtualContest/RecentContestList";
import ContestUpdatePage from "./pages/Internal/VirtualContest/ContestUpdatePage";
import SingleProblemList from "./pages/Internal/ProblemList/SingleProblemList";

const App = () => {
  const [userId, setUserId] = useState("");
  const [rivals, setRivals] = useState(List<string>());
  return (
    <Router>
      <div>
        <NavigationBar
          updateUserIds={(id, list) => {
            setUserId(id);
            setRivals(list);
          }}
        />
        <Container style={{ width: "100%", maxWidth: "90%" }}>
          <Switch>
            <Route exact path="/ac" component={() => <ACRanking />} />
            <Route exact path="/fast" component={() => <FastestRanking />} />
            <Route exact path="/short" component={() => <ShortRanking />} />
            <Route exact path="/first" component={() => <FirstRanking />} />
            <Route exact path="/sum" component={() => <SumRanking />} />
            <Route exact path="/streak" component={() => <StreakRanking />} />
            <Route exact path="/lang" component={() => <LanguageOwners />} />
            <Route
              path="/user/([a-zA-Z0-9_]+)+"
              component={() => <UserPage userId={userId} />}
            />
            <Route
              path="/table/([a-zA-Z0-9_]*)*"
              component={() => <TablePage userId={userId} rivals={rivals} />}
            />
            <Route
              path="/list/([a-zA-Z0-9_]*)*"
              component={() => <ListPage userId={userId} rivals={rivals} />}
            />

            {/*Virtual Contests*/}
            <Route
              path="/contest/show/:contestId([a-zA-Z0-9_-]+)"
              component={ShowContest}
            />
            <Route path="/contest/create" component={ContestCreatePage} />
            <Route
              path="/contest/update/:contestId([a-zA-Z0-9_-]+)"
              component={ContestUpdatePage}
            />
            <Route path="/contest/recent" component={RecentContestList} />

            {/*User Settings*/}
            <Route path="/login/user" component={UserConfigPage} />

            {/*Problem List*/}
            <Route
              path="/problemlist/:listId([a-zA-Z0-9_-]+)"
              component={SingleProblemList}
            />

            <Redirect path="/" to="/table/" />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
