import React, { useState, useEffect } from 'react';
import { getAllMenus, createMenu, updateMenu, deleteMenuById } from '../../services/api';
import { FiPlus, FiTrash2, FiEdit, FiSearch } from 'react-icons/fi';
import MenuFormModal from './MenuFormModal'; // Impor modal form yang baru

const KelolaMenu = () => {
    const [menus, setMenus] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State untuk mengontrol modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState(null); // Menyimpan data menu yang akan diedit

    const loadMenus = () => {
        getAllMenus()
            .then(response => {
                const sortedMenus = response.data.sort((a, b) => b.id - a.id);
                setMenus(sortedMenus);
            })
            .catch(error => console.error("Gagal memuat menu:", error));
    };

    useEffect(() => {
        loadMenus();
    }, []);

    const handleOpenAddModal = () => {
        setEditingMenu(null); // Pastikan tidak ada data edit
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (menu) => {
        setEditingMenu(menu); // Kirim data menu ke state
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
            try {
                await deleteMenuById(id);
                alert('Menu berhasil dihapus!');
                loadMenus();
            } catch (error) {
                console.error("Gagal menghapus menu:", error);
                alert('Gagal menghapus menu.');
            }
        }
    };

    const handleFormSubmit = async (formData, menuId) => {
        try {
            if (menuId) { // Jika ada menuId, berarti ini adalah proses edit
                await updateMenu(menuId, formData);
                alert('Menu berhasil diperbarui!');
            } else { // Jika tidak, ini adalah proses tambah
                await createMenu(formData);
                alert('Menu baru berhasil ditambahkan!');
            }
            loadMenus();
            setIsModalOpen(false); // Tutup modal setelah berhasil
        } catch (error) {
            console.error("Gagal memproses menu:", error);
            alert('Gagal memproses menu.');
        }
    };

    const filteredMenus = menus.filter(menu => 
        menu.namaMenu.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-2xl font-bold text-brand-gray">Daftar Menu</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Cari menu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="p-2 pl-10 border rounded-lg w-48 md:w-64"
                            />
                        </div>
                        <button onClick={handleOpenAddModal} className="bg-brand-red text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-red-dark flex items-center gap-2">
                            <FiPlus/> <span>Tambah Menu</span>
                        </button>
                    </div>
                </div>
                <table className="w-full min-w-max">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-600">Gambar</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Nama Menu</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Harga</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Kategori</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenus.map(menu => (
                            <tr key={menu.id} className="border-b hover:bg-gray-50">
                                <td className="p-4"><img src={menu.urlGambar} alt={menu.namaMenu} className="w-24 h-16 object-cover rounded-md"/></td>
                                <td className="p-4 font-medium text-gray-800">{menu.namaMenu}</td>
                                <td className="p-4 text-gray-600">Rp {menu.harga.toLocaleString('id-ID')}</td>
                                <td className="p-4 text-gray-600">{menu.kategori}</td>
                                <td className="p-4 flex gap-2">
                                    <button onClick={() => handleOpenEditModal(menu)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"><FiEdit/></button>
                                    <button onClick={() => handleDelete(menu.id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"><FiTrash2/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredMenus.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">Menu tidak ditemukan.</p>
                )}
            </div>
            
            <MenuFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingMenu}
            />
        </>
    );
};
export default KelolaMenu;