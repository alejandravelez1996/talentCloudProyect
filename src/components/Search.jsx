const Search = ({ onSearchChange }) => {
    const handleChange = (e) => {
      onSearchChange(e.target.value);
    };
  
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={handleChange}
        />
      </div>
    );
  };
  
  export default Search;
  