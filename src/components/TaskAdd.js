import {useState} from "react";
import axios from "axios";
import {Button, Input, Modal, ModalBody, ModalHeader} from "reactstrap";
import close from "./../assets/images/close.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskAddModal = ({params,fetchData,handleVisible}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState(new Date());

    const addTask=()=>{
        axios.post("http://localhost:8080/api/v1/task/add", {
            title,
            description,
            dueDate
        }, {
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token").trim()
            }
        }).then(res=>{
            resetModal()
        })
    }

    const resetValues=()=>{
        setDescription("")
        setTitle("")
    }

    const resetModal=()=>{
        resetValues();
        fetchData();
        handleVisible(false)
    }

    return(
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
                    <img src={close} className="modal-header-img" onClick={()=>handleVisible(false)}/>
                </div>
            </ModalHeader>
            <ModalBody>
                <div id="form">
                    <div className="d-f j-c-s-b align-center medium-height" >
                        <label>

                        </label>
                    </div>
                    <Input
                        type="text"
                        id="textarea"
                        value={title}
                        className="form-input-long form-input-any  center-margin text-area"
                        style={{marginBottom:"10px"}}
                        onChange={(e) => { setTitle(e.target.value) }}
                        maxLength="225"
                        rows="3"
                        placeholder="Title..."
                    />

                    <Input
                        type="textarea"
                        value={description}
                        className="form-input-long form-input-any  center-margin text-area"
                        onChange={(e) => { setDescription(e.target.value) }}
                        maxLength="225"
                        rows="3"
                        placeholder="Enter Description..."
                    />
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />

                </div>
                <div className="center full-width" style={{height:"20%"}}>
                    <Button
                        className="btn-success add-label center-margin"
                        onClick={()=>{
                            addTask()
                        }}
                    >
                        Confirm
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default TaskAddModal
