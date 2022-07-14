import Header from "./components/Header";
import { useState } from "react";
import { Provider } from "react-redux";
import ProductList from "./components/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

import ListAllUsers from "./pages/ListAllUsers";


import store from "./store"
function App() {
  const [selectedCategory, setSelectedCategory] = useState("photos");


  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/home"
              element={
                <Homepage
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              }
            ></Route>
            <Route
              path="/"
              element={<Login />}
            ></Route>
            <Route
              path="/allUsers"
              element={<ListAllUsers />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </Provider>



    </div>
  );
}

export default App;
