import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// Impor logo dari folder assets Anda
// Pastikan nama file 'logo-restoku.png' sesuai dengan nama file Anda
import logo from '../assets/restokuLogo.png'; 

const Navbar = ({ menuSectionRef }) => {

    const handleScrollToMenu = () => {
        menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // (BARU) Fungsi untuk scroll ke paling atas halaman
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* (PEMBARUAN) Logo sekarang juga berfungsi sebagai tombol scroll-to-top */}
                <button onClick={handleScrollToTop} className="flex items-center gap-3">
                    <img 
                        src={logo} 
                        alt="Logo Restoku" 
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl font-bold text-brand-red">Restoku</h1>
                </button>
                <div className="hidden md:flex space-x-8 items-center">
                    {/* (PEMBARUAN) Tombol Home sekarang menggunakan onClick untuk scroll */}
                    <button onClick={handleScrollToTop} className="text-brand-gray hover:text-brand-red">Home</button>
                    <button onClick={handleScrollToMenu} className="text-brand-gray hover:text-brand-red">Menu</button>
                    <Link to="/login" className="bg-brand-red text-white px-4 py-2 rounded-full hover:bg-brand-red-dark flex items-center gap-2">
                        <HiOutlineUserCircle size={20} />
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
