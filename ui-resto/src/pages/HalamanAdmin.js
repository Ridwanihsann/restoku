import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KelolaMenu from '../components/admin/KelolaMenu';
import DaftarPesanan from '../components/DaftarPesanan';

import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';

const HalamanAdmin = () => {
    const [activeTab, setActiveTab] = useState('pesanan');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-brand-red">Admin Panel - Restoku</h1>
                        <div className="flex items-center gap-4">
                            <Link to="/" target="_blank" rel="noopener noreferrer" className="text-sm bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                                <FiExternalLink />
                                Halaman Menu
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('pesanan')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pesanan' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Daftar Pesanan
                            </button>
                            <button
                                onClick={() => setActiveTab('menu')}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'menu' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Kelola Menu
                            </button>
                        </nav>
                    </div>
                </div>
                <div>
                    {activeTab === 'pesanan' && <DaftarPesanan />}
                    {activeTab === 'menu' && <KelolaMenu />}
                </div>
            </main>
        </div>
    );
};
export default HalamanAdmin;











// import React, { useState, useEffect } from 'react';
// import { getAllMenus, createMenu, updateMenu, deleteMenuById } from '../services/api';
// import { FiPlus, FiTrash2, FiEdit, FiPackage, FiDollarSign, FiAlignLeft, FiImage, FiSave, FiXCircle, FiTag } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// const HalamanAdmin = () => {
//     const [menus, setMenus] = useState([]);
    
//     // State untuk form
//     const [namaMenu, setNamaMenu] = useState('');
//     const [harga, setHarga] = useState('');
//     const [deskripsi, setDeskripsi] = useState('');
//     const [kategori, setKategori] = useState('Food'); // State untuk kategori
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
    
//     // State untuk mode edit
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentMenuId, setCurrentMenuId] = useState(null);

//     // Fungsi untuk memuat ulang data dari server
//     const loadMenus = () => {
//         getAllMenus()
//             .then(response => setMenus(response.data))
//             .catch(error => console.error("Gagal memuat menu:", error));
//     };

//     // Memuat menu saat komponen pertama kali ditampilkan
//     useEffect(() => {
//         loadMenus();
//     }, []);
    
//     // Fungsi untuk mereset form ke kondisi awal
//     const resetForm = (e) => {
//         setNamaMenu('');
//         setHarga('');
//         setDeskripsi('');
//         setKategori('Food');
//         setFile(null);
//         setFileName('');
//         setIsEditing(false);
//         setCurrentMenuId(null);
//         if (e) e.target.reset(); // Reset file input jika event ada
//     };

//     // Fungsi yang dipanggil saat tombol edit diklik
//     const handleEditClick = (menu) => {
//         setIsEditing(true);
//         setCurrentMenuId(menu.id);
//         setNamaMenu(menu.namaMenu);
//         setHarga(menu.harga);
//         setDeskripsi(menu.deskripsi);
//         setKategori(menu.kategori);
//         setFileName(''); 
//         window.scrollTo(0, 0); // Scroll ke atas untuk melihat form
//     };

//     // Fungsi untuk menghapus menu
//     const handleDelete = async (id) => {
//         if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
//             try {
//                 await deleteMenuById(id);
//                 alert('Menu berhasil dihapus!');
//                 loadMenus();
//             } catch (error) {
//                 console.error("Gagal menghapus menu:", error);
//                 alert('Gagal menghapus menu.');
//             }
//         }
//     };
    
//     // Fungsi saat form disubmit (untuk create atau update)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('namaMenu', namaMenu);
//         formData.append('harga', harga);
//         formData.append('deskripsi', deskripsi);
//         formData.append('kategori', kategori);
//         if (file) {
//             formData.append('file', file);
//         }

//         try {
//             if (isEditing) {
//                 await updateMenu(currentMenuId, formData);
//                 alert('Menu berhasil diperbarui!');
//             } else {
//                 await createMenu(formData);
//                 alert('Menu baru berhasil ditambahkan!');
//             }
//             loadMenus();
//             resetForm(e);
//         } catch (error) {
//             console.error("Gagal memproses menu:", error);
//             alert('Gagal memproses menu.');
//         }
//     };
    
//     // Fungsi untuk menangani perubahan input file
//     const handleFileChange = (e) => {
//         if (e.target.files.length > 0) {
//             setFile(e.target.files[0]);
//             setFileName(e.target.files[0].name);
//         }
//     };

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // Hapus token dari local storage
//         localStorage.removeItem('jwt_token');
//         // Arahkan pengguna ke halaman login
//         navigate('/login');
//     };


//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <header className="bg-white shadow-md">
//                 <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//                 <h1 className="text-2xl font-bold text-brand-red">Admin Panel - Restoku</h1>
//                 <button 
//                     onClick={handleLogout}
//                     className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
//                 >
//                     Logout
//                 </button>
//             </div>
//             </header>
            
//             <main className="container mx-auto px-6 py-8">
//                 {/* Form Tambah/Edit Menu */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//                     <h2 className="text-2xl font-bold text-brand-gray mb-4 flex items-center gap-2">
//                         {isEditing ? <FiEdit /> : <FiPlus />}
//                         {isEditing ? 'Edit Menu' : 'Tambah Menu Baru'}
//                     </h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiPackage/> Nama Menu</label>
//                                 <input type="text" value={namaMenu} onChange={(e) => setNamaMenu(e.target.value)} className="w-full p-3 border rounded-lg" required />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiTag/> Kategori</label>
//                                 <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
//                                     <option>Food</option>
//                                     <option>Drink</option>
//                                     <option>Dessert</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiDollarSign/> Harga</label>
//                             <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full p-3 border rounded-lg" required />
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiAlignLeft/> Deskripsi</label>
//                             <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows="3" className="w-full p-3 border rounded-lg"></textarea>
//                         </div>
//                         <div>
//                             <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiImage/> Gambar Menu (Opsional jika mengedit)</label>
//                             <div className="border-2 border-dashed rounded-lg p-4 text-center">
//                                 <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
//                                 <label htmlFor="file-upload" className="cursor-pointer text-brand-red font-semibold">
//                                     {fileName || 'Pilih file untuk diunggah'}
//                                 </label>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                             <button type="submit" className="w-full md:w-auto bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2">
//                                 <FiSave/> {isEditing ? 'Simpan Perubahan' : 'Simpan Menu'}
//                             </button>
//                             {isEditing && (
//                                 <button type="button" onClick={() => resetForm()} className="w-full md:w-auto bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
//                                     <FiXCircle/> Batal Edit
//                                 </button>
//                             )}
//                         </div>
//                     </form>
//                 </div>

//                 {/* Tabel Daftar Menu */}
//                 <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
//                     <h2 className="text-2xl font-bold text-brand-gray mb-4">Daftar Menu</h2>
//                     <table className="w-full min-w-max">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="p-4 text-left font-semibold text-gray-600">Gambar</th>
//                                 <th className="p-4 text-left font-semibold text-gray-600">Nama Menu</th>
//                                 <th className="p-4 text-left font-semibold text-gray-600">Harga</th>
//                                 <th className="p-4 text-left font-semibold text-gray-600">Kategori</th>
//                                 <th className="p-4 text-left font-semibold text-gray-600">Aksi</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {menus.map(menu => (
//                                 <tr key={menu.id} className="border-b hover:bg-gray-50">
//                                     <td className="p-4"><img src={menu.urlGambar} alt={menu.namaMenu} className="w-24 h-16 object-cover rounded-md"/></td>
//                                     <td className="p-4 font-medium text-gray-800">{menu.namaMenu}</td>
//                                     <td className="p-4 text-gray-600">Rp {menu.harga.toLocaleString('id-ID')}</td>
//                                     <td className="p-4 text-gray-600">{menu.kategori}</td>
//                                     <td className="p-4 flex gap-2">
//                                         <button onClick={() => handleEditClick(menu)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"><FiEdit/></button>
//                                         <button onClick={() => handleDelete(menu.id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"><FiTrash2/></button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default HalamanAdmin;