import {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import axios from "axios";
import Select from 'react-select'
import close from "../assets/images/close.png";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

const TaskAssignModal = ({params, fetchData, handleVisible}) => {
    const dispatcher = useDispatch()
    const hist = useHistory()
    const [userOptions, setUserOptions] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(()=>{
        if (params.isOpen){
            fetchUsers()
        }
    },[params.isOpen])

    const fetchUsers=()=>{
        axios.get("http://localhost:8080/api/v1/user/search",{
                headers:{
                    'Authorization' :`Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(res=>{
            setUserOptions(res.data.map((val)=> ({label:val.email, value:val.userBusinessKey})))
        }).catch(error=>{
            if (error.response && error.response.status===403){
                hist.push("/login")
                dispatcher({type:"LOGOUT",payload:null})
            }
        })
    }

    const assignTask=()=>{
        axios.put(`http://localhost:8080/api/v1/task/${params.taskBusinessKey}/assign`,{
            users:selectedUsers.map(value => value.value)
            },{
                headers:{
                    'Authorization' :`Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(res=>{
            handleVisible(false)
        }).catch(error=>{
            if (error.response && error.response.status===403){
                hist.push("/login")
                dispatcher({type:"LOGOUT",payload:null})
            }
        })
    }

    return (
        <Modal
            isOpen={params && params.isOpen}
            toggle={() => handleVisible(false)}
            className="confirm-modal"
        >
            <ModalHeader>
                <div className="d-f j-c-s-b">
                    <span>
                        Add Task
                    </span>
                    <img src={close} className="modal-header-img" onClick={() => handleVisible(false)}/>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="assign-wrapper">

                    <Select isMulti options={userOptions} value={selectedUsers} onChange={setSelectedUsers}/>
                    <Button
                        style={{marginTop:"10px"}}
                        className="btn-success add-label"
                        onClick={()=>assignTask()}
                    >
                        Assign
                    </Button>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default TaskAssignModal
