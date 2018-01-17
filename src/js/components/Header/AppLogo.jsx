import React from 'react';

export default class AppLogo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(ev) {
        this.refs.link.click();
    }

    render() {
        return (
            <div className="app-logo linearLeft boxCenter" onClick={this.handleClick}>
                <div className="logo-box linearContainer">
                    <div className="logo-img linearLeft">
                        <img src="img/app-icon.png" width="40px" height="40px" />
                    </div>
                    <div className="logo-text linearLeft">
                        <span>Viewp</span>
                    </div>
                </div>
                <a ref="link" href="index.html" style={{display: 'none'}}>Ge to Top</a>
            </div>
        );
    }
}
