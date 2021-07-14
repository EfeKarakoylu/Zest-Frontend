import React, {createRef, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from "react-redux";

import {withRouter} from "react-router-dom";
import withReducer from "./store/withReducer";
import recipeReducer from "./containers/recipe/store/reducers/recipe.reducers";
import {postImage} from "./store/actions/image.actions";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};





const DragAndDrop = ({recipe, user}) => {
    const dispatch = useDispatch()
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        open
    } = useDropzone({
        onDrop: (acceptedFiles => {
            acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            setImage(acceptedFiles)
        }),
        noClick: true,
        noKeyboard: true,
        accept: 'image/*'
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const [image, setImage] = useState(null)


    useEffect(() => {
        if (!image){
            return
        }
        dispatch(postImage({image: image[0]}))
    }, [image])



    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            <img src={file.preview} style={{width: "300px" ,height: "200px"}} alt=""/>
        </li>
    ));

    return (
        <div className="container">
            {user && <img className={"profile-img"} src={`http://localhost:5000/userImages/${user.id}`} alt=""/>}
            <div {...getRootProps({style})}>
                <input {...getInputProps()} required/>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <button
                    type="button"
                    onClick={open}
                >
                    Open File Dialog
                </button>
            </div>
            {recipe && <img src={`http://localhost:5000/recipeImages/${recipe.id}`} style={{width: "300px" ,height: "200px"}} alt=""/>}


            <aside>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}

export default withRouter(DragAndDrop)