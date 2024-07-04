import {Link} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';

export const Header = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);

    return(
        <header className="header_section">
    
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex  flex-column flex-lg-row align-items-center w-100 justify-content-between">
                            <ul className="navbar-nav  ">

                                <li className="nav-item active">
                                    <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/catalog'}> Catalog </Link>
                                </li>

                                {isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/create'}> Create game </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/logout'}>Logout</Link>
                                        </li>
                                    </>
                                )}
                                
                                {!isAuthenticated && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/register'}> Register </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to={'/Login'}> Login </Link>
                                        </li>
                                    </>
                                )}
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to={'/edit'}> Edit game </Link>
                                </li> */}
                            </ul>
                            <form className="form-inline ">
                                <input type="search" placeholder="Search" />
                                <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit" />
                            </form>
                            
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};