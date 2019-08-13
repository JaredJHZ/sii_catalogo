import React from 'react';
import {Container, Button, Card , Form, Alert} from 'react-bootstrap';
import './login.css';

let login = (props) => {

    

    let error = props.error ? <Alert key="error" variant="danger">{props.error}</Alert> : null;

    return (
        <Container className="login">
           <Card className="login-form">
               <Card.Title>
                   <h3>Login del catálogo</h3>
               </Card.Title>
               <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control name="email" 
                                onChange={(e) => props.changeInputHandler(e)} 
                                value={props.user.email} type="email"  
                                placeholder="Ingrese email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control name="password" 
                                onChange={(e) => props.changeInputHandler(e)} 
                                value={props.user.password} type={props.passwordType}  
                                placeholder="Ingresar contraseña" />
                            </Form.Group>

                            <Form.Group controlId="formBasicChecbox">
                                <Form.Check onChange={props.changePasswordType} 
                                type="checkbox" label="Mostrar contraseña" />
                            </Form.Group>
                            <Button variant="primary" type="button" 
                            onClick={props.login}>
                                Ingresar
                            </Button>
                        </Form>
               </Card.Body>
            {error}
           </Card>

        

        </Container>
    )
}


export default login;