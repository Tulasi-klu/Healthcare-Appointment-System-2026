import { useState } from "react";

function AdminAuth({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            email === "admin@gmail.com" &&
            password === "admin123"
        ) {
            onLogin({
                name: "Administrator",
                email: email,
            });
        } else {
            setMessage("Invalid admin email or password!");
        }
    };

    return (
        <div className="patient-auth">
            <h2>Admin Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default AdminAuth;