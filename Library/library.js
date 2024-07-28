class Book {
    constructor (title, author, available = true) {
        this.title = title;
        this.author = author;
        this.available = available;
    }
}

const library = {
    books: [],

    addBook: function(title, author) {
        const book = new Book(title, author);
        this.books.push(book);
        console.log (`You have added ${title} by ${author} to the library.`);
    },

    checkOutBook: function(title) {
        try {
            let found = false;
            for (let book of this.books) {
                if (book.title === title && books.available) {
                    found  = true;
                    book.available = false;
                    console.log (`Checked Out: ${book.title}`)
                    break;
                }
            }
            if (!found) { 
                throw new Error(`Sorry, ${title} is currently not available.`);
            }
            } catch (error) {
            console.error(error.message);
        }
    },

    getAvailableBooks: function() {
        let bookList = []
        for (let book of this.books) {
            if (book.available) {
                bookList.push(book.title);
            }
        }
        console.log(`Current available books include: ${bookList.join(', ')}`);
    }
}

const newBooks = [
    {
        title: "Double Exposure",
        author: "Robert Sullivan (Farrar, Straus & Giroux)",
        genre: "Nonfiction",
    },
    {
        title: "Loving Sylvia Plath",
        author: "Emily Van Duyne (Norton)",
        genre: "Nonfiction",
    },
    {
        title: "The Garden Against Time",
        author: "Olivia Laing (Norton)",
        genre: "Nonfiction",
    },
    {
        title: "The Winner",
        author: "Teddy Wayne (Harper)",
        genre: "Fiction",
    },
    {
        title: "Triumph of the Yuppies",
        author: "Tom McGrath (Grand Central)",
        genre: "Nonfiction",
    }
   ];

   function receiveBooks(library, jsonData) {
    const booksArray = JSON.parse(jsonData);
    for (let book of booksArray) {
        library.addBook(book.title, book.author);
    }
 }

const newBooksJSON = JSON.stringify(newBooks); // convert js object to JSON string
console.log(newBooksJSON);

receiveBooks(library, newBooksJSON); // adds books to the library
library.getAvailableBooks(); // Display the available books.


// Tests
console.log(`There are currently ${library.books.length} books in the library's database.`);
library.addBook("Eloquent JavaScript", "Marijn Haverbeke");
receiveBooks(newBooks);
library.checkOutBook("Eloquent JavaScript");
library.checkOutBook("Grokking the Coding Interview");
library.getAvailableBooks();