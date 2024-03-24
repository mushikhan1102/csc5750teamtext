
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({

    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,

  })

  const navigate = useNavigate();
<<<<<<< HEAD
  const { name, email, password, error, loading } = data;
=======

>>>>>>> cab9cf3eb41ffe2722090e71563adb178fca7ef0
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc("users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }

  };


<<<<<<< HEAD
  
=======
  const { name, email, password, error, loading } = data;
>>>>>>> cab9cf3eb41ffe2722090e71563adb178fca7ef0
  return (
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>

        <div className="input_container">
          <label htmlFor="name">Name</label>
<<<<<<< HEAD
          <input type="text" name="" value={email} onChange={handleChange} />
=======
          <input type="text" name="name" value={name} onChange={handleChange} />
>>>>>>> cab9cf3eb41ffe2722090e71563adb178fca7ef0

        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={handleChange} />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>{loading ? "registering in ..." : "register"}

          </button>
        </div>

      </form>
    </section>
  )
<<<<<<< HEAD
};
=======
}
>>>>>>> cab9cf3eb41ffe2722090e71563adb178fca7ef0

export default Signup;