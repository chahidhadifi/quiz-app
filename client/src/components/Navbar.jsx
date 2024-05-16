import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import BlackLogo from '../assets/images/black-logo.png'
import Logout from '../assets/images/logout.png'

const Navbar = ({ firstName, lastName, role }) => {
    const menuIcon = useRef(null);
    const closeIcon = useRef(null);
    const menu = useRef(null);
    const [menuIsOpened, setMenuIsOpened] = useState(false);

    const handleMenuIcon = () => {
        if (!menuIsOpened) {
            menu.current.classList.remove("fade-out");
            menu.current.classList.add("fade-in");
            menu.current.setAttribute("style", "display: block !important;");
            setMenuIsOpened(true);
        }
    };

    const handleCloseIcon = () => {
        if (menuIsOpened) {
            menu.current.classList.remove("fade-in");
            menu.current.classList.add("fade-out");
            menu.current.setAttribute("style", "display: none !important;");
            setMenuIsOpened(false);
        }
    };

    const handleLogout = () => {
        axios.get('http://localhost:5000/api/v1/users/logout')
        .then(res => {
          location.reload(true);
        })
        .catch(err => {
          console.log(err);
        })
    }

    return (
        <>
            <div className="dashboard__navbar">
                                <Link to={'/'}>
                                    <div>
                                        <img src={BlackLogo} alt="Logo"/>
                                    </div>
                                </Link>
                                <div>
                                    <div className="dashboard__navbar__icons">
                                        <i className='bx bx-menu menu-icon' ref={menuIcon} onClick={handleMenuIcon}></i>
                                    </div>
                                    <div className="dashboard__navbar__user">
                                        <div className="flex flex-fd-c" style={{textTransform: 'capitalize'}}>
                                            <h4>{ firstName + " " + lastName }</h4>
                                            <h5>{ role }</h5>
                                        </div>
                                        <div>
                                            {/* <img src={Notifications} alt="Notification" /> */}
                                            <img src={Logout} alt="Logout" onClick={handleLogout} />
                                        </div>
                                    </div>
                                </div>
                                <div className="menu" ref={menu}>
                                    <div>
                                        <Link to="/">Dashboard</Link>
                                        <Link to="/quizzes">Quizzes</Link>
                                        <Link to="/members">Members</Link>
                                        <Link to="/results">Results</Link>
                                        <div style={{textTransform: 'capitalize'}}>
                                            <h4>{ firstName + " " + lastName }</h4>
                                            <h5>{ role }</h5>
                                            <i className='' >
                                                <img src={Logout} alt="Logout" onClick={handleLogout} />
                                            </i>
                                        </div>
                                        <i className='bx bx-x close' ref={closeIcon} onClick={handleCloseIcon}></i>
                                    </div>
                                </div>
                            </div>
        </>
    )
}

export default Navbar;
