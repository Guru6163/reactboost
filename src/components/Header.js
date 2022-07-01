import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Badge } from 'primereact/badge';
import { Menubar } from 'primereact/menubar';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'

function Header({ setSelectedCategory, selectedCategory }) {
  const navigate = useNavigate()
  const { data, isLoading, loadError } = useApi(
    "https://fakestoreapi.com/products/categories",
    []
  );
  useEffect(() => {
    if (data.length > 0) {
      setSelectedCategory(data[0]);
    }
  }, [data]);

  const state = useSelector((state) => Object.keys(state.cart).length)
  console.log("State", state)
  const items = [
    {
      label: <div style={{ fontSize: "30px", letterSpacing: "0.3rem", fontWeight: "600" }}>Valarona</div>,
    },
    {
      label: 'Electronics',
      icon: 'pi pi-fw pi-user',
      command: () => { setSelectedCategory("electronics") }

    },
    {
      label: 'Jewellery',
      icon: 'pi pi-fw pi-user',
      command: () => { setSelectedCategory("jewelery") }

    },
    {
      label: "Men's Clothing",
      icon: 'pi pi-fw pi-calendar',
      command: () => { setSelectedCategory("men's clothing") }

    },
    {
      label: "Women's Clothing",
      icon: 'pi pi-fw pi-power-off',
      command: () => { setSelectedCategory("women's clothing") }
    },
    {
      label: "Logout",
      icon: 'pi pi-fw pi-power-off',
      command: () => { navigate("/") }
    }
  ];

  const handleCart = (e) => {

  }

  const end = <div>
    <Button onClick={handleCart} style={{ marginRight: "20px" }} label="Cart"> <Badge value={state}></Badge></Button>
    <Button label={"Hello " + window.sessionStorage.getItem("userName")}></Button>
  </div>;


  return (
    <div >
      <Menubar model={items} end={end} />
    </div>
  );
}


export default Header;
