import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {

	return (
		<header className={classes.mainHeader}>
			<div className={classes.logo}>Vehicles App</div>
			<nav>
				<ul>
					<li>
						<NavLink
							className={classes.link}
							activeClassName={classes.active}
							to="/"
              exact
						>
							Vehicle Model
						</NavLink>
					</li>
					<li>
						<NavLink
							className={classes.link}
							activeClassName={classes.active}
							to="/make"
						>
							Vehicle Make
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
