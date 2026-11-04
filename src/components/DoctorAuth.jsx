import { useState } from "react";

function DoctorAuth({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const doctors = [
            {
                name: "Dr. Arun Kumar",
                email: "arun@gmail.com",
                password: "arun123",
            },
            {
                name: "Dr. Priya Sharma",
                email: "priya@gmail.com",
                password: "priya123",
            },
        ];

        const doctor = doctors.find(
            (item) =>
                item.email === email &&
                item.password === password
        );

        if (doctor) {
            onLogin(doctor);
        } else {
            setMessage("Invalid doctor email or password!");
        }
    };

    return (
        <div className="patient-auth">
            <h2>Doctor Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter doctor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter password"
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

export default DoctorAuth;