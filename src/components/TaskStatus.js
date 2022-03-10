import {useState} from "react";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import axios from "axios";
import Select from 'react-select'
import close from "../assets/images/close.png";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {TaskStatusList} from "../constants";

const TaskStatusModal = ({params, fetchData, handleVisible}) => {
    const dispatcher = useDispatch()
    const hist = useHistory()
    const [selectedStatus, setSelectedStatus] = useState("")

    const changeStatus = () => {
        axios.put(`http://localhost:8080/api/v1/task/${params.taskBusinessKey}/status`, {
            taskStatus: selectedStatus.value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(res => {
            fetchData()
            handleVisible(false)
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                hist.push("/login")
                dispatcher({type: "LOGOUT", payload: null})
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

                    <Select options={TaskStatusList} value={selectedStatus} onChange={setSelectedStatus}/>
                    <Button
                        style={{marginTop: "10px"}}
                        className="btn-success add-label"
                        onClick={() => changeStatus()}
                    >
                        Assign
                    </Button>
                </div>
            </ModalBody>
        </Modal>

    )
}

export default TaskStatusModal
