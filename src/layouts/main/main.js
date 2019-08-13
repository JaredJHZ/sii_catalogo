import React, {Component} from 'react';
import Card from '../../components/card/card';
import Logo from '../../assets/logo.png';
import {Redirect} from 'react-router-dom';
import './main.css';


class Main extends Component {

    state = {
        title: "SISTEMA INTEGRAL DE LA INFORMACION DEL DEPARTAMENTO DE CIENCIAS ECONOMICO-ADMINISTRATIVAS",
        descripcion: "Esta página está diseñada para mostrar el perfil de los maestros del insituto tecnológico de Minatitlán"
    }
    render() {

        let main = this.props.isLogged ? (
            <div>
                <header className="header">
                    <h3>Catálogo de docentes en el área
                        económica administrativa</h3>
                </header>
                <div className="home">
                    <div className="half">
                        <Card title={this.state.title} 
                        text={this.state.descripcion}
                        img={Logo} />
                    </div>
                </div>
            </div>
        ) : <Redirect to="/" />

        return main; 
    }
}


export default Main;