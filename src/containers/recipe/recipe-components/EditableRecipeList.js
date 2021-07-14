import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteRecipeForAll, deleteRecipeForUser} from "../store/actions/recipe.actions";
import React, {useEffect} from "react";
import {getUser} from "../../../layout/actions/layout.actions";
import '../Recipe.css'
import foodImage from "../../Discover/images/burger-img.png"
import translator from "../../../i18n"
const EditableRecipeList = ({recipes}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)


    const handleDeleteForMe = (e, id) => {
        e.preventDefault()
        dispatch(deleteRecipeForUser(id))
    }

    const handleDeleteForAll = (e, id) => {
        e.preventDefault()
        dispatch(deleteRecipeForAll(id))
    }

    const handleUpdate = (e, id) => {
        e.preventDefault()
        history.push(`/updateRecipe/${id}`)
    }

    useEffect(() => {
        dispatch(getUser())
    }, [])
    return(
        <div className='recipe-list'>
            {recipes && recipes.map(function (item, index){
                return <div key={item.id} className="editable-preview">
                    <div>
                        <h2>{item.name}</h2>
                        <p>{translator.t('prepared_by')} {item.createdBy}</p>
                        <p>How to cook: {item.description}</p>
                        <div className='updateRecipe-list-button-container'>
                        {user && user.name !== item.createdBy && <button className="btn-primary " onClick={(e) => {handleDeleteForMe(e, item.id)}}>{translator.t('delete_for_me')}</button>}
                        {user && user.name === item.createdBy && <div>
                            <button className="btn-primary" onClick={(e) => {handleDeleteForAll(e, item.id)}}>{translator.t("delete_for_everyone")}</button>
                            <button className="btn-primary" onClick={(e) => handleUpdate(e, item.id)}>{translator.t('update_recipe_btn')}</button>
                        </div>
                        }
                        </div>
                    </div>
                    <Link to={`/recipeDetail/${item.id}`} >
                        <div>
                            {item && <img  src={`http://localhost:5000/recipeImages/${item.id}`} style={{width: "200px", height: "auto"}} alt=""/>}
                        </div>
                    </Link>
                </div>
            })}
        </div>
    );
}

export default EditableRecipeList