import { Link } from "react-router-dom";
import BackComponent from "../components/BackComponent";
import Header from "./includes/Header";
import Container from "../components/Container";

const NotFoundPage = ( ) => {
    return (
        <>
            <Header />
            <Container>
                <BackComponent/>
                <h2>404! Page not found.</h2>
                <p>Thanks for visit you can continue with our site <Link to='/' >Home</Link>.</p>
            </Container>
        </>
    )
}

export default NotFoundPage;