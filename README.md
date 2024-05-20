### React Hooks:

## useRef

## useState

## useReducer 

## useEffect

## useLayoutEffect

## useMemo

## useCallback

## useContext

<!-- use with ref | pass between components -->
## useImperativeHandle

<!-- Use in custom hook | useful debugging value -->
## useDebugValue

<!-- React 18.0 -->
## useTransition

<!-- Avoid unnecessary renders  -->
## useDeferredValue                             
use just assign to new value to deferred value  
***e.g***  
const deferredValue = useDeferredValue(someValue);

<!-- Unique id for components -->
## useId


### Javascript concept:
## Fetch Response
- Fetch api use to call api ajax request.
- Fetch is asynchronous request to call api.
- fetch api require two parameter.
- 1. URL 
- 2. options (options include: method, body, headers etc.)
- fetch response type.
1. res.json();      // object format
2. res.blob();      // File format.
3. res.arrayBuffer  // take response stream //for audio we can use it. or readFiles
4. res.clone        // create identical res object but store in different var
5. res.text()       // read response if text 
6. res.body         // ReadableStream() if we get some readable stream like image. 
-----------------
7. res.status()     // status digit eg. 200
8. res.statusText() // ok if success or error
9. res.type:        // type is useful for check from where response coming from if it's coming from ***same origin*** it gives basic, if response coming from other origin it gives ***cors***, if request made for different origin but that doesn't return cors headers it gives ***opaque***.
10. res.redirect()   // to redirect other url, require parameter url & status(301 to 308).
11. res.redirected   // return true or false.

## new AudioContext()
- create audio context

## new Request() object
- to create request 
- It requires two parameter 
1. String Url 
2. options eg. methods, headers
- created request can be used with fetch api.

## new Blob
- Blob object used to create blob 
- May be useful create from buffer data or chunk of data.
- convert readableStream into actual type viewable data.

## new URL Object methods
- used to create URL using URL object static methods.
- URL.createObjectUrl() //use to create url from blob object.
- URL.revokeObjectUrl() //release existing url object created by createObjectUrl.
- URL.canParse()        //return boolean if url is parse or not.
- there are list of instance methods check MDN.
