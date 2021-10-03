import React from 'react';
import { Router, RouterStore } from 'react-router-mobx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AllVehiclesPage from './Pages/VehicleModel/AllVehicles';
import VehicleModelEdit from './Pages/VehicleModelEdit/VehicleModelEdit';
import VehicleMakePage from './Pages/VehicleMake/VehicleMakePage';
import Layout from './Layouts/Layout'
import MainNavigation from './Layouts/MainNavigation';

const routerStore = new RouterStore();

function App() {
  return (
    <Router component={BrowserRouter} routerStore={routerStore}>
      <div>
        <MainNavigation />
        <Layout>
          <Switch>
            <Route path="/" exact component={AllVehiclesPage} />
            <Route path="/model/:id" exact component={VehicleModelEdit} />
            <Route path="/make" exact component={VehicleMakePage} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
