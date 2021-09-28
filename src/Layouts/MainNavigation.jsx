import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.mainHeader}>
      <div className={classes.logo}>Vehicles App</div>
      <nav>
        <ul>
          <li>
            <Link className={classes.link} to="/">Vehicle Model</Link>
          </li>
          <li>
          <Link className={classes.link} to="/make">Vehicle Make</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;