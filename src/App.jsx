import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Modules from "./components/Modules";
import About from "./components/About";
import Footer from "./components/Footer";

import PatientAuth from "./components/PatientAuth";
import PatientDashboard from "./components/PatientDashboard";
import DoctorAuth from "./components/DoctorAuth";
import AdminAuth from "./components/AdminAuth";

import "./App.css";

function App() {
  const [selectedRole, setSelectedRole] = useState("");
  const [loggedPatient, setLoggedPatient] = useState(null);
  const [loggedDoctor, setLoggedDoctor] = useState(null);
  const [loggedAdmin, setLoggedAdmin] = useState(null);

  const handlePatientLogout = () => {
    setLoggedPatient(null);
  };

  const handleDoctorLogout = () => {
    setLoggedDoctor(null);
  };

  const handleAdminLogout = () => {
    setLoggedAdmin(null);
  };

  const doctors = [
    "Dr. Arun Kumar",
    "Dr. Priya Sharma",
    "Dr. Ravi Teja",
    "Dr. Sneha",
  ];

  const patients = JSON.parse(
    localStorage.getItem("healthcarePatients") || "[]"
  );

  const appointments = JSON.parse(
    localStorage.getItem("healthcareAppointments") || "[]"
  );

  return (
    <div className="app">

      <Header />

      {!selectedRole && (
        <>
          <Hero />
          <Modules setSelectedRole={setSelectedRole} />
          <About />
        </>
      )}

      {/* PATIENT MODULE */}

      {selectedRole === "Patient" && !loggedPatient && (
        <PatientAuth onLogin={setLoggedPatient} />
      )}

      {selectedRole === "Patient" && loggedPatient && (
        <PatientDashboard
          patient={loggedPatient}
          onLogout={handlePatientLogout}
        />
      )}

      {/* DOCTOR MODULE */}

      {selectedRole === "Doctor" && !loggedDoctor && (
        <DoctorAuth onLogin={setLoggedDoctor} />
      )}

      {selectedRole === "Doctor" && loggedDoctor && (
        <div className="patient-dashboard">

          <h2>Doctor Dashboard</h2>
          <h3>Welcome, {loggedDoctor.name}!</h3>
          <p>Email: {loggedDoctor.email}</p>

          <div className="dashboard-card">
            <h3>View Appointments</h3>
            <p>Check appointments booked by patients.</p>

            <button
              onClick={() =>
                setSelectedRole("DoctorAppointments")
              }
            >
              View Appointments
            </button>
          </div>

          <button onClick={handleDoctorLogout}>
            Logout
          </button>

        </div>
      )}

      {selectedRole === "DoctorAppointments" && (
        <div className="patient-dashboard">

          <h2>Patient Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments available.</p>
          ) : (
            appointments
              .filter(
                (item) =>
                  item.doctor === loggedDoctor?.name
              )
              .map((item) => (
                <div className="dashboard-card" key={item.id}>
                  <h3>{item.doctor}</h3>
                  <p>Patient Email: {item.patientEmail}</p>
                  <p>Date: {item.date}</p>
                  <p>Time: {item.time}</p>
                </div>
              ))
          )}

          <button onClick={() => setSelectedRole("Doctor")}>
            Back to Dashboard
          </button>

        </div>
      )}

      {/* ADMIN MODULE */}

      {selectedRole === "Admin" && !loggedAdmin && (
        <AdminAuth onLogin={setLoggedAdmin} />
      )}

      {selectedRole === "Admin" && loggedAdmin && (
        <div className="patient-dashboard">

          <h2>Admin Dashboard</h2>
          <h3>Welcome, {loggedAdmin.name}!</h3>

          <div className="dashboard-container">

            <div className="dashboard-card">
              <h3>Total Patients</h3>
              <h2>{patients.length}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Doctors</h3>
              <h2>{doctors.length}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Appointments</h3>
              <h2>{appointments.length}</h2>
            </div>

          </div>

          <h3>Registered Patients</h3>

          {patients.length === 0 ? (
            <p>No patients registered.</p>
          ) : (
            patients.map((patient, index) => (
              <div className="dashboard-card" key={index}>
                <p>Name: {patient.name}</p>
                <p>Email: {patient.email}</p>
              </div>
            ))
          )}

          <h3>Available Doctors</h3>

          {doctors.map((doctor, index) => (
            <div className="dashboard-card" key={index}>
              <p>{doctor}</p>
            </div>
          ))}

          <h3>All Appointments</h3>

          {appointments.length === 0 ? (
            <p>No appointments available.</p>
          ) : (
            appointments.map((item) => (
              <div className="dashboard-card" key={item.id}>
                <p>Doctor: {item.doctor}</p>
                <p>Patient: {item.patientEmail}</p>
                <p>Date: {item.date}</p>
                <p>Time: {item.time}</p>
              </div>
            ))
          )}

          <button onClick={handleAdminLogout}>
            Logout
          </button>

        </div>
      )}

      <Footer />

    </div>
  );
}

export default App;