import { Navigate, useNavigate } from 'react-router-dom';

const BackComponent = ( ) => {
    const navigate = useNavigate();
    const BackHandler = (e) => {
        e.preventDefault();
        navigate(-1);
        // Native browser window (history) event.
        // window.history.back();
    }

    return (
        <>
           <a style={{ cursor: 'pointer', color: 'blue'}} onClick={(e) => BackHandler(e)} > &lt;&lt; Back</a>
        </>
    )
}

export default BackComponent;