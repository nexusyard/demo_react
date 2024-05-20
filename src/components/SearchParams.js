import { useEffect, useState } from "react";
import Header from "../pages/includes/Header";
import Container from "./Container";
import BackComponent from "./BackComponent";

const SearchParams = () => {

    const [params, SetParams] = useState();
    const [urlString, SetUrlString] = useState();

    const stringObj = {
        'q': 'pune metro',
        'source' : 'dell',
        'sort': 'asc',
        'limit': 10
    }
    
    // string parameters
    // const stringParams = 'q=new+metro&source=hp&limit=10';
    const searchParams = new URLSearchParams(stringObj);
    const url = new URL('https://www.google.com');
    url.search = searchParams;
    
    useEffect(() => {
        searchParams.append('tag', "tricks");
        searchParams.delete('sort');
        searchParams.set('page','4');
        searchParams.sort()
        SetParams(searchParams.toString());
        SetUrlString(url.toString());
    }, []);

    return (
        <>
            <Header />
            <Container >
                <BackComponent />
                <h1>Parameter Tester</h1>
                <p>TypeOf: {typeof(params)} {typeof(url)}</p>
                <p><strong>Params:</strong> {params?.toString()}</p>
                <p><strong>Url:</strong> {urlString}</p>
            </Container>
        </>
    )
}

export default SearchParams;