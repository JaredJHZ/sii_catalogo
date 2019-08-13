import React,{Component} from 'react';
import { Form , Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './editar.css';

class Editar extends Component {

    state = {
        maestro:'',
        materias:[],
        asesorias:[],
        materia:'',
        asesoria:'',
        redirect: false
    }

    constructor(props) {
        super(props);
        this.setRef = ref => {
            this.file = ref;
        }

        this.ref2 = ref => {
            this.file2 = ref;
        }

        
        this.ref3 = ref => {
            this.file3 = ref;
        }

    }

    componentDidMount() {
        this.setState({
            ...this.state,
            maestro:this.props.props.history.location.state
        });
    }

    changeMateria(event) {

        let valor = event.target.value;

        this.setState({
            ...this.state,
            'materia': valor
        })
    }

    addMateriaHandler(event) {

        event.preventDefault()

        let materias = this.state.materias;

        materias.push(this.state.materia);

        this.setState({
            ...this.state,
            'materias':materias,
            'materia':''
        })
    }

    changeAsesoria(event) {

        let valor = event.target.value;

        this.setState({
            ...this.state,
            'asesoria': valor
        })
    }

    addAsesoria(event) {

        event.preventDefault()

        let asesorias = this.state.asesorias;

        asesorias.push(this.state.asesoria);

        this.setState({
            ...this.state,
            'asesorias':asesorias,
            'asesoria':''
        })
    }

    editar(event) {
        event.preventDefault();
        this.props.editar({
            id:this.state.maestro.id,
            materias:this.state.materias,
            asesorias:this.state.asesorias
        })
        this.setState({
            ...this.state,
            redirect:true
        })
    }

    render() {

        let materias = null;

        if (this.state.materias.length > 0) {
            materias = this.state.materias.map(
                (value) => <li key={value}>{value}</li>
            );
        }

        let asesorias = null;
        if (this.state.asesorias.length > 0) {
            asesorias = this.state.asesorias.map(
                (value) => <li key={value}>{value}</li>
            );
        }

        let page =  (
            <div>
                <header><h3>{this.state.maestro.grado_escolaridad+'. '+this.state.maestro.nombre + ' ' + 
                this.state.maestro.apellido_paterno + ' ' + 
                this.state.maestro.apellido_materno}</h3></header>
                <div className="maestro-info">
                    <Form className="half">
                        <Form.Group className="form-maestro">
                            <Form.Label>Materias</Form.Label>
                            <Form.Control value={this.state.materia}
                            onChange={(event) => this.changeMateria(event)}
                            type="text" placeholder="Materia" />
                            <Button onClick={(event) => this.addMateriaHandler(event)} 
                            variant="primary" type="button">
                                Agregar
                            </Button>
                            <ul className="materias">
                                {materias}
                            </ul>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Asesorias</Form.Label>
                            <Form.Control value={this.state.asesoria}
                            onChange={(event) => this.changeAsesoria(event)}
                            type="text" placeholder="Asesoria" />
                            <Button onClick={(event) => this.addAsesoria(event)} 
                            variant="primary" type="button">
                                Agregar
                            </Button>
                            <ul className="materias">
                                {asesorias}
                            </ul>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Horario
                            </Form.Label>
                            <Form.Control name="horario" onChange={
                                (event) => this.props.upload(this.file, event.target.name)
                            } type="file" ref={this.setRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Informe de asesoria
                            </Form.Label>
                            <Form.Control name="informe_asesoria" onChange={
                                (event) => this.props.upload(this.file2, event.target.name)
                            } type="file" ref={this.ref2} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Gráfica de evaluación departamental
                            </Form.Label>
                            <Form.Control name="grafica" onChange={
                                (event) => this.props.upload(this.file3, event.target.name)
                            } type="file" ref={this.ref3} />
                        </Form.Group>
                        
                        <Button onClick={(event) => this.editar(event)} variant="success" >
                            Guardar
                        </Button>
                    </Form>
                </div>
            </div>
        );

        if(this.state.redirect) {
            page = <Redirect to="/" />
        }
   
        return page;
    }

}


export default Editar;