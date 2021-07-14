import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from "./actions/layout.actions";
import './Layout.css';
import 'semantic-ui-css/semantic.min.css'
import "../styles/utilities.css"
import layoutReducer from "./reducers/layout.reducers";
import withReducer from "../store/withReducer";
import {NavLink, withRouter} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBook, faPlusSquare, faSearch, faIdCard, faSignOutAlt, faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import {changeLanguage} from "../store/actions/language.actions";
import translator from "../i18n";
import {delete_alert} from "../containers/recipe/store/actions/recipe.actions";


function Layout(props) {
    const dispatch = useDispatch();
    const color = "#f1356d"
    const homeIcon = <FontAwesomeIcon icon={faHome} color={color}/>
    const myRecipesIcon = <FontAwesomeIcon icon={faBook} color={color}/>
    const addRecipeIcon = <FontAwesomeIcon icon={faPlusSquare} color={color}/>
    const discoverIcon = <FontAwesomeIcon icon={faSearch} color={color}/>
    const profileIcon = <FontAwesomeIcon icon={faIdCard} color={color}/>
    const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} color={color}/>
    const toggleIcon = <FontAwesomeIcon icon={faVectorSquare}/>
    const [isOpen, setIsOpen] = useState(false)
    const {language} = useSelector(state => state.language)
    const [selectedLanguage, setSelectedLanguage] = useState('en')

    const onButtonClick = () => {
        setIsOpen(!isOpen)
    }
    const {children} = props
    const {user} = useSelector(state => state.user)

    useEffect( () => {
        dispatch(getUser())

    }, [])

    useEffect(() => {
        dispatch(changeLanguage(selectedLanguage))
    }, [selectedLanguage])


    return (
        <div>
            <div className="navbar">
                <div className="container flex">
                    <h1>Zest</h1>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName = "navlink" to="/home">{translator.t('navbar_home')}</NavLink></li>
                            <li><NavLink activeClassName = "navlink" to="/userRecipes">{translator.t('navbar_myRecipes')}</NavLink></li>
                            <li><NavLink activeClassName = "navlink" to="/addRecipe">{translator.t('navbar_addRecipe')}</NavLink></li>
                            <li><NavLink activeClassName = "navlink" to="/discover">{translator.t('navbar_discover')}</NavLink></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName = "navlink" to={`/myProfile/${user && user.name}`}>{ user && user.name}</NavLink></li>
                            <li><NavLink activeClassName = "navlink" to="/login">{translator.t('navbar_logout')}</NavLink></li>
                        </ul>
                    </nav>
                    <select className="lang-selection" name="select-category" id="" onChange={(e) => {
                        setSelectedLanguage(e.target.value)
                        translator.changeLanguage(e.target.value)

                        console.log(selectedLanguage)


                    }
                    }>
                        <option value={'en'}>EN</option>
                        <option value={'tur'}>TUR</option>
                    </select>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <main className="content overflow-y-auto sm:mt-2" style={{overflow: "visible"}}>
                    {children}
                </main>
            </div>
            <div className="bottombar-header">
                <nav className="bottombar">
                    <div className="nav__btns">
                        <div onClick={onButtonClick} className="nav__toggle">
                            {toggleIcon}
                        </div>
                    </div>
                    {isOpen ? <div className="nav-menu">
                        <ul className="bottombar-list grid">
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to="/home">
                                    {homeIcon}
                                </NavLink>
                            </li>
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to="/userRecipes">
                                    {myRecipesIcon}
                                </NavLink>
                            </li>
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to="/addRecipe">
                                    {addRecipeIcon}
                                </NavLink>
                            </li>
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to="/discover">
                                    {discoverIcon}
                                </NavLink>
                            </li>
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to={`/myProfile/${user.name}`}>
                                    {profileIcon}
                                </NavLink>
                            </li>
                            <li className="bottombar-item">
                                <NavLink className="bottom-link" to="/login">
                                    {signOutIcon}
                                </NavLink>
                            </li>
                        </ul>
                    </div> : null}

                </nav>
            </div>
        </div>

    );
}

export default withRouter(withReducer("user", layoutReducer)(Layout))