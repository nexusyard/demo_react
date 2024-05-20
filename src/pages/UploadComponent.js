import { useState } from 'react';
import Container from '../components/Container';
import Header from "./includes/Header";

const baseURL = 'http://localhost:5000/v1';

const UploadComponent = () => {
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        title: '',
        desc: '',
        demo_image : null
    })
    
    const submitHandler = async (e) => {
        e.preventDefault();
        let newProgress = 0;

        const intervalId = setInterval(async () => {
            newProgress += 5;
            if(newProgress > 100)
            {
                clearInterval(intervalId);
                // download file
                const response = await fetch('https://images.unsplash.com/photo-1581881067989-7e3eaf45f4f6?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json'}
                })
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'sample.jpeg';
                console.log(url, link)
                link.click();
                setProgress(0);
            }
            else
            {
                console.log(newProgress)
                setProgress(newProgress);
            }
        }, 100)
        // console.log(data);
        // try{

        //     const response = await fetch(baseURL + '', {
        //         method: 'POST',
        //         headers: { 
        //             // 'Content-Type' : 'application/json',
        //             'Content-Type' : 'multipart/form-data',
        //             'x-api-key' : 'AZCPA171CPAZA'
        //         },
                
        //         // body: JSON.stringify(data)
        //     })
        //     const result = await response.json();
        //     console.log('Result: ', result);
        //     alert(JSON.stringify(result));
        // }
        // catch(error)
        // {
        //     alert(error);
        // }
    }

    const formChangeHandler = async (e) => {
        // console.log(e.target.value);
        setData(prev => ({...prev, [e.target.name] : e.target.value }))
    }

    const imageChangeHandler = (e) =>{
        console.log(e.target.files[0]);
        setData(prev => ({...prev, demo_image : e.target.files ? e.target.files[0] : null }))
    }
    console.log(data);

    return (
        <div>
            <Header />
            <Container>
                <h1>Upload</h1>
                <form name='form1' encType='multipart/form-data' onSubmit={(e) => submitHandler(e)} >
                    <label htmlFor='title'>Title: </label>
                    <input 
                        type='text'
                        value={data.title} 
                        onChange={(e)=> formChangeHandler(e)} name='title' /> <br />
                    <label htmlFor='desc'>Description: </label>
                    <input 
                        type='text' 
                        value={data.desc}
                        name='desc' 
                        onChange={formChangeHandler} /> <br />
                    <label htmlFor='demo_file'>Select EXE: </label> 
                    <input 
                        type='file' 
                        name='demo_file' 
                        onChange={(e) => imageChangeHandler(e) } 
                        // value={data.demo_image?.name}
                        accept='application/pdf application/octet-stream' /><br />
                    <progress value={progress} max={100} /> <span>{ progress }%</span>
                    <p>{ data.title}</p>
                    <p>{ data.desc}</p>
                    <p>{ data.demo_image?.name}</p>

                    <button type='submit'>Download Image</button>
                </form>
            </Container>
        </div>
    )
}

export default UploadComponent;