import { useEffect, useState, useTransition } from "react";
import { movies } from "../data/Movies";
import { VortexLoader } from "./Loader";
import Header from "../pages/includes/Header";
import Container from "./Container";

const ArrayObjectTest = () =>{

    const [filterMovies, setFilteredMovies ] = useState();
    const [detailMovie, setDetailMovie ] = useState();
    const [search, setSearch] = useState('');
    const [isPending, startTransition] = useTransition();

    const onChangeHandler = (e) => {
        startTransition(() => {
            setSearch(e.target.value);
            const newMovies = movies.filter((item => ( item.title.toLowerCase().includes(search.toLowerCase()))));
            setFilteredMovies(newMovies);
        })
    }

    const showDetailsHandler = (e, id) => {
        e.preventDefault();
        const findMovie = movies.find((item) => item.id === id);
        setDetailMovie(findMovie);
    }

    const resetHandler = () =>{
        setSearch('');
        setFilteredMovies(movies);
    }

    useEffect(() => {
        setFilteredMovies(movies);
    }, [])

    return (
        <div>
            <Header />
            <Container>
                <div style={{ display: 'flex', flexDirection:'row', alignItems:'flex-start', justifyContent: 'flex-start'}}> 
                <div style={{ border: '10px solid lightgrey', padding: 10, minWidth: '40%'}}>
                Search Title:  
                <input
                    placeholder="Search title"
                    type="text" 
                    value={search} 
                    onChange={(e) => onChangeHandler(e)}
                    />
                    <button onClick={() => resetHandler()}> Reset</button>
                <br/>
                <h2 style={{textDecoration: 'underline'}}>List of Movies:</h2>
                {/* <Loader /> */}
                {/* <DnaLoader />
                <PuffLoader />
                <CircleLoader />
                <ThreeCircles />
                <BlocksLoader />
                <InfinitySpinLoader />
                <RotatingLinesLoader /> */}
                {/* <VortexLoader /> */}
                {isPending && <VortexLoader />}
                {
                    filterMovies && filterMovies?.map((item, index) =>(
                        <div key={item.id} style={{lineHeight:1.4, textTransform: 'uppercase'}}>
                            <p>{index + 1}. <a href="/" onClick={(e) => showDetailsHandler(e, item.id)}> <strong> {item.title}</strong></a></p>
                        </div>
                    ))
                }
                </div>
                <div style={{ border: '10px solid lightgrey', minWidth: '50%', padding: '5px', marginLeft: '10px'}}>
                    { !detailMovie && <p>No movie selected.</p>}
                    { detailMovie && <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Id:</span>
                                <p>{detailMovie.id}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Title:</span>
                                <h2>{detailMovie.title}</h2>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Release Year:</span>
                                <p>{detailMovie.year}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Director:</span>
                                <p>{detailMovie.director}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Actors:</span>
                                <p><em>{detailMovie.actors}</em></p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '100px', marginRight: '10px', textAlign: 'left' }}>Plot:</span>
                                <p>{detailMovie.plot}</p>
                            </div>
                    </div>}
                </div>
                </div>
            </Container>
        </div>
    )
}

export default ArrayObjectTest;