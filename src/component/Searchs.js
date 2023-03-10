const Searchs = ({ searchQuery, onSearchChange }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
};

export default Searchs;
