import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Container, Form, Button} from 'react-bootstrap';

class Agregar extends Component {


    state = {
        'nombre':'',
        'apellido_paterno':'',
        'apellido_materno':'',
        'grado_escolaridad':'Ingeniería en sistemas computacionales'
    }

    campos = ['nombre', 'apellido_paterno','apellido_materno'];
    

    formato = (campo) => {
        let value = campo.replace('_',' ');
        let upperFirstCharacter = campo[0].toUpperCase();
        return upperFirstCharacter.concat(value.slice(1));
    }   


    changeInputHandler(event) {
        let newState = {
            ...this.state,
            [event.target.name]:event.target.value,
            agregado:false
        }

        this.setState(newState);

    }

    changeCarrera(event) {
        let newState = {
            ...this.state,
            'grado_escolaridad':event.target.value,
            agregado:false
        };
        this.setState(newState , () => console.log(this.state));
    }

    onAddHandler(event) {
        event.preventDefault();
        this.props.agregarMaestro(this.state);

    }

    cancelHandler(event) {
        event.preventDefault();
        this.props.props.history.push('/');
    }

    render() {

        let login = this.props.logged  ? null : <Redirect to="/" />

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
                {login}
                <header>
                    <h3>Agregar maestro</h3>
                </header>
                <Container>
                    <Form>
                        {containers}
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Grado escolaridad</Form.Label>
                            <Form.Control value={this.state.grado_escolaridad} onChange={event => this.changeCarrera(event) } as="select">
                                <option>Ingeniería en sistemas computacionales</option>
                                <option>Ingeniería industrial</option>
                                <option>Ingeniería química</option>
                                <option>Ingeniería electromecánica</option>
                                <option>Ingeniería electrónica</option>
                                <option>Ingeniería ambiental</option>
                                <option>Licenciatura en administración</option>
                                <option>Ingeniería en gestión empresarial</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="buttons">
                            <Button variant="primary" type="buttom" onClick={(event) => this.onAddHandler(event)} >Guardar</Button>
                            <Button onClick={(event) => this.cancelHandler(event)} variant="danger" type="buttom">Cancelar</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        )

        return (
            <div>
                {contain}
            </div>
        )
    }


}


export default Agregar;