import React, { useState } from 'react';
import styles from './SearchInput.module.css'; // Import styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; //

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    onSearch(searchTerm);
    event.preventDefault();
    setSearchTerm('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="رقم التتبع"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={styles.searchButton} type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default SearchInput;
