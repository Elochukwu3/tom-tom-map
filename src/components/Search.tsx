import { useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const onchange = (e:any) => {
    setInput(e.target.value);
  };
  const onSubmit = (e: FormEventHandler<HTMLFormElement>)=>{
    e.preventDefault()
    https://api.tomtom.com/search/2/search/${changedSearchText}.json?
    
  }
  return (
    <div>
      Search
      <form className="flex w-full overflow-hidden" onSubmit={onSubmit}>
        <input
          onChange={onchange}
          value={input}
          name="serch"
          type="search"
          autoCorrect=""
          autoFocus={true}
          autoComplete=""
        />
        <button type="submit">Q</button>
      </form>
    </div>
  );
};

export default Search;
