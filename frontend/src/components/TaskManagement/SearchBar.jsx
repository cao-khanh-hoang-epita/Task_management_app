import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import '../../styles/SearchBar.css';


const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search tasks..."
            value={query}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
