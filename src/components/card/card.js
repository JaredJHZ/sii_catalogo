import React from 'react';
import {NavLink} from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';


let card = (props) => {

    return(
        <Card className="custom-card">
            <div>
            <Card.Img className="img" 
             variant="top" src={props.img} />
            </div>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                {props.buttons}
                <div className="buttons">
                    <Button variant="primary"><NavLink to="agregar" className="cl">Agregar maestro</NavLink></Button>
                    <Button variant="success"><NavLink to="consultar" className="cl">Consultar maestro</NavLink></Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default card;