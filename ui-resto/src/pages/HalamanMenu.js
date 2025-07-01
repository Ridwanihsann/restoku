import React, { useState, useEffect, useRef } from 'react';
import { getAllMenus, createPesanan } from '../services/api';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import KartuMenu from '../components/KartuMenu';
import KeranjangModal from '../components/KeranjangModal';
import FormPemesanan from '../components/FormPemesanan';
import SuksesModal from '../components/SuksesModal';

const HalamanMenu = () => {
    const [menus, setMenus] = useState([]);
    const [keranjang, setKeranjang] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);
    const menuSectionRef = useRef(null);

    useEffect(() => {
        getAllMenus().then(response => setMenus(response.data)).catch(error => console.error("Gagal mengambil data menu:", error));
    }, []);

    const handleAddToCart = (menuToAdd) => {
        setKeranjang(prevKeranjang => {
            const isItemInCart = prevKeranjang.find(item => item.id === menuToAdd.id);
            if (isItemInCart) {
                return prevKeranjang.map(item =>
                    item.id === menuToAdd.id ? { ...item, kuantitas: item.kuantitas + 1 } : item
                );
            }
            return [...prevKeranjang, { ...menuToAdd, kuantitas: 1 }];
        });
    };
    
    const handleUpdateQuantity = (menuId, amount) => {
        setKeranjang(prevKeranjang => {
            return prevKeranjang.map(item => {
                if (item.id === menuId) {
                    const newQuantity = item.kuantitas + amount;
                    return newQuantity > 0 ? { ...item, kuantitas: newQuantity } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const handleOpenPesanForm = () => {
        if (keranjang.length === 0) return;
        setIsCartOpen(false);
        setIsFormOpen(true);
    };

    const handleKonfirmasiPesan = async (dataPemesan) => {
        const dataPesananLengkap = {
            ...dataPemesan,
            items: keranjang.map(item => ({ id: item.id, namaMenu: item.namaMenu, harga: item.harga, kuantitas: item.kuantitas }))
        };
        try {
            const response = await createPesanan(dataPesananLengkap);
            setCompletedOrder(response.data);
            setIsFormOpen(false);
            setIsSuccessOpen(true);
            setKeranjang([]);
        } catch (error) {
            console.error("Gagal membuat pesanan:", error);
            alert('Maaf, terjadi kesalahan saat membuat pesanan.');
        }
    };

    const closeSuccessModal = () => {
        setIsSuccessOpen(false);
        setCompletedOrder(null);
    }

    const categories = ['All', 'Food', 'Drink', 'Dessert'];
    
    const filteredMenus = menus
        .filter(menu => activeCategory === 'All' || menu.kategori === activeCategory)
        .filter(menu => menu.namaMenu.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalItemsInCart = keranjang.reduce((total, item) => total + item.kuantitas, 0);

    return (
        <div className="bg-brand-light min-h-screen font-sans">
            <Navbar menuSectionRef={menuSectionRef} />
            <Hero menuSectionRef={menuSectionRef} />
            <main ref={menuSectionRef} className="container mx-auto px-6 py-8" id="menu-section">
                <div className="relative mb-4">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Cari menu favoritmu..." 
                        className="w-full p-3 pl-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 ${
                                activeCategory === cat
                                    ? 'bg-brand-red text-white shadow-md'
                                    : 'bg-white text-brand-gray hover:bg-red-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                {/* (PEMBARUAN) Mengubah kelas grid untuk mendukung hingga 4 kolom */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredMenus.map(menu => (
                        <KartuMenu key={menu.id} menu={menu} onAddToCart={handleAddToCart} />
                    ))}
                </div>
                 {filteredMenus.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <h3 className="text-2xl font-bold mb-2">Menu tidak ditemukan</h3>
                        <p>Coba kata kunci lain atau periksa kategori yang dipilih.</p>
                    </div>
                )}
            </main>
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-8 right-8 bg-brand-red text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
            >
                <FiShoppingCart size={28} />
                {totalItemsInCart > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-brand-red text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItemsInCart}
                    </span>
                )}
            </button>
            <KeranjangModal
                items={keranjang}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onPesan={handleOpenPesanForm}
                onUpdateQuantity={handleUpdateQuantity}
            />
            <FormPemesanan
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleKonfirmasiPesan}
            />
            <SuksesModal 
                isOpen={isSuccessOpen}
                onClose={closeSuccessModal}
                pesanan={completedOrder}
            />
            <footer className="bg-brand-red text-white mt-16">
                 <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold">Restoku</h3>
                        <p className="mt-2 text-red-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">Information</h3>
                        <p className="mt-2 text-red-200">J. A.H Nasution No.105, Cipadung Wetan, Kec. Panyileukan, Kota Bandung, Jawa Barat 40614</p>
                        <p className="mt-1 text-red-200">Email: Restoku@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HalamanMenu;