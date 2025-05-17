import { Fragment } from "react"
import Button from "../UI/Button"
import classes from './Header.module.css'

const Header=(props)=>{
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Bookmark Website</h1>
                <Button label="Add New" onClick={props.onClick} />
            </header>
        </Fragment>
    )
}

export default Header