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
    const [editData, setEditData] = useState({ nama_lengkap: '' });

    // delete
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);





     const {mutate} = useSWRConfig();

    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/rm');
        return response.data;
       
    };

    const {data} = useSWR('pasien', fetcher);
    if (!data) return <h2>loading....</h2>


    // kode delete user

    const handleDeleteUser = async (userId) => {
 
    try {
      await axios.delete(`http://localhost:5000/rm/${userId}`);
      mutate("pasien");

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
            mutate("pasien");
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
        mutate("pasien");
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

            <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>New Pasien</button>
            
            {/* modal */}

            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Modal Title
                </h3>
                <div className="mt-2">
                     <form onSubmit={handleSubmit}>
                        <input type="text" autoFocus name="nama_lengkap" onChange={handleFormChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                </div>
            </Modal>

            {/* modal */}


            {/* modal edit */}
           
           <Modal isOpen={isEditOpen} onClose={handleCloseModal}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Data
            </h3>
            <div className="mt-2">
            <form onSubmit={handleEditSubmit}>
                <label>Nama Lengkap:</label><br/>
                <input type="text" name="nama_lengkap" value={editData.nama_lengkap} onChange={handleFormChange} onClick={(e) => e.stopPropagation()} /> <br/>
                <button type="submit">Update</button>
            </form>
            </div>
        </div>
        </Modal>

           
            {/* modal edit */}


        {/* model delete */}
        {showModal && (
        <div>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
        </div>
        )}
           
            
            
            
            <div className="container mx-auto mt-4 py-4  bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No RM</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kitas</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kelamin</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((pasien, index) => (

                        <tr key={pasien.id}>
                 
                        <td className="px-0 py-1 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{index + 1}</div>
                        </td>
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
                               <button onClick={() => handleShowModal(pasien.id)}>Delete</button>
                        </td>
                        </tr>
                  
                    ))}
                    
                    </tbody>

                 
                </table>

            </div>
        </div>
    </div>
  )
}

export default Pasien