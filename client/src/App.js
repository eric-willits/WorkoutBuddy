import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import Login from './Components/Login/Login';

class App extends Component {
  render(){
    return (
      <div className="App">        
        {this.props.isAuthenticated ? <Dashboard /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
