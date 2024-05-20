import Container from "../components/Container";
import CreateElement from "../components/CreateElement";
import DownloadBodyImage from "../components/DownloadBodyImage";
import DownloadComponent from "../components/DownloadComponent";
import Header from "./includes/Header";
import TextDownloadComponent from "../components/TextDownloadComponent";

const ImagePage = () => {
    return (
        <>
            <Header />
            <Container >
                <DownloadComponent /> <hr style={{ marginTop: 20, marginBottom: 20}} />
                <DownloadBodyImage /> <hr style={{ marginTop: 20, marginBottom: 20}} /> */
                <TextDownloadComponent /> <hr style={{ marginTop: 20, marginBottom: 20}} />
                <CreateElement /> 
            </Container>
        </>
    )
}

export default ImagePage;