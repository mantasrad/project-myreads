import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks.js';
import Search from './search.js'
import PropTypes from 'prop-types'


class App extends Component {

    state = {
      view: 'list'
    }

  render() {
    return (

<div>
      <Route exact path='/' render={() =>
        <div className="App">
          <ListBooks />
          <div className="open-search">
          <Link to="/search" />
          </div>
        </div>
      } />
      <Route path='/search' component={Search} />
</div>
    );
  }
}

export default App;
