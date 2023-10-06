const db = [
    {
        id: 1,
        isbn: "978-1-56619-909-4",
        title: "O canto do vento",
        author: "Atahualpa Yupanqui",
        publisher: "Coragem",
        price: "50.00",
        image: "",
        stock: 0
    }
]

function findById(id) {
    return db.findIndex(livro => {
        return livro.id === Number(id);
    })
}

export default books;