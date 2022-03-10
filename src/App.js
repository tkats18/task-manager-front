import LoginPage from "./pages/Login";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App root">
                <div>
                    <Switch>
                        {/*<Route exact path={"/"} component={MainPage}/>*/}
                        {/*<Route exact path={"/register"} component={RegisterPage}/>*/}
                        <Route exact path={"/login"} component={LoginPage}/>
                        {/*<Route exact path={"/logout"} component={LogoutPage}/>*/}

                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
