import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryTable from './LibraryTable';

function AdminPage() {
    const [books, setBooks] = useState({
        title: '',
        author: '',
        subject: '',
        publishDate: '',
        availableCopies: '', // Make availableCopies a string for flexibility
    });

    const [bookList, setBookList] = useState([]);

    const handleInput = (event) => {
        setBooks((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8081/addBook', books)
            .then((response) => {
                console.log(response.data);
                setBookList((prevBooks) => [...prevBooks, response.data]);
                setBooks({
                    title: '',
                    author: '',
                    subject: '',
                    publishDate: '',
                    availableCopies: '',
                });
            })
            .catch((error) => {
                console.error('Error adding book:', error);
            });
    };

    const handleRemove = (bookId) => {
        axios.post('http://localhost:8081/removeBook', { id: bookId })
            .then((response) => {
                if (response.data.success) {
                    setBookList((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
                } else {
                    console.error('Error removing book:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error removing book:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8081/getBooks')
            .then((response) => {
                setBookList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    return (
        <div className='bg-black text-white vh-100'>
            

            <div>
                <h2>Add Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="title"><strong>Title</strong></label>
                        <input type="text" name="title" value={books.title} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="author"><strong>Author</strong></label>
                        <input type="text" name="author" value={books.author} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="subject"><strong>Subject</strong></label>
                        <input type="text" name="subject" value={books.subject} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="publishDate"><strong>Publish Date</strong></label>
                        <input type="text" name="publishDate" value={books.publishDate} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="availableCopies"><strong>Available Copies</strong></label>
                        <input type="text" name="availableCopies" value={books.availableCopies} onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Add Book
                    </button>
                </form>
            </div>

            <div>
                <h2>Book List</h2>
                <LibraryTable
                    books={bookList}
                    onRemove={handleRemove}
                    isAdmin={true}
                />
            </div>
        </div>
    );
}

export default AdminPage;
