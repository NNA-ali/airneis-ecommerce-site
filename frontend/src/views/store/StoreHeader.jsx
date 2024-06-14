import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { CartContext } from "../plugin/Context";

function StoreHeader() {
  // État d'authentification et données de l'utilisateur
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  // Nombre d'articles dans le panier récupéré depuis le contexte
  const cartCount = useContext(CartContext);
  console.log(cartCount); // Affichage dans la console pour vérification

  // État local pour gérer la valeur du champ de recherche
  const [search, setSearch] = useState("");

  // Fonction pour mettre à jour 'search' lorsqu'il y a un changement dans le champ de recherche
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(search); // Affichage dans la console pour vérification
  };

  // Hook de navigation pour rediriger l'utilisateur vers la page de recherche avec le terme de recherche spécifié
  const navigate = useNavigate();
  const handleSearchSubmit = () => {
    navigate(`/search?query=${search}`);
  };

  // Rendu du composant de l'en-tête de magasin
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src="https://airneis-ecommerce-bucket.s3.eu-north-1.amazonaws.com/static/vendor/Logo4_airneis_store-removebg-preview.png"
              alt="Airneis Logo"
              style={{ height: "40px", width: "auto", objectFit: "contain",backgroundColor:"white" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* ... (autres éléments de menu) */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to={"/customer/account/"} className="dropdown-item">
                      <i className="fas fa-user"></i> Account
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`cart/`}>
                      <i className="fas fa-shopping-cart"></i> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/`}>
                      <i className="fas fa-home"></i> Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/customer/notifications/`}
                    >
                      <i className="fas fa-bell fa-shake"></i> Notifications
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/customer/settings/`}>
                      <i className="fas fa-gear fa-spin"></i> Settings
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <input
                onChange={handleSearchChange}
                name="search"
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={handleSearchSubmit}
                className="btn btn-outline-success me-2"
                type="button"
              >
                Search
              </button>
              <Link
                to="/filter"
                className="btn btn-outline-primary me-2"
                type="button"
              >
                Filtrer
              </Link>
            </div>
            {isLoggedIn() ? (
              <>
                <Link className="btn btn-primary me-2" to="/logout">
                  Logout
                </Link>
                <Link className="btn btn-primary me-2" to="/Dashboard">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-primary me-2" to="/login">
                  login
                </Link>
                <Link className="btn btn-primary me-2" to="/Register">
                  Register
                </Link>
              </>
            )}
            <Link className="btn btn-danger" to="/cart/">
              <i className="fas fa-shopping-cart"></i>{" "}
              <span id="cart-total-items">{cartCount}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StoreHeader;
