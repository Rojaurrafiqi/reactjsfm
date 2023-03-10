import React, {useState, useEffect} from 'react'
import axios from "axios";
import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import Modal from '../../component/Modal';


// import {Link} from "react-router-dom";

const Pasien = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [editData, setEditData] = useState({ nama_lengkap: '', golongan_darah:'', });
    
    // delete
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    // search and pagination state
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [submittedQuery, setSubmittedQuery] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPage, setTotalPage] = useState(0);





    // const {mutate} = useSWRConfig();

    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const { data, error, mutate } = useSWR(
        `http://localhost:5000/igd/pasien?search=${searchQuery}&page=${page}&limit=${limit}`,
        fetcher
    );




  
       
    if (error) return <div>Error loading data.</div>;
    if (!data) return <div>Loading...</div>;


    // kode delete user

    const handleDeleteUser = async (userId) => {
 
    try {
      await axios.delete(`http://localhost:5000/rm/${userId}`);
       mutate();

    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  
};

    const handleConfirmDelete = () => {
    handleDeleteUser(deleteUserId);
    setShowModal(false);
    setDeleteUserId(null);
    };

    const handleShowModal = (userId) => {
    setDeleteUserId(userId);
    setShowModal(true);
    };


 // kode delete user





    // handle submit data
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/rm', formData);
            // console.log(response.data);
            setIsOpen(false);
            mutate();
        } catch (error) {
            console.error(error);
        }
    };

    // handle change data
    const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });


     const { name, value } = event.target;
    setEditData(prevState => ({
        ...prevState,
        [name]: value
    }));

    };


    // milik edit

    // edit data
    const handleEdit = (data) => {
        setEditData(data);
        setIsEditOpen(true);
    };


    // mengirim request ke API untuk mengedit data
    const handleEditSubmit = async (event) => {
    event.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/rm/${editData.id}`, editData);
            // console.log(response.data);
            setIsEditOpen(false);
         mutate();
        } catch (error) {
            console.error(error);
        }
    };

    // punya modal

    const handleCloseModal = () => {
        setIsOpen(false);
        setIsEditOpen(false);
    };
    

  return (
    <div className="pasien">
        <div className='judul'>
            <h1 className='text-2xl text-left text-state-600 font-semibold'>Data Rekam Medis Pasien</h1>


           
            
            {/* modal create */}


 <Modal isOpen={isOpen} onClose={handleCloseModal}>
     <div class="bg-white rounded-lg w-11/12 overflow-hidden shadow-xl transform transition-all max-w-screen-lg ">
   
      <div class="flex justify-between px-4 py-2">
         <h3 className="text-lg leading-6 font-medium text-gray-900 text-left">
            Tambah Data Pasien
        </h3>
        <button class="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={handleCloseModal}>
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div class="bg-gray-50 p-6">
  <form onSubmit={handleSubmit}> 
  
         
        <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <label class="block text-gray-700 text-sm text-left font-bold mb-2 italic">Data Pasien</label>
        
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Kitas</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 type="text" name='no_kitas' placeholder="Masukkan Nomor Indentitas" onChange={handleFormChange} />
            </div>

            <div className='field my-2 flex'>
                <div class="flex items-center mr-2">
                    <input
                        id="kitas1"
                        name="kitas"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600" 
                        value="KTP"
                        onChange={handleFormChange}
                      
                    />
                    <label for="kitas" class="ml-1 text-gray-700">KTP</label>
                </div>

                <div class="flex items-center">
                    <input
                        id="kitas2"
                        name="kitas"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                        value="Paspor"
                    />
                    <label for="kitas" class="ml-1 text-gray-700">Paspor</label>
                </div>


            </div>
            
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Nama Lengkap</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name='nama_lengkap' type="text" placeholder="Nama Lengkap" onChange={handleFormChange} />
            </div>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">TTL</label>
                <div className='flex'>
                    <input class="appearance-none border rounded w-2/3  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tempat_lahir" name='tempat_lahir' type="text" placeholder="Tempat Lahir" onChange={handleFormChange} />
                    <input class="appearance-none border rounded w-1/3  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-datepicker" name='tanggal_lahir' type="date"  onChange={handleFormChange} />
                </div>
            </div>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Jenis Kelamin</label>
                <div className='flex'>
                <div class="flex items-center mr-2">
                    <input
                        id="laki-laki"
                        name="kelamin"
                        value="laki-laki"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Laki-laki</label>
                </div>

                <div class="flex items-center">
                    <input
                        id="perempuan"
                        name="kelamin"
                        value="perempuan"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Perempuan</label>
                </div>
                </div>
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Golongan Darah</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="golongan_darah" type="text" placeholder="golongan darah pasien" name='golongan_darah' onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">No HP</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="kontak_pasien" name='kontak_pasien' type="text" placeholder="" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Agama</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="agama" name='agama' type="text" onChange={handleFormChange}  />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Status Kawin</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status_kawin" name='status_kawin' type="text" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Pendidikan</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pendidikan" name='pendidikan' type="text" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Pekerjaan</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pekerjaan" name='pekerjaan' type="text" onChange={handleFormChange} />
            </div>
           
        
        
         </div>
        </div>
           
   

        <div class="w-full md:w-1/2 px-4">
         <label class="block text-gray-700 text-sm text-left font-bold mb-2 italic">Data Keluarga Pasien</label>
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Kontak yang dapat dihubungi</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="kontak_pj" name='kontak_pj' type="text" onChange={handleFormChange} />
            </div>
         <div className='border border-state-300 p-2'>
            
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Nama penanggungjawab</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nama_penanggungjawab" name='nama_penanggungjawab' type="text" onChange={handleFormChange} />
            </div>
        </div>
        </div>
         <label class="block text-gray-700 text-sm text-left font-bold mb-2 mt-4 italic">Alamat</label>
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Alamat Pasien</label>
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_provinsi" name='alamat_pasien_provinsi' type="text" onChange={handleFormChange} />
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_kota" name='alamat_pasien_kota' type="text" onChange={handleFormChange} />
               
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_kec" name='alamat_pasien_kec' type="text" onChange={handleFormChange} />
               
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_desa" name='alamat_pasien_desa' type="text" onChange={handleFormChange} />
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_detail" name='alamat_pasien_detail' type="text" onChange={handleFormChange} />
                
            </div>
         <div className='border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Alamat penanggungjawab</label>
            <div className='container flex mb-2'>
                <div class="flex items-center mr-2">
                    <input
                        id="alamat_pj_detail1"
                        name="alamat_pj_detail"
                        value="Sama Seperti Pasien"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Sama seperti pasien</label>
                </div>
                <div class="flex items-center mr-2">
                    <input
                        id="alamat_pj_detail2"
                        name="alamat_pj_detail"
                        value="Beda dari Pasien"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Berbeda dari pasien</label>
                </div>
            </div>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first-name" type="text" placeholder="Masukkan Nomor Indentitas" />
            </div>
        </div>
        </div>


        </div>
        </div>
      <div class="bg-gray-100 p-4 flex justify-end">
        <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50" onclick="toggleModal()">
          Submit
        </button>
      </div>
    </form>
        </div>

    
    </div>
</Modal>


            {/* end modal create */}


            {/* modal edit */}
           
           

 <Modal isOpen={isEditOpen} onClose={handleCloseModal}>
     <div class="bg-white rounded-lg w-11/12 overflow-hidden shadow-xl transform transition-all max-w-screen-lg ">
   
      <div class="flex justify-between px-4 py-2">
         <h3 className="text-lg leading-6 font-medium text-gray-900 text-left">
            Edit Data Pasien
        </h3>
        <button class="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={handleCloseModal}>
          <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div class="bg-gray-50 p-6">
  <form onSubmit={handleEditSubmit}> 
  
         
        <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <label class="block text-gray-700 text-sm text-left font-bold mb-2 italic">Data Pasien</label>
        
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Kitas</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 type="text" name='no_kitas' placeholder="Masukkan Nomor Indentitas" onChange={handleFormChange} value={editData.no_kitas} onClick={(e) => e.stopPropagation()} />
            </div>

            <div className='field my-2 flex'>
                <div class="flex items-center mr-2">
                    <input
                        id="kitas1"
                        name="kitas"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600" 
                        value="KTP"
                        onChange={handleFormChange}
                      
                    />
                    <label for="kitas" class="ml-1 text-gray-700">KTP</label>
                </div>

                <div class="flex items-center">
                    <input
                        id="kitas2"
                        name="kitas"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                        value="Paspor"
                    />
                    <label for="kitas" class="ml-1 text-gray-700">Paspor</label>
                </div>


            </div>
            
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Nama Lengkap</label>
                <input type="text" className='class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"' name="nama_lengkap"  onChange={handleFormChange} value={editData.nama_lengkap} onClick={(e) => e.stopPropagation()} /> 
            </div>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">TTL</label>
                <div className='flex'>
                    <input class="appearance-none border rounded w-2/3  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tempat_lahir" name='tempat_lahir' type="text" placeholder="Tempat Lahir" onChange={handleFormChange} value={editData.tempat_lahir} onClick={(e) => e.stopPropagation()} />
                    
                    <input class="appearance-none border rounded w-1/3  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-datepicker" name='tanggal_lahir' type="date"  onChange={handleFormChange} value={editData.tanggal_lahir} onClick={(e) => e.stopPropagation()} />
                </div>
            </div>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Jenis Kelamin</label>
                <div className='flex'>
                <div class="flex items-center mr-2">
                    <input
                        id="laki-laki"
                        name="kelamin"
                        value="laki-laki"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Laki-laki</label>
                </div>

                <div class="flex items-center">
                    <input
                        id="perempuan"
                        name="kelamin"
                        value="perempuan"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Perempuan</label>
                </div>
                </div>
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Golongan Darah</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="golongan_darah" type="text" placeholder="golongan darah pasien" name='golongan_darah'  onChange={handleFormChange} value={editData.golongan_darah} onClick={(e) => e.stopPropagation()} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">No HP</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="kontak_pasien" name='kontak_pasien' type="text" placeholder="" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Agama</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="agama" name='agama' type="text" onChange={handleFormChange}  />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Status Kawin</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status_kawin" name='status_kawin' type="text" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Pendidikan</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pendidikan" name='pendidikan' type="text" onChange={handleFormChange} />
            </div>

            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Pekerjaan</label>
                    <input class="appearance-none border rounded w-full  py-2 mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pekerjaan" name='pekerjaan' type="text" onChange={handleFormChange} />
            </div>
           
        
        
         </div>
        </div>
           
   

        <div class="w-full md:w-1/2 px-4">
         <label class="block text-gray-700 text-sm text-left font-bold mb-2 italic">Data Keluarga Pasien</label>
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Kontak yang dapat dihubungi</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="kontak_pj" name='kontak_pj' type="text" onChange={handleFormChange} />
            </div>
         <div className='border border-state-300 p-2'>
            
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Nama penanggungjawab</label>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nama_penanggungjawab" name='nama_penanggungjawab' type="text" onChange={handleFormChange} />
            </div>
        </div>
        </div>
         <label class="block text-gray-700 text-sm text-left font-bold mb-2 mt-4 italic">Alamat</label>
         <div className='container bg-white border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Alamat Pasien</label>
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_provinsi" name='alamat_pasien_provinsi' type="text" onChange={handleFormChange} />
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_kota" name='alamat_pasien_kota' type="text" onChange={handleFormChange} />
               
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_kec" name='alamat_pasien_kec' type="text" onChange={handleFormChange} />
               
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_desa" name='alamat_pasien_desa' type="text" onChange={handleFormChange} />
                
                <input class="appearance-none bg-white border rounded w-full py-2 mb-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="alamat_pasien_detail" name='alamat_pasien_detail' type="text" onChange={handleFormChange} />
                
            </div>
         <div className='border border-state-300 p-2'>
            <div className='field my-2'>
                <label class="block text-gray-700 text-sm text-left font-bold mb-2">Alamat penanggungjawab</label>
            <div className='container flex mb-2'>
                <div class="flex items-center mr-2">
                    <input
                        id="alamat_pj_detail1"
                        name="alamat_pj_detail"
                        value="Sama Seperti Pasien"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Sama seperti pasien</label>
                </div>
                <div class="flex items-center mr-2">
                    <input
                        id="alamat_pj_detail2"
                        name="alamat_pj_detail"
                        value="Beda dari Pasien"
                        type="radio"
                        class="form-radio h-4 w-4 text-indigo-600"
                        onChange={handleFormChange}
                    />
                    <label for="kelamin" class="ml-1 text-gray-700">Berbeda dari pasien</label>
                </div>
            </div>
                <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="first-name" type="text" placeholder="Masukkan Nomor Indentitas" />
            </div>
        </div>
        </div>


        </div>
        </div>
      <div class="bg-gray-100 p-4 flex justify-end">
        <button type="submit" class="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50" onclick="toggleModal()">
          Submit
        </button>
      </div>
    </form>
        </div>

    
    </div>
</Modal>

 {/* end modal edit */}

        {/* model delete */}
        {showModal && (
        <div>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
        </div>
        )}
           

<div className='container mx-auto w-full mt-4 flex justify-between mb-1'>

{/* search  */}
    <form>
        <input className='border border-black pl-0.5 py-0.4  ' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." autoFocus/>
    </form>
 {/* button add data */}
     <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.3 px-2 rounded '>New Pasien</button>

</div>


            
            <div className="container mx-auto  py-3  bg-white">
                {/* prev and next page */}
            <div className='container mx-auto w-full flex justify-end pr-2'>
                <button onClick={() => setPage((page) => page - 1)} disabled={page === 0} type="button" class="bg-white text-state-400 rounded-l-md border border-black border-l border-gray-200 mr-1">
                <div class="flex flex-row align-middle">
                    <svg class="w-4 mr-1 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <p class="ml-0.5 mr-1 text-sm">Prev</p>
                </div>
                </button>

                <button onClick={() => {setPage((page) => page + 1);}} disabled={page === data.totalPages-1}  type="button" class="bg-white text-state-400 border border-black rounded-r-md border-l border-gray-200 ">
                <div class="flex flex-row align-middle">
                    <p class="mr-0.5 ml-0.5 text-sm">Next</p>
                    <svg class="w-4 mr-1 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                </button>
            </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No RM</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kitas</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelamin</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.data.map((pasien, index) => (

                        <tr key={pasien.id}>

                        <td className="px-0 py-1 whitespace-nowrap">
                            <div className="text-sm text-gray-900"> {pasien.no_rm}</div>
                        </td>
                        <td class="px-0 py-1 whitespace-nowrap text-sm text-gray-500 text-center">
                            {pasien.nama_lengkap}
                        </td>
                        <td className="px-0 py-1 whitespace-nowrap text-sm text-gray-500 text-center">
                            {pasien.no_kitas}
                        </td>
                        <td className="px-0 py-1 whitespace-nowrap text-sm text-gray-500 text-center">
                            {pasien.kelamin}
                        </td>
                        <td className="px-0 py-1 whitespace-nowrap text-sm text-gray-500 text-center">
                            {pasien.tanggal_lahir}
                        </td>
            
                        <td className="px-0 py-0 whitespace-nowrap text-center text-sm font-medium">
                            <button onClick={() => handleEdit(pasien)}  className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            {/* <button onClick={()=> deleteUser(pasien.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button> */}
                             <button  onClick={() => handleShowModal(pasien.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                        </td>
                        </tr>
                  
                    ))}
                    
                    </tbody>
                 
                </table>
              

            </div>
     <div className='container mx-auto w-full flex justify-start mt-1 ml-1'>
          <p className='text-sm'>Jumlah Data: {data.totalRows} dari {data.totalPages} halaman</p>
      </div>




        </div>
    </div>
  )
}

export default Pasien