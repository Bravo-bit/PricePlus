import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { checkStatus } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();
  const tokenStatus = checkStatus();

  const handlePredictButtonClick = () => {
    navigate("/predict");
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>Price Plus</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Search
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Contact
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Log In
                </NavLink>
              </li>
            )}
            {tokenStatus && <li onClick={handlePredictButtonClick}>Predict</li>}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
