import React, { useState } from 'react';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
      <nav className=''>
        <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-[#1F1B30]'>
          <div className='font-bold text-2xl text-white'>
            <a href='/'>Seda</a>
          </div>

          {/* Dropdown button */}
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='bg-black text-white font-bold text-black px-4 py-2 rounded-md'>
             Get Started
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg'>
                <a
                  href='polkadotlayout'
                  className='block px-4 py-2 text-black hover:bg-gray-200'>
                Dropdown 1
                </a>
                <a
                  href=''
                  className='block px-4 py-2 text-black hover:bg-gray-200'>
                Dropdown 2
                </a>
             
              </div>
            )}
          </div>
        </div>
        <hr className='border-t-2 border-black' />
      </nav>
    );
}

export default Navbar;