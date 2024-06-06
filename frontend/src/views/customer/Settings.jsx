import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import Swal from "sweetalert2";
import moment from "moment";

function Settings() {
  const [profile, setprofile] = useState({});

  const fetchProfileData = () => {
    apiInstance.get(`user/profile/${UserData()?.user_id}`).then((res) => {
      console.log("RES DATA :", res.data);
      setprofile(res.data);
    });
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleInputChange = (event) => {
    setprofile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };
  const handleImageChange = (event) => {
    setprofile({
      ...profile,
      [event.target.name]: event.target.files[0],
    });
    console.log(profile.image);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    const res = await apiInstance.get(`user/profile/${UserData()?.user_id}/`);
    if (profile.image && profile.image !== res.data.image) {
      formdata.append("image", profile.image);
    }
    formdata.append("full_name", profile.full_name);
    formdata.append("country", profile.country);
    formdata.append("city", profile.city);
    formdata.append("address", profile.address);

    try {
      await apiInstance.patch(
        `user/profile/${UserData()?.user_id}/`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
