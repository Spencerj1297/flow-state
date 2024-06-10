import { IconSearch } from "@tabler/icons-react";
import { FC } from "react";


interface Props {
    searchValue:string,
    handler: React.ChangeEventHandler<HTMLInputElement>  
}

export const SearchBar: FC<Props> = ({searchValue, handler}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>Search Jobs</label>
      <div className="flex gap-2">
        <input 
         value={searchValue}
         type="text"
         placeholder='Enter Company Name'
         onChange={handler}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
        <button type="button" className="bg-blue rounded-lg px-2 text-white">
          <IconSearch />
        </button>
      </div>
    </div>
  );
};
