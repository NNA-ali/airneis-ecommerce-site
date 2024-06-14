import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import { CartContext } from "../plugin/Context";
import Swal from "sweetalert2";
import "/FilterPanel.css"; // Assurez-vous d'importer le fichier CSS

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function FilterPanel() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inStock, setInStock] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [cartCount, setCartCount] = useContext(CartContext);

  useEffect(() => {
    // Récupérer les matériaux disponibles
    apiInstance
      .get("all-materials/")
      .then((response) => {
        setMaterials(response.data.materials);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des matériaux:", error);
      });

    // Récupérer les catégories disponibles
    apiInstance
      .get("all-categories/")
      .then((response) => {
        let categories = response.data.categories || response.data;

        console.log("CAt :", categories)
        
        // Convertir chaque catégorie en chaîne de caractères
        categories = categories.map(category => String(category));
        
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });

    // Charger les produits avec filtres par défaut
    applyFilters();
  }, []);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const handleMaterialChange = (material) => {
    const updatedMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter((mat) => mat !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updatedMaterials);
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setInStock(false);
    setSelectedMaterials([]);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    if (selectedCategories.length > 0)
      params.append("categories", selectedCategories.join(","));
    if (inStock) params.append("in_stock", "false");
    if (selectedMaterials.length > 0)
      params.append("materials", selectedMaterials.join(","));

    const filterURL = `filter-products/?${params.toString()}`;
    console.log("Applying filters with URL:", filterURL);
    
    apiInstance
        .get(filterURL)
        .then((response) => {
            console.log("Filtered products:", response.data);
            setProducts(response.data);
        })
        .catch((error) => {
            console.error(
                "Erreur lors de la récupération des produits filtrés:",
                error
            );
        });
    apiInstance
      .get(`filter-products/?${params.toString()}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des produits filtrés:",
          error
        );
      });
  };

  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, selectedCategories, inStock, selectedMaterials]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Rendu du composant
  return (
    <div
      className={darkMode ? "dark-mode" : "light-mode"}
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="text-center mb-2">
        {darkMode ? (
          <LightModeIcon
            onClick={toggleDarkMode}
            style={{
              color: "white",
              cursor: "pointer",
              width: "40px",
              height: "40px",
            }}
          />
        ) : (
          <DarkModeIcon
            onClick={toggleDarkMode}
            style={{ cursor: "pointer", width: "40px", height: "40px" }}
          />
        )}
      </div>

      <div className="container filter-section">
        <div className="card">
          <h3 className="text-center mb-2">Filter Products</h3>
          <div className="filters-container">
            <div className="filter-group">
              <label htmlFor="minPrice" className="form-label">
                Min Price
              </label>
              <input
                id="minPrice"
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="maxPrice" className="form-label">
                Max Price
              </label>
              <input
                id="maxPrice"
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <h5>Categories</h5>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category?.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
            <div className="filter-group">
              <h5>Materials</h5>
              {materials?.map((material) => (
                <div key={material} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={material}
                    checked={selectedMaterials.includes(material)}
                    onChange={() => handleMaterialChange(material)}
                  />
                  <label className="form-check-label" htmlFor={material}>
                    {material?.charAt(0).toUpperCase() + material?.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <div className="filter-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="inStock"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                />
                <label className="form-check-label" htmlFor="inStock">
                  In Stock
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-primary me-2" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="btn btn-secondary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h3> Filtered Products</h3>
        <div className="row">
          {products.length > 0 ? (
            products?.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <Link
                        to={`/detail/${product.slug}`}
                        className="btn btn-primary"
                      >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
