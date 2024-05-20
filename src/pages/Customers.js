import Container from "../components/Container";
import Header from "./includes/Header";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/ProductSlice";
import { deleteProduct, addProduct } from "../store/actions";

const Customers = () => {
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.cartReducer);

    const AddToCartHandler = () => {
        const productObj = {
            product_id : 1,
            quantity: 1,
            price : 250,
            total_price: 250
        }
        dispatch(addToCart( productObj ));
    }

    const AddProductHandler = () => {
        // dispatch(addProduct());
        dispatch(deleteProduct());
    }
    return (
        <>
        <Header />
        <Container>
            <p>Redux:</p>
            <div style={{display: "flex", flexDirection: 'row'}}>
            <button
                onClick={() => AddToCartHandler()}
                style={{    
                    backgroundColor: 'green' ,
                    padding: '10px 20px', 
                    color: 'white', 
                    border: '0px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer' }} 
                >
                Add To Cart
            </button>

            <button
                onClick={() => AddProductHandler()}
                style={{    
                    backgroundColor: 'green' ,
                    padding: '10px 20px', 
                    marginLeft: '20px',
                    color: 'white', 
                    border: '0px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer' }} 
                    >
                Add Product
            </button>
            <div>
                <p>{JSON.stringify(reducerData.todo)}</p>
            </div>
            </div>
        </Container>
        </>
    )
}

export default Customers;