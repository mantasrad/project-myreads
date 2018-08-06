import React, {Component} from 'react'
import * as booksAPI from './booksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class Search extends Component {

    state = {
      search: '',
      isloading: true,
      foundBooks: []
    }

  static propTypes = {
     foundBooks: PropTypes.array.isRequired
 };
    // updateQuery = function(query) {
    //   this.setState((prevState) => ({ search: query.trim()}))
    //   if (query) {
    //     booksAPI.search(query).then((res) =>
    //       (res > 0) ? this.setState({foundBooks: res}) : this.setState({foundBooks: []})
    //
    //   )
    // } else {
    //   this.setState({foundBooks: []})
    // }
    //
    // }

updateQuery = (query) => {
   this.setState((prevState) => ({ search: query.trim()}))
   if (query.length > 1) {
     booksAPI.search(this.state.search).then((books) =>
     books.length >= 1 ? this.setState({foundBooks: books}) : console.log('dabar undefined')
   )}

   // this.setState((prevState) => ({foundBooks: books}))
   // (books > 0) ? this.setState({foundBooks: books.books}) : this.setState({foundBooks: []})

}




    render(){
      let searching = this.state.search;
      let foundBooks = this.state.foundBooks;

      return(
        <div className="search-wrapper">
         <form className="search-books-bar">
          <input type="text" placeholder="Search for books" value={this.state.search} onChange={(query) => this.updateQuery(query.target.value)}/>
         </form>
         <div className="searched-books">
          <ul>

          {this.state.foundBooks.map((book) =>
            <li key={book.id} className="book">
            <h3 className="book-title">{book.title} </h3>
            {
// <img src={book.imageLinks.smallThumbnail} alt={book.title} />

            }

            </li>
          )}
         </ul>
        </div>
      </div>
      )

    }


}

export default Search
