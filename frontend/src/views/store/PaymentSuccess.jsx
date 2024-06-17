import { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  const [order, setOrder] = useState([]); // État pour stocker les détails de la commande
  const [status, setStatus] = useState("Verifying"); // État pour afficher le statut du paiement

  const param = useParams(); // Récupération des paramètres d'URL, notamment 'order_oid'

  // Récupération du paramètre 'session_id' depuis l'URL
  const urlParam = new URLSearchParams(window.location.search);
  const sessionId = urlParam.get("session_id");

  console.log(param.order_oid); // Affichage dans la console pour vérification
  console.log(sessionId); // Affichage dans la console pour vérification

  // Effet pour charger les détails de la commande à partir de l'API
  useEffect(() => {
    apiInstance.get(`checkout/${param.order_oid}`).then((res) => {
      setOrder(res.data); // Met à jour l'état 'order' avec les données de la commande récupérées
    });
  }, [param]); // Déclenché à chaque changement dans 'param'

  // Effet pour envoyer le statut du paiement à l'API
  useEffect(() => {
    const formdata = new FormData();
    formdata.append("order_oid", param?.order_oid); // Ajoute 'order_oid' au formulaire
    formdata.append("session_id", sessionId); // Ajoute 'session_id' au formulaire

    // Appel à l'API pour enregistrer le statut du paiement
    apiInstance.post(`payment-success/${order.oid}/`, formdata).then((res) => {
      // Met à jour le statut en fonction de la réponse de l'API
      if (res.data.message === "Payment Successfull") {
        setStatus("Payment Successfull");
      }
      if (res.data.message === "Already Paid") {
        setStatus("Already Paid");
      }
      if (res.data.message === "your Invoice is unpaid") {
        setStatus("your Invoice is unpaid");
      }
      console.log(res.data); // Affiche la réponse de l'API dans la console
    });
  }, [param?.order_oid]); // Déclenché à chaque changement dans 'param?.order_oid'

  // Rendu du composant

  return (
    <main className="mb-4 mt-4 h-100">
      <div className="container">
        {/* Section: Checkout form */}
        <section className="">
          <div className="gx-lg-5">
            <div className="row pb50">
              <div className="col-lg-12">
                <div className="dashboard_title_area">
                  <h4 className="fw-bold text-center mb-4 mt-4">
                    Checkout Successfull <i className="fas fa-check-circle" />{" "}
                  </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="application_statics">
                  <div className="account_user_deails dashboard_page">
                    <div className="d-flex justify-content-center align-items-center">
                      {status === "Verifying" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-warning" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-spinner fa-spin text-warning"
                                style={{ fontSize: 100, color: "yellow" }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>Payment Verifying </h1>
                              <p>
                                <b className="text-success">
                                  {" "}
                                  Please hold on , while we verify your payment
                                </b>
                                <br />
                                <b className="text-danger">
                                  Note: Do not reload or leave the page{" "}
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "your Invoice is unpaid" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-danger" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-ban text-danger"
                                style={{ fontSize: 100, color: "red" }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>
                                Unpaid Invoice <i className="fas fa-ban"></i>
                              </h1>
                              <p>
                                <b className="text-danger">
                                  Please try making the payment again{" "}
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "Payment Successfull" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>Thank You !</h1>
                              <p>
                                Thanks for your purchase, please note your order
                                id <b>#{order.oid}</b>
                              </p>
                              <p>
                                Your checkout was successfull, we have sent the
                                order detail to your email<b>({order.email})</b>
                              </p>
                              <button
                                className="btn btn-success mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                View Order <i className="fas fa-eye" />{" "}
                              </button>
                              
                              <a className="btn btn-secondary mt-3 ms-2">
                                <Link to="/" style={{ color: "white" }}>
                                  {""}
                                  Go Home <i className="fas fa-arrow-left" />
                                </Link>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      {status === "Already Paid" && (
                        <div className="col-lg-12">
                          <div className="border border-3 border-success" />
                          <div className="card bg-white shadow p-5">
                            <div className="mb-4 text-center">
                              <i
                                className="fas fa-check-circle text-success"
                                style={{ fontSize: 100, color: "green" }}
                              />
                            </div>
                            <div className="text-center">
                              <h1>Already Paid !</h1>
                              <p>
                                Thanks for your purchase, please note your order
                                id <b>#{order.oid}</b>
                              </p>
                              <p>
                                Your checkout was successfull, we have sent the
                                order detail to your email<b>({order.email})</b>
                              </p>
                              <button
                                className="btn btn-success mt-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                View Order <i className="fas fa-eye" />{" "}
                              </button>
                              
                              <a className="btn btn-secondary mt-3 ms-2">
                                <Link to="/" style={{ color: "white" }}>
                                  {" "}
                                  Go Home <i className="fas fa-arrow-left" />
                                </Link>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Order Summary
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="modal-body text-start text-black p-4">
                <h5
                  className="modal-title text-uppercase "
                  id="exampleModalLabel"
                >
                  {order.full_name}
                </h5>
                <h6>{order.email}</h6>
                <h6>{order.mobile}</h6>
                <h6 className="mb-5">
                  {order.address}
                  <br></br> {order.city}, {order.country}
                </h6>
                <p className="mb-0" style={{ color: "#35558a" }}>
                  Payment summary
                </p>
                <hr
                  className="mt-2 mb-4"
                  style={{
                    height: 0,
                    backgroundColor: "transparent",
                    opacity: ".75",
                    borderTop: "2px dashed #9e9e9e",
                  }}
                />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold mb-0">Sub total</p>
                  <p className="text-muted mb-0">£{order.sub_total}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Shipping Fee</p>
                  <p className="small mb-0">£{order.shipping_amount}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Tax</p>
                  <p className="small mb-0">£{order.tax_fee}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="small mb-0">Discount</p>
                  <p className="small mb-0">-£{order.saved}</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <p className="fw-bold">Total</p>
                  <p className="fw-bold" style={{ color: "#35558a" }}>
                    £{order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaymentSuccess;
