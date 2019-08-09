import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Consultar extends Component {

    maestros = this.props.maestros;
    maestrosRenderizados;
    aux;

    state = {
        buscador:'',
        activo: false
    }

    constructor(props) {
        super(props);
        console.log(props);
    }


    componentDidMount() {

 
    
    }

    onClickHandler(maestro) {

        this.props.history.push('/editar', {
            'id': maestro.id,
            'apellido_paterno':maestro.data.apellido_paterno,
            'apellido_materno':maestro.data.apellido_materno,
            'grado_escolaridad':maestro.data.grado_escolaridad,
            'nombre':maestro.data.nombre
        });
    }
    
    onMostrarHandler(maestro) {
        this.props.history.push('/mostrar', {
            'id': maestro.id,
            'apellido_paterno':maestro.data.apellido_paterno,
            'apellido_materno':maestro.data.apellido_materno,
            'grado_escolaridad':maestro.data.grado_escolaridad,
            'nombre':maestro.data.nombre,
            'materias':maestro.data.materias,
            'asesorias':maestro.data.asesorias,
            'archivos':maestro.data.archivos
        });
    }


    searchHandler(event) {

        let valor = event.target.value;
        
        this.setState({
            ...this.state,
            buscador : valor,
            activo: true
        }, () => {
            this.aux = this.maestros.filter(
                (value) => {
                    return value.data.nombre.toUpperCase().includes(this.state.buscador.toUpperCase()) || 
                            value.data.apellido_paterno.toUpperCase().includes(this.state.buscador.toUpperCase()) ||
                             value.data.apellido_materno.toUpperCase().includes(this.state.buscador.toUpperCase());
                }
            )
    
            if(valor === '') {
                this.setState({
                    ...this.state,
                    buscador : valor,
                    activo: false
                });
            }
        });

       



    }


    render() {

        if(!this.state.activo) {
            this.maestros = this.props.maestros;
            this.aux = this.maestros;
        }

       

        if (this.maestros !== null) {
            this.maestrosRenderizados = this.aux.map(
                (valor,index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{valor.data.apellido_paterno}</td>
                            <td>{valor.data.apellido_materno}</td>
                            <td>{valor.data.nombre}</td>
                            <td>
                                <div className="buttons">
                                    <Button onClick={() => this.onClickHandler(valor)}  >Editar</Button>
                                    <Button onClick={() => this.onMostrarHandler(valor) } variant="success">Mostrar</Button>
                                </div>
                            </td>
                        </tr>
                    );
                }
            ) 
        }

        let inputCss = ['search'];

        if (this.state.buscador !== '') {
            inputCss.push('isNotEmpty');
        }

        

        return (
            <div>
                <header>
                    <h3>Consultar informacion del maestro</h3>
                </header>
                <div className={inputCss.join(' ')}>
                    <input value={this.state.buscador} onChange={
                        (event) => this.searchHandler(event)
                    } type="text" placeholder="Búsqueda de maestro" required />
                </div>
                <div className="lista-maestros">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.maestrosRenderizados}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}


export default withRouter(Consultar);