import { Link } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <header>
      <div>Vehicles App</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Vehicle Model</Link>
          </li>
          <li>
          <Link to="/make">Vehicle Make</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation;