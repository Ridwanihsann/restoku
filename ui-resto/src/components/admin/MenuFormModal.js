import React, { useState, useEffect } from 'react';
import { FiPackage, FiTag, FiAlignLeft, FiImage, FiSave, FiXCircle, FiEdit, FiPlus } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const MenuFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [namaMenu, setNamaMenu] = useState('');
    const [harga, setHarga] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [kategori, setKategori] = useState('Food');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const isEditing = !!initialData;

    useEffect(() => {
        if (isEditing) {
            setNamaMenu(initialData.namaMenu);
            setHarga(initialData.harga);
            setDeskripsi(initialData.deskripsi);
            setKategori(initialData.kategori);
        } else {
            // Reset form saat membuka untuk 'Tambah Baru'
            setNamaMenu('');
            setHarga('');
            setDeskripsi('');
            setKategori('Food');
        }
        setFile(null);
        setFileName('');
    }, [initialData, isEditing, isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('namaMenu', namaMenu);
        formData.append('harga', harga);
        formData.append('deskripsi', deskripsi);
        formData.append('kategori', kategori);
        if (file) {
            formData.append('file', file);
        }
        onSubmit(formData, initialData?.id);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative flex flex-col" style={{maxHeight: '90vh'}}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><IoClose size={28} /></button>
                <h2 className="text-2xl font-bold text-brand-gray mb-6 flex items-center gap-2">
                    {isEditing ? <FiEdit /> : <FiPlus />}
                    {isEditing ? 'Edit Menu' : 'Tambah Menu Baru'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiPackage/> Nama Menu</label>
                            <input type="text" value={namaMenu} onChange={(e) => setNamaMenu(e.target.value)} className="w-full p-3 border rounded-lg" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiTag/> Kategori</label>
                            <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
                                <option>Food</option>
                                <option>Drink</option>
                                <option>Dessert</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                            <span className="font-bold text-gray-500">Rp</span> Harga
                        </label>
                        <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiAlignLeft/> Deskripsi</label>
                        <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows="3" className="w-full p-3 border rounded-lg"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2"><FiImage/> Gambar Menu (Opsional jika mengedit)</label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                            <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
                            <label htmlFor="file-upload" className="cursor-pointer text-brand-red font-semibold">
                                {fileName || 'Pilih file untuk diunggah'}
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t">
                        <button type="submit" className="w-full md:w-auto bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2">
                            <FiSave/> {isEditing ? 'Simpan Perubahan' : 'Simpan Menu'}
                        </button>
                        <button type="button" onClick={onClose} className="w-full md:w-auto bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                            <FiXCircle/> Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuFormModal;
