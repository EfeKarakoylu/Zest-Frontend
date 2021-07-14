import {useState} from "react";
import "./Dropdown.css"
import {useHistory} from "react-router-dom";
import onClickOutside from "react-onclickoutside"
import {unfollowUser} from "./actions/layout.actions";
import {useDispatch} from "react-redux";
import translator from "../i18n"

const Dropdown = ({isAble, title, items = [], multiSelect = false}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const history = useHistory()
    const [buttonName, setButtonName] = useState('unfollow')
    const toggle = () => setOpen(!open)
    Dropdown.handleClickOutside = () => setOpen(false)

    const handleUnfollow = (e, id)  => {
        e.preventDefault()
        dispatch(unfollowUser(id))
        setButtonName('unfollowed')
    }

    function handleOnClick(item){
        history.push(`/userProfile/${item.name}`)

    }
    return(
        <div className="dd-wrapper">
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
            >


                <div className="dd-header_action">
                    <p>{items ? items.length : '0'}</ p>
                </div>
            </div>
            {open && (
                <div className='dropdown-container'>
                    <input type="text" placeholder={translator.t('filter')} className='dropdown-search' onChange={(e) => setSearch(e.target.value)}/>
                    <div className="dd-list">
                        {items.filter(item => item.name.toLowerCase().includes(search)).map(item => {
                            return <div key={item.id} className="dd-list-item-container">
                                <a className="dd-link" onClick={() => handleOnClick(item)}>
                                    {item.name}
                                </a>
                                {isAble && title === "followings" && <button className="dd-button" onClick={(e) => handleUnfollow(e, item.id)}>{translator.t('unfollow')}</button>}
                            </div>
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default Dropdown