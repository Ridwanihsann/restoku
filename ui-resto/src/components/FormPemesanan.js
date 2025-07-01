import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const FormPemesanan = ({ isOpen, onClose, onSubmit }) => {
    const [nama, setNama] = useState('');
    const [noHp, setNoHp] = useState('');
    const [noMeja, setNoMeja] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ namaPemesan: nama, noHandphone: noHp, nomorMeja: noMeja });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><IoClose size={28} /></button>
                <h2 className="text-2xl font-bold text-brand-dark mb-6">Detail Pemesan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nama Anda (Wajib)</label>
                        <input type="text" value={nama} onChange={e => setNama(e.target.value)} className="w-full p-3 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nomor Meja (Wajib)</label>
                        <input type="text" value={noMeja} onChange={e => setNoMeja(e.target.value)} className="w-full p-3 border rounded-lg" required placeholder="Contoh: 3 (1-30)"/>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nomor Handphone (Opsional)</label>
                        <input type="tel" value={noHp} onChange={e => setNoHp(e.target.value)} className="w-full p-3 border rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 rounded-lg text-lg hover:bg-brand-red-dark mt-4">
                        Konfirmasi Pesanan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormPemesanan;
