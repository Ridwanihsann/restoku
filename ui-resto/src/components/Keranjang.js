import React from 'react';

const Keranjang = ({ items }) => {
    const totalHarga = items.reduce((total, item) => total + item.harga, 0);
    const nomorMeja = "03"; // Contoh nomor meja

    return (
        <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-brand-dark">Pesanan</h2>
                  <span className="bg-brand-orange text-white text-sm font-bold px-3 py-1 rounded-full">Meja {nomorMeja}</span>
                </div>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className='flex items-center gap-3'>
                              <img src={item.urlGambar} alt={item.namaMenu} className="w-12 h-12 object-cover rounded-md"/>
                              <div>
                                <p className="font-semibold text-brand-dark">{item.namaMenu}</p>
                                <p className="text-sm text-gray-500">x 1</p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-600">Rp {item.harga.toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <p className="text-gray-500 text-center py-10">Keranjang masih kosong.</p>
                    )}
                </div>
                <div className="border-t mt-6 pt-4">
                    <div className="flex justify-between items-center font-bold text-lg text-brand-dark">
                        <span>Total:</span>
                        <span>Rp {totalHarga.toLocaleString('id-ID')}</span>
                    </div>
                    <button className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg mt-4 hover:bg-orange-600 transition-colors text-lg">
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Keranjang;
