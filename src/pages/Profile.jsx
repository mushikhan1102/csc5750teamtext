import React, { useState, useEffect } from "react";
import Camera from "../components/images/camera";
import Img from "../image1.jpg";
import { storage, db, auth } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../components/images/Delete";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const [bio, setBio] = useState("");
  const history = useNavigate("");

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        setBio(docSnap.data().bio || "");
      }
    });
  }, []);

  useEffect(() => {
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
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
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img, bio]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm && user?.avatarPath) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
          bio: bio,
        });
        history.replace("/");
      }
    } catch (err) {
      console.log(err.message);
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
      console.log(err.message);
      alert("Failed to update bio.");
    }
  };

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
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
