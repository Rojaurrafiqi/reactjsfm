import React, {useState} from 'react'
import useSWR from 'swr';
import axios from 'axios';

// import { useSWRConfig } from 'swr';
import Searchs from '../../component/Searchs';
import Pagination from '../../component/Pagination';


const Search = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

const API_URL = 'http://localhost:5000/igd/pasien';



const fetchData = async (url) => {
  const response = await axios.get(url);

  
  return response.data;
};

const { data, error } = useSWR(`${API_URL}?page=${currentPage}&search=${searchQuery}`, fetchData);
console.log(data);
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading data...</div>;




  return (
  <div>
      <Searchs searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <ul>
         {data.data.map(item => (
        <div key={item.id}>
          <h2>{item.id}</h2>
          {/* <p>{item.no_rm}</p>
          <p>{item.kitas}</p>
          <p>{item.no_kitas}</p>
          <p>{item.tanggal_lahir}</p>
          <p>{item.kelamin}</p>
          <p>{item.kontak_pasien}</p> */}
        </div>
      ))}
      </ul>
    </div>
  )
}

export default Search