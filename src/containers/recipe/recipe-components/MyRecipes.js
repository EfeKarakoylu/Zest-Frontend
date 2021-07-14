import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {delete_alert, getRecipesForUser} from "../store/actions/recipe.actions";
import withReducer from "../../../store/withReducer";
import recipeReducer from "../store/reducers/recipe.reducers";
import EditableRecipeList from "./EditableRecipeList";
import translator from "../../../i18n"
import {Button, Collapse} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import NotifyUser from "../../../layout/NotifyUser";

const MyRecipes = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(true)
    const {userRecipes} = useSelector(state => state.userRecipes)
    const {user} = useSelector(state => state.user)
    const {recipe_alert} = useSelector(state => state.userRecipes)


    const handleClick = () => {

    }

    useEffect(() => {
        dispatch(getRecipesForUser(user.id))
    }, [user])


    return (
        <div className={'Home'}>
            {user && userRecipes && <div className={'content'}>

                <h1> {user ? user.name : ''} there are your delicious recipes... yummmmy</h1>
                <input type="text" placeholder={translator.t('filter')} className={'home-input'} onChange={(e) => setSearch(e.target.value)}/>
                {userRecipes ? <EditableRecipeList recipes={userRecipes.filter(recipe => recipe.name.toLowerCase().includes(search))} url={'/recipeUpdate/'}/> : ''}
            </div>}
            <div>
                {recipe_alert && <NotifyUser recipe_alert={recipe_alert}/>}
            </div>
        </div>
    );
}

export default withRouter(withReducer("userRecipes", recipeReducer)(MyRecipes))