import { useState } from "react";
import { useQuery, QueryClient } from '@tanstack/react-query';
import Header from "./includes/Header";
import Container from "../components/Container";

const baseURL = 'https://api.nexusyard.com';
const queryClient = new QueryClient();

const VersionPage = ( ) => {
    const [versions, setVersions] = useState();
    const {data, error, isLoading} = useQuery({
        queryKey: ['versions'],
        queryFn : async () => {
            let headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('x_api_key', 'AZCPA171CPAZA');
            const response = await fetch (`${baseURL}/v1/version`, {
                method : 'GET',
                headers,
            })
            const versions = await response.json();
            return versions;
        }
    }, queryClient)

    return (
        <>
        <Header />
            <Container>
            <h1>
                Versions:
            </h1>
            <a href="/version/add">Add New Version</a>
            { isLoading && <h1>Loading...</h1>}
            { data && data.data.map((version) => {
                return(
                    <div style={{ padding: '10px 5px'}}>
                        <h3>Version: {version.version}</h3>
                        <p><strong>Release Date:</strong> { new Date(version.createdate).toLocaleDateString('en-GB')}</p>
                        <p><a href={`*/${version.version}`} >changelog</a></p>
                        <p><strong>GitHUB:</strong> { version.github_url}</p>
                        <p><strong>EXE:</strong> { version.exe_url}</p>
                    </div>
                )
            })}
            </Container>
        </>
    )
}

export default VersionPage;