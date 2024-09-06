const BookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')
const db_context = require('../db_context')

async function getAllBooks() {
    let books = []

    let data = await db_context.selectAllBooks()

    data.forEach((book) => {
        books.push(
            new BookModel(
                book.book_id,
                book.author_id,
                book.genre,
                book.title,
                book.release_year
            )
        )
    })

    return books
}

async function getBooksByKeyword(keyword) {
    let books = []

    let data = await db_context.selectBooksByKeyword(keyword)

    data.forEach((book) => {
        books.push(
            new BookModel(
                book.book_id,
                book.author_id,
                book.genre,
                book.title,
                book.release_year,
                book.available_now,
                book.on_loan
            )
        )
    })

    return books
}

async function addBook(author_id, genre, title, release_year) {
    db_context.insertBook(author_id, genre, title, release_year)
}

async function editBook(book_id, author_id, genre, title, release_year) {
    db_context.updateBook(book_id, author_id, genre, title, release_year)
}

async function deleteBook(book_id) {
    db_context.deleteBook(book_id)
}
async function getAllAuthors() {
    let books = []

    let data = await db_context.selectAllBooks()

    data.forEach((book) => {
        books.push(
            new authorModel(
                author.author_id,
                author.first_name,
                author.last_name
            )
        )
    })

    return books
}
module.exports = {
    getAllBooks,
    getBooksByKeyword,
    addBook,
    editBook,
    deleteBook
}
