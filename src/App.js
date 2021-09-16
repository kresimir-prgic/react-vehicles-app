import React from 'react';
import { Router, RouterStore } from 'react-router-mobx';
import { BrowserRouter, Route } from 'react-router-dom';

import AllVehiclesPage from './Pages/VehicleModel/AllVehicles';
import Layout from './Layouts/Layout'

const routerStore = new RouterStore();

function App() {
  return (
    <Layout>
      <Router component={BrowserRouter} routerStore={routerStore}>
        <Route path="/" exact>
          <AllVehiclesPage />
        </Route>
      </Router>
    </Layout>
  );
}

export default App;
