import {useHistory, useParams, withRouter} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import {getHashtags, getRecipe, updateRecipe} from "../store/actions/recipe.actions";
import withReducer from "../../../store/withReducer";
import recipeReducer from "../store/reducers/recipe.reducers";
import "../Recipe.css"
import {getCategories} from "../../../store/actions/category.actions";
import translator from "../../../i18n"
import DragAndDrop from "../../../DragAndDrop";
import {deleteImageKey} from "../../../store/actions/image.actions";
import {Collapse} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import NotifyUser from "../../../layout/NotifyUser";

const UpdateRecipe = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [newHashtags, setHashtags] = useState('')
    const [key, setKey] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [amount, setAmount] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [ingName, setIngName] = useState('')
    const {user} = useSelector(state => state.user)
    const history = useHistory()
    const {recipe} = useSelector(state => state.recipe)
    const {categories} = useSelector(state => state.categoryReducer)
    const {hashtags} = useSelector(state => state.recipe)
    const [open, setOpen] = useState(true)
    const {recipe_alert} = useSelector(state => state.recipes)
    const {imageKey} = useSelector(state => state.imageReducer)




    const handleAddIngredient = (e) => {
        e.preventDefault()
        setIngredients([...ingredients, {name: ingName, amount: amount}])
        setIngName('')
        setAmount('')
    }

    const handleRemoveIngredient = (e) => {
        e.preventDefault()
        setIngredients(ingredients.filter(item => item.name !== e.target.getAttribute('name')))
    }

    const handleUpdateRecipe = (e) => {
        e.preventDefault()
        dispatch(updateRecipe({recipe:{name, description, ingredients, createdBy: user.name}, categoryName: categoryName, newHashtags: newHashtags.trim(), imageKey: key}, id, history))
        dispatch(deleteImageKey())
    }

    useEffect(() => {
        dispatch(getRecipe(id))
        dispatch(getCategories())
        dispatch(getHashtags(id))

    }, [])

    useEffect(() => {
        if (!imageKey){
            return
        }
        setKey(imageKey)
    }, [imageKey])

    useEffect(() => {
        if (!recipe || !recipe.ingredients){
            return
        }
        setIngredients(recipe.ingredients)
        setDescription(recipe.description)
        setName(recipe.name)
        setKey(recipe.imageKey)


    }, [recipe])

    useEffect(() => {
        if (!hashtags){
            return null
        }
        setHashtags(hashtags.map(function (item){
            return item.tag
        }).join(' '))
    }, [hashtags])

    return(
        <div className="create">
            <h2>{translator.t('update_recipe')}</h2>
            {recipe && <div>
                <label>{translator.t('recipe_title')}</label>
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <DragAndDrop recipe={recipe}/>
                <label>Hashtags: </label>
                <textarea
                    type="text"
                    required
                    value={newHashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                />
                <div>
                    {translator.t('category_selection')}
                    <select name="select-category" id="" onChange={(e) => {
                        setCategoryName(e.target.value)
                    }
                    }>
                        {categories ? categories.map(function (item){
                            return <option selected={item.id === recipe.CategoryId} key={item.id} value={item.name}>{item.name}</option>
                        }) : ''}
                    </select>
                </div>
                <label>{translator.t('how_to_cook')}</label>
                <textarea
                    required
                    value={description}
                    onChange ={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className={'ingredients'}>
                    <h3>{translator.t('ingredients')}</h3>
                    {ingredients.length === 0 && <div>
                        empty
                    </div>}
                    {ingredients.length > 0 && ingredients.map(function (item, index){
                        return <div className={'ingredient'} key={index}>
                            <p>{item.amount} {item.name}</p>
                            <span name={item.name} onClick={handleRemoveIngredient}>{translator.t('remove')}</span>
                        </div>
                    })}
                </div>
                <label className={'author'}>{translator.t('recipe_author')} {recipe.createdBy}</label>

                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input value={ingName} fluid icon='quote right' iconPosition='left' placeholder={translator.t('ingredient_name')} required onChange={(e) => setIngName(e.target.value)}/>
                                <Form.Input
                                    value={amount}
                                    fluid
                                    icon='spoon'
                                    iconPosition='left'
                                    placeholder={translator.t('ingredient_amount')}
                                    type='text'
                                    onChange={(e) => setAmount(e.target.value)}

                                />
                                {/*<div>*/}
                                {/*    <button type="submit" value={'Add Ingredient'} onClick={handleSubmit}>Add ingredient</button>*/}
                                {/*</div>*/}
                                <Button color='grey' fluid size='medium' onClick={handleAddIngredient} >
                                    {translator.t('add_ingredient')}
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <button className={"btn-primary"} onClick={handleUpdateRecipe}>{translator.t('update')}</button>
            </div>}
            <div>
                {recipe_alert && <NotifyUser recipe_alert={recipe_alert}/>}
            </div>
        </div>
    )
}

export default withRouter(withReducer("recipe", recipeReducer)(UpdateRecipe))