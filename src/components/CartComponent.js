import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartComponent = () => {
    const [cartQuantity, setCartQuantity] = useState(0);
    const { cart } = useSelector( (state) => ( state.cartReducer));

    // console.log(cart)
    
    useEffect(() => {
        setCartQuantity(() => {
            let sum = cart.length !== 0 ? cart.reduce((acc, curVal) => {
               return acc + curVal.quantity;
            }, 0) : 0 ;
            return sum;
        })
    }, [cart])

    return (
        <>
            <div style={{padding: '20px 20px', textDecoration: 'none'}}>
                <span style={{ position:'relative', zIndex: '99'}}>
                    Cart: 
                </span>
                <span style={{ boxShadow: '0px 0px 10px red', backgroundColor: 'cyan', marginLeft: '5px', padding: '5px 10px', borderRadius: '40px', fontSize: '12px', position:'relative', top: '-10px', left: '-10px'}}>{cartQuantity}</span> 
            </div>
        </>
    )
}

export default CartComponent;