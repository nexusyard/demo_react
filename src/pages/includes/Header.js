import Container from "../../components/Container";
import MenuComponent from "./MenuComponent";
// import CartComponent from "./CartComponent";
// import DynamicMenuComponent from "./DynamicMenuComponent";


const Header =() => {

    return(
        <Container>
            <nav style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <h1 style={{marginRight: 20}}>Nexus Platform</h1>
                <MenuComponent />
                {/* <Product /> */}
                {/* <Link style={{padding: '20px 20px', textDecoration: 'none'}} to='/products'>Products</Link> */}
                {/* <CartComponent />                 */}
                {/* <DynamicMenuComponent /> */}
            </nav>
        </Container>
    )
}

export default Header;