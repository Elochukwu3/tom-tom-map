import { useState, FormEvent } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  const onchange = (e:any) => {
    setInput(e.target.value);
    // console.log(input);
    
  };

  const onSubmit = async(e: FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    if(input && input.length > 4){
      const response = await fetch(`https://api.tomtom.com/search/2/search/${input}.json?key={Your_API_Key}&language=en-US`)
      console.log(response);
      
    }
  }
    // https://api.tomtom.com/search/2/search/${changedSearchText}.json?
    // https://api.tomtom.com/search/2/autocomplete/pizza.json?key={Your_API_Key}&language=en-US
  
  
  return (
    <div className="rounded-md bg-zinc-800 z-50 md:w-1/2 w-9/12 flex justify-center flex-col items-center fixed right-0 bottom-0">
      <form className="flex w-10/12 mx-auto bg-white p-0 overflow-hidden" onSubmit={onSubmit}>
      <button type="submit" className="text-xl font-bold px-2">Q</button>
        <input
          onChange={onchange}
          value={input}
          name="serch"
          type="search"
          autoCorrect=""
          autoFocus={true}
          autoComplete=""
          className="py-2 w-full outline-none text-xl"
        />
      
      </form>
      <div className="h-96 w-full  bg-white border-t-2 border-zinc-700 ">

      </div>
    </div>
  );
};

export default Search;
