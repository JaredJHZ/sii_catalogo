import React, {Component} from 'react';
import Navbar from './components/navbar/navbar';
import './App.css';


// firebase

import Firebase,{firestore} from 'firebase';
import Config from './config';



// components
import Layout from './layouts/layout/layout';
import Main from './layouts/main/main';
import Agregar from './layouts/agregar/agregar';
import Consultar from './layouts/consulta/consulta';
import Editar from './layouts/editar/editar';
import Mostrar from './layouts/mostrar/mostrar';
// otras cosas

import { Route, BrowserRouter as Router , Redirect} from 'react-router-dom'
import Logo from './assets/logo.svg';
import Menu from './components/menu/menu/menu';
import Backdrop from './components/backdrop/backdrop';
import { arch } from 'os';


class App extends Component  {

  
  state = {
    open: false,
    menu : ['main', 'consultar', 'agregar'],
    maestros: null,
    login:false,
    user:{},
    error:'',
    files:[]
  }

  db = null;
  auth = null;

  getUser() {
    if(localStorage.getItem('user')) {
      this.getTeachersData();
      this.setState({
        ...this.state,
        login:true,
        user:JSON.parse(localStorage.getItem('user'))
      })
    }
  }

  setUser(user) {
    if (user) {
      localStorage.setItem('user',JSON.stringify(user));
      this.setState({
        ...this.state,
        login:true
      })
    } else {
      localStorage.clear();
      this.setState({
        ...this.state,
        login:false
      })
    }
    
  }

  login(user,password) {

    Firebase.auth().signInWithEmailAndPassword(user, password)
        .then(
          (user) => {
            this.setState({
              ...this.state,
              login:true,
              user:Firebase.auth().currentUser,
              error:''
            })

            this.getTeachersData();
          }
        ).catch(error => {
          this.setState({
            ...this.state,
            login:false,
            user:{},
            error:'Error al iniciar sesión'
          })
        })

    
    
  }
  

  constructor(props) {
    super(props);
    Firebase.initializeApp(Config);
    Firebase.auth().onAuthStateChanged((user) => {
      this.setState(user);
    });
    


    
  }

  getTeachersData = () => {

    let maestros = [];

    this.db.collection('maestros').get()
        .then(
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              maestros.push({
                'id':doc.id,
                'data': doc.data()
              })
            })
            
            this.setState({
              ...this.state,
              maestros: maestros
            });

          }
        )
  }

  addNewTeacher = (maestro) => {
    this.db.collection('maestros').add({
      'apellido_paterno':maestro.apellido_paterno,
      'apellido_materno':maestro.apellido_materno,
      'nombre': maestro.nombre,
      'grado_escolaridad': maestro.grado_escolaridad
    });

    this.getTeachersData();
  };

  editTeacher = (maestro) => {

    let archivos = [];

    this.db.collection('maestros').doc(maestro.id).update({
      materias:maestro.materias,
      asesorias:maestro.asesorias
    })

    const storageRef = Firebase.storage().ref();
   
    this.state.files.forEach(file => {

      let mainFile = storageRef.child(`${maestro.id}/${file.name}/${file.file.name}`);
      mainFile.put(file.file).then((snapchot) => {
        console.log(snapchot);
        mainFile.getDownloadURL().then((url) => {
          archivos.push({nombre:file.name, url:url});
          this.db.collection('maestros').doc(maestro.id).update({
            archivos:archivos
          })
          this.getTeachersData();
        })
      });
    })



     
    

  }

  uploadFile(file,name) {

    console.log(name);
    console.log(file);

    let files = this.state.files;

    files.push({
      "file":file.files[0],
      "name":name
    });

    this.setState({
      ...this.state,
      files:files
    })
   

  }

  openMenuHandler = () => {
      this.setState({
        ...this.state,
        open: !this.state.open
      })
  }

  componentDidMount() {
    this.db = firestore();
    this.getUser();
 
  } 

  logout() {

    Firebase.auth().signOut();
    this.setState({
      ...this.state,
      login:false
    })
  }



  
    render() {



      let login = this.state.login ? null : <Redirect to="/" />

      return (   
      <div className="App">

            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
            />

            <Backdrop show={this.state.open} clicked={this.openMenuHandler}></Backdrop>

            <Navbar title="  Catalogo de maestros  " 
             openMenu = {this.openMenuHandler}  logo={Logo}/>  



            <Router>
              {login}
              <Menu opened = {this.state.open} items = {this.state.menu} 
              
              logout={this.logout.bind(this)} />


                <Route  exact path="/main" 
                  render = {(props) => <Main props={props} isLogged={this.state.login} />}
                />
                <Route exact path="/agregar" 
                  render = {(props) => <Agregar props={props} 
                  agregarMaestro={this.addNewTeacher} />}
                />  

                <Route exact path='/consultar' 
                  render = {
                    (props) => <Consultar 
                    maestros={this.state.maestros}
                    props={props} />
                  }
                />

                <Route exact path="/editar" 
                render={(props)=> <Editar props={props} 
                  editar={this.editTeacher}
                  upload={this.uploadFile.bind(this)}
                />} />

                <Route exact path="/mostrar" 
                render={(props)=> <Mostrar props={props} />} />
                


                <Route  exact path="/" 
                render = {
                  (props) => <Layout 
                  props={props} 

                  error={this.state.error}
                  
                  login={this.login.bind(this)} 
                  
                  
                  isLogged={this.state.login}
                  
                  
                  />
                } />  

            </Router>

      </div>
  )
    }
}

export default App;
