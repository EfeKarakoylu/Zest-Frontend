import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../../layout/actions/layout.actions";
import burger from "../../Discover/images/burger-img.png"
import {Rating} from "@material-ui/lab";
import translator from "../../../i18n"
const RecipeList = ({recipes}) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUser())
    }, [])
    return(
        <div className='recipe-list'>
            {recipes && recipes.map(function (item, index){

                return <div key={item.id} className="recipe-preview">
                    <div className="recipe-header">
                        <Link to={`/recipeDetail/${item.id}`} >
                            <h2>{item.name}</h2>
                            <p>{translator.t('prepared_by')} {item.createdBy} </p>
                        </Link>
                        <div className="recipe-preview-rating">

                            <Rating
                                name="hover-feedback"
                                precision={0.5}
                                value={item.averageRate}
                            />
                            <p>{item.averageRate}</p>
                        </div>

                    </div>
                    <div className="recipe-content">
                        <Link to={`/recipeDetail/${item.id}`} >
                            {item && <img src={`http://localhost:5000/recipeImages/${item.id}`} style={{width: "200px", height: "auto"}} alt=""/>}
                        </Link>

                        <div className="recipe-preview-description">
                            {item.description}
                        </div>
                    </div>


                </div>
            })}
        </div>
    );
}

export default RecipeList;