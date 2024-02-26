"use strict";

const myLibrary = [];
const content = document.querySelector(".content");
const newBook = document.querySelector("#showDialogBtn");
const dialog = document.querySelector("#dialog");
const closeDialog = document.querySelector("#closeDialogBtn");
const submitDialog = document.querySelector("#submitDialogBtn");
const form = document.querySelector(".book-form");

class BookCl {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.addBookToLibrary();
  }
  addBookToLibrary() {
    myLibrary.push(this);
  }
}

newBook.addEventListener("click", function () {
  dialog.showModal();
});

closeDialog.addEventListener("click", function () {
  form.reset();
  dialog.close();
});

submitDialog.addEventListener("click", () => {
  dialog.close();

  setTimeout(() => {
    submitForm(new Event("submit"));
  }, 200);
});

function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);
  formObj.read ? (formObj.read = "Read") : (formObj.read = "Not Read");
  const data = Object.values(formObj);
  const book = new BookCl(...data);
  renderBooks();

  form.reset();
}

function renderHtml(book, index) {
  return `<div class="book-card" data-index="${index}">
  <div class="book-name">${book.title}</div>
  <div class="book-author">${book.author}</div>
  <div class="book-pages">${book.pages}</div>
  <button class="btn-status btn-action">${book.read}</button>
  <button class="btn-remove btn-action">Delete</button>
</div>`;
}

function renderBooks() {
  const booksContainer = document.querySelector(".content");

  booksContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    booksContainer.insertAdjacentHTML("beforeend", renderHtml(book, index));
  });

  readStatus();

  deleteBook();
}
