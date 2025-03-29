import {Routes, Route,} from "react-router-dom";
import {GameProvider} from "./context/GameContext";
import {AuthProvider} from "./context/AuthContext";

import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {Logout} from "./components/Logout/Logout";
import {UserDetails} from "./components/UserDetails/UserDetails";
import {UserDetailsPage} from "./components/UserDetails/UserDetailsPage";
import {Header} from "./components/Basic/Header/Header";
import {Footer} from "./components/Basic/Footer/Footer";
import {Home} from "./components/Home/Home";
import {EditGame} from "./components/EditGame/EditGame";
import {CreateGame} from "./components/CreateGame/CreateGame";
import {Catalog} from "./components/Catalog/Catalog";
import {DetailsGame} from "./components/DetailsGame/DetailsGame";

function App() {

    return (
        <AuthProvider>
            <GameProvider>
                <div>
                    <Header/>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/catalog" element={<Catalog/>}/>
                        <Route path='/catalog/:gameId' element={<DetailsGame/>}/>
                        <Route path="/catalog/:gameId/edit" element={<EditGame/>}/>
                        <Route path="/create" element={<CreateGame/>}/>
                        <Route path="/details/:userId" element={<UserDetailsPage/>}/>
                        <Route path="/user-details" element={<UserDetails/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>

                    <Footer/>
                </div>
            </GameProvider>
        </AuthProvider>

    );
}

export default App;