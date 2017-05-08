import React from 'react';

export default class AppLogo extends React.Component {
    render() {
        return (
            <div className="appLogo linearLeft boxCenter">
              <div className="logoBox linearContainer">
                <div className="logoImg linearLeft">
                  <img src="dest/img/app-icon.png" width="40px" height="40px" />
                </div>
                <div className="logoText linearLeft">
                  <span>Viewp</span>
                </div>
              </div>
            </div>
        );
    }
}
