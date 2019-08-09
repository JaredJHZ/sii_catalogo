import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';

class Agregar extends Component {

    state = {
        'nombre':'',
        'apellido_paterno':'',
        'apellido_materno':'',
        'grado_escolaridad':'',
        'agregado':false
    }
    

    formato = (campo) => {
        let value = campo.replace('_',' ');
        let upperFirstCharacter = campo[0].toUpperCase();
        return upperFirstCharacter.concat(value.slice(1));
    }   

    campos = ['nombre', 'apellido_paterno','apellido_materno','grado_escolaridad'];

    changeInputHandler(event) {
        let newState = {
            ...this.state,
            [event.target.name]:event.target.value,
            agregado:false
        }

        this.setState(newState);

    }

    onAddHandler(event) {
        event.preventDefault();
        this.props.agregarMaestro(this.state);
        this.setState(
            {
                ...this.state,
                agregado:true
            }
        )
    }

    cancelHandler(event) {
        event.preventDefault();
        this.setState({
            ...this.state,
            "agregado":!this.state.agregado
        })
    }

    render() {


        let containers = this.campos.map(
            (value) => {
                return (
                    <Form.Group key={value}>

                        <Form.Label>{this.formato(value)}</Form.Label>
                        <Form.Control  name={value} onChange={(event) => this.changeInputHandler(event) } value={this.state[value]} type="text" placeholder={this.formato(value)} />
                        
                    </Form.Group>
                )
            }
        )

        let contain = (
            <div>
                <header>
                    <h3>Agregar maestro</h3>
                </header>
                <Container>
                    <Form>
                        {containers}
                        <div className="buttons">
                            <Button variant="primary" type="buttom" onClick={(event) => this.onAddHandler(event)} >Guardar</Button>
                            <Button onClick={(event) => this.cancelHandler(event)} variant="danger" type="buttom">Cancelar</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        )

        if(this.state.agregado) {
            contain = <Redirect to="/main" />
        }



        return (
            <div>
                {contain}
            </div>
        )
    }


}


export default Agregar;