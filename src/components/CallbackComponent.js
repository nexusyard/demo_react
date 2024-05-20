import { useCallback, useMemo, useState } from 'react';
import Header from "../pages/includes/Header";

const CallbackComponent = ()=> {
    
    const [num, setNum] = useState(0);
    const testCallback = useCallback(() => { 
        console.log('callback hooks')
        return num;
    }, [num]);

    const answer = useMemo(() => num + 1, [num]);

    return(
        <>
        <Header />
        <h1>Callback Render: </h1>
            <p>Update props.</p>
            <button onClick={ () => setNum(num + 1)} >Without Click Me</button>
            <button onClick={ testCallback } >Callback Click Me</button>
            {
                testCallback
            }
            {
                num
            }

            <button onClick={useCallback(() => { console.log('callback hooks from callback')}, [])} >Click Me</button>
            <p>
                { answer }
            </p>
        </>
    )
}

export default CallbackComponent;