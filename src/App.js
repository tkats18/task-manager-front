import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import AppNav from "./components/Nav"

import "./assets/css/Style.css"
import LogoutPage from "./pages/Logout";
import RegisterPage from "./pages/Register";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <Router>
            <div className="App root">
                <AppNav />
                <div>
                    <Switch>
                        <Route exact path={"/"} component={MainPage}/>
                        <Route exact path={"/register"} component={RegisterPage}/>
                        <Route exact path={"/login"} component={LoginPage}/>
                        <Route exact path={"/logout"} component={LogoutPage}/>

                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
