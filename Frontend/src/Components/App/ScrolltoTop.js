import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class ScrollToTop extends Component {
    previosPos = window.pageYOffset;


    componentWillUpdate(prevProps) {
        if(!this.props.location.pathname.includes("detail")){
            this.previosPos = window.pageYOffset;
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname.includes("detail")) {
            window.scrollTo(0, 0);
        } else {
            // console.log("previous: " + this.previosPos)
            // window.scrollTo(0, 90);
            // console.log("after scrolled: " + window.pageYOffset)
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);