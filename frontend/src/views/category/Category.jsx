import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Category(title) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    apiInstance.get(`products/?category=${title.title}`).then((response) => {
      setProducts(response.data);
      console.log(products);
    });

    apiInstance.get(`category/`).then((response) => {
      const category = response.data.find(
        (element) => element.title === title.title
      );
      setCategory(category);
      console.log("category : ", category);

      window.scrollTo(0, 0);
    });
  }, [title]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

      <div className="row justify-content-center m-0"
      style={
        !darkMode
          ? { backgroundColor: "transparent" }
          : { backgroundColor: "#1e1e1e" }
      }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "600px",
          }}
        >
          <img
            src={category.image}
            width={"80%"}
            style={{ objectFit: "cover", borderRadius: "20px", padding : "0px 70px" }}
          />
        </div>
        <h1
          style={ darkMode ? { padding: "15px 0px", textAlign: "center", color:'#ffff' }:{padding: "15px 0px", textAlign: "center", color:'#1e1e1e'}}
        > {`Products in ${title.title} Category`}</h1>
        {products.map(
          (product, index) =>
            product.category.title === title.title && (
              <div
                className="col-lg-4 col-md-6 mb-4"
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
                  <br
                      style={
                        !darkMode
                          ? { backgroundColor: "transparent" }
                          : { backgroundColor: "#1e1e1e" }
                      }
                    ></br>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                  />
                  <div className="card-body" style={darkMode ? { color: "#fff" } : { color: "#1e1e1e" }}>
                    <h5 className="card-title" style={darkMode ? { color: "#fff" } : { color: "#1e1e1e" }}>{product.title}</h5>
                    <p className="card-text">{product.price}€</p>
                    <Link
                      to={`/detail/${product.slug}/`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Category;
