import { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { InfinitySpin } from 'react-loader-spinner';


import Header from "./includes/Header";
import Container from "../components/Container";
import PostComponent from '../components/PostComponents';
import ToolbarPlugin from '../components/ToolbarPlugin';
import ('./Post.css');

const baseURL = 'https://api.nexusyard.com';

const Post = () => {
    const initialData = { email: '',
        mobile: '',
        description : ''
    }
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState('');
    const [postData, setPostData] = useState(initialData);

    const theme = {
        code: 'editor-code',
        heading: {
          h1: 'editor-heading-h1',
          h2: 'editor-heading-h2',
          h3: 'editor-heading-h3',
          h4: 'editor-heading-h4',
          h5: 'editor-heading-h5',
        },
        image: 'editor-image',
        link: 'editor-link',
        list: {
          listitem: 'editor-listitem',
          nested: {
            listitem: 'editor-nested-listitem',
          },
          ol: 'editor-list-ol',
          ul: 'editor-list-ul',
        },
        ltr: 'ltr',
        paragraph: 'editor-paragraph',
        placeholder: 'editor-placeholder',
        quote: 'editor-quote',
        rtl: 'rtl',
        text: {
          bold: 'editor-text-bold',
          code: 'editor-text-code',
          hashtag: 'editor-text-hashtag',
          italic: 'editor-text-italic',
          overflowed: 'editor-text-overflowed',
          strikethrough: 'editor-text-strikethrough',
          underline: 'editor-text-underline',
          underlineStrikethrough: 'editor-text-underlineStrikethrough',
        },
    }
    const onError = (error) => {
        throw error;
    }
    
    const initialConfig ={
        namespace: 'My-Editor',
        theme,
        onError,
        nodes: [
        ]
    }

    const onChange = (editorState) => {
        const stateJson = editorState.toJSON();
        console.log(JSON.stringify(editorState));

        editorState.read(() => {
            // const root = $getRoot();
            // const selection = $getSelection();
            setPostData( {...postData, description : JSON.stringify(stateJson) })
        })
    }

    const MyCustomAutoFocusPlugin = () => {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            // editor.focus();
        }, [editor])
        return null;
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log(postData);
        if(postData.email === '' || postData.mobile === '' || postData.description === '')
        {
            return setErrorData('Please fill data first...');
        }
        setErrorData('');
        setIsLoading(true);
        let headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('x_api_key', 'AZCPA171CPAZA');
        // Save data to database through API.
        const blogData= {
            title: postData.email.concat(' ', postData.mobile),
            category: 'General',
            description: postData.description
        }
        fetch(`${baseURL}/v1/blog`, {
                method: 'POST',
                body: JSON.stringify(blogData),
                headers : headers
            })
            .then((response) => response.json() )
            .then((response) =>{
                setPostData(initialData);
                setSuccessMessage(response.message);
            })
            .catch((error)=> { 
                setSuccessMessage(error.message);
            })
            setIsLoading(false);
    }

    const onChangeEventHandler =(e) => {
        setPostData( {...postData, [e.target.name] : e.target.value })
    }

    return (
        <>
            <Header />
            <Container>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '45%'}}>
                        <h1>This is post page...</h1>
                        <p style={{color: 'green'}}>{successMessage && successMessage}</p>
                        <p style={{color: 'red'}}>{errorData && errorData}</p>

                        { isLoading && <InfinitySpin /> }
                        <form onSubmit={(e) => SubmitHandler(e)}>
                            <label>Enter Email:</label> <br />
                            <input className='input-class'
                                value={postData.email} 
                                name='email'
                                onChange={(e) => onChangeEventHandler(e)} 
                                type="text" /> <br />
                            <label>Enter Mobile:</label> <br />
                            <input className='input-class'
                                value={postData.mobile} 
                                name='mobile'
                                onChange={(e) => onChangeEventHandler(e)}
                                type="text" /> <br />
                            <label>Description:</label>
                            <LexicalComposer initialConfig={initialConfig}>
                                <div className="editor-container">
                                <ToolbarPlugin />
                                <div className="editor-inner">
                                    <RichTextPlugin
                                        contentEditable={ <ContentEditable className="editor-input" /> } 
                                        ErrorBoundary={ LexicalErrorBoundary}
                                        placeholder={<div className="editor-placeholder">Enter some rich text...</div>} />
                                        <OnChangePlugin onChange={onChange} />
                                        <HistoryPlugin />
                                        <MyCustomAutoFocusPlugin />
                                </div>
                                </div>
                            </LexicalComposer>
                            {/* <button>Submit</button> */}
                            <button
                                style={{    
                                    backgroundColor: 'green' ,
                                    padding: '10px 20px', 
                                    color: 'white', 
                                    border: '0px', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer' }} 
                                >
                                Submit
                            </button>
                        </form>
                    </div>
                    <div style={{width: '45%', marginLeft: '10px'}}>
                        <h1>Posts</h1>
                        <div style={{border: '1px solid grey', padding: '10px 20px', margin: '10px 0'}}>
                            <h2>Title of Post</h2>
                            <p>Description</p>
                        </div>
                        <PostComponent />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Post;