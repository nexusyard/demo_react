import { version } from "react";
import Container from "../components/Container"
import Header from "./includes/Header"
import { useMutation, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();
const baseURL = 'https://api.nexusyard.com';
const VersionAddPage = () => {

    const mutation = useMutation({
        mutationKey: ['version'],
        mutationFn: async () => {
            let headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('x_api_key', 'AZCPA171CPAZA');
            const response = await fetch(`${baseURL}/v1/version`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers
            });
            const version = await response.json();
            return version;
        },
        onSuccess: () => {
            console.log('success')
        },
        onError: () => {
            console.log('error')
        }
    }, queryClient)
    // console.log(mutation);

    const submitHandler = (e) => {
        e.preventDefault();
        mutation.mutate({
            version: '1.0.1',
            exe_url : 'test.com',
            'github_url' : 'ash.github.com'
        })
    }

    return (
        <>
        <Header />
            <Container>
                <h1>Add</h1>
                <form method="post" action="/version"
                onSubmit={(e) => submitHandler(e)} >
                    <div style={{ display: 'block', margin: '10px 2px'}} >
                        <label>Version: </label>
                        <input type="text" name="version" />
                    </div>
                    <div style={{ display: 'block', margin: '10px 2px'}} >
                        <label>Exe URL: </label> 
                        <input type="text" name="exe_url" />
                    </div>
                    <div style={{ display: 'block', margin: '10px 2px'}} >
                        <label>GitHUB URL: </label> 
                        <input type="text" name="github_url" />
                    </div>
                    <button 
                        style={{
                            backgroundColor: true ? 'lightgreen' : 'green' ,
                            padding: '10px 20px', 
                            color: 'white', 
                            border: '0px', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: true ? 'default' : 'pointer' }} 
                        type="submit" > Submit </button>
                </form>
            </Container>
        </>
    )
}

export default VersionAddPage;