import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../layout/actions/layout.actions";
import {getRecipes, setField} from "../recipe/store/actions/recipe.actions";
import withReducer from "../../store/withReducer";
import recipeReducer from "../recipe/store/reducers/recipe.reducers";
import DiscoverList from "./DiscoverList";
import {CircularProgress} from "@material-ui/core";
const Discover = () => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const {user} = useSelector(state => state.user)
    const {recipes, loading} = useSelector(state => state.recipes)


    useEffect(() => {
        dispatch(getUser())
        dispatch(getRecipes(page))
        dispatch(setField("loading", true))
    }, [])

    useEffect(() => {
        dispatch(getRecipes(page))
    }, [page])

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
    // recipes.sort(() => Math.random() - 0.5)

    return(
        <div className={'Discover'}>
            {user && recipes && <div className={'discover-content'}>
                <h1>Welcome {user ? user.name : ''} here lots of recipes you may want to look at... :D</h1>
                {!loading ? <div>{recipes && <DiscoverList recipes={recipes}/>}</div> : <div className={"loading"}>
                    <CircularProgress/>
                </div>}
            </div>}
        </div>
    );
}

export default withRouter(withReducer("recipes", recipeReducer)(Discover))