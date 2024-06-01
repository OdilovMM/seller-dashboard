const Search = ({ setParPage, setSearch, search }) => {
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [search, setSearch] = useState("");
  //   const [parPage, setParPage] = useState(5);

  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#94A3B8] border border-slate-700 rounded-md text-[#d0d2d6]"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default Search;
