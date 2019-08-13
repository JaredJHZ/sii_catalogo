import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import Horario from '../../assets/horario.png';
import Informe from '../../assets/asesoria.jpg';
import Grafica from '../../assets/grafica.png';

class Mostrar extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            maestro:this.props.props.history.location.state
        }, () => console.log(this.state));
    }

    render() {

        
        let page = null;

        if (this.state) {
            
            let materias = [];

            let asesorias = [];

            let archivos = [];

            if(this.state.maestro.materias) {
                    for(let materia of this.state.maestro.materias) {
                        materias.push(<li key={materia}>{materia}</li>)
                    }
            } 

            if (this.state.maestro.asesorias) {
                for(let asesoria of this.state.maestro.asesorias) {
                    asesorias.push(<li key={asesoria}>{asesoria}</li>)
                }
            }

            if (this.state.maestro.archivos) {
                for(let archivo of this.state.maestro.archivos) {
                    
                    let img = null;
                    if(archivo.nombre === 'horario') {
                        img = Horario;
                    } else {
                        if (archivo.nombre === 'informe_asesoria') {
                            img = Informe;
                        } else {
                            img = Grafica;
                        }
                    }
                    archivos.push(
                        <a href={archivo.url} download>
                            <img width="30px" src={img} alt={archivo.nombre0} />
                            <p>Descargar {archivo.nombre}</p>
                        </a>
                    )
                }
            }

            page = (
                <div className="custom-profile">
                    <header><h3>{`${this.state.maestro.apellido_paterno + ' ' +this.state.maestro.apellido_materno + ' '+this.state.maestro.nombre }`}</h3></header>
                    <div className="custom-card-profile">
                        <Card>
                            <Card.Title><h5>Información del maestro</h5></Card.Title>
                            <Card.Body>
                                <p>Grado de escolaridad: {this.state.maestro.grado_escolaridad}</p>
                                <ul className="profile">
                                    <h5>Materias</h5>
                                    {materias ? materias : "Sin asignar"}
                                </ul>
                                <ul className="profile">
                                    <h5>Asesorias</h5>
                                    {asesorias ? asesorias : "Sin asignar"}
                                </ul>
                                
                            </Card.Body>
                        </Card>

                    </div>

                    <div className="archivos">
                                  
                            <Card>
                                    <Card.Title><h5>Archivos</h5></Card.Title>
                                    <Card.Body>
                                        {archivos}
                                    </Card.Body>
                            </Card>
                    </div> 
                </div>
            );
        }

        return page;
    }

}

export default Mostrar;