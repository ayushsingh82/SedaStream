import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Started = () => {
  // Initialize selectedBox with id 1 for default selection
  const [selectedBox, setSelectedBox] = useState(1);

  // Box data for rendering dynamically
  const boxes = [
    { id: 1, label: 'Account Balance' },
    { id: 2, label: 'Token Price' },
    { id: 3, label: 'Get Currencies' },
    { id: 4, label: 'Get Token Holder' },
    { id: 5, label: 'Token Transfer' }
  ];

  // Function to handle box click
  const handleBoxClick = (id) => {
    setSelectedBox(id);
  };

  return (
    <section className="pt-4 md:pt-6 bg-gradient-to-b from-[#1F1B30] via-[#3A2A52] to-[#4A3A78] overflow-x-clip h-screen w-screen">
      <div className="mt-6 md:mt-8 flex justify-center items-start">
        <div className="flex justify-between space-x-4 w-full max-w-6xl px-4">
          {boxes.map((box) => (
            <motion.div
              key={box.id}
              className={`flex-1 p-4 rounded-lg shadow-lg text-center cursor-pointer transition-colors duration-300 ${
                selectedBox === box.id ? 'bg-black text-white' : 'bg-white text-black'
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleBoxClick(box.id)}
            >
              {box.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Started;
