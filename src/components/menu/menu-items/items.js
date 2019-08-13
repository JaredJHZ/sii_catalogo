import React from 'react';
import {NavLink} from 'react-router-dom';
import '../menu/menu.css';

let customName = (name) => {
    let firstLetter = name[0].toUpperCase();
    let restOfName = name.slice(1,name.length);
    return firstLetter.concat('',restOfName);
}

let item = (props) => {
    
    let items = props.items.map(
        (value) =><li  key={value} className="link"><NavLink to={value} className="pointer">{customName(value)}</NavLink></li> 
    )

    let close_session = props.logged ? <li key="logout" className="link"><a onClick={props.logout}>Cerrar Sesión</a></li> : null  ;

    items = props.logged ? items : null;

    return (
        <ul>
            {items}
            {close_session}
        </ul>
    )
}


export default item;