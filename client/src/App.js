import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { PersistGate } from "redux-persist/es/integration/react";

//React-Redux
import { Provider } from "react-redux";

//import store from "./store";
import "./App.scss";

//Components
import JoinTable from "./components/JoinTable";
import Landing from "./components/Landing";
import Onboarding from "./components/Onboarding";
import Table from "./components/Table";
import EndGame from "./components/EndGame";

import configureStore from "./store/configureStore";

const { store, persistor } = configureStore();

const App = () => {
  console.log(window.navigator.userAgent);
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Router>
          <Fragment>
            <div className="container">
              <section className="main-section">
                <div className="title-section">
                  <h3>THE</h3>
                  <h1>TABLE</h1>
                </div>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  {/*<Route exact path="/join-table" component={JoinTable} />*/}
                  <Route exact path="/onboarding" component={Onboarding} />
                  <Route exact path="/table" component={Table} />
                  <Route exact path="/end-game" component={EndGame} />
                </Switch>
              </section>
            </div>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
