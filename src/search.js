import React, {Component} from 'react'
import * as booksAPI from './booksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Search extends Component {

    state = {
      search: '',
      foundBooks: []
    }

  static propTypes = {
     foundBooks: PropTypes.array.isRequired
 };


updateQuery = (query) => {
   this.setState({ search: query})
   if (query.length > 1) {
     booksAPI.search(this.state.search).then((books) => {
     books.length >= 1 ? this.setState({foundBooks: books}) : console.log('undef')

  })


 }

}


    render(){
      let showingBooks;
      if (this.state.search) {

        const match = new RegExp(escapeRegExp(this.state.search), 'i');
        if (typeof this.state.foundBooks !== 'undefined' && this.state.foundBooks.length >= 1) {

    showingBooks = this.state.foundBooks.filter((book) => match.test(book.title));
} else {
  showingBooks = [];
}
      } else {
        showingBooks = [];
      }

      return(
        <div className="search-wrapper">
         <form className="search-books-bar">
          <input type="text" placeholder="Search for books" value={this.state.search} onChange={(query) => this.updateQuery(query.target.value)}/>
          <Link to="/" className="close-search" />
         </form>
         <div className="searched-books">
          <ul className="books-grid">

          {showingBooks.map((book) =>
            <li key={book.id} className="book">
            <h3 className="book-title">{book.title} </h3>
            <p className="book-authors">By: { book.authors ? book.authors.map((author) => "\n" + author) : "unknown" } </p>

<img src={ (book.imageLinks) ? book.imageLinks.smallThumbnail : './noImage.png'} alt={book.title} className="book book-cover"/>
<span className="book-shelf-changer">
<select value={book.shelf ? book.shelf : 'none'}>
    <option value="read">Read</option>
    <option value="wantToRead">Want to Read</option>
    <option value="currentlyReading">Currently Reading</option>
    <option value="none">none</option>
</select>
</span>


            </li>
          )}
         </ul>
        </div>
      </div>
      )

    }


}

export default Search
