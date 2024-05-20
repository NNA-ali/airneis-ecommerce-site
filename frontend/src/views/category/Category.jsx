import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";

function Category(title) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    apiInstance.get(`products/?category=${title.title}`).then((response) => {
      setProducts(response.data);
      console.log(products);
    });
  

  apiInstance.get(`category/`).then((response) => {
    const category = response.data.find((element) => element.title === title.title);
    setCategory(category);
    console.log("category : ", category);

    window.scrollTo(0, 0);
  });
}, [title]);

  return (
    <div id="category-container" className="container mt-5">
      <div className="row">
        <div style={{display : "flex", justifyContent : 'center', width : "100%", height : "600px"}}>
          <img src={category.image} width={"100%"} style={{objectFit : 'cover', borderRadius:"20px"}}  />
        </div>
      <h1 style={{padding : '15px 0px', textAlign : 'center'}}>{`Products in ${title.title} Category`}</h1>
        {products.map((product, index) => product.category.title === title.title && (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}€</p>
                <Link to={`/detail/${product.slug}/`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
