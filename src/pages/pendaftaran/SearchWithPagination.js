import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SearchWithPagination = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [submittedQuery, setSubmittedQuery] = useState(null);
  const { data, error } = useSWR(
    `http://localhost:5000/igd/pasien?search=${searchQuery}&page=${page}&limit=${limit}`,
    fetcher
  );

 

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  console.log("Current page:", page);
  console.log("Data:", data);

  return (
    <div>
     <form >
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search..." autoFocus
    />
   
  </form>

      <ul>
        {data.data.map((item) => (
          <li key={item.id}>{item.nama_lengkap}</li>
        ))}
      </ul>

      <br/>
      <br/>
      <br/>
      <br/>
      <button
        onClick={() => setPage((page) => page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>
      <button
        onClick={() => {
          setPage((page) => page + 1);
        }}
        // disabled={!data.data === null}
      >
        Next Page
      </button>
    </div>
  );
};

export default SearchWithPagination;
