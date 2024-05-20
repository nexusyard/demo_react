import {React } from "react";
import styles from './Container.module.css';

const Container = ({ children }, props) => {
    return (
        <div className={ styles.container_box } >
            { children }
        </div>
    )
}

export default Container;