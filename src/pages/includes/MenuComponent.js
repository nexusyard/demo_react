import { Link } from "react-router-dom";
import CartComponent from "../../components/CartComponent";

const MenuComponent = () => {
    return (
        <div style={ { display: 'flex', backgroundColor: 'lightgrey', width: '100%', padding: '5px 5px'}}>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/'>Home</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/products'>Products</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/redux'>Redux</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/image'>Image</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/array_test'>Array Test</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/params'>Search Params</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/hooks'>React Hooks</Link>
            <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/post'>Post</Link>
            <CartComponent />
        </div>
    )
}

export default MenuComponent;