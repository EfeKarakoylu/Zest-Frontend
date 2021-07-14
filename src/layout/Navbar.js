import {Button, IconButton} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router";
import * as Actions from "../store/actions";
import Tooltip from '@material-ui/core/Tooltip';

function Navbar(props) {
    const dispatch = useDispatch();
    const {targetsMenuOpened} = useSelector(state => state.settings.layout);

    return (
        <div className="h-full fixed navbar" style={{backgroundColor: "#121212"}}>
            <div className="flex pt-12 pb-8 justify-center " style={{backgroundColor: "#192D3E"}}>
                <div>

                    <div className="flex justify-center pt-32">
                        <div>
                            <div>
                                <div className="flex justify-center items-center">
                                    <Tooltip title="Ana Sayfa">
                                        <IconButton onClick={() => props.history.push('/genel')}>
                                            <HomeIcon style={{color: "white"}} className="icons"/>
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <div className="flex justify-center items-center">
                                    <Tooltip title="Hedef Oluştur">
                                        <IconButton
                                            onClick={() => dispatch(Actions.setTargetsMenuOpened(!targetsMenuOpened))}>
                                            <TrackChangesIcon style={{color: "white"}} className="icons"/>
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <div className="flex justify-center items-center">
                                    <Tooltip title="Okul Gelişim Planım">
                                        <Button onClick={() => {
                                            props.history.push('/faaliyetler');
                                        }}>
                                            <ListAltOutlinedIcon style={{color: "white"}} className="icons"/>
                                        </Button>
                                    </Tooltip>
                                </div>

                                {/*<div className="flex justify-center items-center">
                                    <Tooltip title="Veritabanı Aktarımı">
                                        <Button onClick={() => {
                                            props.history.push('/yonetici-ekrani');
                                        }}>
                                            <DataUsageIcon style={{color: "white"}} className="icons"/>
                                        </Button>
                                    </Tooltip>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Navbar);
