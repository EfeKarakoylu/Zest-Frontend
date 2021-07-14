import {NavLink, useParams, withRouter} from "react-router-dom"
import "../Recipe.css"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addRecipeToUser, delete_alert,
    getHashtags,
    getRecipe,
    rateRecipe
} from "../store/actions/recipe.actions";
import withReducer from "../../../store/withReducer";
import recipeReducer from "../store/reducers/recipe.reducers";
import {Alert, Rating} from '@material-ui/lab';
import {Box, Button, Collapse, IconButton} from "@material-ui/core";
import {getCategory} from "../../../store/actions/category.actions";
import translator from "../../../i18n"
import NotifyUser from "../../../layout/NotifyUser";



const RecipeDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState(3)
    const [open, setOpen] = useState(true)
    const [hover, setHover] = useState(-1)
    const {recipe} = useSelector(state => state.recipe)
    const {user} = useSelector(state => state.user)
    const {category} = useSelector(state => state.categoryReducer)
    const {hashtags} = useSelector(state => state.recipe)
    const {recipe_alert} = useSelector(state => state.recipe)


    const labels = {
        0.5: 'Very Useless',
        1: 'Useless',
        1.5: 'Very Poor',
        2: 'Poor',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const handleAddRecipeToUserClick = () => {
        dispatch(addRecipeToUser(id))
    }

    const handleRateClick = () => {
        dispatch(rateRecipe(user.id, id, value))
    }

    useEffect(() => {
        dispatch(getRecipe(id))
        dispatch(getCategory(id))
        dispatch(getHashtags(id))
    }, [])

    useEffect(() => {
        if (!recipe){
            return
        }

        setValue(recipe.averageRate)
    }, [recipe])


    return (
        <div className="recipe-details">
            {recipe && <div className="recipe-detail-container">
                <div className="recipe-detail-appeareance">
                    {recipe && <img src={`http://localhost:5000/recipeImages/${recipe.id}`} style={{width: "200px", height: "auto"}} alt=""/>}
                    {recipe ? <p>{recipe.averageRate}</p> : '0'}
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    <button onClick={handleRateClick}>{translator.t('rate')}</button>
                </div>
                <div className="recipe-information">
                    <h2>{recipe ? recipe.name : ''}</h2>
                    <div className="recipe-owner">
                        {recipe.createdBy === user.name && <p>{translator.t('prepared_by')} <a href={`/myProfile/${recipe.createdBy}`} >{recipe ? recipe.createdBy : ''}</a></p>}
                        {recipe.createdBy !== user.name && <p>{translator.t('prepared_by')} <a href={`/userProfile/${recipe.createdBy}`} >{recipe ? recipe.createdBy : ''}</a></p>}
                    </div>
                    <div className="recipe-category">
                        {category ? category.name : ''}
                    </div>
                    <div className="recipe-detail-description">Yapilisi: {recipe ? recipe.description : ''}</div>
                    <div className="recipe-detail-ingredients">Icindekiler: {recipe ? recipe.ingredients.map(function (item, index){
                        return <div className="one-ingredient" key={index}>{item.amount } {item.name}</div>
                    }) : ''}</div>
                    <div>
                        {hashtags && hashtags.map(function (item){
                            return <NavLink className="tag-link" to={`/tagDetail/${item.tag.slice(1)}`} key={item.id} >{item.tag}</NavLink>
                        })}
                    </div>
                    {recipe.createdBy !== user.name && <button onClick={handleAddRecipeToUserClick}>{translator.t('add_to_my_recipes')}</button>}

                </div>


            </div>}
            <div>
                {recipe_alert && <NotifyUser recipe_alert={recipe_alert}/>}
            </div>
        </div>
    );
}
export default withRouter(withReducer("recipe", recipeReducer)(RecipeDetail))