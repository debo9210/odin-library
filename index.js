// get dom elements
const displayContainer = document.querySelector('.book-display-container');
const hideForm = document.querySelector('.hide-form');
const showForm = document.querySelector('.add-book');
const formContainer = document.querySelector('.form-container');
const add = document.querySelector('.add');
const form = document.querySelector('.form-details');
const body = document.querySelector('.main-container');

// library array
let myLibrary = [];

//class constructor / declaration
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// function constructor
// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');

// let gameOfThrones = new Book(
//   'Game of thrones',
//   'George RR. Martin',
//   1154,
//   'not read yet'
// );

// add book to library and display it
function addBookToLibrary(Title, Author, Pages, Read) {
  let book = new Book(Title, Author, Pages, Read);
  myLibrary.push(book);

  let div = document.createElement('div');
  div.className = 'book-display';

  div.setAttribute('data-num', myLibrary.length - 1);
  let title = document.createElement('h4');
  title.className = 'title';
  title.textContent = book.title;

  let author = document.createElement('p');
  author.className = 'author';
  author.textContent = book.author;

  let pages = document.createElement('p');
  pages.className = 'pages';
  pages.textContent =
    Number(book.pages) > 1 ? `${book.pages}pages` : `${book.pages}page`;

  let read = document.createElement('button');
  read.className = 'read';
  read.textContent = book.read ? 'Read' : 'Not Read';
  read.style.backgroundColor = book.read ? 'green' : 'red';

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'remove';

  let elements = [title, author, pages, read, remove];

  for (let i = 0; i < elements.length; i++) {
    div.appendChild(elements[i]);
  }
  displayContainer.appendChild(div);
}

hideForm.addEventListener('click', () => {
  formContainer.classList.remove('show');
  body.classList.remove('dim-background');
});

showForm.addEventListener('click', () => {
  formContainer.classList.add('show');
  body.classList.add('dim-background');
});

// create book
function createBook(e) {
  e.preventDefault();
  let title = document.querySelector('input[name="title"]').value;
  let author = document.querySelector('input[name="author"]').value;
  let pages = document.querySelector('input[name="pages"]').value;
  let read = document.querySelector('input[name="read"]');

  if (title === '' && author === '' && pages === '') {
    alert('You need to add details of the book to proceed');
    return;
  }

  addBookToLibrary(title, author, pages, read.checked);
  form.reset();
  formContainer.classList.remove('show');
  body.classList.remove('dim-background');
}
add.addEventListener('click', createBook);

// remove book from library and display
function removeBook(e) {
  if (e.target.className === 'remove') {
    displayContainer.removeChild(e.target.parentElement);
    myLibrary.splice(e.target.parentElement.dataset.num, 1);

    const displayedBooks = document.querySelectorAll('[data-num]');

    displayedBooks.forEach((book, i) => {
      book.dataset.num = i;
    });
  }
}
displayContainer.addEventListener('click', removeBook);

//toggle read book
function toggleRead(e) {
  if (e.target.className === 'read') {
    if (e.target.style.backgroundColor === 'red') {
      e.target.style.backgroundColor = 'green';
      myLibrary[e.target.parentElement.dataset.num].read = true;
      e.target.textContent = 'Read';
    } else {
      e.target.style.backgroundColor = 'red';
      myLibrary[e.target.parentElement.dataset.num].read = false;
      e.target.textContent = 'Not Read';
    }
  }
}
displayContainer.addEventListener('click', toggleRead);
