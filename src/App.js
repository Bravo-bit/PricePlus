import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Authentication from "./pages/Authentication";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Prediction from "./pages/Prediction";
import { action as logoutAction } from "./pages/Logout";

import { checkAuthLoader, tokenLoader } from "./util/auth";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    action: checkAuthLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <Search /> },
      { path: "favorites", element: <Favorites /> },
      { path: "auth", element: <Authentication /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "predict", element: <Prediction /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
