import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap'; // Importing React Bootstrap's Container component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./public/css/bootstrap.css";
import "./public/css/responsive.css";
import "./public/css/style.css";
import "./public/css/style.scss";
import "./public/css/common/all-games.css";
import "./public/css/common/comments.css";
import "./public/css/common/create-edit.css";
import "./public/css/common/details.css";
import "./public/css/common/login-register.css";
import "./public/css/common/navigation.css";
import "./public/css/common/style.css";
import "./public/css/common/typography.css";
import "./public/css/common/welcome.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Container> {/* Wrap the App component in a Container for proper Bootstrap styling */}
      <App />
    </Container>
  </BrowserRouter>
);
