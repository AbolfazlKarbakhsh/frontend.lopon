import React from 'react';
import { motion } from 'motion/react';
import CategoryMain from '@features/Categorys/categoryMain';

function Category() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      <CategoryMain />
    </motion.div>
  );
}

export default Category;