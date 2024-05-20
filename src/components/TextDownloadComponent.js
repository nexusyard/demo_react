
const TextDownloadComponent = () => {
    const downloadText = () => {
        const dataPara = document.querySelector('p#demo');
        const dataRes = document.querySelector('p#res-text');

        const dataPage = dataPara.getAttribute('data-page');
        const myRequest = new Request(`${dataPage}.txt`);
        // myRequest.method
        console.log(dataPara, dataPage, myRequest.method);

        fetch(myRequest)
            .then(res => res.text())
            .then(text => {
                console.log(text)
                dataRes.innerText = text;
            });
    }

    return (
        <>
            <button onClick={() => downloadText()}>Download Paragraph</button>
            <p id='demo' data-page='get all data'>This is just temporary text!!!</p>
            <p id='res-text'></p>
        </>
    )
}

export default TextDownloadComponent;