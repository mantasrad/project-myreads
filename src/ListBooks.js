import React, {Component} from 'react'
import * as booksAPI from './booksAPI'
import PropTypes from 'prop-types'
// import Search from './search.js'


class ListBooks extends Component {

  state = {
    listOfBooks: []
  }

allBooks = () => booksAPI.getAll().then((books) =>
this.setState({
  listOfBooks: books,
})
)

componentDidMount() {
    this.allBooks()
  }

    render () {
      let listOfBooks = this.state.listOfBooks
      return (
        <div>
          <header className="list-books-title">
            <h1>Myreads</h1>
          </header>
          <div className="list-books-content">
          <ul className="books-grid">
          {listOfBooks.map((book) =>
            <li key={book.id} className="book">
            <h3 className="book-title">{book.title} </h3>
            <img src={book.imageLinks.smallThumbnail} alt={book.title} />

            </li>
          )}

          </ul>
          </div>
        </div>

      )
    }
}

export default ListBooks
