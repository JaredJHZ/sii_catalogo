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
import Toolbar from './components/toolbar/toolbar';
import Loading from './components/loading/loading';
// otras cosas

import { Route, BrowserRouter as Router , Redirect} from 'react-router-dom'
import Logo from './assets/logo.svg';
import Menu from './components/menu/menu/menu';
import Backdrop from './components/backdrop/backdrop';



class App extends Component  {


  constructor(props) {
    // se llama al método constructo de la clase padre llamada Component
    super(props);
    // se inicializa el servició de comunicación con Firebase
    Firebase.initializeApp(Config);
    // Se crea un observable para verificar los cambios de estado de iniciar sesión, es decir
    // cuando un usuario cierra o inicia su sesión
    Firebase.auth().onAuthStateChanged((user) => {
      this.setState(user);
    });    

    // Estado inicial de la aplicación, aquí se establecen los submenús
    this.state = {
      open: false,
      menu : ['main', 'consultar', 'agregar'],
      maestros: null,
      login:false,
      user:{},
      error:'',
      files:[],
      loading:false
    }
    // Propiedades de la clase principal
    this.db = null;
    this.auth = null;
    // el estado índica cuántos archivos se han subido
    this.estado = 0;
    // se ocupa para verificar  si un maestro ha sido agregado
    this.agregado = false;

    // Estas dos úlitmas propiedades sirven para hacer un reroute de la aplicación
    
  }

  // método que se ejecuta cuando se va a renderizar la página correctamente

  componentDidMount() {
    this.db = firestore();
    this.getUser();
  } 

  // Método para iniciar sesión en la aplicación

  login(user,password) {

    // se utiliza el método auth de la clase Firebase
    Firebase.auth().signInWithEmailAndPassword(user, password)
        .then(
          (user) => {
            this.setState({
              ...this.state,
              login:true,
              user:Firebase.auth().currentUser,
              error:''
            })
            this.setUser(user);
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
  // Método que se utiliza para cerrar sesión en la aplicación
  logout() {
    Firebase.auth().signOut();
    this.setState({
      ...this.state,
      login:false
    })
    localStorage.clear();
  }

  // Método que se utiliza para saber si un usuario tiene la sesión iniciada
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

  // Método para agregar el usuario al localstorage del navegador
  // y así tener la sesión iniciada incluso cuando hay una
  // recarga de la página

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


  // Método para agregar un nuevo maestro

  addNewTeacher = (maestro) => {
    this.setState({
      ...this.state,
      loading:true
    })
    this.db.collection('maestros').add({
        'apellido_paterno':maestro.apellido_paterno,
        'apellido_materno':maestro.apellido_materno,
        'nombre': maestro.nombre,
        'grado_escolaridad': maestro.grado_escolaridad
      })
      .then(
        () => {
          this.setState({
            ...this.state,
            loading:false
          })
          // cuándo se agrega un nuevo maestro, se recargan todos los maestros
          this.getTeachersData();
          this.agregado = true;
        }
      );
  };

 // Método para la obtención de maestros
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

    // método que administra que archivos subir

    uploadFile(file,name) {
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

  // Método para editar maestro

  

  editTeacher = (maestro) => {

    let archivos = [];

    this.db.collection('maestros').doc(maestro.id).update({
      materias:maestro.materias,
      asesorias:maestro.asesorias
    })

    const storageRef = Firebase.storage().ref();

    this.state.files.map(
      (file) => {
        this.setState({
          ...this.state,
          loading:true
        }, () => {
                    let mainFile = storageRef.child(`${maestro.id}/${file.name}/${file.file.name}`);
                    mainFile.put(file.file).then((snapchot) => {
                      mainFile.getDownloadURL().then(
                        (url) => {
                                    archivos.push({nombre:file.name, url:url});
                                    this.db.collection('maestros').doc(maestro.id).update({archivos:archivos}).then ( 
                                      () => {
                                          this.estado += 1;
                                            if (this.estado > 2 ) {
                                              this.getTeachersData();
                                              this.setState({
                                                ...this.state,
                                                loading:false
                                              })
                                            }
                                          } 
                                    )
                                  }
                                )
                    });
                })
      }
    )
  }

  // Método para editar un maestro

  deleteTeacher(id) {
      this.setState(
        {
          ...this.state,
          loading:true
        },
          () => {
                  let db = firestore();
                  db.collection('maestros').doc(id).delete()
                  .then(
                    () => {
                            this.getTeachersData();
                            this.setState(
                              {
                                ...this.state,
                                loading:false
                              }
                            )
                        }
                  );
        }
      )

  }

  // Método para abrir el menú

  openMenuHandler = () => {
      this.setState({
        ...this.state,
        open: !this.state.open
      })
  }

  // Método que renderiza la página
  
    render() {



      let login = this.state.login  ? null : <Redirect to="/" />
      
      if(this.estado > 2) {
        login = <Redirect to="/" />;
      } 

      if(this.agregado) {
        login = <Redirect to="/" />;
      }



      let app = (
        <Router>
        {login}
          <Menu opened = {this.state.open} items = {this.state.menu} 
            logout={this.logout.bind(this)} logged = {this.state.login}
          />


          <Route  exact path="/main" 
            render = {(props) => <Main props={props} isLogged={this.state.login} />}
          />
          <Route exact path="/agregar" 
            render = {
              
            (props) => 
            
          <Agregar 
              props={props} 
              agregarMaestro={this.addNewTeacher}
              agregado = {this.agregado}
              logged = {this.state.login}
              />}

            />  

          <Route exact path='/consultar' 
            render = {
              (props) => <Consultar 
              maestros={this.state.maestros}
              props={props} 
              deleteTeacher={this.deleteTeacher.bind(this)}
              logged = {this.state.login}
              />
              
            }
          />

          <Route exact path="/editar" 
          render={(props)=> <Editar props={props} 
            editar={this.editTeacher}
            upload={this.uploadFile.bind(this)}
            logged = {this.state.login}
          />} />

          <Route exact path="/mostrar" 
          render={(props)=> <Mostrar props={props}  logged = {this.state.login} />} />
          


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
      );

      if (this.state.loading) {
        app = (
          <div className="loading">
            <Loading />
          </div>
        )
      }

      return (   
      <div className="App">

            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
            />

            <Backdrop show={this.state.open} clicked={this.openMenuHandler}></Backdrop>

            <Navbar title="SISTEMA INTEGRAL DE LA INFORMACION DEL DEPARTAMENTO DE CIENCIAS ECONOMICO-ADMINISTRATIVAS" 
             openMenu = {this.state.login ? this.openMenuHandler : ()=> {}}  logo={Logo}/>  

            <Toolbar />

            {app}

           

      </div>
  )
    }
}

export default App;
