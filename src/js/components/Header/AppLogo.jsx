import React from 'react';

export default class AppLogo extends React.Component {
    render() {
        return (
            <div className="app-logo linearLeft boxCenter">
              <div className="logo-box linearContainer">
                <div className="logo-img linearLeft">
                  <img src="img/app-icon.png" width="40px" height="40px" />
                </div>
                <div className="logo-text linearLeft">
                  <span>Viewp</span>
                </div>
              </div>
            </div>
        );
    }
}
