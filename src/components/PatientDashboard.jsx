import { useState } from "react";

function PatientDashboard({ patient, onLogout }) {
    const [page, setPage] = useState("dashboard");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [message, setMessage] = useState("");

    const doctors = [
        {
            name: "Dr. Arun Kumar",
            specialty: "Cardiologist",
            time: "10:00 AM - 2:00 PM",
        },
        {
            name: "Dr. Priya Sharma",
            specialty: "Dermatologist",
            time: "9:00 AM - 1:00 PM",
        },
        {
            name: "Dr. Ravi Teja",
            specialty: "General Physician",
            time: "11:00 AM - 4:00 PM",
        },
        {
            name: "Dr. Sneha",
            specialty: "Pediatrician",
            time: "10:00 AM - 3:00 PM",
        },
    ];

    const bookAppointment = (e) => {
        e.preventDefault();

        const appointments = JSON.parse(
            localStorage.getItem("healthcareAppointments") || "[]"
        );

        appointments.push({
            id: Date.now(),
            patientEmail: patient.email,
            doctor: selectedDoctor,
            date: appointmentDate,
            time: appointmentTime,
        });

        localStorage.setItem(
            "healthcareAppointments",
            JSON.stringify(appointments)
        );

        setMessage("Appointment booked successfully!");
        setSelectedDoctor("");
        setAppointmentDate("");
        setAppointmentTime("");
    };

    const cancelAppointment = (id) => {
        const appointments = JSON.parse(
            localStorage.getItem("healthcareAppointments") || "[]"
        );

        const updatedAppointments = appointments.filter(
            (appointment) => appointment.id !== id
        );

        localStorage.setItem(
            "healthcareAppointments",
            JSON.stringify(updatedAppointments)
        );

        setMessage("Appointment cancelled successfully!");
    };

    const patientAppointments = JSON.parse(
        localStorage.getItem("healthcareAppointments") || "[]"
    ).filter((item) => item.patientEmail === patient.email);

    return (
        <div className="patient-dashboard">

            {page === "dashboard" && (
                <>
                    <h2>Patient Dashboard</h2>
                    <h3>Welcome, {patient.name}!</h3>
                    <p>Email: {patient.email}</p>

                    <div className="dashboard-container">

                        <div className="dashboard-card">
                            <h3>Find Doctors</h3>
                            <p>Search for available doctors.</p>
                            <button onClick={() => setPage("doctors")}>
                                Find Doctors
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h3>Book Appointment</h3>
                            <p>Schedule an appointment.</p>
                            <button onClick={() => setPage("booking")}>
                                Book Appointment
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h3>My Appointments</h3>
                            <p>View scheduled appointments.</p>
                            <button onClick={() => setPage("appointments")}>
                                View Appointments
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h3>Patient Profile</h3>
                            <p>View your personal details.</p>
                            <button onClick={() => setPage("profile")}>
                                View Profile
                            </button>
                        </div>

                    </div>

                    <button onClick={onLogout}>Logout</button>
                </>
            )}

            {page === "doctors" && (
                <>
                    <h2>Available Doctors</h2>

                    {doctors.map((doctor) => (
                        <div className="dashboard-card" key={doctor.name}>
                            <h3>{doctor.name}</h3>
                            <p>Specialty: {doctor.specialty}</p>
                            <p>Available Time: {doctor.time}</p>

                            <button
                                onClick={() => {
                                    setSelectedDoctor(doctor.name);
                                    setMessage("");
                                    setPage("booking");
                                }}
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}

                    <button onClick={() => setPage("dashboard")}>
                        Back to Dashboard
                    </button>
                </>
            )}

            {page === "booking" && (
                <>
                    <h2>Book Appointment</h2>

                    <form onSubmit={bookAppointment}>

                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                        >
                            <option value="">Select Doctor</option>

                            {doctors.map((doctor) => (
                                <option
                                    key={doctor.name}
                                    value={doctor.name}
                                >
                                    {doctor.name} - {doctor.specialty}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={appointmentDate}
                            onChange={(e) =>
                                setAppointmentDate(e.target.value)
                            }
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />

                        <input
                            type="time"
                            value={appointmentTime}
                            onChange={(e) =>
                                setAppointmentTime(e.target.value)
                            }
                            required
                        />

                        <button type="submit">
                            Confirm Appointment
                        </button>

                    </form>

                    <p>{message}</p>

                    <button onClick={() => setPage("dashboard")}>
                        Back to Dashboard
                    </button>
                </>
            )}

            {page === "appointments" && (
                <>
                    <h2>My Appointments</h2>

                    {patientAppointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        patientAppointments.map((item) => (
                            <div className="dashboard-card" key={item.id}>
                                <h3>{item.doctor}</h3>
                                <p>Date: {item.date}</p>
                                <p>Time: {item.time}</p>

                                <button
                                    onClick={() =>
                                        cancelAppointment(item.id)
                                    }
                                >
                                    Cancel Appointment
                                </button>
                            </div>
                        ))
                    )}

                    <p>{message}</p>

                    <button onClick={() => setPage("dashboard")}>
                        Back to Dashboard
                    </button>
                </>
            )}

            {page === "profile" && (
                <>
                    <h2>Patient Profile</h2>

                    <div className="dashboard-card">
                        <h3>Personal Details</h3>
                        <p>Name: {patient.name}</p>
                        <p>Email: {patient.email}</p>
                    </div>

                    <button onClick={() => setPage("dashboard")}>
                        Back to Dashboard
                    </button>
                </>
            )}

        </div>
    );
}

export default PatientDashboard;