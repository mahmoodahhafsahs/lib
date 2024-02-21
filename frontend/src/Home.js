import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryTable from './LibraryTable';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

    const handleBorrow = (bookId) => {
        axios.post('http://localhost:8081/borrowBook', { id: bookId })
            .then((response) => {
                if (response.data.success) {
                    console.log('Borrowing successful! You have successfully borrowed the book.');
                    fetchBooks();
                } else {
                    console.error('Borrowing failed:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error borrowing book:', error);
            });
    };

    const handleRemove = (bookId) => {
        axios.post('http://localhost:8081/removeBook', { id: bookId })
            .then((response) => {
                if (response.data.success) {
                    console.log('Removal successful! The book has been removed.');
                    fetchBooks();
                } else {
                    console.error('Removal failed:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error removing book:', error);
            });
    };

    const fetchBooks = () => {
        const url = searchQuery
            ? `http://localhost:8081/searchBooks?query=${searchQuery}`
            : 'http://localhost:8081/getBooks';

        axios.get(url)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, [searchQuery]);

    // Set isAdmin based on your logic (example: check if the user is an admin)
    useEffect(() => {
        // Implement your logic to determine if the user is an admin
        // For example, you might check the user's role in your authentication system
        setIsAdmin(/* Your logic to set isAdmin */);
    }, []);

    return (
        <div>
           

            <div>
                <input
                    type="text"
                    placeholder="Search by Title, Author, Subject, or Publish Date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={fetchBooks}>Search</button>
                <LibraryTable
                    books={books}
                    onBorrow={(bookId) => handleBorrow(bookId)}
                    onRemove={(bookId) => handleRemove(bookId)}
                    isAdmin={isAdmin}
                />
            </div>
        </div>
    );
}

export default Home;
