import { useState } from "react";

const DownloadComponent = () =>{
    const [imageUrl, setImageUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [addNew, setAddNew] = useState([]);

    const onChangeHandler = (e) => {
        setImageUrl(() => e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(!imageUrl){
            return alert('Please enter image url.');
        }
        const newImageURL = imageUrl.split(/[?]/)[0];
        const imgName = newImageURL.split(/[/?&]/)[3];
        // console.log(newImageURL, " name: ", imgName)
        let progress = 0;
        const intervalId = setInterval( async() => {
            progress += 5;
            if(progress > 100)
            {
                try{
                    clearInterval(intervalId);
                    const response = await fetch(newImageURL, {
                        method : 'GET',
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    });
                    console.log("Res Type: ", response.type, " header: ", response.headers, " Status: ", response.status);
                    console.log("Res StatusText: ", response.statusText, " url: ", response.url, " Status: ", response.status);
                    console.log("Res Static Methods Error: ", response.error, " redirected: ", response.redirected );
                    // console.log("Res Static Methods JSON: ", response.json());   // Will work if response is valid json.
                    console.log("Res Error: ", response.error, " redirected: ", response.redirected );

                    if(response.status !== 200)
                    {
                        return alert('Please enter valid url.');
                    }
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    
                    const form = document.querySelector('form');
                    const divElement = document.createElement('div')
                    divElement.innerHTML = `<h4>Recent Image: <span>${imgName}.png</span></h4>`
                   
                    const imgTag = document.createElement('img');

                    imgTag.src = url;
                    imgTag.style.marginRight = '20px'
                    imgTag.width = '400';
                    imgTag.height = '200';

                    form.append(divElement);                    
                    link.href = url;
                    link.innerText = 'click Here to download'
                    link.download = `${imgName}.png`;
                    divElement.append(imgTag, link);
                    // link.click();
                    // console.log(response.type, imgTag, url, link);
                    setProgress(0);
                
                }
                catch(error)
                {
                    alert('Something went wrong. ' + error);
                }
            }
            else
            {
                setProgress(progress);
            }
        }, 50);
    }

    const addNewHandler = () => {
        setAddNew(prev => [...prev, prev.length > 0 ? Number(prev?.slice(prev.length - 1)) + 1 : 1]);
        console.log(addNew)
    }

    return (
        <>
            <form name='form1' onSubmit={(e) => submitHandler(e)} >
                    <label htmlFor='title'>Enter Unsplash URL: </label>
                    <input 
                        type='text'
                        value={imageUrl} 
                        onChange={(e)=> onChangeHandler(e)} name='imageUrl' /> <br />
                    <progress value={progress} max={100} /> <span>{ progress }%</span>

                    <p>{ imageUrl }</p>
                    <button type='submit'>Download Image</button>

                </form>
                <button onClick={() => addNewHandler()} type='button'>Add New Child</button>
                { addNew.map((item, i) => {
                    return (
                        <ImageBox 
                            id={item}
                            title='Unsplash Image' 
                            downloadUrl={imageUrl} 
                            downloadText={'Download Now'} 
                            imgUrl={imageUrl} />
                    )
                }) }
        </>
    )
}

export default DownloadComponent;


const ImageBox = ({title = null, id= null, imgUrl = null, downloadUrl = null, downloadText = null}) => {
    console.log(id);
    return (
        <div key={id}>
            <h4>Image Box</h4>
            <p>{title }</p>
            <img src={imgUrl} alt={imgUrl} />
            <a href={downloadUrl} download={downloadUrl} target="_blank" > {downloadText} </a>
        </div>
    )
}