import React from 'react'
import { Alert } from 'react-bootstrap'
import classes from '../container/Auth.module.css'

const Titles = props => {
    return (
        <>
            <div className="d-flex">
                <h2 className={classes.TitleMarginBottom} >{props.title}</h2>
                {props.error && <Alert id={classes.AlertCellPhone} className={classes.TitleMarginBottom} variant="danger">{props.error}</Alert>}
            </div>
            {props.error && <Alert id={classes.AlertDesktop} variant="danger">{props.error}</Alert>}
        </>
    )
}
export default Titles
