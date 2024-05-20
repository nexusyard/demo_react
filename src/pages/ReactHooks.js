import { Link } from "react-router-dom";
import Header from "./includes/Header";
import Container from "../components/Container";

const ReactHooks = () => {
    return (
        <>
            <Header />
            <Container >
                <h2>List of React Hooks</h2>
                <Link to='/state' >useState</Link>  <br />
                <Link to='/effect' >useEffect</Link> <br />
                <Link to='/callback' >useCallback</Link>  <br />
                <Link to='/reducer' >useReducer</Link> <br />
                <Link to='/context' >useContext</Link>  <br />
                <Link to='/ref' >useRef</Link> <br />
                <Link to='/layout' >useLayoutEffect</Link> <br />
                <Link to='/imperative' >useImperativeHandle</Link>  <br />
                {/* <Link to='/use_id' >useImperativeHandle</Link>  <br /> */}
                <Link to='/debug' >useDebug</Link>  <br />
                <Link to='/use_id' >useId</Link>  <br />
                <Link to='/transition' >useTransition</Link>

            </Container>
        </>
    )
}

export default ReactHooks;