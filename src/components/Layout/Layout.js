import React, { Component } from 'react'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    showSideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    render() {
        return(
            <React.Fragment>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed = {this.showSideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;