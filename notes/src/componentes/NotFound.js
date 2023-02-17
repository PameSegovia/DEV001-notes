import { Link } from "react-router-dom";
import errorRuta  from "../imagenes/error.png"
import "../hojas-de-estilo/NotFoundStyle.css"

const NotFound = () => {
    

    return (
        <div className="error-container">
            <p className="error-route">404</p>
            <p className="error-Route">Page not found</p>
            <img 
                src={ errorRuta }
                className= 'error-ruta'
                alt='errorRuta' />
            <Link className="link"    to="/">Volver al Home</Link>
        </div>
    );
};
export default NotFound;