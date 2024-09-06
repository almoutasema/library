require('dotenv').config();
const pgp = require('pg-promise')();
const db = pgp({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function selectBooksByKeyword(keyword) {
    let data = await db.any(`SELECT * FROM book WHERE title LIKE '${keyword}%'`);
    return data;
}

async function selectAuthorByKeyword(keyword) {
    let data = await db.any(`SELECT * FROM author WHERE last_name LIKE '${keyword}%'`);
    return data;
}

async function insertBook(author_id, genre, title, release_year) {
    await db.none(
        `INSERT INTO book (author_id, genre, title, release_year)
        VALUES (${author_id}, '${genre}', '${title}', ${release_year})`
    );
}

async function updateBook(book_id, author_id, genre, title, release_year) {
    console.log('db context', book_id);
    await db.none(
        `UPDATE book SET author_id = ${author_id}, genre = '${genre}', title = '${title}', release_year = ${release_year} WHERE book_id = ${book_id}`
    );
}

async function deleteBook(book_id) {
    await db.none(`DELETE FROM book WHERE book_id = ${book_id}`);
}

module.exports = {
    selectBooksByKeyword,
    selectAuthorByKeyword,
    insertBook,
    updateBook,
    deleteBook
};
