import React from 'react';

// (PEMBARUAN) Terima props menuSectionRef
const Hero = ({ menuSectionRef }) => {
    
    const handleScrollToMenu = () => {
        menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray leading-tight">
                    Restoku<br />
                    Saatnya nikmati hidangan lezat dari Restoku!
                </h2>
                {/* (PEMBARUAN) Tombol ORDER NOW sekarang menggunakan onClick */}
                <button 
                    onClick={handleScrollToMenu}
                    className="mt-6 bg-brand-red text-white font-bold px-8 py-3 rounded-full hover:bg-brand-red-dark transition-colors"
                >
                    ORDER NOW
                </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <img src="/images/restoran-room.png" alt="Interior Restoran" className="rounded-lg shadow-xl w-full"/>
            </div>
        </section>
    );
};

export default Hero;
