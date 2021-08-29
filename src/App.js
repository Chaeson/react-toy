
import React, {useRef, useState, useCallback} from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore){
              setPageNumber(prevPageNumber => prevPageNumber+1)
          }
      })
      if (node) observer.current.observe(node)
  })
  const {loading, error, books, hasMore} = useBookSearch(query, pageNumber)
  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input type={"text"} value={query} onChange={handleSearch}/>
      {books.map((book, index) => {
          if (books.length === index + 1) return <div ref={lastBookElementRef} key={book}>{books.length}</div>
          else
              return <div key={book}>{book}</div>
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </>
  );
}
