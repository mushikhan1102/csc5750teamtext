import React, { useState, useEffect } from "react";
import Camera from "../components/images/camera";
import Img from "../image1.jpg";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../components/images/Delete";
import { useNavigate } from "react-router-dom";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
        setBio(docSnap.data().bio || "");
      }
    });
  }, []);

  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`);
        try {
          if (user?.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
            bio: bio,
          });

          setImg("");
        } catch (err) {
          console.error("Error uploading image: ", err);
          setError(err.message);
        }
      };
      uploadImg();
    }
  }, [img, bio, user?.avatarPath]);

  const deleteImage = async () => {
    const confirm = window.confirm("Delete avatar?");
    if (confirm && user?.avatarPath) {
      try {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
          bio: bio,
        });
        history.replace("/");
      } catch (err) {
        console.error("Error deleting image: ", err);
        setError(err.message);
      }
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const saveBio = async () => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        bio: bio,
      });
      alert("Bio updated successfully!");
    } catch (err) {
      console.error("Error updating bio: ", err);
      alert("Failed to update bio.");
      setError(err.message);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email, // User's email
      oldPassword // User's old password
    );

    try {
      // Reauthenticate user
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Failed to update password: ", err);
      setError("Failed to update password. " + err.message);
    }
  };

 // ...

return user ? (
  <section>
    <div className="profile_container">
      <div className="img_container">
        <img src={user.avatar || Img} alt="avatar" />
        <div className="overlay">
          <div>
            <label htmlFor="photo">
              <Camera />
            </label>
            {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="text_container">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <hr />
        <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        <div className="bio_container" style={{ marginTop: '1rem' }}>
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Write about yourself..."
            rows={3}
            className="bio_textarea"
          />
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={saveBio} className="save_bio_button">
              Save Bio
            </button>
          </div>
        </div>
        <div className="password_container" style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              className="password_input"
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="password_input"
            />
          </div>
          <button onClick={handlePasswordChange} className="password_button">
            Change Password
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  </section>
) : null;

// ...

};

export default Profile;
