import { Route, Switch } from 'react-router-dom';

import AllVehiclesPage from './Pages/AllVehicles';
import Layout from './Layouts/Layout'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllVehiclesPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
