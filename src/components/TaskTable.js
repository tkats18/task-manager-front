import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import more from "./../assets/images/more.png"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./../assets/css/Table.css"
import TaskAddModal from "./TaskAdd";
import TaskAssignModal from "./TaskAssign";
import TaskStatusModal from "./TaskStatus";
import Select from "react-select";
import {TaskDueList, TaskStatusList} from "../constants";

const TaskTable = () => {

    const dispatcher = useDispatch()
    const hist = useHistory()

    const [userFilter, setUserFilter] = useState([])
    const [dueFilter, setDueFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState([])

    const [userOptions, setUserOptions] = useState([])

    const [data, setData] = useState([])
    const [addTaskData, setAddTaskData] = useState({isOpen: false})
    const [assignTaskData, setAssignTaskData] = useState({isOpen: false, taskBusinessKey: ""})
    const [taskStatusData, setTaskStatusData] = useState({isOpen: false, taskBusinessKey: ""})

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        fetchData()
    }, [userFilter, statusFilter, dueFilter])

    const fetchData = () => {

        axios.post("http://localhost:8080/api/v1/task/search", {
                dueFilter: dueFilter == null ? null : dueFilter.value,
                userFilter: userFilter == null ? [] : userFilter.map(value => value.value),
                statusFilter: statusFilter == null ? [] : statusFilter.map(value => value.value)
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(res => {
            setData(res.data)
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                hist.push("/login")
                dispatcher({type: "LOGOUT", payload: null})
            }
        })
    }

    const deleteTask = (taskKey) => {
        axios.delete(`http://localhost:8080/api/v1/task/${taskKey}/delete`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(_ => {
            fetchData()
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                hist.push("/login")
                dispatcher({type: "LOGOUT", payload: null})
            }
        })
    }

    const fetchUsers = () => {
        axios.get("http://localhost:8080/api/v1/user/search", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
        ).then(res => {
            setUserOptions(res.data.map((val) => ({label: val.email, value: val.userBusinessKey})))
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                hist.push("/login")
                dispatcher({type: "LOGOUT", payload: null})
            }
        })
    }


    const toggleTaskAddModal = () => {
        if (addTaskData.isOpen) {
            setAddTaskData({isOpen: false})
        } else {
            setAddTaskData({isOpen: true})
        }
    }

    const toggleTaskStatusModal = (taskBusinessKey) => {
        if (taskStatusData.isOpen) {
            setTaskStatusData({isOpen: false, taskBusinessKey: taskBusinessKey})
        } else {
            setTaskStatusData({isOpen: true, taskBusinessKey: taskBusinessKey})
        }
    }

    const toggleTaskAssignModal = (taskBusinessKey) => {
        if (assignTaskData.isOpen) {
            setAssignTaskData({isOpen: false, taskBusinessKey: taskBusinessKey})
        } else {
            setAssignTaskData({isOpen: true, taskBusinessKey: taskBusinessKey})
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg="12">
                            <div className="full-width">
                                <div>
                                    <div className="task-filter">
                                        <div className="task-filter-wrapper">
                                            <div className="filter-item">
                                                <Select isMulti options={TaskStatusList} value={statusFilter}
                                                        onChange={setStatusFilter}/>
                                            </div>
                                            <div className="filter-item">
                                                <Select options={TaskDueList} value={dueFilter}
                                                        onChange={setDueFilter}/>
                                            </div>
                                            <div className="filter-item">
                                                <Select isMulti options={userOptions} value={userFilter}
                                                        onChange={setUserFilter}/>
                                            </div>
                                        </div>
                                        <Button className="btn-success add-label"
                                                onClick={() => toggleTaskAddModal()}>
                                            New Task
                                        </Button>
                                    </div>
                                    <table
                                        className=" table-responsive project-list-table table-nowrap table-centered table-borderless full-width">
                                        <thead className="table-body">
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-body">
                                        {data.map((value, key) => (
                                            <tr key={key} style={value.timeline === "OVERDUE" || value.timeline === "NEAR_DUE" ? {backgroundColor: "#00800052"} : {}}>
                                                <td>
                                                    <p className="mb-0 small-p">{value.title}</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">{value.description}</p>
                                                </td>
                                                <td>{value.dueDate}</td>
                                                <td>
                                                    <span className="badge badge-primary">
                                                        {value.taskStatus}
                                                    </span>
                                                </td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle href="#" className="card-drop" tag="i">
                                                            <img width="20px" src={more} alt="more"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            {value.assignees && value.assignees
                                                                .filter(val => val.email === localStorage.getItem("email")).length !== 0
                                                                ? (<DropdownItem
                                                                    onClick={() => toggleTaskStatusModal(value.taskBusinessKey)}
                                                                    href="#">Change Status</DropdownItem>) :
                                                                (<></>)
                                                            }

                                                            <DropdownItem
                                                                onClick={() => toggleTaskAssignModal(value.taskBusinessKey)}
                                                                href="#">Assign</DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => deleteTask(value.taskBusinessKey)}
                                                                href="#">Delete</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <TaskAddModal
                        params={addTaskData}
                        fetchData={fetchData}
                        handleVisible={toggleTaskAddModal}
                    />
                    <TaskAssignModal
                        params={assignTaskData}
                        fetchData={fetchData}
                        handleVisible={toggleTaskAssignModal}
                    />
                    <TaskStatusModal
                        params={taskStatusData}
                        fetchData={fetchData}
                        handleVisible={toggleTaskStatusModal}
                    />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default TaskTable;
