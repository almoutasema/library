const {
    getBooksByKeyword,
    addBook,
    editBook,
    deleteBook
} 
= require('../repositories/bookRepository')

async function search(req, res) {
    let data = await getBooksByKeyword(req.query.keyword)

    console.log(data)

    return res.json(data)
}

async function add(req, res) {
    console.log(req.body)

    try {
        await addBook(
            req.body.authorId,
            req.body.genre,
            req.body.title,
            req.body.releaseYear
        )
        res.status(200).json({ message: 'Book added successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error adding book' })
    }
}

async function edit(req, res) {
    console.log(req.body)

    await editBook(
        req.body.bookId,
        req.body.authorId,
        req.body.genre,
        req.body.title,
        req.body.releaseYear
    )
}

async function remove(req, res) {
    console.log(req.body)
    await deleteBook(req.body.bookId)
}

module.exports = {
    search,
    add,
    edit,
    remove
}
