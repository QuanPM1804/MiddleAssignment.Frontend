import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../Service/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleSearch = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedBooks = [...books].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortOrder === 'asc' ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setBooks(sortedBooks);
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="books-container">
      <h2>Books</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('author')}>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link to={`/books/${book.id}`}>View</Link>
                <Link to={`/books/${book.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/books/create">Create Book</Link>
    </div>
  );
};

export default Books;