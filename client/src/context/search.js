// import { createContext, useContext, useState } from "react";

// const SearchContext = createContext();

// const SearchProvider = ({ children }) => {
//     const [Search, setSearch] = useState({
//         keyword: "",
//         results: []
//     });

//     return (
//         <SearchContext.Provider value={[Search, setSearch]}>
//             {children}
//         </SearchContext.Provider>
//     );
// }

// // Custom Hook
// const useSearch = () => useContext(SearchContext);
// export { useSearch, SearchProvider };

import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };