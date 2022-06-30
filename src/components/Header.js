import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { Menubar } from 'primereact/menubar';

function Header({ setSelectedCategory, selectedCategory }) {

  const { data, isLoading, loadError } = useApi(
    "https://fakestoreapi.com/products/categories",
    []
  );
  useEffect(() => {
    if (data.length > 0) {
      setSelectedCategory(data[0]);
    }
  }, [data]);


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
      label:"Women's Clothing",
      icon: 'pi pi-fw pi-power-off',
      command: () => { setSelectedCategory("women's clothing") }
    },
    {
      label:"Logout",
      icon: 'pi pi-fw pi-power-off',
      command: () => { setSelectedCategory("women's clothing") }
    }
  ];



  return (
    <div >

      <Menubar model={items} />


    </div>
  );
}


export default Header;
