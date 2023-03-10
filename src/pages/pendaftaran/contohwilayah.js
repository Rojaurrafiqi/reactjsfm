// import React, {useState} from 'react'
// import wilayah from 'wilayah-indonesia';




// const contohwilayah = () => {



//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedRegency, setSelectedRegency] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedVillage, setSelectedVillage] = useState('');

//   const handleProvinceSelect = (e) => {
//     setSelectedProvince(e.target.value);
//     setSelectedRegency('');
//     setSelectedDistrict('');
//     setSelectedVillage('');
//   };

//   const handleRegencySelect = (e) => {
//     setSelectedRegency(e.target.value);
//     setSelectedDistrict('');
//     setSelectedVillage('');
//   };

//   const handleDistrictSelect = (e) => {
//     setSelectedDistrict(e.target.value);
//     setSelectedVillage('');
//   };

//   const handleVillageSelect = (e) => {
//     setSelectedVillage(e.target.value);
//   };

//   return (
//     <div>
         
//        <h1>Indonesia Region Dropdown</h1>

//       <label htmlFor="province">Provinsi:</label>
//       <select id="province" value={selectedProvince} onChange={handleProvinceSelect}>
//         <option value="">Pilih provinsi</option>
//         {wilayah.provinsi.map((province) => (
//           <option key={province.id} value={province.nama}>
//             {province.nama}
//           </option>
//         ))}
//       </select>

//       {selectedProvince && (
//         <>
//           <br />

//           <label htmlFor="regency">Kabupaten/Kota:</label>
//           <select id="regency" value={selectedRegency} onChange={handleRegencySelect}>
//             <option value="">Pilih kabupaten/kota</option>
//             {wilayah.kabupaten(selectedProvince).map((regency) => (
//               <option key={regency.id} value={regency.nama}>
//                 {regency.nama}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       {selectedRegency && (
//         <>
//           <br />

//           <label htmlFor="district">Kecamatan:</label>
//           <select id="district" value={selectedDistrict} onChange={handleDistrictSelect}>
//             <option value="">Pilih kecamatan</option>
//             {wilayah.kecamatan(selectedRegency).map((district) => (
//               <option key={district.id} value={district.nama}>
//                 {district.nama}
//               </option>
//             ))}
//           </select>
//         </>
//       )}

//       {selectedDistrict && (
//         <>
//           <br />

//           <label htmlFor="village">Kelurahan/Desa:</label>
//           <select id="village" value={selectedVillage} onChange={handleVillageSelect}>
//             <option value="">Pilih kelurahan/desa</option>
//             {wilayah.kelurahan(selectedDistrict).map((village) => (
//               <option key={village.id} value={village.nama}>
//                 {village.nama}
//               </option>
//             ))}
//           </select>
//         </>
//       )}
    
//     </div>
//   )
// }

// export default contohwilayah