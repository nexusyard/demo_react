import { useState } from "react";
import { Link } from "react-router-dom";

const DynamicMenuComponent = () => {
    const menus = [
            {
                id: 1,
                title: 'Home',
                path: '/',
                submenu: []
            },
            {
                id: 2,
                title: 'Products',
                path: '/products',
                submenu: [ 
                    { 
                        id: 1,
                        title: 'Kids',
                        path: '/kids' 
                    },
                    { 
                        id: 2,
                        title: 'Winter',
                        path: '/winter' 
                    },
                    { 
                        id: 3,
                        title: 'Electronics',
                        path: '/electronics' 
                    }
                ]
            },
            {
                id: 3,
                title: 'Customers',
                path: '/customers',
                submenu: []
            },
            {
                id: 4,
                title: 'Array Test',
                path: '/array_test',
                submenu: []
            },
            {
                id: 5,
                title: 'Search Params',
                path: '/params',
                submenu: []
            },
            {
                id: 6,
                title: 'React Hooks',
                path: '/hooks',
                submenu: [
                    {
                        id: 1,
                        title: 'useState',
                        path: '/state',
                    },
                    {
                        id: 2,
                        title: 'useReducer',
                        path: '/reducer',
                    },
                    {
                        id: 3,
                        title: 'useCallback',
                        path: '/callback',
                    },
                ]
            },
            {
                id: 7,
                title: 'Post',
                path: '/post',
                submenu: []
            },
        ]
        const [visible, setVisible] = useState(false);
        const focusHandler =(id) => {
            const findMenu = menus.find((item) => ( item.id === id))
            // console.log('focus', id, findMenu);
            if(findMenu.submenu.length > 0)
            {
                setVisible(true);
            }
        }

    return (
        <div style={{ display:'flex', flexDirection: 'row', backgroundColor: 'lightgrey', width: '100%', padding: 20}}>
        { menus.map( (menu, i) => {
            return (
                <nav key={i}>
                    <Link 
                        onMouseOver={() => focusHandler(menu.id)} 
                        onMouseLeave={ () => setVisible(false) } 
                        style={{ padding: '20px 20px', textDecoration: 'none'}} to={menu.path} >
                            { menu.title}
                    </Link>
                    { menu.submenu.length > 0 && <SubMenu visible={visible} submenu={menu.submenu} /> }
                </nav>
            )
        })}
        </div>
    )
}

export default DynamicMenuComponent;

const SubMenu = ({submenu, visible}) => {
    // console.log(submenu)
    return(
        <div style={{ position: 'absolute', display: visible ? 'block' : 'none', marginTop: 20}}>
            { submenu.length > 0 && submenu.map((menu, i) => {
                return (
                    <nav key={i}>
                        <Link style={{ padding: '20px 20px', textDecoration: 'none' }} to={ menu.path } >{ menu.title }</Link>
                    </nav>
                )
            })}
        </div>
    )
}