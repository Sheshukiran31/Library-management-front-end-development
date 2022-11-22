// making a class bookobj
class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }
}

// to diplay books
class Display {

    // validating the inputs in the form
    validate(bookobj) {
        if (bookobj.name.length < 2 || bookobj.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    // adds the bookobj row in UI
    showAllBooks() {

        let bookList = JSON.parse(localStorage.getItem("booklist"));

        // clearing the table before showing list of all the books
        let tablebody = document.getElementById("tablebody");
        if (tablebody != null) {
            tablebody.innerHTML = "";
        }
        let bookrow = ``;
        if (bookList != null) {
            Array.from(bookList).forEach(function (element, index) {
                bookrow += `<tr class = "bookrow">
                                <td>${index + 1}</td>
                                <td>${element.name}</td>
                                <td>${element.author}</td>
                                <td>${element.genre}</td>
                                <td><button type="button" id="${index}" onclick="deleteBook(${index})" class="btn btn-secondary">Remove</button</td>
                            </tr>`;
            })
        }

        let tableBody = document.getElementById("tablebody");

        if (bookList != null && tableBody != null) {
            tableBody.innerHTML = bookrow;
        }
        else {
            tableBody = "";
        }
    }

    clear() {
        let addBookBtn = document.getElementById("libraryform");
        addBookBtn.reset();
    }

    showMessage(type, displayMessage) {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <p id="messagetext">${displayMessage}</p>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                             </div>`

        setTimeout(function () {
            message.innerHTML = "";
        }, 1500);
    }
}

let displayobj = new Display();
displayobj.showAllBooks();

function deleteBook(index){
    let bookList = localStorage.getItem("booklist");

    booksObj = JSON.parse(bookList);

    booksObj.splice(index, 1);
    localStorage.setItem("booklist", JSON.stringify(booksObj));

    let display = new Display;
    display.showAllBooks();

}

function display(bookobj) {

    let display = new Display();
    // validating the object (input fields)
    if (display.validate(bookobj)) {
        display.showAllBooks(bookobj);
        display.clear();
        display.showMessage("success", `Book ${bookobj.name} is succenfully added.`);
    }
    else {
        display.showMessage("danger", "Book and Author name must be correct.");
        display.clear();
    }

    display.showAllBooks();
}


// setting event listener for submit button
let addBookBtn = document.getElementById("submitbtn");
addBookBtn.addEventListener("click", libraryFormSubmit);
function libraryFormSubmit(e) {

    let name = document.getElementById("name");
    let author = document.getElementById("author");
    let genre = document.getElementById("genre");

    // creating a new book
    let bookobj = new Book(name.value, author.value, genre.value);

    let displayobj = new Display;

    if (displayobj.validate(bookobj)) {
        // ftching bookobj list from local storage
        let bookList = localStorage.getItem("booklist");

        // let bookObjList;
        if (bookList == null) {
            bookObjList = [];
        }
        else {
            bookObjList = JSON.parse(bookList);
        }
        bookObjList.push(bookobj);
        localStorage.setItem("booklist", JSON.stringify(bookObjList));

        display(bookobj);
    }
    else {
        displayobj.showMessage("danger", "Book and Author name must be correct.")
    }

    e.preventDefault();
}

let deleteAllBtn = document.getElementById("deleteall");
if (deleteAllBtn != null) {
    deleteAllBtn.addEventListener("click", deleteAll);
    function deleteAll() {
        localStorage.clear();
        let display = new Display();
        display.showAllBooks();
    }
}

