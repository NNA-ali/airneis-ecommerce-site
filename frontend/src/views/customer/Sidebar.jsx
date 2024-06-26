import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';

function Sidebar() {
  const [profile, setProfile] = useState({}); // État pour stocker les données de profil
  const userData = UserData(); // Récupère les données utilisateur depuis le plugin

  // Effet pour charger les données de profil utilisateur au montage du composant
  useEffect(() => {
    apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
      setProfile(res.data); // Met à jour les données de profil avec la réponse de l'API
    });
  }, []);

  // Rendu du composant Sidebar
  return (
    

<div className="col-lg-3">
    <>
        <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
            <img
                src={profile.image}
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                alt=""
            />
            <div className="text-center">
                <h3 className="mb-0">{profile.full_name}</h3>
                <p className="mt-0">
                    <Link to="/customer/settings/"><i className='fas fa-edit me-2'></i> Edit Account</Link>
                </p>
            </div>
        </div>
        <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <Link to={'/customer/account/'} className="fw-bold text-dark"> <i className='fas fa-user me-2'></i> Account</Link>
                </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <Link to={'/customer/orders/'} className="fw-bold text-dark"><i className='fas fa-shopping-cart me-2'></i>Orders</Link>
                </div>
                <span className="badge bg-primary rounded-pill"></span>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <Link to={'/customer/notifications/'} className="fw-bold text-dark"><i className='fas fa-bell fa-shake me-2'></i> Notification</Link>
                </div>
                <span className="badge bg-primary rounded-pill"></span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <Link to={'/customer/settings/'} className="fw-bold text-dark"><i className='fas fa-gear fa-spin me-2'></i> Setting</Link>
                </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <Link to="/logout" className="fw-bold text-danger"><i className='fas fa-sign-out me-2'></i> Logout</Link>
                </div>
            </li>
        </ol>
    </>
</div>
  )
}

export default Sidebar