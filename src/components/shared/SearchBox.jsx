import { Search } from "./Icons";

export default function SearchBox({ search, setSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <button type="submit" className="search-button">
          <Search />
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
          placeholder="لطفا بدون صفر جستجو کنید..." 
          className="search-input"
        />
      </form>
    </div>
  );
}
