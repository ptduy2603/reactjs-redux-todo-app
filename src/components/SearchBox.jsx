import propTypes from "prop-types";

function SearchBox({
  searchValue,
  handleOnChange = () => {},
  handleSearch = () => {},
}) {
  return (
    <>
      <input
        type="text"
        value={searchValue}
        className="search-input"
        placeholder="Search task"
        onChange={handleOnChange}
      />
      <button className="btn" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </>
  );
}

SearchBox.propTypes = {
  searchValue: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
  handleSearch: propTypes.func.isRequired,
};

export default SearchBox;
