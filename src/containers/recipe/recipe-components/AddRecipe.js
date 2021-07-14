import {useHistory, withRouter} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import {addRecipe} from "../store/actions/recipe.actions";
import {getCategories} from "../../../store/actions/category.actions";
import translator from "../../../i18n"
import {useDropzone} from "react-dropzone";
import DragAndDrop from "../../../DragAndDrop";
import NotifyUser from "../../../layout/NotifyUser";
import {createRecipe, getUser} from "../../../layout/actions/layout.actions";
import {deleteImageKey} from "../../../store/actions/image.actions";


const AddRecipe = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [hashtags, setHashtags] = useState('')
    // const [files, setFiles] = useState([])
    const [description, setDecription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [amount, setAmount] = useState('')
    const [key, setKey] = useState('')
    const [category, setCategory] = useState('Ana yemek')
    const [ingName, setIngName] = useState('')
    const history = useHistory()
    const {user} = useSelector(state => state.user)
    const {imageKey} = useSelector(state => state.imageReducer)
    const {categories} = useSelector(state => state.categoryReducer)
    const {user_alert} = useSelector(state => state.user)
    // console.log(files)
    // const {getRootProps, getInputProps} = useDropzone({
    //     accept: "image/*",
    //     onDrop: (acceptedFiles => {
    //         setFiles(
    //             acceptedFiles.map((file) => Object.assign(file, {
    //                 preview: URL.createObjectURL(file)
    //             }))
    //         )
    //     })
    // })

    // const images = files.map((file) => (
    //
    //     <div key={file.name}>
    //         <div>
    //             <img src={file.preview} style={{width: "200px"}} alt="preview"/>
    //         </div>
    //
    //     </div>
    // ))

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

    const handleAddRecipe = (e) => {
        e.preventDefault()
        dispatch(createRecipe({recipe: {name, description, ingredients, createdBy: user.name}, category: category, hashtags: hashtags, imageKey: imageKey}, history))
        dispatch(deleteImageKey())
    }

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getUser())

    }, [])

    useEffect(() => {
        if (!imageKey){
            return
        }
        console.log(imageKey, "image key")
        setKey(imageKey)
    }, [imageKey])


    return(
        <div className="create">
            <h2>{translator.t('add_recipe')}</h2>
                <label>{translator.t('recipe_title')}</label>
                <input
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            <DragAndDrop/>
            {/*<div className="drop-img-zone" {...getRootProps()}>*/}
            {/*    <input {...getInputProps()}/>*/}
            {/*    <p>Drop Image Here</p>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    {images}*/}
            {/*</div>*/}
            <label>Hashtags: </label>
            <textarea
                type="text"
                required
                onChange={(e) => setHashtags(e.target.value)}
            />
            <div>
                <label>{translator.t('category_selection')}</label>
                <select name="select-category" id="" onChange={(e) => setCategory(e.target.value)}>
                    {categories ? categories.map(function (item){
                        return <option key={item.id}>{item.name}</option>
                    }) : ''}
                </select>
            </div>
                <label>{translator.t('how_to_cook')}</label>
                <textarea
                    required

                    onChange ={(e) => setDecription(e.target.value)}
                ></textarea>

                <div className={'ingredients'}>
                    <h3>{translator.t('ingredients')}</h3>
                    {ingredients.length === 0 && <div>
                        {translator.t('empty_ingredients')}
                    </div>}
                    {ingredients.length > 0 && ingredients.map(function (item, index){
                        return <div className={'ingredient'} key={index}>
                            <p>{item.amount} {item.name}</p>
                            <span name={item.name} onClick={handleRemoveIngredient}>{translator.t('remove')}</span>
                        </div>
                    })}
                </div>

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
                <label className={'author'}>{translator.t('recipe_author')} {user ? user.name : ''}</label>
                <button className="btn-primary" onClick={handleAddRecipe}>{translator.t('add_recipe_button')}</button>
            <div>
                {user_alert && <NotifyUser recipe_alert={user_alert}/>}
            </div>
        </div>
    )
}

export default withRouter(AddRecipe);