import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import GetCurrentAddress from "../plugin/UserCountry";
import UserData from "../plugin/UserData";
import CartID from "../plugin/cartID";
import Swal from "sweetalert2";// Importation de la bibliothèque SweetAlert pour les alertes visuelles
import { Carousel } from "react-bootstrap";// Importation d'un composant Carousel de React Bootstrap
import { CartContext } from "../plugin/Context";

import DarkModeIcon from "@mui/icons-material/DarkMode";// Importation d'une icône de thème sombre de Material-UI
import LightModeIcon from "@mui/icons-material/LightMode";// Importation d'une icône de thème clair de Material-UI

/**
 * Gère la page des produits
 * @returns {JSX.Element} Un élément bouton.
 */
function Products() {

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const [colorValue, setColorValue] = useState("No Color");
  const [sizeValue, setSizeValue] = useState("No Size");
  const [qtyValue, setQtyValue] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSize, setSelectedSize] = useState({});

  const [cartCount, setCartCount] = useContext(CartContext);

  const currentAddress = GetCurrentAddress();
  const userData = UserData();
  const cart_id = CartID();

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/category/${categoryTitle}`);
  };
 // Chargement initial des produits en filtrant ceux qui sont mis en avant
  useEffect(() => {
    apiInstance.get(`products/`).then((response) => {
      const featuredProducts = response.data.filter(
        (product) => product.featured
      );
      setProducts(featuredProducts);
    });
    console.log("prod : ", products);
  }, []);
 // Chargement initial des catégories disponibles
  useEffect(() => {
    apiInstance.get(`category/`).then((response) => {
      setCategory(response.data);
    });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
// Gestion du clic sur un bouton de couleur pour un produit spécifique
  const handleColorButtonClick = (event, product_id, colorName) => {
    setColorValue(colorName);
    setSelectedProduct(product_id);
    setSelectedColors((prevSelectedColors) => ({
      ...prevSelectedColors,
      [product_id]: colorName,
    }));
  };
// Gestion du clic sur un bouton de taille pour un produit spécifique
  const handleSizeButtonClick = (event, product_id, size) => {
    const formattedSize = `${size.length} x ${size.width}`;
    setSizeValue(formattedSize);
    setSelectedProduct(product_id);
    setSelectedSize((prevSelectedSize) => ({
      ...prevSelectedSize,
      [product_id]: size,
    }));
  };
// Gestion du changement de quantité pour un produit spécifique
  const handleQtyChange = (event, product_id) => {
    setQtyValue(event.target.value);
    setSelectedProduct(product_id);
  };
// Ajout d'un produit au panier avec les détails spécifiés
  const handleAddToCart = async (product_id, price, shipping_amount) => {
    const formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("user_id", userData?.user_id);
    formdata.append("qty", qtyValue);
    formdata.append("price", price);
    formdata.append("shipping_amount", shipping_amount);
    formdata.append("country", currentAddress.country);
    formdata.append("size", sizeValue);
    formdata.append("color", colorValue);
    formdata.append("cart_id", cart_id);

    try {
      const response = await apiInstance.post(`cart-view/`, formdata);
      // Mise à jour du nombre d'articles dans le panier après ajout
      const url = userData
        ? `cart-list/${cart_id}/${userData?.user_id}/`
        : `cart-list/${cart_id}/`;
      apiInstance.get(url).then((res) => {
        setCartCount(res.data.length);
      });
      // Affichage d'une alerte de succès après ajout au panier
      Swal.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit au panier:", error);
    }
  };
  const styles = {
    inStock: {
      color: "green",
      fontWeight: "bold",
      animation: "pulse 2s infinite",
    },
    outOfStock: {
      color: "red",
      fontWeight: "bold",
      textDecoration: "line-through",
      opacity: 0.7,
    },
    pulseKeyframes: `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `,
  };
  return (
    <div
      className={darkMode ? "dark-mode" : "light-mode"}
      style={
        darkMode
          ? { backgroundColor: "#1e1e1e" }
          : { backgroundColor: "transparent" }
      }
    >
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
      <Carousel style={{ paddingRight: "0px" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://img.freepik.com/photos-premium/salon-decore-meubles-minimalistes_7023-180375.jpg?w=996"
            style={{
              maxWidth: "90%",
              margin: "0 auto",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "60px",
            }}
            alt="Image 3"
          />
          <Carousel.Caption>
            <h3>Luxury Living Room Set</h3>
            <p>Experience the epitome of comfort and elegance.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.architecteinterieurs.com/mobilier-haut-de-gamme/wp-content/uploads/2019/07/San-Marco.jpeg"
            style={{
              maxWidth: "90%",
              margin: "0 auto",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "60px",
            }}
            alt="Image 2"
          />
          <Carousel.Caption>
            <h3>Luxurious Bed Collection</h3>
            <p>Indulge in unparalleled relaxation and style.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={
              "https://www.architecteinterieurs.com/mobilier-haut-de-gamme/wp-content/uploads/2019/07/chaise-turri-eclipse.jpg"
            }
            style={{
              maxWidth: "90%",
              margin: "0 auto",
              paddingLeft: "50px",
              paddingRight: "50px",
              paddingTop: "60px",
            }}
            alt="Image 2"
          />
          <Carousel.Caption>
            <h3>Elegant Dining Table Ensemble</h3>
            <p>Elevate your dining experience with sophistication.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div
        className="row justify-content-center mt-5 pt-3"
        style={{ marginRight: "0px" }}
      >
        {category?.map((c, index) => (
          <div key={index} className="col-lg-2 mb-5">
            <div
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(c.title)}
            >
              <img
                src={c.image}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt=""
              />
              <h6 style={darkMode ? { color: "#fff" } : { color: "#1e1e1e" }}>
                {c.title}
              </h6>
            </div>
          </div>
        ))}
      </div>

      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {products?.map((product, index) => (
                <div
                  className="col-lg-4 col-md-12 mb-4"
                  key={index}
                  style={
                    !darkMode
                      ? { backgroundColor: "transparent" }
                      : { backgroundColor: "#1e1e1e" }
                  }
                >
                  <div
                    className="card"
                    style={
                      darkMode
                        ? {
                            borderRadius: "30px",
                            backgroundColor: "#1e1e1e",
                            border: "1px solid grey",
                          }
                        : {
                            borderRadius: "30px",
                            backgroundColor: "transparent",
                            border: "1px solid #1e1e1e",
                          }
                    }
                  >
                    <div
                      className="bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      <br
                        style={
                          !darkMode
                            ? { backgroundColor: "transparent" }
                            : { backgroundColor: "#1e1e1e" }
                        }
                      ></br>
                      <Link to={`/detail/${product.slug}/`}>
                        <img
                          src={product.image}
                          className="w-100"
                          style={{ width: "100%" }}
                        />
                      </Link>
                    </div>
                    <div
                      className="card-body"
                      style={
                        !darkMode
                          ? { backgroundColor: "transparent", color: "#1e1e1e" }
                          : { backgroundColor: "transparent", color: "#fff" }
                      }
                    >
                      <Link
                        to={`/detail/${product.slug}/`}
                        href=""
                        className="text-reset"
                      >
                        <h5 className="card-title mb-3">{product.title}</h5>
                      </Link>
                      <a href="" className="text-reset">
                        <div>{product.category.title}</div>
                      </a>
                      <div className="d-flex justify-content-center">
                        <h6 className="mb-3">{product.price}£ </h6>
                        <h6 className="mb-3 text-muted ms-2">
                          <strike> {product.old_price} £ </strike>{" "}
                        </h6>
                      </div>
                      <br />
                      <br />
                      <div className="btn-group">
                        <button
                          style={
                            product.in_stock
                              ? {}
                              : { backgroundColor: "grey", borderColor: "grey" }
                          }
                          className={
                            product.in_stock
                              ? "btn btn-primary dropdown-toggle"
                              : "btn btn-primary dropdown-toggle disabled"
                          }
                          type="button"
                          id="dropdownMenuClickable"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="false"
                          aria-expanded="false"
                        >
                          Variation
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuClickable"
                        >
                          <div className="d-flex flex-column">
                            <li className="product-1">
                              <b>Quantity</b>
                            </li>
                            <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <input
                                  className="form-control"
                                  value={qtyValue}
                                  onChange={(e) =>
                                    handleQtyChange(e, product.id)
                                  }
                                  type="number"
                                />
                              </li>
                            </div>
                          </div>

                          {product.size?.length > 0 && (
                            <div className="d-flex flex-column">
                              <li className="product-1">
                                <b>Size:</b> :
                                {selectedSize[product?.id]
                                  ? `${selectedSize[product?.id].length} x ${selectedSize[product?.id].width}`
                                  : "select a size"}
                              </li>

                              <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.size?.map((size, index) => (
                                  <div key={index} className="me-2">
                                    <input
                                      type="hidden"
                                      className="size_name"
                                      value={`${size.length} x ${size.width}`}
                                    />

                                    <button
                                      onClick={(e) =>
                                        handleSizeButtonClick(
                                          e,
                                          product.id,
                                          size
                                        )
                                      }
                                      className="btn btn-secondary btn-sm me-2 mb-1"
                                    >
                                      {`${size.length} x ${size.width}`}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {product.color?.length > 0 && (
                            <div className="d-flex flex-column mt-3">
                              <li className="product-1">
                                <b>Color</b> :
                                {selectedColors[product.id] || "select a color"}
                              </li>
                              {product.color?.map((color, index) => (
                                <div className="product-1 mt-0 pt-0 d-flex flex-wrap">
                                  <li>
                                    <button
                                      className="btn btn-sm me-2 mb-1 product-3"
                                      style={{
                                        backgroundColor: `${color.color_code}`,
                                        border: `2px solid`,
                                      }}
                                      onClick={(e) =>
                                        handleColorButtonClick(
                                          e,
                                          product.id,
                                          color.name
                                        )
                                      }
                                    >
                                      {" "}
                                    </button>
                                  </li>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="d-flex mt-3 product-1">
                            <button
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                              onClick={() =>
                                handleAddToCart(
                                  product.id,
                                  product.price,
                                  product.shipping_amount
                                )
                              }
                            >
                              <i className="fas fa-shopping-cart" />
                            </button>
                            
                          </div>
                        </ul>

                        <div
                          style={{
                            marginleft: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={
                              product.in_stock
                                ? { ...styles.inStock, marginLeft: "10px" }
                                : { ...styles.outOfStock, marginLeft: "10px" }
                            }
                          >
                            {product.in_stock ? "in stock" : "out of stock"}
                          </div>
                          <style>{styles.pulseKeyframes}</style>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Products;
