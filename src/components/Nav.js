import React  from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import "../assets/css/Nav.css"

const AppNav = () => {

    const isAuthorized = useSelector((state)=>state.User.authorized)
    const userName = useSelector((state)=>state.User.userData)


    return(
        <div className="nav-div">
            <Link to={"/"}>
                <Button>
                    Home
                </Button>
            </Link>
            <div className="left-side">
                {isAuthorized ?
                    <>
                        <label>
                            Hi {userName}!
                        </label>
                        <Link to={"/logout"}>
                            <Button>
                                Logout
                            </Button>
                        </Link>
                    </>
                    : <>
                        <Link to={"/login"}>
                            <Button>
                                Login
                            </Button>
                        </Link>

                        <Link to={"/register"}>
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}

export default AppNav;
