import React from 'react';
import {Row,Container,Col} from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import Logo3 from '../../assets/logo3.png'
import Logo2 from '../../assets/logo2.png'
import './toolbar.css';

let toolbar = (props) => {

    return (
        <div>
                <Row  className="toolbar">
                    <Col xs={4}>
                        <img className="logo1" alt="logo1" src={Logo3} />
                    </Col>
                    <Col xs={4}>
                        <img className="logo2" alt="logo3" src={Logo} />
                    </Col>
                    <Col xs={4}>
                        <img className="logo3" alt="logo" src={Logo2} />
                    </Col>
                </Row>
        </div>
    )
}


export default toolbar;