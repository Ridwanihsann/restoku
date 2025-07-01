import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const SuksesModal = ({ isOpen, onClose, pesanan }) => {
    if (!isOpen || !pesanan) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 text-center relative">
                <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-brand-dark">Pesanan kamu sedang kami proses. Ditunggu ya!</h1>
                <div className="text-left bg-gray-50 p-4 rounded-lg my-6 space-y-2">
                    <p><strong>ID Pesanan:</strong> #{pesanan.id}</p>
                    <p><strong>Nama:</strong> {pesanan.namaPemesan}</p>
                    <p><strong>No Meja:</strong> {pesanan.nomorMeja}</p>
                </div>
                <div className="border-t pt-6">
                    <h2 className="text-lg font-bold text-brand-red">Konfirmasi pembayaran dilakukan setelah makan.</h2>
                    <p className="mt-2 text-brand-gray">Silakan menuju kasir dan sebutkan nama atau nomor meja Anda.</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="bg-brand-red text-white font-bold py-3 px-8 rounded-lg mt-6 inline-block hover:bg-brand-red-dark w-full"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default SuksesModal;