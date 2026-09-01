// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

export function RegisterPage() {
  const { user, login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Zaten girişliyse, register'a gerek yok
  if (user) {
    return (
      <section className="auth-layout">
        <div className="auth-card">
          <h1 className="page-title">Account already exists</h1>
          <p className="page-subtitle">
            You&apos;re currently signed in. You can update your details in your
            profile.
          </p>
          <div className="checkout-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Back to catalog
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/profile")}
            >
              Go to profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Demo register: hesap yoksa yarat + otomatik giriş
    // login fonksiyonu artık profileOverrides da alıyor
    login(email, {
      name: name || undefined,
      phone,
      defaultAddress,
    });

    addToast("Account created and you are now signed in.", "success");
    navigate("/profile");
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <h1 className="page-title">Create account</h1>
        <p className="page-subtitle">
          Set up a profile used for same-day bouquet deliveries in Warsaw.
        </p>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="name">Display name</label>
            <input
              id="name"
              type="text"
              placeholder="How we address you in notifications"
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
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </div>
        </form>

        <p
          className="page-subtitle"
          style={{ marginTop: "0.8rem", fontSize: "0.8rem" }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#c2a368" }}>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
