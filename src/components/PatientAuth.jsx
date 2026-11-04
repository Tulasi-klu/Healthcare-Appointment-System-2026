import { useState } from "react";

function PatientAuth({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        let patients = JSON.parse(
            localStorage.getItem("healthcarePatients") || "[]"
        );

        if (isSignup) {
            const existingPatient = patients.find(
                (patient) => patient.email === email
            );

            if (existingPatient) {
                setMessage("Email already registered!");
                return;
            }

            patients.push({ name, email, password });

            localStorage.setItem(
                "healthcarePatients",
                JSON.stringify(patients)
            );

            setMessage("Registration successful! Please login.");
            setIsSignup(false);
            setName("");
            setEmail("");
            setPassword("");
        } else {
            const patient = patients.find(
                (patient) =>
                    patient.email === email &&
                    patient.password === password
            );

            if (patient) {
                onLogin(patient);
            } else {
                setMessage("Invalid email or password!");
            }
        }
    };

    return (
        <div className="patient-auth">
            <h2>{isSignup ? "Patient Signup" : "Patient Login"}</h2>

            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    {isSignup ? "Register" : "Login"}
                </button>
            </form>

            <p>{message}</p>

            <p>
                {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}

                <button
                    type="button"
                    onClick={() => {
                        setIsSignup(!isSignup);
                        setMessage("");
                    }}
                >
                    {isSignup ? "Login" : "Signup"}
                </button>
            </p>
        </div>
    );
}

export default PatientAuth;