import React from 'react'
import ProductList from '../components/ProductList'

import Header from '../components/Header'
function Homepage({ selectedCategory, setSelectedCategory }) {
    
  
    return (
        <div>
            <Header setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory} />
            <ProductList selectedCategory={selectedCategory} />
        </div>
    )
}

export default Homepage