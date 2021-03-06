import React, {Component} from 'react'
import * as booksAPI from './booksAPI'
import PropTypes from 'prop-types'
import App from './App.js'
// import Search from './search.js'


class ListBooks extends Component {


    render () {
      let listOfBooks = this.props.passedState.length >= 1 ? this.props.passedState : [];
      let currentlyReading = listOfBooks.filter((book)=> book.shelf === "currentlyReading");
      let wantToRead = listOfBooks.filter((book)=> book.shelf === "wantToRead");
      let read = listOfBooks.filter((book)=> book.shelf === "read");

      return (
    <div>
          <header className="list-books-title">
            <h1>Myreads</h1>
          </header>
        <div className="list-books-content">
          <div className="bookshelf currently-reading">
            <h2 className="bookshelf-title"> Currently Reading </h2>
            <ul>
            {currentlyReading.map((book) =>
              <li key={book.id} className="book">
              <h3 className="book-title">{book.title} </h3>
              <p className="book-authors">By: { book.authors.length === 1 ? book.authors : book.authors.map((author) => "\n" + author + "\n" )} </p>
              <img src={book.imageLinks.smallThumbnail} alt={book.title} className="book-cover"/>
              <span className="book-shelf-changer">

                <select data-key={book.id} data-shelf={book.shelf} value={book.shelf ? book.shelf : 'none'} onChange={this.props.buttonPress}>
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
          <div className="bookshelf want-to-read">
            <h2 className="bookshelf-title"> Want to read </h2>
            <ul>
            {wantToRead.map((book) =>
              <li key={book.id} className="book">
              <h3 className="book-title">{book.title} </h3>
              <p className="book-authors">By: { book.authors.length === 1 ? book.authors : book.authors.map((author) => "\n" + author + "\n" )} </p>
              <img src={book.imageLinks.smallThumbnail} alt={book.title} className="book-cover"/>
              <span className="book-shelf-changer">
                <select data-key={book.id} value={book.shelf ? book.shelf : 'none'} onChange={this.props.buttonPress}>
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
          <div className="bookshelf read">
            <h2 className="bookshelf-title"> Read </h2>
            <ul>
            {read.map((book) =>
              <li key={book.id} className="book">
              <h3 className="book-title">{book.title} </h3>
              <p className="book-authors">By: { book.authors.length === 1 ? book.authors : book.authors.map((author) => "\n" + author + "\n" )} </p>
              <img src={book.imageLinks.smallThumbnail} alt={book.title} className="book-cover"/>
              <span className="book-shelf-changer">
                <select data-key={book.id} value={book.shelf ? book.shelf : 'none'} onChange={this.props.buttonPress}>
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
      </div>

      )
    }
}

export default ListBooks
