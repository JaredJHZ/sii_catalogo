import React from 'react';
import {NavLink} from 'react-router-dom';

let customName = (name) => {
    let firstLetter = name[0].toUpperCase();
    let restOfName = name.slice(1,name.length);
    return firstLetter.concat('',restOfName);
}

let item = (props) => {
    
    let items = props.items.map(
        (value) =><li  key={value} className="link"><NavLink to={value} className="pointer">{customName(value)}</NavLink></li> 
    )

    return (
        <ul>
            {items}
            <li  onClick={props.logout} key="logout" className="link pointer">Cerrar Sesión</li>
        </ul>
    )
}


export default item;