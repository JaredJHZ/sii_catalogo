import React from 'react';
import Items from '../menu-items/items';
let menu = (props) => {

    let attachedClasses = ["sidedraw", "close"];

    if (props.opened) {
        attachedClasses = ["sidedraw", "open"];
    }

    return (
        <div className={attachedClasses.join(' ')}>
            <Items logout={props.logout} items={props.items} />
        </div>
    )
};


export default menu;