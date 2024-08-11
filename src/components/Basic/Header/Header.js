import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {SearchForm} from "../SearchForm/SearchForm";
import { AuthContext } from '../../../context/AuthContext';

export const Header = ({onSearch}) => {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const location = useLocation();

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
                                            <Link className="nav-link" to={`/details/${userId}`}>Details</Link>
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

                            </ul>
                            {location.pathname === '/catalog' && <SearchForm onSearch={onSearch}/>}
                            
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};