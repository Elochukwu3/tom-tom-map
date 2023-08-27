import { useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const onchange = (e:any) => {
    setInput(e.target.value);
  };
  return (
    <div>
      Search
      <form>
        <input
          onChange={onchange}
          value={input}
          name="serch"
          type="search"
          autoCorrect=""
          autoFocus={true}
          autoComplete=""
        />
      </form>
    </div>
  );
};

export default Search;
