import { Fragment } from 'react/jsx-runtime'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const portalElement= document.getElementById('overlays')

const Backdrop= props=>{
    return <div className={classes.Backdrop} onClick={props.onClose}/>
}

const ModalOverlay= props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const Modal=props =>{
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClick}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
}

export default Modal;