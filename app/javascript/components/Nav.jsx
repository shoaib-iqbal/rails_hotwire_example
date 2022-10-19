import React from "react";
const Nav =({onModelAction,onUserModalIsOpen})=>{
    return(
        <div className={'nav'}>
            <h1 className={'logo float-start'}>Logo</h1>
            <ul id={'mainMenu'} className={'float-end'}>
                <li><button onClick={()=>onModelAction(true)} className={'btn btn-primary'}>Add new Transaction</button></li>
                <li><button onClick={()=>onUserModalIsOpen(true)} className={'btn btn-primary'}>Add new User Record</button></li>
            </ul>
        </div>
    )
}
export default Nav