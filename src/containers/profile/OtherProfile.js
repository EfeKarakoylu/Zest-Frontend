import {useDispatch, useSelector} from "react-redux";
import {Link, useParams, withRouter} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getRecipesForUser} from "../recipe/store/actions/recipe.actions";
import withReducer from "../../store/withReducer";
import recipeReducer from "../recipe/store/reducers/recipe.reducers";
import "../recipe/Recipe.css"
import {
    followUser,
    getFollowers,
    getFollowings,
    getUserWithName,
    unfollowUser
} from "../../layout/actions/layout.actions";
import Dropdown from "../../layout/Dropdown";
import RecipeList from "../recipe/recipe-components/RecipeList";
import translator from "../../i18n"
import NotifyUser from "../../layout/NotifyUser";



const OtherProfile = () => {
    let {name} = useParams()
    const dispatch = useDispatch()
    const [followButtonName, setFollowButtonName] = useState(translator.t('follow'))
    const [unfollowButtonName, setUnfollowButtonName] = useState(translator.t('unfollow'))
    const {userRecipes}  = useSelector(state => state.userRecipes)
    const {userToBeLinked} = useSelector(state => state.user)
    const {followers} = useSelector(state => state.user)
    const {followings} = useSelector(state => state.user)
    const {user} = useSelector(state => state.user)
    const {user_alert} = useSelector(state => state.user)



    const handleFollow = (e, id)  => {
        e.preventDefault()
        dispatch(followUser(id))
        setFollowButtonName(translator.t('followed'))
    }

    const handleUnfollow = (e, id)  => {
        e.preventDefault()
        dispatch(unfollowUser(id))
        setUnfollowButtonName(translator.t('unfollowed'))
    }

    useEffect(() => {
        dispatch(getUserWithName(name))
    }, [name])

    useEffect(() => {
        dispatch(getUserWithName(name))
    }, [])

    useEffect(() => {
        dispatch(getRecipesForUser(userToBeLinked.id))
        dispatch(getFollowers(userToBeLinked.id))
        dispatch(getFollowings(userToBeLinked.id))
    }, [userToBeLinked])




    return(
        <div>
            <div className={'profile-container'}>
                <div className={"profile-item-container"}>
                    <div className={'profile-features'}>
                        <div className={'myName'}>{userToBeLinked ? userToBeLinked.name : ''}</div>
                        {user && <img className={"profile-img"} src={`http://localhost:5000/userImages/${userToBeLinked.id}`} alt=""/>}
                        {followers && user.name !== userToBeLinked.name && followers.find(function (item){
                                return item.name === user.name
                            }
                        ) === undefined
                        &&
                        <button className={'recipe-preview-buttons'} onClick={(e) => handleFollow(e, userToBeLinked.id)}>{followButtonName}</button>}
                        {followers &&  followers.find(function (item){
                                return item.name === user.name
                            }
                        ) !== undefined
                        && <button className={'recipe-preview-buttons'} onClick={(e) => handleUnfollow(e, userToBeLinked.id)}>{unfollowButtonName}</button>}
                    </div>
                    <div className={'relation-description-container'}>
                        <div className={'profile-relations'}>
                            <div className={'myFollowers'}>{translator.t('followers')} {followers && <Dropdown title="Followers" items={followers}></Dropdown>}
                            </div>
                            <div className={'myFollowings'}>{translator.t('followings')} {followings && <Dropdown isAble = {false} title="followings" items={followings}></Dropdown>}
                            </div>
                        </div>
                        <div className={'user-description-container'}>
                            <p>{userToBeLinked ? userToBeLinked.description : ' '}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*{userRecipes ? userRecipes.filter(recipe => recipe.createdBy === userToBeLinked.name).map(function (item){*/}
            {/*    return <div key={item.id} className="recipe-preview">*/}
            {/*        <Link to={`/recipeDetail/${item.id}`} >*/}
            {/*            <h2>{item.name}</h2>*/}
            {/*            <p>Prepared by {item.createdBy}</p>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*}) : ''}*/}
            {userRecipes ? <RecipeList recipes={userRecipes.filter(recipe => recipe.createdBy === userToBeLinked.name)}/> : ''}
            {user_alert && <NotifyUser recipe_alert={user_alert}/> }
        </div>


    );



}

export default withRouter(withReducer("userRecipes", recipeReducer)(OtherProfile))