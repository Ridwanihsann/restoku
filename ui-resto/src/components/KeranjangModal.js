import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FiPlus, FiMinus } from 'react-icons/fi';

const KeranjangModal = ({ items, isOpen, onClose, onPesan, onUpdateQuantity }) => {
    if (!isOpen) return null;

    const totalHarga = items.reduce((total, item) => total + (item.harga * item.kuantitas), 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative flex flex-col" style={{maxHeight: '90vh'}}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><IoClose size={28} /></button>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-brand-dark">Pesanan Anda</h2>
                </div>
                <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {items.length > 0 ? items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <img src={item.urlGambar} alt={item.namaMenu} className="w-20 h-20 object-cover rounded-md"/>
                            <div className="flex-grow">
                                <p className="font-semibold text-brand-dark">{item.namaMenu}</p>
                                <p className="text-sm text-gray-500">Rp {item.harga.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center gap-2 border rounded-lg p-1">
                                <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-brand-red"><FiMinus/></button>
                                <span className="font-bold w-6 text-center">{item.kuantitas}</span>
                                <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-brand-red"><FiPlus/></button>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 py-10">Keranjang masih kosong.</p>}
                </div>
                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center font-bold text-lg text-brand-dark mb-4">
                        <span>Total:</span>
                        <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                    <button
                        onClick={onPesan}
                        disabled={items.length === 0}
                        className="w-full bg-brand-red text-white font-bold py-3 rounded-lg text-lg hover:bg-brand-red-dark disabled:bg-gray-400"
                    >
                        Lanjut ke Pemesanan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KeranjangModal;
