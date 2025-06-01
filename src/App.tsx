import { useRoutes } from "react-router";
import "./assests/App.scss";
import routes from "./routes/Router";
import { ReactElement } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const App = (): ReactElement => {
  const isUserLoggedIn = useSelector(
    (state: any) => state.authState.activeUser.isUserLoggedIn
  );
  const routers: any = useRoutes(routes(isUserLoggedIn));
  return (
    <div className="App">
      {routers}
      <ToastContainer autoClose={5000} closeOnClick />
    </div>
  );
};

export default App;
