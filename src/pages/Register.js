import axios from "axios"
import React, { useState } from "react"
import { Input,Button} from "reactstrap"
import "../../src/assets/css/Login.css"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"


const RegisterPage = ()=>{

    const hist = useHistory()
    const dispatcher = useDispatch()

    const [fullName,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/api/v1/auth/register",{
            email,
            password,
            fullName
        },{
            headers:{
                "Access-Control-Expose-Headers": "Authorization"
            }
        }).then(res=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("email",res.data.email)
            dispatcher({type:"LOGIN",payload:res.data.email})
            hist.push("/")
        })
    }

    return (
        <div className="card login-card register-height">
            <div className="login-header">
                <div>
                    <label>
                        Welcome!
                    </label>
                    <label>
                        Register in to continue
                    </label>
                </div>
                <img width="40px" height="40px" src={"http://skote-v-light.react.themesbrand.com/static/media/profile-img.43b59e59.png"} alt="logo"/>

            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-holder">
                        <label className="form-margin">
                            full name
                        </label>
                        <Input className="form-control" onChange={e=>setFullName(e.target.value)} type="text"/>

                    </div>
                    <div className="form-holder">
                        <label className="form-margin">
                            email
                        </label>
                        <Input className="form-control" onChange={e=>setEmail(e.target.value)} type="text"/>

                    </div>
                    <div className="form-holder">
                        <label className="form-margin">
                            password
                        </label>
                        <Input className="form-control" onChange={e=>setPassword(e.target.value)} type="password"/>

                    </div>
                    <div className="center" >

                        <Button className="btn-primary">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
