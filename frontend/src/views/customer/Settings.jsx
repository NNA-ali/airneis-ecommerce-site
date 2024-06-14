import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Import du composant Sidebar
import apiInstance from "../../utils/axios"; // Import de l'instance Axios pour les requêtes API
import UserData from "../plugin/UserData"; // Import de la fonction UserData pour récupérer les données utilisateur
import Swal from "sweetalert2"; // Import de SweetAlert2 pour les notifications
import moment from "moment"; // Import de Moment.js pour la gestion des dates

function Settings() {
  const [profile, setProfile] = useState({}); // État local pour stocker les données de profil

  // Fonction pour récupérer les données de profil depuis l'API
  const fetchProfileData = () => {
    apiInstance.get(`user/profile/${UserData()?.user_id}`).then((res) => {
      console.log("RES DATA :", res.data);
      setProfile(res.data); // Met à jour les données de profil avec la réponse de l'API
    });
  };

  // Effet pour charger les données de profil au montage du composant
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Gestion du changement dans les champs de formulaire
  const handleInputChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value, // Met à jour l'état avec les nouvelles valeurs des champs
    });
  };

  // Gestion du changement de fichier image
  const handleImageChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.files[0], // Met à jour l'état avec le fichier image sélectionné
    });
    console.log(profile.image); // Affiche l'image dans la console (avant la mise à jour)
  };

  // Soumission du formulaire de mise à jour du profil
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    const formdata = new FormData(); // Crée un objet FormData pour envoyer les données au serveur
    const res = await apiInstance.get(`user/profile/${UserData()?.user_id}/`);

    // Vérifie si une nouvelle image a été sélectionnée
    if (profile.image && profile.image !== res.data.image) {
      formdata.append("image", profile.image); // Ajoute la nouvelle image à FormData si elle a changé
    }

    // Ajoute les autres champs du profil à FormData
    formdata.append("full_name", profile.full_name);
    formdata.append("country", profile.country);
    formdata.append("city", profile.city);
    formdata.append("address", profile.address);

    try {
      // Envoie une requête PATCH avec FormData pour mettre à jour le profil utilisateur
      await apiInstance.patch(
        `user/profile/${UserData()?.user_id}/`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Définit le type de contenu pour FormData
          },
        }
      );
      window.location.reload(); // Recharge la page après la mise à jour
    } catch (error) {
      console.log(error); // Affiche les erreurs éventuelles dans la console
    }
  };

  // Retourne le JSX du composant Settings
  return (
    <main className="mt-5">
      <div className="container">
        <section className="">
          <div className="row">
            <Sidebar />

            <div className="col-lg-9 mt-1">
              <section className="">
                <main className="mb-5" style={{}}>
                  <div className="container px-4">
                    <section className="">
                      <h3 className="mb-3">
                        {" "}
                        <i className="fas fa-gear fa-spin" /> Settings{" "}
                      </h3>
                      <form
                        encType="multipart/form-data"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Profile Image
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              aria-describedby="emailHelp"
                              onChange={handleImageChange}
                              name="image"
                            />
                          </div>

                          <div className="col-lg-12">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile.full_name}
                              onChange={handleInputChange}
                              name="full_name"
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.user?.email}
                              readOnly
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.user?.phone}
                              onChange={handleInputChange}
                              readOnly
                            />
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col-lg-6">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.address}
                              onChange={handleInputChange}
                              name="address"
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.city}
                              onChange={handleInputChange}
                              name="city"
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.state}
                              onChange={handleInputChange}
                              name="state"
                            />
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              value={profile?.country}
                              onChange={handleInputChange}
                              name="country"
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-5">
                          Save Changes
                        </button>
                      </form>
                    </section>
                  </div>
                </main>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Settings;
