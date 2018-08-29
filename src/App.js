import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks.js';
import Search from './search.js'
import PropTypes from 'prop-types'
import * as booksAPI from './booksAPI'


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        listOfBooks: []
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleSearchClick = this.handleSearchClick.bind(this);
      this.allBooks = this.allBooks.bind(this);
    }

    allBooks = () => booksAPI.getAll().then((books) =>
    this.setState({
      listOfBooks: books,
    })
    )

handleSearchClick = (e) => {
  let tempArr = [];
  let dataKey = e.target.getAttribute('data-key');
  let dataValue = e.target.value;
booksAPI.get(e.target.getAttribute('data-key')).then((data) => {
  let requiredBook = data;
  tempArr.push(requiredBook);
  let tempArrNew = this.state.listOfBooks.concat(tempArr);
  booksAPI.update(dataKey, dataValue).then(() => {
    this.setState(() => {
    listOfBooks: tempArrNew;
  })
  })
}
)
// let naujasArr = [];
// naujasArr.push(e.target.getAttribute('data-book'));




}


    handleClick = (e) => {

    if (e.target){

      let newListOfBooks = this.state.listOfBooks.map((book) => {
        if (e.target.getAttribute('data-key') === book.id){
        book.shelf = e.target.value;
        }
        return book
      })
      booksAPI.update(e.target.getAttribute('data-key'), e.target.value).then(() => {
        this.setState((prevState) => {
        listOfBooks: newListOfBooks
      })
    }).then(() => this.allBooks).then(() => this.forceUpdate())

    }
      };

componentDidMount() {
  this.allBooks()
}

  render() {
    return (

<div>
      <Route exact path='/' render={() =>
        <div className="App">
          <ListBooks passedState={this.state.listOfBooks} buttonPress={this.handleClick}/>
          <div className="open-search">
          <Link to="/search" />
          </div>
        </div>
      } />
      <Route path='/search' render={() =>
<Search passedState={this.state.listOfBooks} buttonSearch={this.handleSearchClick}/>
      }/>
</div>
    );
  }
}

export default App;
