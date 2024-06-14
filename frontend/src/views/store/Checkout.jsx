import React, { useState, useEffect, useRef } from "react";
import apiInstance from "../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../utils/constants";

function Checkout() {
  const [order, setOrder] = useState([]); // État pour stocker les données de la commande
  const [couponCode, setCouponCode] = useState(""); // État pour le code de coupon
  const [paymentLoading, setPaymentLoading] = useState(false); // État pour le chargement du paiement

  const param = useParams(); // Récupère les paramètres d'URL
  const navigate = useNavigate(); // Hook de navigation

  // Fonction pour récupérer les données de la commande depuis l'API
  const fetchOrderData = () => {
    apiInstance.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  };

  // Effet pour charger les données de la commande au montage du composant
  useEffect(() => {
    fetchOrderData();
  }, []);

  // Fonction pour appliquer un coupon à la commande
  const applyCoupon = async () => {
    console.log(couponCode); // Affiche le code de coupon dans la console
    console.log(param.order_oid); // Affiche l'ID de commande dans la console

    const formdata = new FormData();
    formdata.append("order_oid", order.oid); // Ajoute l'ID de commande au formulaire
    formdata.append("coupon_code,", couponCode); // Ajoute le code de coupon au formulaire

    try {
      const response = await apiInstance.post("coupon/", formdata); // Envoie la demande d'application du coupon
      fetchOrderData(); // Met à jour les données de la commande après l'application du coupon
      console.log(response.data.message); // Affiche le message de réponse dans la console
      // Affiche une alerte à l'utilisateur avec l'icône et le message de réponse
      Swal.fire({
        icon: response.data.icon,
        title: response.data.message,
      });
    } catch (error) {
      console.log(error); // Affiche les erreurs éventuelles dans la console
    }
  };

  // Fonction pour initier le paiement avec Stripe
  const payWithStripe = (event) => {
    event.preventDefault();
    setPaymentLoading(true); // Active le chargement du paiement

    // Soumet le formulaire de paiement s'il est disponible dans la référence actuelle
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  // Effet pour soumettre automatiquement le formulaire de paiement lorsque 'paymentLoading' change
  useEffect(() => {
    if (paymentLoading && formRef.current) {
      formRef.current.submit();
    }
  }, [paymentLoading]);

  // Référence pour le formulaire de paiement
  const formRef = useRef(null);

  // Rendu du composant Checkout
  return (
    <main className="mb-4 mt-4">
      <div className="container">
        {/* Section: Checkout form */}
        <section className="">
          <div className="row gx-lg-5">
            <div className="col-lg-8 mb-4 mb-md-0">
              {/* Section: Biling details */}
              <section className="">
                <div className="alert alert-warning">
                  <strong>Review Your Shipping &amp; Order Details </strong>
                </div>
                <form>
                  <h5 className="mb-4 mt-4">Shipping address</h5>
                  {/* 2 column grid layout with text inputs for the first and last names */}
                  <div className="row mb-4">
                    <div className="col-lg-12">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          name="fullName"
                          value={order.full_name}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          Email
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.email}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          Mobile
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.mobile}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          Address
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.address}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          City
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.city}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          State
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.state}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mt-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="form6Example2">
                          Country
                        </label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={order.country}
                        />
                      </div>
                    </div>
                  </div>

                  <h5 className="mb-4 mt-4">Billing address</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form6Example8"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="form6Example8">
                      Same as shipping address
                    </label>
                  </div>
                </form>
              </section>
              {/* Section: Biling details */}
            </div>
            <div className="col-lg-4 mb-4 mb-md-0">
              {/* Section: Summary */}
              <section className="shadow-4 p-4 rounded-5 mb-4">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-3">
                  <span>Sub total </span>
                  <span>${order.sub_total}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping </span>
                  <span>${order.shipping_amount}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax </span>
                  <span>${order.tax_fee}</span>
                </div>

                {order.saved !== "0.00" && (
                  <div className="d-flex text-danger justify-content-between mb-3">
                    <span>Discount </span>
                    <span>-${order.saved}</span>
                  </div>
                )}

                <hr className="my-4" />
                <div className="d-flex justify-content-between fw-bold mb-5">
                  <span>Total </span>
                  <span>${order.total}</span>
                </div>
                <div className="shadow rounded-4 card p-4 mb-4 rounded-5">
                  <h5 className="mb-4"> Apply Promo Code </h5>

                  <>
                    <input
                      name="couponCode"
                      type="text"
                      className="form-control"
                      style={{ border: "dashed 1px gray" }}
                      placeholder="Enter Coupon Code"
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <br></br>
                    <button type="button" onClick={applyCoupon}>
                      {" "}
                      Apply{" "}
                    </button>
                  </>
                </div>

                {console.log("ORDER OID : ", order?.oid)}
                {console.log(
                  "URL CHECKOUT : ",
                  `${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`
                )}

                {paymentLoading === true && (
                  <form
                    ref={formRef}
                    action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`}
                    method="POST"
                  >
                    <button
                      onClick={payWithStripe}
                      disabled
                      type="submit"
                      className="btn btn-primary btn-rounded w-100"
                    >
                      Processing... <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  </form>
                )}

                {paymentLoading === false && (
                  <form
                    ref={formRef}
                    action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`}
                    method="POST"
                  >
                    <button
                      onClick={payWithStripe}
                      type="submit"
                      className="btn btn-primary btn-rounded w-100"
                    >
                      Pay With Stripe <i className="fas fa-credit-card"></i>
                    </button>
                  </form>
                )}
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
