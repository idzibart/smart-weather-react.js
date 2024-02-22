import { CiSearch } from "react-icons/ci";

type SearchBarProps = {
  setSearchCity: (city: string) => void;
  searchCity: string;
  onHandleSearch: () => void;
};

export default function SearchBar({
  onHandleSearch,
  setSearchCity,
  searchCity,
}: SearchBarProps) {
  return (
    <div className="m-auto mb-4 flex items-center justify-stretch  rounded-xl  bg-slate-200 px-2 py-1 shadow-md">
      <input
        className="bg-transparent text-center outline-none placeholder:font-normal"
        type="text"
        placeholder="enter a city"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onHandleSearch();
          }
        }}
      />
      <div className="text-xl">
        <button onClick={onHandleSearch}>
          <CiSearch />
        </button>
      </div>
    </div>
  );
}
