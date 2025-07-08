import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactFormModal from './Modals/ContactFormModal';
import FallbackImage from "../components/FallbackImage";

const Hero = ({onContactClick}) => {
    return (
        <section className="w-full flex justify-center items-start pt-15 px-4">
            <div className="relative max-w-7xl w-full rounded-xl mt-8 overflow-hidden shadow-lg">
                {/* Desktop image */}
                <FallbackImage
                    src="/hero/hero-banner2.jpg"
                    alt="Hero"
                    className="hidden lg:block w-full h-[90vh] object-cover"
                />

                {/*Tablet image */}
                <FallbackImage
                    src="/hero/hero-banner.png"
                    alt="Hero Mobile"
                    className="hidden sm:block lg:hidden w-full h-[90vh] object-cover"
                />

                {/* Mobile image */}
                <FallbackImage
                    src="/hero/hero-banner.png"
                    alt="Hero Mobile"
                    className="block sm:hidden w-full h-[90vh] object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 sm:px-6 md:px-16 mt-60 lg:mt-0 ">
                    <div className="space-y-6 md:mt-0 text-center text-white w-full max-w-full sm:w-[90%]    lg:w-[45%] break-words">
                        <h1 className="font-poppins text-[clamp(1.8rem,7vw,3.5rem)] font-bold leading-tight tracking-wider mb-4">
                            Peaceful Place,<br/>To Grow Older
                        </h1>
                        <p className="font-poppins text-[clamp(0.9rem,1.3vw,1.2rem)] mb-6 leading-relaxed">
                            A Trustworthy Old Age Home &<br />Palliative Care Center
                        </p>
                        <div className="flex gap-3 flex-wrap justify-center">
                            <button onClick={onContactClick} className="font-poppins flex gap-2 bg-[#00FF55] hover:bg-[#00CC44] text-black font-semibold px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full shadow-md transition cursor-pointer">
                                <Mail size={18} className='mt-1' /> GET IN TOUCH
                            </button>
                            <Link to='/donate' className="font-poppins border border-white text-white font-semibold px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                                DONATE
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
