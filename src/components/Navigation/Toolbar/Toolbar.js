import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.module.css'

const Toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.DrawerToggleClicked} />
            <Logo height="80%"/>
            <nav className = {classes.DesktopOnly}>
                <NavigationItems isAuthenticated = { props.isAuth }/>
            </nav>
        </header>
    )
}

export default Toolbar