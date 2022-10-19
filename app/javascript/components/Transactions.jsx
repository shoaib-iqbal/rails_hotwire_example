import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import NewTransaction from "./new";
import Modal from 'react-modal';
import Nav from './Nav'

const customStyles = {
    content: {
        width: '60%',
        top: '5%',
        left: '20%',
        // transform: 'translate(-50%, -50%)',
    },
};
import {forwardRef} from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import "./styles.css";
import NewUser from "./NewUser";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref}/>
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref}/>
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

function Transactions() {
    const [data, setData] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [userModalIsOpen, userSetIsOpen] = useState(false);

    const showSidebar = () => setSidebar(true);
    const closeSideBar = () => setSidebar(false);
    //const [id, setId] = useState(rowData.id);
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [ledger, setLedger] = useState("");
    const [user, setUser] = useState("");
    //const [email, setEmail] = useState(rowData.email);
    const columns = [
        {title: "Date", field: "transaction_date"},
        {title: "Title", field: "title"},
        {title: "Amount", field: "amount"},
        {title: "General Ledger Account", field: "general_ledger_account"},
        {title: "User", field: "user_id"}
    ];
    useEffect(() => {
        fetch("/api/v1/transactions/index")
            .then((resp) => resp.json())
            .then((resp) => {
                setData(resp);
            });
    }, []);
    const onSave = (newTransaction) => {
        setData([newTransaction, ...data]);

    }
    return (
        <div>
            <Nav onModelAction={setIsOpen} onUserModalIsOpen={userSetIsOpen}/>
            {sidebar ? (
                <div className="nav-menuapi">
                    <div className="navbar-toggle">
                        <CloseIcon
                            onClick={(e) => closeSideBar(e)}
                            className="closeright"
                        ></CloseIcon>
                    </div>
                    <div className="containerheaderapi">Transaction Details</div>
                    <div className="containerdata">
                        <div className="wid293 pad5">
                            <div className="label"> Transaction Date:</div>
                            <div className="textoverflowapi">{date}</div>
                        </div>
                        <div className="wid293 pad5">
                            <div className="label">Title:</div>
                            <div className="textoverflowapi">{title}</div>
                        </div>
                        <div className="wid293 pad5">
                            <div className="label">Amount:</div>
                            {<div className="textoverflowapi">{amount}</div>}
                        </div>
                        <div className="wid293 pad5">
                            <div className="label">General Ledger Account:</div>
                            {<div className="textoverflowapi">{ledger}</div>}
                        </div>
                        <div className="wid293 pad5">
                            <div className="label">User:</div>
                            {<div className="textoverflowapi">{user}</div>}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="App">
                <MaterialTable
                    icons={tableIcons}
                    onRowClick={(event, rowData) => {
                        // Do save operation
                        event.preventDefault();
                        showSidebar();
                        //console.log(formatted[index]);
                        setDate(rowData.transaction_date);
                        setTitle(rowData.title);
                        setAmount(rowData.amount);
                        setLedger(rowData.general_ledger_account);
                        setUser(rowData.user_id);
                    }}
                    title="Transaction Data"
                    data={data}
                    columns={columns}
                    options={{
                        paging: false,
                        pageSize: 6,       // make initial page size
                    }}
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                < NewTransaction onCancel={setIsOpen} onSave={onSave}/>
            </Modal>
            <Modal
                isOpen={userModalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <NewUser onCancel={userSetIsOpen}/>
            </Modal>
        </div>
    );
}

export default Transactions;