import {Button, Collapse} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {delete_alert} from "../containers/recipe/store/actions/recipe.actions";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import {positions} from "react-alert";
import {delete_user_alert} from "./actions/layout.actions";


const NotifyUser = ({recipe_alert, user_alert}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)

    const handleTimer = () => {
        setTimeout(function (){
            dispatch(delete_alert())
            dispatch(delete_user_alert())
        }, 2000)
    }
    const options = {
        timeout: 5000,
        position: positions.BOTTOM_CENTER,

    };

    useEffect(() => {
        handleTimer()
    })



    return(
        <div>
            {recipe_alert && recipe_alert.slice(0, 3) === '404' ? <Collapse in={open}>
                <Alert severity={"error"}
                    action={
                        <Button
                            onClick={() => {
                                setOpen(false);
                                dispatch(delete_alert())
                            }}
                        >
                            X
                        </Button>
                    }
                >
                    {recipe_alert.slice(3)}
                </Alert>
            </Collapse> : <Collapse in={open}>
                <Alert severity={"success"}
                       action={
                           <Button
                               onClick={() => {
                                   setOpen(false);
                                   dispatch(delete_alert())
                               }}
                           >
                               X
                           </Button>
                       }
                >
                    {recipe_alert}
                </Alert>
            </Collapse>}
        </div>
    );
}

export default NotifyUser;