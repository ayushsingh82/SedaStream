import React, { useState } from 'react';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav>
            <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-[#1F1B30]'>
                <div className='font-bold text-2xl text-white'>
                    <a href='/'>SedaStream</a>
                </div>

                {/* Dropdown button */}
                <div className='relative'>
                    <button
                        onClick={toggleDropdown}
                        className='bg-black text-white font-bold px-4 py-2 rounded-md'
                    >
                        Get Started
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
                            <ul className='py-2'>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    <a href='/base'>Base</a>
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    <a href='/ethereum'>Ethereum</a>
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    <a href='/arbitrum'>Arbitrum</a>
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                    <a href='/multichain'>Multichain</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <hr className='border-t-2 border-black' />
        </nav>
    );
}

export default Navbar;
