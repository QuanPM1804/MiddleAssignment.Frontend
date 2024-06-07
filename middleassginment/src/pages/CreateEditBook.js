import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, updateBook, getBookById } from '../Service/api';

const CreateEditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
        if (id) {
          const response = await getBookById(id);
          setTitle(response.data.title);
          setAuthor(response.data.author);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBook(id, { title, author });
      } else {
        await createBook({ title, author });
      }
      navigate('/books');
    } catch (error) {
      setError('Error creating/editing book');
    }
  };

  return (
    <div className="create-edit-book-container">
      <h2>{id ? 'Edit Book' : 'Create Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={255}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            maxLength={255}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateEditBook;