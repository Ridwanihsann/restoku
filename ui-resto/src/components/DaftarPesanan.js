import React, { useState, useEffect } from 'react';
import { getAllPesanan, updateStatusPesanan, updateStatusPembayaran } from '../services/api';
import { FiRefreshCw } from 'react-icons/fi';

const DaftarPesanan = () => {
    const [pesananList, setPesananList] = useState([]);

    const loadPesanan = () => {
        getAllPesanan()
            .then(response => {
                const sortedPesanan = response.data.sort((a, b) => new Date(b.waktuPesan) - new Date(a.waktuPesan));
                setPesananList(sortedPesanan);
            })
            .catch(error => console.error("Gagal memuat pesanan:", error));
    };

    useEffect(() => {
        loadPesanan();
    }, []);

    const handleUpdateStatus = async (id, newStatus, type) => {
        try {
            if (type === 'pesanan') {
                await updateStatusPesanan(id, newStatus);
            } else if (type === 'pembayaran') {
                await updateStatusPembayaran(id, newStatus);
            }
            loadPesanan();
        } catch (error) {
            console.error("Gagal update status:", error);
            alert("Gagal memperbarui status.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Diterima': return 'bg-blue-100 text-blue-800';
            case 'Disiapkan': return 'bg-yellow-100 text-yellow-800';
            case 'Selesai': return 'bg-green-100 text-green-800';
            case 'Lunas': return 'bg-green-100 text-green-800';
            case 'Belum Bayar': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-brand-gray">Daftar Pesanan Masuk</h2>
                <button onClick={loadPesanan} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><FiRefreshCw /></button>
            </div>
            <table className="w-full min-w-max">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 text-left font-semibold text-gray-600">ID</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Pemesan</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Detail Pesanan</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Total</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Status Pesanan</th>
                        <th className="p-4 text-left font-semibold text-gray-600">Status Bayar</th>
                    </tr>
                </thead>
                <tbody>
                    {pesananList.map(pesanan => (
                        <tr key={pesanan.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-mono text-sm text-gray-500">#{pesanan.id}</td>
                            <td className="p-4">
                                <div className="font-semibold text-gray-800">{pesanan.namaPemesan}</div>
                                <div className="text-xs text-gray-500">Meja: {pesanan.nomorMeja}</div>
                            </td>
                            <td className="p-4 text-sm text-gray-700">
                                {pesanan.detailPesanans.map(detail => (
                                    <div key={detail.id}>{detail.namaMenu} <span className="font-semibold">(x{detail.kuantitas})</span></div>
                                ))}
                            </td>
                            <td className="p-4 font-semibold text-gray-800">Rp {pesanan.totalHarga.toLocaleString('id-ID')}</td>
                            <td className="p-4">
                                <select 
                                    value={pesanan.statusPesanan} 
                                    onChange={(e) => handleUpdateStatus(pesanan.id, e.target.value, 'pesanan')}
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:ring-2 focus:ring-offset-1 ${getStatusColor(pesanan.statusPesanan)}`}
                                >
                                    <option>Diterima</option>
                                    <option>Disiapkan</option>
                                    <option>Selesai</option>
                                </select>
                            </td>
                            <td className="p-4">
                                <select 
                                    value={pesanan.statusPembayaran} 
                                    onChange={(e) => handleUpdateStatus(pesanan.id, e.target.value, 'pembayaran')}
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:ring-2 focus:ring-offset-1 ${getStatusColor(pesanan.statusPembayaran)}`}
                                >
                                    <option>Belum Bayar</option>
                                    <option>Lunas</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default DaftarPesanan;