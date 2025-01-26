import React, { useEffect, useState } from 'react';
import { listBooks, deleteBook } from '../services/BookService.JS';
import { useNavigate } from 'react-router-dom';

const ListBookComponent = () => {
  const [books, setBooks] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    listBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  };

  const addNewBook = () => {
    navigator('/add-book');
  };

  const updateBook = (id) => {
    navigator(`/edit-book/${id}`);
  };

  const removeBook = (id) => {
    deleteBook(id)
      .then(() => {
        getAllBooks(); // Correctly invoke the function to refresh the list
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div className="container">
      <button
        className="btn btn-primary mb-2 mt-4"
        onClick={addNewBook}
      >
        Add Book
      </button>
      <h2 className="text-center">List Of Books</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Book ISBN Number</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Book Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.price}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => updateBook(book.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBookComponent;
