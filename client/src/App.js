import React from 'react';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import { Route } from 'react-router-dom';
import Login from './components/LogIn';
import 'bootstrap';


class App extends React.Component {
  state = {
    username: "",
    password: "",
    currentUser: this.props.user,
  };

  loginHandler = (userObj) => {
    this.setState({
      currentUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="AppBox">
          <Route exact path="/" render={() => <Home logInTheUser={this.loginHandler}></Home>}></Route>
          {/* <Home></Home> */}
          {/* <Route exact path="/signup" component={SignUp}></Route> */}
          <SignUp></SignUp>
        </div>
      </div>
    );
  }
}

export default App;
