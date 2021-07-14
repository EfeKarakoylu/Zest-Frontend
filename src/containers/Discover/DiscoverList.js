import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "../../layout/actions/layout.actions";
import "./Discover.css"
import burger from "./images/burger-img.png"
import {Rating} from "@material-ui/lab";
import translator from "../../i18n"

const RecipeList = ({recipes}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
    }, [])


    return(
        <div className='discover-recipe-list'>
            {recipes && recipes.map(function (item){
                return <div key={item.id} className="recipe-preview-discover">
                    <Link to={`/recipeDetail/${item.id}`} >
                        {item && <img className='discover-preview-img'  src={`http://localhost:5000/recipeImages/${item.id}`} alt=""/>}
                        <div>
                            <div className="discover-recipe-features">
                                <h2>{item.name}</h2>
                                <Rating size='small' className="discover-recipe-rating"
                                    name="hover-feedback"
                                    precision={0.5}
                                    value={item.averageRate}
                                />
                            </div>
                            <p className="discover-recipe-owner">{translator.t('prepared_by')} {item.createdBy} </p>
                        </div>
                    </Link>
                </div>
            })}
        </div>
    );
}

export default RecipeList;