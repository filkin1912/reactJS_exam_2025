import {Routes, Route,} from "react-router-dom";

import {GameProvider} from "./context/GameContext";

import {Header} from "./components/Basic/Header/Header";
import {Footer} from "./components/Basic/Footer/Footer";

import {Home} from "./components/Home/Home";

import {EditGame} from "./components/EditGame/EditGame";
import {CreateGame} from "./components/CreateGame/CreateGame";
import {Catalog} from "./components/Catalog/Catalog";
import {DetailsGame} from "./components/DetailsGame/DetailsGame";


function App() {

    return (
            <GameProvider>
              <div>
                <Header/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/catalog" element={<Catalog/>}/>
                    <Route path='/catalog/:gameId' element={<DetailsGame/>}/>
                    <Route path="/catalog/:gameId/edit" element={<EditGame/>}/>
                    <Route path="/create" element={<CreateGame/>}/>
                </Routes>

                {/* <Footer/> */}
              </div>
            </GameProvider>
    );
}

export default App;