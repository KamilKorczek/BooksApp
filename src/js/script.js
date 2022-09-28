{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      image: '.book__image',
      form: '.filters',
    },
  };

  const classNames = {
    images: {
      favoriteBooks: 'favorite',
      dataImage: 'data-id',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BookList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
    }
  
    getElements() {
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.containerOf.bookList);
    }

    render() {
      const thisBookList = this;
        
      for (let book of thisBookList.data) {
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        /* [DONE] generate HTML based on template */
        const generatedHTML = templates.bookTemplate( {
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });
        
        /* [DONE] create element using utils.createElementFromHTML */
        thisBookList.elem = utils.createDOMFromHTML(generatedHTML);
        //console.log(thisBook.elem);
        /* [DONE] find books container */
        const booksContainer = document.querySelector(select.containerOf.bookList);

        /* [DONE] add book to menu */
        booksContainer.appendChild(thisBookList.elem);
        //console.log(booksContainer.appendChild(thisBook.elem));
      }
    }

    initActions() {
      const thisBookList = this;

      thisBookList.booksFavorite = thisBookList.booksContainer.querySelectorAll(select.containerOf.image);
      
      //console.log(thisBookList.booksFavorite);
      for (let book of thisBookList.booksFavorite) {
        book.addEventListener('dblclick', function(event) {
          event.preventDefault;
          const bookId = book.getAttribute(classNames.images.dataImage);

          if(!event.target.offsetParent.classList.contains(select.containerOf.image)) {
            //console.log(event.target.offsetParent);
            if (!thisBookList.favoriteBooks.includes(bookId)) {
              book.classList.add(classNames.images.favoriteBooks);
              //console.log(book);
              thisBookList.favoriteBooks.push(bookId);
              //console.log(thisBookList.favoriteBooks);
            } else {
              const indexOfBook = thisBookList.favoriteBooks.indexOf(bookId);
              //console.log(indexOfBook);
              book.classList.remove(classNames.images.favoriteBooks);
              //console.log(book);
              thisBookList.favoriteBooks.splice(indexOfBook, 1);
              //console.log(thisBookList.favoriteBooks);
            }
          }
        });
        //console.log(book);
      }

      const booksForm = document.querySelector(select.containerOf.form);

      booksForm.addEventListener('click', function(callback) {
        const clickedElement = callback.target;
        
        if (clickedElement.tagName == 'INPUT' && clickedElement.type == 'checkbox' && clickedElement.name == 'filter') {
          //console.log(clickedElement.value);
          
          if (clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);
            //console.log(thisBookList.filters);
          } else {
            const indexOfValue = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(indexOfValue, 1);
            //console.log(thisBookList.filters);
          }
        }

        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (let book of thisBookList.data) {
        let shouldBeHidden = false;
        const filterOfHiddenBooks = document.querySelector(select.containerOf.image + '[data-id = "' + book.id + '"]');

        for (let filter of thisBookList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if(shouldBeHidden) {
          filterOfHiddenBooks.classList.add('hidden');
        } else {
          filterOfHiddenBooks.classList.remove('hidden');
        }  
      }
    }

    determineRatingBgc(rating){
      let background = '';
  
      if(rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
  
      return background;
    }
  }
  new BookList();
}