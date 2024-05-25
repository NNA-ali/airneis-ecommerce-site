import React, { useState } from "react";
import Swal from 'sweetalert2';
import apiInstance from "../../utils/axios";

function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [fullName, setFullName] = useState(""); 
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('user', email);
            formData.append('message', message);
            formData.append('full_name', fullName);
            
            const response = await apiInstance.post(`contact/`, formData)
    
            if (response.data.success) {
                Swal.fire('Success', 'Message sent successfully!', 'success');
                setEmail('');
                setMessage('');
                setFullName('');
            } else {
                setError(response.data.error || 'An error occurred');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-5 col-md-8">
                    <div className="card rounded-5">
                        <div className="card-body p-4">
                            <h3 className="text-center">Contact Us</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="full_name">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Your Full Name"
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Your Message"
                                        required
                                        className="form-control"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </form>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
