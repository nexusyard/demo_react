import { useEffect, useState } from "react";
import { BlocksLoader, RotatingLinesLoader } from "../components/Loader";
import Header from "./includes/Header";
import Container from "../components/Container";

const baseUrl = 'http://localhost:5000/v1/';
// const baseUrl = 'https://api.nexusyard.com/v1/';

const Products = () => {

    const [productsData, setProductsData ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    // const getProductsData = () => {
    //     setError('');
    //     setLoading(true);
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Accept', 'application/json');
    //     headers.append('x-api-key', 'AZCAP7141ZXYZ');
    //     // setTimeout( () => {
    //     fetch(baseUrl + 'products', {
    //         method:'GET',
    //         headers: headers
    //     }).then((response) => {
    //         if(response.status !== 200)
    //         {
    //             setError('Something went wrong.')
    //         }
    //         else
    //         {
    //             return response.json();
    //         }
    //     }).then((response) => {
    //         setError('');
    //         setProductsData(response.data);
    //     }).catch((error) => {
    //         setError('Error occurred while getting products.', error)
    //     }).finally(() => {
    //         setLoading(false);
    //     })
    // // };
    // // 5000)
    // }

    const getProductsDataByAsync = async ( signal ) => {
        setError('');
        setLoading(true);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('x-api-key', 'AZCAP7141ZXYZ');
        try
        {
            const result = await fetch(baseUrl + 'products', {
                method:'GET',
                headers: headers,
                // signal: signal,
            });
            if (signal && signal.aborted) {
                throw new DOMException("Request cancelled", "AbortError");
            }
            const response = await result.json();
            if(result.status === 200 ){
                setProductsData(response.data);
            }
            else
            {
                setError(response.message);
            }
        }
        catch(error)
        {
            console.log(error);
            setError('Something went wrong.', error);
        }
        setLoading(false);
    }

    const getProductHandler = () => {
        let controller = new AbortController();
        let signal = controller.signal;
        getProductsDataByAsync(signal);
    }

    const orderHandler = (event, product) => {
        event.preventDefault();
        // console.log('order', product);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('x-api-key', 'AZCAP7141ZXYZ');

        const data = {
            "total_amount": product.price ,
            "cus_id": 1002,
            "products": [],
            "createdate": new Date()
        }
        fetch(baseUrl + 'orders', 
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
        .then(response => {
            if(response.status !== 200)
            {
                setError('Something went wrong.')
            }
            else
            {
                return response.json();
            }
        })
        .then((response) => {
            const orderResponse = response.data;
            console.log('Order:', orderResponse)
            var options = {
                "key": orderResponse.key_id, 
                "amount": orderResponse.amount,
                "currency": orderResponse.currency,
                "name": "Nexus Yard",
                "description": "Test Transaction",
                "order_id": orderResponse.order_id, 
                "handler": function (payResponse){
                    // console.log(payResponse);
                    const body = {
                        razorpay_signature : payResponse.razorpay_signature, 
                        razorpay_payment_id : payResponse.razorpay_payment_id, 
                        razorpay_order_id : payResponse.razorpay_order_id,
                        order_id: orderResponse.order_id
                    }
                    fetch(baseUrl + 'orderverify',{
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: headers
                    }).then((response) => {
                        return response.json();
                    }).then(res => {
                        console.log(res);
                        alert(res.message);
                    }).catch(error => {
                        setError('Something went wrong while verify.', error);
                    })
                },
                "prefill": {
                    "name": "Ashok Ambore",
                    "email": "ashokambore16@gmail.com",
                    "contact": "7767944781"
                },
                "notes": {
                    "address": "NexusYard Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            let rzp1 = new window.Razorpay(options)
            rzp1.open();
            
            rzp1.on('payment.failed', function (response){
                alert(response.error.code + response.error.description);
                console.log(response);
                const data = {
                    error: response.error.code,
                    description: response.error,
                    order_id: orderResponse.order_id,
                }

                fetch(baseUrl + 'updateFailureOrder', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: headers
                }).then(response => {
                    return response.json();
                }).then(response => {
                    console.log(response);
                })
            });
        })
        .catch((error) => {
            setError('Unable to order.', error)
        })
    }

    useEffect(() => {
        // use custom variable for cleanup handler      //not work as expected. need to study.
        let isApiSubscribed = true;
        // use abortController to handle cleanup with fetch request.        //signal work fine with fetch.
        let controller = new AbortController();
        let signal = controller.signal;

        // if(isApiSubscribed){
        // console.log('from effect:', loading);
            getProductsDataByAsync(signal);
        // }

        //handle cleanup while unmounting components.
        return () => {
            controller.abort();
        };
    },[]);

    return (
        <div>
            <Header />
            <Container>
            <h2>Products:</h2>
            <button 
                disabled={ loading ? true : false}
                style={{    
                    backgroundColor: loading ? 'lightgreen' : 'green' ,
                    padding: '10px 20px', 
                    color: 'white', 
                    border: '0px', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: loading ? 'default' : 'pointer' }} 
                    onClick={() => getProductsDataByAsync()} >
                    Get Products  { loading && <RotatingLinesLoader />}
            </button>
            <h3 style={{marginTop: 10, marginBottom: 10}}>Latest Products: </h3>
            <div>
                { loading && <BlocksLoader />}
                { error && <p style={{ color:'red'}}>{error}</p> }
                { !error && !loading && productsData && productsData.length === 0 && <p style={{ color:'red'}}>No Products found.</p> }
            </div>
            {/* <Loader /> */}
            { productsData && <div style={{display: 'flex', flexWrap: 'wrap' }}>
                {productsData.map((product, index) => {
                    return (
                    <div key={index} style={{ display: "flex", maxWidth: '30%', flexDirection: 'column', margin: '0px 10px', marginBottom: '20px', lineHeight: '1.50'}}>
                        <div style={{border: '1px solid lightgrey', alignItems: 'center', textAlign: 'center' }}>
                            <img style={{ width: '250px', aspectRatio: "auto", height: '200px', objectFit: 'contain'}} src={product.prod_image} alt={ product.title} />
                        </div>
                        <h1 style={{fontSize: '18px', fontWeight: '400', color: '#212121'}}>{product.title}</h1>
                        <p>{product.prod_desc.length >= 50 ? product.prod_desc.substr(0, 50) : product.prod_desc}</p>
                        <p style={{ fontSize: '28px', fontWeight: '500', color: '#212121'}}>Rs. {product.price}</p>
                        <button 
                            onClick={(event) => orderHandler(event, product)}
                            style={{ padding: '10px 20px', backgroundColor: '#ff9f00', fontWeight: '500', textTransform: 'uppercase', fontSize: '16px', color: 'white', border: '0px', cursor: 'pointer' }}  >
                            Buy Now
                        </button>
                    </div>
                    )
                })}
            </div> }
            </Container>
        </div>
    )
}

export default Products;