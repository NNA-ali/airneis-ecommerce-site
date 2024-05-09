import React from 'react'

function StoreFooter() {
  return (
    <div >
      <footer className="bg-light text-center text-lg-start">
        {/* Grid container */}
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
              <strong>Get connected with us on social networks</strong>
            </div>
            <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
              {/* Facebook */}
              <a
                className="btn btn-primary btn-sm btn-floating me-2"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f" />
              </a>
              {/* Twitter */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter" />
              </a>
              {/* Pinterest */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#c61118" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-pinterest" />
              </a>
              {/* Youtube */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#ed302f" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-youtube" />
              </a>
              {/* Instagram */}
              <a
                className="btn text-white btn-sm btn-floating me-2"
                style={{ backgroundColor: "#ac2bac" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <hr className="my-3" />
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <p>
                <strong>About us</strong>
              </p>
              <p>
              Welcome to Airneis, your online destination for quality furniture.
               We offer a carefully curated selection to enhance your living space. 
               Explore our collection today and let us help you create the home of your dreams. 
              At Airneis, style and quality are our commitment.
              </p>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <p>
                <strong>Useful links</strong>
              </p>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-dark">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Media
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Job offers
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Cooperation
                  </a>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <p>
                <strong>Products</strong>
              </p>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-dark">
                    Storage
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Bed
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Couch
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Desk
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Dinner Table
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Office Chair
                  </a>
                </li>
                
              </ul>
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-lg-2 mb-4 mb-lg-0">
              <p>
                <strong>Support</strong>
              </p>
              <ul className="list-unstyled">
               
                <li>
                  <a href="#!" className="text-dark">
                    Help center
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-dark">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
        {/* Copyright */}
      </footer>

    </div>
  )
}

export default StoreFooter