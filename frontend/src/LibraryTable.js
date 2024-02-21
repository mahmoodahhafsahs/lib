import React, { useState } from 'react';

function LibraryTable({ books, onBorrow, onRemove, isAdmin }) {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const handleClickNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Subject</th>
                        <th>Publish Date</th>
                        <th>Available Copies</th>
                        {isAdmin && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.subject}</td>
                            <td>{book.publishDate}</td>
                            <td>{book.availableCopies}</td>
                            {isAdmin ? (
                                <td>
                                    <button onClick={() => onRemove(book.id)}>Remove</button>
                                </td>
                            ) : (
                                <td>
                                    <button onClick={() => onBorrow(book.id)}>Borrow</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {currentPage > 1 && (
                    <button onClick={handleClickPrev}>Previous</button>
                )}
                {currentBooks.length === itemsPerPage && (
                    <button onClick={handleClickNext}>Next</button>
                )}
            </div>
        </div>
    );
}

export default LibraryTable;
