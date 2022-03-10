import React,{useEffect, useState} from 'react';
import {  Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
// import "./../assets/images/more.png"
// import classnames from 'classnames';

import { useHistory } from 'react-router-dom';



const MainPage = (authorized) => {

    const isLoggedIn = localStorage.getItem("token");
    const hist = useHistory()
    const [activeTab, setactiveTab] = useState('1');
    function toggleTab(tab) {
        if (activeTab !== tab) {
            setactiveTab(tab)
        }
    }

    console.log(authorized)
    useEffect(()=>{
        if(!isLoggedIn){
            hist.push("/login")
        }
    },[isLoggedIn,hist])

    return (
        <div className="main-div">
            {authorized ?
                <>

                </>:
                <div>Authorize first</div>
            }
        </div>

    );
}

export default MainPage;
