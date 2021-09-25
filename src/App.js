import React from 'react';
import { Router, RouterStore } from 'react-router-mobx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AllVehiclesPage from './Pages/VehicleModel/AllVehicles';
import VehicleMakePage from './Pages/VehicleMake/VehicleMakePage';
import Layout from './Layouts/Layout'
import MainNavigation from './Layouts/MainNavigation';

const routerStore = new RouterStore();

function App() {
  return (
    <Layout>
      <Router component={BrowserRouter} routerStore={routerStore}>
        <Switch>
          {/* <MainNavigation /> */}
          <Route path="/" exact component={AllVehiclesPage} />
          <Route path="/make" exact component={VehicleMakePage} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
