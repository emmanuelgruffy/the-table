import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//React-Redux
import { Provider } from "react-redux";
//Redux
//import store from "./store";
import "./App.css";
//Components
import Landing from "./components/Landing";
import Onboarding from "./components/Onboarding";
import Table from "./components/Table";
import EndGame from "./components/EndGame";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store/configureStore";

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Router>
          <Fragment>
            <section className="background">
              <div className="title-section">
                <h3>THE</h3>
                <h1>TABLE</h1>
              </div>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/onboarding" component={Onboarding} />
                <Route exact path="/table" component={Table} />
                <Route exact path="/end-game" component={EndGame} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
