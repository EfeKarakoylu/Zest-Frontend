import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./Home.css"
import {getFollowings, getUser} from "../../layout/actions/layout.actions";
import {getRecipes, setField} from "../recipe/store/actions/recipe.actions";
import withReducer from "../../store/withReducer";
import recipeReducer from "../recipe/store/reducers/recipe.reducers";
import RecipeList from "../recipe/recipe-components/RecipeList";
import {getCategories} from "../../store/actions/category.actions";
import translator  from "../../i18n"
import * as ReactBootstrap from "react-bootstrap"
import {CircularProgress} from "@material-ui/core";


const Home = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState(0)
    const {user} = useSelector(state => state.user)
    let {recipes, loading} = useSelector(state => state.recipes)
    const {categories} = useSelector(state => state.categoryReducer)
    const {followings} = useSelector(state => state.user)


    const filterRecipes = (category) => {
        recipes = recipes.filter(recipe => {
            return recipe.CategoryId === category + 1
        })
    }

    const scrollToEnd = () => {
        setPage(page+1)
    }

    window.onscroll = function (){
        // if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
        //     scrollToEnd()
        //     console.log("wow")
        // }
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight){
            scrollToEnd()
        }
    }


    useEffect(() => {
        dispatch(getUser())
        dispatch(setField("loading", true))
        dispatch(getRecipes(page))
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        dispatch(getRecipes(page))
    }, [page])

    useEffect(() => {
        if (!recipes){
            return
        }
        setField("loading", false)
    }, [recipes])

    useEffect(() => {
        if (!user){
            return
        }
        dispatch(getFollowings(user.id))
    }, [user])

    return(
        <div className={'Home'}>
            {user && recipes && <div className={'content'}>
                <h1>{translator.t('welcome')}</h1>
                {<ReactBootstrap.Spinner animation="border"/>}
                <div>
                    {translator.t('category_selection')}
                    <select name="select-category" id=""  className="category-selection" onChange={(e) => {
                        setCategory(e.target.selectedIndex)
                        filterRecipes(e.target.selectedIndex)
                    }
                    }>
                        <option key={0}>All Categories</option>
                        {categories ? categories.map(function (item){
                            return <option key={item.id}>{item.name}</option>
                        }) : ''}

                    </select>
                </div>
                <input type="text" placeholder={translator.t('filter')} className={'home-input'} onChange={(e) => setSearch(e.target.value)}/>
                {!loading ? <div>
                    { category === 0 && recipes && followings && <RecipeList recipes={recipes.filter(recipe => {
                        return followings.find((following) => {
                            return recipe.createdBy === following.name || recipe.createdBy === user.name
                        })
                    }).filter(recipe => recipe.name.toLowerCase().includes(search))}/>}
                    {category !== 0 && <RecipeList recipes={recipes = recipes.filter(recipe => {
                        return followings.find((following) => {
                            return recipe.createdBy === following.name || recipe.createdBy === user.name
                        })
                    }).filter(recipe => {
                        return recipe.CategoryId === category + 1
                    }).filter(recipe => recipe.name.toLowerCase().includes(search))}/>}
                </div> : <div className={"loading"}>
                    <CircularProgress className={"progress"}/>
                </div>}
            </div>}
        </div>
    );
}

export default withRouter(withReducer("recipes", recipeReducer)(Home))