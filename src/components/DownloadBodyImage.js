import { createElement, useState } from "react";
import throttle from 'lodash/throttle';

// const baseUrl ='https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const baseUrl ='https://images.unsplash.com/photo-1711436470690-cf49602d1cf1';


const DownloadBodyImage = () => {
    const [progress, setProgress ] = useState(0);
    
    const updateProgress = throttle((value) =>{
        console.log(value);
        setProgress(value);
    }, 100, { leading: true, trailing: true})

    const DownloadImageHandler = async() => {
        setProgress(0);
        // console.log('loaded');
        try{
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const reader = response.body.getReader();
        const contentLength = response.headers.get('Content-Length');
        const totalLength = typeof(contentLength) === 'string' && parseInt(contentLength);
        let chunks = [];
        let receivedLength = 0;
        while(true)
        {
            const { done, value } = await reader.read();
            if(done)
            {
                console.log('done', done);
                break;
            }
            chunks.push(value);
            receivedLength = receivedLength + value.length;
            let steps = parseFloat((receivedLength / totalLength).toFixed(2)) * 100;
            // setProgress(steps);
            updateProgress(steps);
        }
        // console.log(totalLength, chunks, receivedLength);
        // const blob = await response.blob();
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        console.log(url, blob);

        const link = document.createElement('a');
        // console.log(link)
        link.href = url;
        link.download = 'test.jpg';
        link.click();
    }
    catch(error)
    {
        console.log('Error: ',error)
    }
    }

    return (
        <>
            <div>
                <h4>Download Progress</h4>
                <button onClick={( ) => DownloadImageHandler()} >Download Image</button>
                <br />
                <progress value={progress} max={100} /> <span>{progress.toFixed()}% downloaded</span>
            </div>
        </>
    )
}


export default DownloadBodyImage;