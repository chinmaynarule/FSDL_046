import { useState } from "react";
import "./Form.css";

function Form() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!data.name) newErrors.name = "Name is required";

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Min 6 characters required";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    if (!data.gender) newErrors.gender = "Select gender";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("🎉 Form submitted successfully!");
    }
  };

  return (
    <div className="container">
    <h2 style={{ textAlign: "center" }}>Registration Form</h2>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={errors.name ? "error" : ""}
          />
          <p>{errors.name}</p>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className={errors.email ? "error" : ""}
          />
          <p>{errors.email}</p>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className={errors.password ? "error" : ""}
          />
          <p>{errors.password}</p>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Phone Number"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className={errors.phone ? "error" : ""}
          />
          <p>{errors.phone}</p>
        </div>

        <div className="input-group">
          <select
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            className={errors.gender ? "error" : ""}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <p>{errors.gender}</p>
        </div>

        <button type="submit">🚀 Submit</button>

        <p className="success">{success}</p>
      </form>
    </div>
  );
}

export default Form;