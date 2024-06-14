import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Import du composant Sidebar
import { Link } from "react-router-dom"; // Import de Link pour la navigation
import apiInstance from "../../utils/axios"; // Import de l'instance Axios pour les requêtes API
import UserData from "../plugin/UserData"; // Import de la fonction UserData pour récupérer les données utilisateur
import moment from "moment"; // Import de Moment.js pour la gestion des dates

function Orders() {
  const [orders, setOrders] = useState([]); // État local pour stocker les commandes
  const userData = UserData(); // Appel de la fonction UserData pour récupérer les informations de l'utilisateur connecté

  useEffect(() => {
    // Effet pour charger les commandes de l'utilisateur depuis l'API
    apiInstance.get(`customer/orders/${userData?.user_id}/`).then((res) => {
      setOrders(res.data); // Met à jour les commandes avec la réponse de l'API
      console.log(orders); // Affiche les commandes dans la console (avant la mise à jour)
    });
  }, []); // Déclenché une seule fois au montage du composant

  // Calcul du nombre de commandes par statut
  const statusCounts = orders.reduce((counts, order) => {
    const status = order.order_status;
    counts[status] = (counts[status] || 0) + 1; // Incrémente le compteur pour chaque statut de commande
    return counts;
  }, {});

  // Retourne le JSX du composant Orders
  return (
    <main className="mt-5">
      <div className="container">
        <section className="">
          <div className="row">
            <Sidebar /> {/* Composant Sidebar */}
            <div className="col-lg-9 mt-1">
              <main className="mb-5" style={{}}>
                <div className="container px-4">
                  <section className="mb-5">
                    <h3 className="mb-3">
                      <i className="fas fa-shopping-cart text-primary" />{" "}
                      Orders{" "}
                    </h3>
                    <div className="row gx-xl-5">
                      {/* Blocs pour afficher le résumé des commandes par statut */}
                      <div className="col-lg-4 mb-4 mb-lg-0">
                        <div
                          className="rounded shadow"
                          style={{ backgroundColor: "#B2DFDB" }}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="">
                                <p className="mb-1">Orders</p>
                                <h2 className="mb-0">
                                  {orders?.length}
                                  <span
                                    className=""
                                    style={{ fontSize: "0.875rem" }}
                                  ></span>
                                </h2>
                              </div>
                              <div className="flex-grow-1 ms-5">
                                <div className="p-3 badge-primary rounded-4">
                                  <i
                                    className="fas fa-shopping-cart fs-4"
                                    style={{ color: "#004D40" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4 mb-lg-0">
                        <div
                          className="rounded shadow"
                          style={{ backgroundColor: "#D1C4E9" }}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="">
                                <p className="mb-1">Pending Delivery</p>
                                <h2 className="mb-0">
                                  {statusCounts.pending}
                                  <span
                                    className=""
                                    style={{ fontSize: "0.875rem" }}
                                  ></span>
                                </h2>
                              </div>
                              <div className="flex-grow-1 ms-5">
                                <div className="p-3 badge-primary rounded-4">
                                  <i
                                    className="fas fa-clock fs-4"
                                    style={{ color: "#6200EA" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 mb-4 mb-lg-0">
                        <div
                          className="rounded shadow"
                          style={{ backgroundColor: "#BBDEFB" }}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="">
                                <p className="mb-1">Fulfilled Orders</p>
                                <h2 className="mb-0">
                                  {statusCounts.fulfilled || 0}
                                  <span
                                    className=""
                                    style={{ fontSize: "0.875rem" }}
                                  ></span>
                                </h2>
                              </div>
                              <div className="flex-grow-1 ms-5">
                                <div className="p-3 badge-primary rounded-4">
                                  <i
                                    className="fas fa-check-circle fs-4"
                                    style={{ color: "#01579B" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* Section: Détails des commandes */}
                  <section className="">
                    <div className="row rounded shadow p-3">
                      <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                        <table className="table align-middle mb-0 bg-white">
                          <thead className="bg-light">
                            <tr>
                              <th>Order ID</th>
                              <th>Payment Status</th>
                              <th>Order Status</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((o, index) => (
                              <tr key={index}>
                                <td>
                                  <p className="fw-bold mb-1">#{o.oid}</p>
                                  <p className="text-muted mb-0">
                                    {moment(o.date).format("D MMM, YYYY")}
                                  </p>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">
                                    {o.payment_status}
                                  </p>
                                </td>
                                <td>
                                  <p className="fw-normal mb-1">
                                    {o.order_status}
                                  </p>
                                </td>
                                <td>
                                  <span className="fw-normal mb-1">
                                    £{o.total}
                                  </span>
                                </td>
                                <td>
                                  {/* Liens vers les détails et la facture de la commande */}
                                  <Link
                                    to={`/customer/orders/${o.oid}/`}
                                    className="btn btn-link btn-sm btn-rounded"
                                  >
                                    View <i className="fas fa-eye" />
                                  </Link>
                                  <Link
                                    to={`/customer/invoice/${o.oid}/`}
                                    className="btn btn-link btn-sm btn-rounded"
                                  >
                                    Invoice{" "}
                                    <i className="fas fa-file-invoice" />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <canvas id="myChart" style={{ width: "100%" }} />
                    </div>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Orders;
