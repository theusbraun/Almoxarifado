import React from 'react';
import { Link } from 'react-router-dom';
import iconERP from './erp.png'
import './bar.css'

const Menu = () => {
  return (
    <nav className="Sidebar">
      <ul className="SidebarList">
        <img className="SidebarList" src={iconERP}></img>
        <li className="row" >
          <Link className="row" to="/">Home</Link>
        </li>
        <li className="row" >
          <Link className="row" to="/register">Register</Link>
        </li>
        <li className="row" >
          <Link className="row" to="/Produtos">Produtos</Link>
        </li>
        <li className="row" >
          <Link className="row" to="/Grupos">Grupos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;