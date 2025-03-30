import {Routes, Route,} from "react-router-dom";

import {GameProvider} from "./context/GameContext";
import {AuthProvider} from "./context/AuthContext";

import {Header} from "./components/Basic/Header/Header";
import {Footer} from "./components/Basic/Footer/Footer";

import {Home} from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {Logout} from "./components/Logout/Logout";
import {UserDetails} from "./components/UserDetails/UserDetails";
import {UserDetailsPage} from "./components/UserDetails/UserDetailsPage";
import {EditGame} from "./components/EditGame/EditGame";
import {CreateGame} from "./components/CreateGame/CreateGame";
import {Catalog} from "./components/Catalog/Catalog";
import {DetailsGame} from "./components/DetailsGame/DetailsGame";

import {RouteGuard} from "./components/Basic/RouteGuard/RouteGuard";
import {BoughtGamesProvider} from "./context/BoughtGamesContext";
import {BoughtGames} from "./components/BoughtGames/BoughtGames";

function App() {

    return (
        <AuthProvider>
            <GameProvider>
                <BoughtGamesProvider>
                    <div>
                        <Header/>

                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/catalog" element={<Catalog/>}/>
                            <Route path='/catalog/:gameId' element={
                                <RouteGuard>
                                    <DetailsGame/>
                                </RouteGuard>}/>
                            <Route path="/catalog/:gameId/edit" element={
                                <RouteGuard>
                                    <EditGame/>
                                </RouteGuard>}/>
                            <Route path="/bought-games" element={<BoughtGames />}/>
                            <Route path="/details/:userId" element={
                                <RouteGuard>
                                    <UserDetailsPage/>
                                </RouteGuard>}/>
                            <Route path="/user-details" element={
                                <RouteGuard>
                                    <UserDetails/>
                                </RouteGuard>}/>
                            <Route path="/create" element={
                                <RouteGuard>
                                    <CreateGame/>
                                </RouteGuard>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>

                        <Footer/>
                    </div>
                </BoughtGamesProvider>
            </GameProvider>
        </AuthProvider>
    );
}

export default App;