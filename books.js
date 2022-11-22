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

function deleteBook(index) {
    let bookList = localStorage.getItem("booklist");

    booksObj = JSON.parse(bookList);

    booksObj.splice(index, 1);
    localStorage.setItem("booklist", JSON.stringify(booksObj));

    let display = new Display;
    display.showAllBooks();

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

// grabing searchBox box text
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", showSearchResults)
function showSearchResults(e) {
    let searchBox = document.getElementById("searchTxt");
    
    let searchTxt = searchBox.value;
    
    let bookList = document.getElementsByClassName("bookrow");
    
    Array.from(bookList).forEach(function (element) {
        let bookname = element.getElementsByTagName("td")[1].innerText;
        
        if (!bookname.toLowerCase().includes(searchTxt.toLowerCase())) {
            element.style.display = "none";
        }
    })
    e.preventDefault();
}

let searchBox = document.getElementById("searchTxt");
searchBox.addEventListener("input", function(){
    if (searchBox.value == "") {
        display = new Display;
        display.showAllBooks();
    }
})
