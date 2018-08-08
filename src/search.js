import React, {Component} from 'react'
import * as booksAPI from './booksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class Search extends Component {

    state = {
      search: '',
      foundBooks: []
    }

  static propTypes = {
     foundBooks: PropTypes.array.isRequired
 };


updateQuery = (query) => {
   this.setState({ search: query.trim()})
   if (query.length > 1) {
     booksAPI.search(this.state.search).then((books) => {
       console.log(books);
     books.length >= 1 ? this.setState({foundBooks: books}) : console.log('undef')
     // this.setState({foundBooks: []})

  })


 }

}


    render(){
      let showingBooks;
      if (this.state.search) {

        const match = new RegExp(escapeRegExp(this.state.search), 'i');
        if (typeof this.state.foundBooks !== 'undefined' && this.state.foundBooks.length >= 1) {

    showingBooks = this.state.foundBooks.filter((book) => match.test(book.title));
    console.log(this.state.foundBooks)
    console.log(showingBooks);
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
         </form>
         <div className="searched-books">
          <ul>

          {showingBooks.map((book) =>
            <li key={book.id} className="book">
            <h3 className="book-title">{book.title} </h3>

<img src={ (book.imageLinks) ? book.imageLinks.smallThumbnail : './noImage.png'} alt={book.title} />



            </li>
          )}
         </ul>
        </div>
      </div>
      )

    }


}

export default Search
