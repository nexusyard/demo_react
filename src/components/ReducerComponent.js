import { useCallback, useMemo, useReducer, useState } from "react";
import Header from "../pages/includes/Header";
import MemoComponent from "./MemoComponent";

const ReduceComponent = () => {

    // Reducer require two parameter 1. reducer function, 2. initial value. It return two states: 1. state 2. dispatch method which call reducer function
    // Reducer function require two parameter, 1. state 2. action //Action is nothing but action to perform. State is initial state going to update state.
    // 
    const counterFunction = (state, action) =>{
        switch(action)
        {
            case 'ADD': 
                console.log(JSON.stringify(state));
                return { ...state, count : state.count + 1,};
            case 'UPDATE' :
                return { ...state, name: 'Update Name _'+ state.count, count: state.count + 1}
            default :
                console.log(state.number)
                return { ...state };
        }
    }

    const [state, dispatch] = useReducer(counterFunction, {count: 0, number : 18, name: 'Reducer Function' });

    const result = useMemo(() => {
        console.log('render')
        return [state.number]
    }, [state.number]);

    const MemoValue = useMemo(() => {
        return  <MemoComponent name={'Tested Memo'} />
    });

    const callbackVar = useCallback(() => {
        return state.count;
    }, [state.count]) 


    return (
        <>
            <Header />
            <h1>Hello</h1>
            <button onClick={() => dispatch('ADD')} >Increment</button>
            <button onClick={() => dispatch('UPDATE')} >Update Name</button>

            <p>Counter: { state.count } </p>
            <p>Age Number: { state.number }</p>
            <h2>Print from Memo Components:</h2>
            <div>Memo String: { MemoValue } </div>
            <MemoComponent name={ state.name } />
            <hr />
            <p>Age: {result}</p>
        </>
    )
}

export default ReduceComponent;