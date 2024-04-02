import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const history = useNavigate();
    const { name, email, password, error, loading } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setData({ ...data, error: "All fields are required", loading: false });
            return; // Prevent further execution if validation fails
        }

        setData({ ...data, error: null, loading: true });

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });
            history("/"); // Redirect to homepage
        } catch (err) {
            setData({ ...data, error: err.message, loading: false });
        }
    };

    return (
        <section>
            <h3>Create An Account</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </div>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={handleChange}/>
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handleChange}/>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="btn_container">
                    <button className="btn" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Register;
