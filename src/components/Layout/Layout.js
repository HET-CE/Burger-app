import React, { Component } from 'react'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    showSideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    SideDrawerToggleHandler = () => {
        // this.setState({showSideDrawer: true})      OR
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return(
            <React.Fragment>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    DrawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth = {this.props.isAuthenticated}
                    open = {this.state.showSideDrawer} closed = {this.showSideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);