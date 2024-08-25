import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function JsonFilter() {
  const [jsonData, setJsonData] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('numbers');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bajaj-api-abbas.onrender.com/bfhl', { data: JSON.parse(jsonData) });

      console.log('Response:', response.data);
      const { numbers, alphabets, highest_lowercase_alphabet } = response.data;

      switch (selectedFilter) {
        case 'numbers':
          setFilteredData(numbers);
          break;
        case 'alphabets':
          setFilteredData(alphabets);
          break;
        case 'hla':
          setFilteredData(highest_lowercase_alphabet);
          break;
        default:
          setFilteredData([]);
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  useEffect(() => {
    // Re-filter data if selectedFilter changes
    handleSubmit(new Event('submit'));
  }, [selectedFilter]);

  return (
    <div>
      <h1>JSON Filter</h1>
      <form onSubmit={handleSubmit}>
        <label>API Input:</label>
        <input type="text" value={jsonData} onChange={(e) => setJsonData(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <div>
        <label>Multi Filter:</label>
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
          <option value="hla">Highest Lowercase Alphabets</option>
        </select>
      </div>

      <h2>Filtered Response</h2>
      <p>{selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}: {filteredData.join(', ')}</p>
    </div>
  );
}

export default JsonFilter;