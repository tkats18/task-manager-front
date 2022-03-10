import React,{useEffect, useState} from 'react';
import {  Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
// import "./../assets/images/more.png"
// import classnames from 'classnames';

import { useHistory } from 'react-router-dom';
import TaskTable from "../components/TaskTable";



const MainPage = (authorized) => {

    const isLoggedIn = localStorage.getItem("token");
    const hist = useHistory()

    useEffect(()=>{
        if(!isLoggedIn){
            hist.push("/login")
        }
    },[isLoggedIn,hist])

    return (
        <div className="main-div">
            {authorized ?
                <>
                    <TaskTable/>
                </>:
                <div>Authorize first</div>
            }
        </div>

    );
}

export default MainPage;
