import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function LoggedOutHeader() {
  return (
    <div>
      <div >
        <nav className="navbar navbar-expand-lg bg-primary theme-dark" data-bs-theme="dark">
          <div className="container-fluid text-center">
            <a className="navbar-brand  mx-auto">
              <i className="bi bi-globe-central-south-asia p-4"></i>
              Connect IIITA
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
