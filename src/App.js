import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { gameServiceFactory } from "./services/gameService";
import { authServiceFactory } from "./services/authService";
import { AuthContext } from "./context/AuthContext";

import { Header } from "./components/Basic/Header/Header";
import { Register } from "./components/Register/Register";
import { EditGame } from "./components/EditGame/EditGame";
import { Logout } from "./components/Logout/Logout";
import { Home } from "./components/Home/Home";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Login } from "./components/Login/Login";
import { Footer } from "./components/Basic/Footer/Footer";
import { Catalog } from "./components/Catalog/Catalog";
import { DetailsGame } from "./components/DetailsGame/DetailsGame";
import {UserDetails} from "./components/UserDetails/UserDetails";
import {UserDetailsPage} from "./components/UserDetails/UserDetailsPage";
import {userServiceFactory} from "./services/userService";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [auth, setAuth] = useState({});
  const gameService = gameServiceFactory(auth.accessToken);
  const authService = authServiceFactory(auth.accessToken);
  const userService = userServiceFactory(auth.accessToken);


//   useEffect(() => {
//       if(location.pathname !== '/catalog') {
//         setFilteredGames([]);
//   }
//
//   gameService.getAll()
//     .then(result => {
//         setGames(result)
//     })
// }, [location]);
   useEffect(() => {
      if(location.pathname !== '/catalog') {
        setFilteredGames([]);
      }

      if(auth.accessToken){
        gameService.getAll()
        .then(result => {
            setGames(result)
        })
      }

  }, [location, auth.accessToken]);

  const handleSearch = (searchTerm) => {
    const results = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!results.length) {
      setFilteredGames([]);
      navigate('/catalog');
      return;
    }
    setFilteredGames(results);
  };

  const onCreateGameSubmit = async (data) => {
    const newGame = await gameService.create(data);

    setGames((state) => [...state, newGame]);

    navigate("/catalog");
  };

  const onLoginSubmit = async (data) => {
    try {
      const result = await authService.login(data);

      setAuth(result);
      console.log(result);
      console.log(result._id);

      navigate("/catalog");
    } catch (error) {
      console.log("There is a problem");
    }
  };

  const onRegisterSubmit = async (values) => {
    const { confirmPassword, ...registerData } = values;
    if (confirmPassword !== registerData.password) {
      return;
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate("/catalog");
    } catch (error) {
      console.log("There is a problem");
    }
  };

  const onLogout = async () => {
    try {
      const authService = authServiceFactory(auth.accessToken);
      await authService.logout();
      setAuth({});
    } catch (error) {
      console.error("Logout error: ", error); // have a look at the error message being printed here
    }

    navigate('/');
  };

  const onGameEditSubmit = async (values) => {
    const result = await gameService.edit(values._id, values);

    setGames((state) => state.map((x) => (x._id === values._id ? result : x)));

    navigate(`/catalog/${values._id}`);
  };


  const onUserEditSubmit = async (values) => {
    console.log(`___________BEFORE SERVER____________`);
    console.log(values._id);
    const result = await userService.update(values._id, values);
    console.log(result);
    if (result && result._id) {
      alert("Details updated");
      navigate('/catalog');
    } else {
      console.log('ERRRROOORRR!')
    }
    // navigate(`/details/${values._ownerId}`);
  };

  const onGameDeleteSubmit = async (gameId) => {
    
    await gameService.delete(gameId);
    setGames((state) => state.filter((x) => (x._id !== gameId)));

    navigate(`/catalog`);
  };

  const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      <div>
        <Header onSearch={handleSearch} />

        <Routes>
          <Route path="/" element={<Home games={games}/>} />
          <Route path="/catalog" element={<Catalog games={games} filteredGames={filteredGames}/>} />
          <Route path='/catalog/:gameId' element={<DetailsGame onGameDeleteSubmit={onGameDeleteSubmit} />} />
          <Route
              path="/catalog/:gameId/edit"
              element={<EditGame onGameEditSubmit={onGameEditSubmit} />}
          />
          <Route
              path="/details/:userId"
              element={<UserDetails onUserEditSubmit={onUserEditSubmit}/>}
          />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
              path="/create"
              element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
    
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
