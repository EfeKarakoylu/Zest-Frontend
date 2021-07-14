import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Login from "./containers/login/Login";
import Register from "./containers/register/Register";
import Home from "./containers/home/Home";
import Layout from "./layout/Layout";
import RecipeDetail from "./containers/recipe/recipe-components/RecipeDetail";
import AddRecipe from "./containers/recipe/recipe-components/AddRecipe";
import MyRecipes from "./containers/recipe/recipe-components/MyRecipes";
import UpdateRecipe from "./containers/recipe/recipe-components/UpdateRecipe";
import MyProfile from "./containers/profile/MyProfile";
import OtherProfile from "./containers/profile/OtherProfile";
import Discover from "./containers/Discover/Discover";
import TagDetail from "./containers/Discover/TagDetail";
import { positions, Provider } from "react-alert";


function Routes() {
    return (
        <Provider>
            <Switch>
                <Route exact path='/' render={() => <Login/>} />
                <Route exact path='/login' render={() => <Login/>} />
                <Route exact path='/register' render={() => <Register/>}/>
                <Route exact path='/home' render={() => <Layout navbar={true} children={<Home/>}/> } />
                <Route exact path='/discover' render={() => <Layout navbar={true} children={<Discover/>}/> } />
                <Route exact path='/recipeDetail/:id' render={() => <Layout navbar={true} children={<RecipeDetail/>}/> } />
                <Route exact path='/addRecipe' render={() => <Layout navbar={true} children={<AddRecipe/>}/> } />
                <Route exact path='/userRecipes' render={() => <Layout navbar={true} children={<MyRecipes/>}/> } />
                <Route exact path='/updateRecipe/:id' render={() => <Layout navbar={true} children={<UpdateRecipe/>}/> } />
                <Route exact path='/myProfile' render={() => <Layout navbar={true} children={<MyProfile/>}/> } />
                <Route exact path='/userProfile/:name' render={() => <Layout navbar={true} children={<OtherProfile/>}/> } />
                <Route exact path='/myProfile/:name' render={() => <Layout navbar={true} children={<MyProfile/>}/> } />
                <Route exact path='/tagDetail/:tag' render={() => <Layout navbar={true} children={<TagDetail/>}/> } />
            </Switch>
        </Provider>
    );
}

export default withRouter(Routes);