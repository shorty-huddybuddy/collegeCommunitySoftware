import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';


export default function LoggedInHeader() {

  const navigate = useNavigate()

  const handleLogout = (e) => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const user_email = localStorage.getItem('user')

  return (
    <div className='sticky-top'>
         <nav className="navbar navbar-expand-lg bg-primary theme-dark" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand">
        <i className="bi bi-globe-central-south-asia p-4"></i>
        Connect IIITA
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-3">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/" id="home"  >Home</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href='#' role='button' data-bs-toggle = 'dropdown' aria-expanded='false'>Profile</a>
            <ul className='dropdown-menu'>
              <li><a className='dropdown-item' href={`/profile/${user_email}`} id='myProfile'>My profile</a></li>
              <li><a className='dropdown-item' href='http://localhost:3000/searchProfile'id='myProfile'>View other's profile</a></li>
            </ul>
          </li>
          <li className='nav-item'><a className="nav-link" href="/notifications"  id="notifications"  >Notifications</a></li><li><hr className="dropdown-divider"/></li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/job-board" id="job-board"  >Job Board</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href='#' role='button' data-bs-toggle = 'dropdown' aria-expanded='false'>Blood donation</a>
            <ul className='dropdown-menu'>
              <li><a className='dropdown-item' href='/requestBlood' id='myProfile'>Request Blood</a></li>
              <li><a className='dropdown-item' href='#'id='myProfile'>View responses</a></li>
            </ul>
          </li>
          <li className='nav-item'><a className="nav-link" href="/lost-and-found"  id="lost-and-found"  >Lost and Found</a></li>
          <li className='nav-item'><a className="nav-link" href="/event-calender"  id="event-calender"  >Event Calender</a></li><li><a className="nav-link" href="/resource-hub"  id="resource-hub">Resource Hub</a></li>
          <li className='nav-item'><a className="nav-link" href="/alumni-stories"  id="alumni-stories"  >Alumni Stories</a></li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/messaging" id="messaging"    >Messaging</a>
          </li>
          <li className="nav-item">
            <a className="nav-link cursor-pointer" aria-current="page" onClick={handleLogout}   id='logout' href ='/signin'>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}
