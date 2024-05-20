import { useState, useEffect } from "react";
import { useGetHtmlFromState } from "../CustomHooks/useGetHtmlFromState";
import { useQuery, QueryClient } from '@tanstack/react-query';

const baseURL = 'https://api.nexusyard.com';

const PostComponent = () => {
    const [postData, setPostData] = useState();
    const [error, setError] = useState(false);
    // function serializeToHtml(editorState) {
    //     const renderText = (node) => {
    //         switch (node.getFormat()) {
    //             case 1: // bold
    //                 return `<strong>${node.getTextContent()}</strong>`;
    //             case 1 << 1: // italic
    //                 return `<em>${node.getTextContent()}</em>`;
    //             case 1 << 2: // strikethrough
    //                 return `<s>${node.getTextContent()}</s>`;
    //             case 1 << 3: // underline
    //                 return `<u>${node.getTextContent()}</u>`;
    //             case 1 << 4: // code
    //                 return `<code>${node.getTextContent()}</code>`;
    //             case 1 << 5: // subscript
    //                 return `<sub>${node.getTextContent()}</sub>`;
    //             case 1 << 6: // superscript
    //                 return `<sup>${node.getTextContent()}</sup>`;
    //             default:
    //                 return node.getTextContent();
    //         }
    //     };
    
    //     const renderStyle = (format) => {
    //         switch (format) {
    //             case 1: // left
    //                 return `text-align: left;`;
    //             case 2: // center
    //                 return `text-align: center;`;
    //             case 3: // right
    //                 return `text-align: right;`;
    //             case 4: // justify
    //                 return `text-align: justify;`;
    //             default: // justify
    //                 console.log("unknown text-align", format);
    //                 return ``;
    //         }
    //     };
    
    //     const renderNode = (node) => {
    //         switch (node.getType()) {
    //             case "root":
    //                 return (node).getChildren().map((k) => renderNode(k)).join("");
    //             case "heading":
    //                 const headingNode = (node);
    //                 return `<${headingNode.getTag()}>${headingNode.getChildren()
    //                     .map((k) => renderNode(k))
    //                     .join("")}</${headingNode.getTag()}>`;
    //             case "list":
    //                 const listNode = (node)
    //                 return `<${listNode.getTag()}>${listNode.getChildren()
    //                     .map((k) => renderNode(k))
    //                     .join("")}</${listNode.getTag()}>`;
    //             case "text":
    //                 return renderText(node);
    //             case "quote":
    //                 const quoteNode = (node);
    //                 return `<blockquote>${quoteNode.getChildren()
    //                     .map((k) => renderNode(k))
    //                     .join("")}</blockquote>`;
    //             case "paragraph":
    //                 const paragraphNode = (node);
    //                 return `<p${
    //                     paragraphNode.getFormat() ? ` style="${renderStyle(paragraphNode.getFormat())}"` : ``
    //                 }>${paragraphNode.getChildren().map((k) => renderNode(k)).join("")}</p>`;
    //             case "listitem":
    //                 const listItemNode = (node)
    //                 return `<li>${listItemNode.getChildren()
    //                     .map((k) => renderNode(k))
    //                     .join("")}</li>`;
    //             case "link":
    //                 const linkNode = (node)
    //                 return `<a href="${linkNode.getURL()}">${linkNode.getChildren()
    //                     .map((k) => renderNode(k))
    //                     .join("")}</a>`;
    //             default:
    //                 console.log("unknown type", node.getType());
    //                 return "";
    //         }
    //     };
    
    //     return new Promise(resolve => {
    //         editorState.read(() => {
    //            resolve(renderNode($getRoot()));
    //         });
    //     });
    // }    
    
    const queryClient = new QueryClient();
    const { data, isLoading, error: queryError, status} = useQuery({ queryKey :['postData'], queryFn : async () => {
        // return 'Test data!!!'
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('x_api_key', 'AZCPA171CPAZA');
        const response = await fetch(new URL(baseURL+ '/v1/blog'), {
            method: 'GET',
            headers
        })
        const posts = await response.json();

        // const response1 = await fetch(new URL(baseURL+ '/v1/version'), {
        //     method: 'GET',
        //     headers
        // })
        // const version = await response1.json();

        return posts;
    }}, queryClient)

    console.log(data)
    useEffect(() => {
        
        (async function(){
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('x_api_key', 'AZCPA171CPAZA');
        try{
            const response = await fetch(new URL(baseURL+ '/v1/blog'), {
                method: 'GET',
                headers
            })
            const res = await response.json();
            setPostData(() => res.data);
        }
        catch (error) {
            setError('Something went wrong'+ error);
        }})()

    }, [])

    return (
        <>
        { isLoading && <p>Loading...</p>}
        { queryError && <p>{queryError}</p>}
        { data && data.data.map((post, i) => {
            return (
                <div key={i} style={{backgroundColor: '#fff', border: '1px solid grey', padding: '10px 20px', margin: '10px 0'}}>
                    <h2>{post.id}. { post.title.split(' ')[0].toString() }</h2>
                    <div style={{ backgroundColor: 'smoke', padding: '10px', position: 'relative', width: '100%', boxSizing: 'content-box'}}>
                        <h4>{ post.title.split(' ')[1]?.toString() }</h4>
                        <p style={{lineBreak: 'anywhere'}}> { typeof(post.description) === 'object' ? JSON.parse(post.description) : post.description } </p>
                    </div> 
                </div>
            )}
        )}
        

        {error && <p>{error}</p>}
        {/* { postData && postData.map((post, i) => {
            return (
                <div key={i} style={{backgroundColor: '#fff', border: '1px solid grey', padding: '10px 20px', margin: '10px 0'}}>
                    <h2>{post.id}. { post.title.split(' ')[0].toString() }</h2>
                    <div style={{ backgroundColor: 'smoke', padding: '10px', position: 'relative', width: '100%', boxSizing: 'content-box'}}>
                        <h4>{ post.title.split(' ')[1]?.toString() }</h4>
                        <AuxEditorData description={post.description} />
                        <p style={{lineBreak: 'anywhere'}}> { typeof(post.description) === 'object' ? JSON.parse(post.description) : post.description } </p>
                    </div> 
                </div>
            )}
        )}
         */}
        </>
)}

export default PostComponent;

const AuxEditorData = ({ description }) => {
    const { html, AuxEditor } = useGetHtmlFromState( description)

    return (
        <>
            <AuxEditor />
            <p dangerouslySetInnerHTML={{ __html: html }} />
        </>
    )
}