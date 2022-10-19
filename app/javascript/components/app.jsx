import React from "react";
import ApitoJson from "./ApitoJson";
import NewTransaction from "./new";
const App  = () => {
return(<div className={'container'}>
    <div className={'nav'}>
        <h1 className={'logo float-start'}>Logo</h1>
        <ul id={'mainMenu'} className={'float-end'}><li><a href={''}> Add new User Record </a></li><li><a href={''}> Add new Transaction </a></li></ul>
    </div>
   < NewTransaction/>
    {/*<ApitoJson/>*/}
</div>)
}
export default App;