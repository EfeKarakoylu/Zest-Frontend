import {useEffect} from "react";
import {useParams, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../layout/actions/layout.actions";
import {getRecipesOfTheHashtag} from "../recipe/store/actions/recipe.actions";
import withReducer from "../../store/withReducer";
import recipeReducer from "../recipe/store/reducers/recipe.reducers";
import DiscoverList from "./DiscoverList";
const TagDetail = () => {
    console.log("sa")
    let {tag} = useParams()

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {tag_recipes} = useSelector(state => state.tag_recipes)
    console.log(tag_recipes)

    useEffect(() => {
        dispatch(getUser())
        dispatch(getRecipesOfTheHashtag({hashtag: "#" + tag}))
    }, [dispatch])

    return(

        <div className={'Discover'}>
            <h1>{"#" + tag}</h1>
            {user && tag_recipes && <div className={'discover-content'}>
                {tag_recipes && <DiscoverList recipes={tag_recipes.sort(() => Math.random() - 0.5)}/>}
            </div>}
        </div>
    );
}

export default withRouter(withReducer("tag_recipes", recipeReducer)(TagDetail))