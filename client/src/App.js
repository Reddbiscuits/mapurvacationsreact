import React from 'react';
import './App.css';
import Home from './components/Home';
// import SignUp from './components/SignUp';
// import { Route } from 'react-router-dom';
// import Login from './components/LogIn';

class App extends React.Component {
  state = {
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
          {/* <Route exact path="/" component={Home}></Route> */}
          <Home></Home>
          {/* <Route exact path="/signup" component={SignUp}></Route> */}
          {/* <SignUp></SignUp> */}
          {/* <Route
            exact
            path="/login"
            render={() => <Login logInTheUser={this.loginHandler}></Login>}
          ></Route> */}
        </div>
      </div>
    );
  }
}

export default App;
