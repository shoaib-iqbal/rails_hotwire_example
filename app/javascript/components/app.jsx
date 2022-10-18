import React from "react";
import ApitoJson from "./ApitoJson";
const App  = () => {
return(<div className={'container'}>
    <div className={'nav'}>
        <h1 className={'logo'}>Logo</h1>
        <ul id={'mainMenu'}><li><a href={''}> Add new User Record </a></li><li><a href={''}> Add new Transaction </a></li></ul>
    </div>
    <ApitoJson/>
</div>)
}
export default App;