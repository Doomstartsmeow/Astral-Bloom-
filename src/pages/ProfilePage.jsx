// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Giriş yapılmamışsa
  if (!user) {
    return (
      <section className="auth-layout">
        <div className="auth-card">
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">
            You need to sign in before accessing your profile settings.
          </p>
          <div className="checkout-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Go to sign in
            </button>
          </div>
        </div>
      </section>
    );
  }

  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [defaultAddress, setDefaultAddress] = useState(
    user.defaultAddress ?? ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, defaultAddress });
    addToast("Profile updated.", "success");
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <h1 className="page-title">Profile settings</h1>
        <p className="page-subtitle">
          Manage your contact and default delivery details used for same-day
          orders in Warsaw.
        </p>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-field">
            <label htmlFor="email">Email (read-only in this demo)</label>
            <input id="email" type="email" value={user.email} disabled />
          </div>

          <div className="checkout-field">
            <label htmlFor="name">Display name</label>
            <input
              id="name"
              type="text"
              placeholder="How we address you"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="tel"
              placeholder="+48 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="defaultAddress">Default delivery address</label>
            <textarea
              id="defaultAddress"
              rows={3}
              placeholder="Street, building number, floor, venue..."
              value={defaultAddress}
              onChange={(e) => setDefaultAddress(e.target.value)}
            />
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Back to catalog
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
