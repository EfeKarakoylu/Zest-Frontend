import {useDispatch, useSelector} from "react-redux";
import {useParams, withRouter} from "react-router-dom";
import {
    getFollowers,
    getFollowings,
    getUserWithName, updateUser,
} from "../../layout/actions/layout.actions";
import {useEffect, useState} from "react";
// import {getRecipesForUser} from "../recipe/store/actions/recipe.actions";
import withReducer from "../../store/withReducer";
import recipeReducer from "../recipe/store/reducers/recipe.reducers";
// import "../recipe/Recipe.css"
import "./Profile.css"
import Dropdown from "../../layout/Dropdown"
import translator from "../../i18n"
import DragAndDrop from "../../DragAndDrop";

const MyProfile = () => {

    let {name} = useParams()
    const dispatch = useDispatch()
    const {userToBeLinked} = useSelector(state => state.user)
    const {followings} = useSelector(state => state.user)
    const [key, setKey] = useState('')
    const {followers} = useSelector(state => state.user)
    const {user} = useSelector(state => state.user)
    const [description, setDescription] = useState('')
    const {imageKey} = useSelector(state => state.imageReducer)


    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(description)
        dispatch(updateUser({description: description, imageKey: key}))
    }

    useEffect(() => {
        dispatch(getUserWithName(name))
    }, [name])

    useEffect(() => {
        // dispatch(getRecipesForUser(userToBeLinked.id))
        dispatch(getFollowers(userToBeLinked.id))
        dispatch(getFollowings(userToBeLinked.id))
    }, [userToBeLinked])


    useEffect(() => {
        if (!user){
            return
        }
        setDescription(user.description)
    }, [user])

    useEffect(() => {
        if (!imageKey){
            return
        }
        setKey(imageKey)
    }, [imageKey])

    return(
        <div className={'profile-container'}>
            <div className={"profile-item-container"}>
                <div className={'profile-features'}>
                    <div className={'myName'}>{userToBeLinked ? userToBeLinked.name : ''}</div>
                    <DragAndDrop user={user}/>
                </div>
                <div className={'relation-description-container'}>
                    <div className={'profile-relations'}>
                        <div className={'myFollowers'}>{translator.t('followers')} {followers && <Dropdown title="Followers" items={followers}></Dropdown>}
                        </div>
                        <div className={'myFollowings'}>{translator.t('followings')} {followings && <Dropdown isAble={true} title="followings" items={followings}></Dropdown>}
                        </div>
                    </div>
                    <div className={'user-description-container'}>
                        <textarea className={'user-description'} name="" id="" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <button className={'user-description-button'} onClick={handleUpdate}>{translator.t('update')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default withRouter(withReducer("userRecipes", recipeReducer)(MyProfile))