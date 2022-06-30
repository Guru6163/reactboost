import Header from "./components/Header";
import { useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="App">
      <Header
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ProductList
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default App;
