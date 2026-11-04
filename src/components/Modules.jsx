function Modules({ setSelectedRole }) {
    return (
        <section className="modules" id="modules">
            <h2>Choose Your Module</h2>
            <p>Select your role to continue</p>

            <div className="module-container">
                <div className="module-card">
                    <h3>Patient</h3>
                    <p>Register, book appointments and manage your profile.</p>
                    <button onClick={() => setSelectedRole("Patient")}>
                        Patient Login
                    </button>
                </div>

                <div className="module-card">
                    <h3>Doctor</h3>
                    <p>View appointments and manage patient requests.</p>
                    <button onClick={() => setSelectedRole("Doctor")}>
                        Doctor Login
                    </button>
                </div>

                <div className="module-card">
                    <h3>Admin</h3>
                    <p>Manage doctors, patients and appointments.</p>
                    <button onClick={() => setSelectedRole("Admin")}>
                        Admin Login
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Modules;