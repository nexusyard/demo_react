import { ThreeCircles, Vortex, RotatingLines, InfinitySpin, RevolvingDot, Puff, Circles, DNA, Blocks } from "react-loader-spinner";

const Loader = () => {
    return (
        <RevolvingDot
            visible={true}
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{ 'position': 'relative', top: '35%', left: '50%'}}
            wrapperClass=""
        />
    )
}

export const BlocksLoader = () => {
    return (
        <Blocks
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
    )
}

export const PuffLoader = () => {
    return (
    <Puff
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}


export const CircleLoader = () => {
    return (
    <Circles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export const DnaLoader = () => {
    return (
    <DNA
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export const InfinitySpinLoader = () => {
    return (
    <InfinitySpin
        visible={true}
        height="180"
        width="180"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export const RotatingLinesLoader = () => {
    return (
    <RotatingLines
        visible={true}
        height="20"
        width="15"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export const ThreeCirclesLoader = () => {
    return (
    <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    )
}

export const VortexLoader = () => {
    return (
    <Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{ 'position': 'relative', top: '10%', left: '40%', textAlign: 'center'}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
    )
}
export default Loader;