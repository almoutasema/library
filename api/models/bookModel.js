module.exports = class Book {
    constructor(
        book_id,
        author_id,
        genre,
        title,
        release_year,
        available_now,
        on_loan
    ) {
        this.book_id = book_id
        this.author_id = author_id
        this.genre = genre
        this.title = title
        this.release_year = release_year
        this.available_now = available_now
        this.on_loan = on_loan
    }
}
