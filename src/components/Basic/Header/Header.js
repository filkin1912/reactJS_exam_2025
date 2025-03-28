import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {SearchForm} from "../SearchForm/SearchForm";
import {useGameContext} from "../../../context/GameContext";

export const Header = () => {
    const {handleSearch} = useGameContext();

    const location = useLocation();

    return (
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
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/create'}> Create game </Link>
                                </li>

                            </ul>

                            {location.pathname === '/catalog' && <SearchForm onSearch={handleSearch}/>}

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};