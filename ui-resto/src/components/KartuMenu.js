import React from 'react';

const KartuMenu = ({ menu, onAddToCart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                    src={menu.urlGambar} 
                    alt={menu.namaMenu} 
                    // className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" // fotofitt
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" // foto full
                />
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-brand-gray">{menu.namaMenu}</h3>
                    <p className="text-base font-bold text-brand-red">Rp {menu.harga.toLocaleString('id-ID')}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex-grow">{menu.deskripsi}</p>
                <div className="flex justify-end items-center mt-3">
                    <button 
                        onClick={() => onAddToCart(menu)}
                        className="bg-brand-red text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-brand-red-dark transition-colors"
                    >
                        Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KartuMenu;