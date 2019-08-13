import React from 'react';
import './loading.css';

let loading = (props) => {
    return (
        <div>
             <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
             <h5>Cargando...</h5>
        </div>
    )
}

export default loading;