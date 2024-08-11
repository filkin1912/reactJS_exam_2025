import React, { useState } from 'react';

export const SearchForm = ({onSearch}) => {


    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div>

            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit"></button>
            </form>

        </div>
    )
}
