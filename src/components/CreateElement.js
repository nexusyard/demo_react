import { createElement } from "react";

const CreateElement = () => {
    const createHandler = (e) => {
        const newElement = createElement('div', 
            { 
                className: 'box',
                id: 'test',
            }
        )
        console.log(newElement);
        document.body.append(newElement)
    }
    return (
        <>
            <h2>Create new Element with react:</h2>
            <button onClick={createHandler}>Create Div</button>
            
        </>
    )
}


export default CreateElement;