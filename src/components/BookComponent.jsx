import React, { useEffect, useState } from 'react';
import { createBook, getBook} from '../services/BookService.JS';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBook } from '../services/BookService.JS';


const BookComponent = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState('');

  const {id} = useParams();
  const [errors, setErrors] = useState({
    bookName: '',
    authorName: '',
    price: '',
  });

  const navigator = useNavigate();

  useEffect(() => {

    if(id){
        getBook(id).then((response) => {
            setBookName(response.data.bookName);
            setAuthorName(response.data.authorName);
            setPrice(response.data.price);
        }).catch(error =>{
            console.error(error);
        })
     }
    
  },[id])
    

  function saveOrUpdateBook (e) {
    e.preventDefault();

    if (validateForm()) {
        
      const book = { bookName, authorName, price }
      console.log(book)

      if(id){
        updateBook(id, book).then((response) => {
            console.log(response.dat);
            navigator('/books');
        }).catch(error => {
            console.error(error);
        })
      }else{
        createBook(book)
        .then((response) => {
          console.log(response.data);
          navigator('/books')
        }).catch(error => {
            console.error(error);
        })

      }

   
    }
  }

  function validateForm () {
    let valid = true;

    const errorsCopy = { ...errors }

    if (bookName.trim()) {
      errorsCopy.bookName = '';
    } else {
      errorsCopy.bookName = 'Book name is required';
      valid = false;
    }

    if (authorName.trim()) {
      errorsCopy.authorName = '';
    } else {
      errorsCopy.authorName = 'Author name is required';
      valid = false;
    }

    if (price.trim()) {
      errorsCopy.price = '';
    } else {
      errorsCopy.price = 'Price is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle(){
    if(id){
        return  <h2 className='text-center'>Update Book</h2>
    }else{
        return  <h2 className='text-center'>Add Book</h2>
    }

  }

  return (
    <div className='container'>
      <br />
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Book Name</label>
                <input
                  type='text'
                  placeholder='Enter Book Name'
                  name='bookName'
                  value={bookName}
                  className={`form-control ${errors.bookName ? 'is-invalid' : ''}`}
                  onChange={(e) => setBookName(e.target.value)}
                >
                </input>
                {errors.bookName && (
                  <div className='invalid-feedback'>{errors.bookName}</div>
                )}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Author Name</label>
                <input
                  type='text'
                  placeholder='Enter Author Name'
                  name='authorName'
                  value={authorName}
                  className={`form-control ${errors.authorName ? 'is-invalid' : ''}`}
                  onChange={(e) => setAuthorName(e.target.value)}
                >
                </input>
                {errors.authorName && (
                  <div className='invalid-feedback'>{errors.authorName}</div>
                )}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Book Price</label>
                <input
                  type='text'
                  placeholder='Enter Book Price'
                  name='price'
                  value={price}
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  onChange={(e) => setPrice(e.target.value)}
                >
                </input>
                {errors.price && (
                  <div className='invalid-feedback'>{errors.price}</div>
                )}
              </div>

              <button
                className='btn btn-primary mt-2'
                onClick={saveOrUpdateBook}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookComponent
