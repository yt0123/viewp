var React = require('react');

var AppLogo = React.createClass({
    render: function() {
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
});

module.exports = AppLogo;

/*
 * class AppLogo extends React.Component {
 *     render() {
 *         return (
 *             <div className="appLogo linearLeft boxCenter">
 *               <div className="logoBox linearContainer">
 *                 <div className="logoImg linearLeft">
 *                   <img src="dest/img/app-icon.png" width="40px" height="40px" />
 *                 </div>
 *                 <div className="logoText linearLeft">
 *                   <span>Viewp</span>
 *                 </div>
 *               </div>
 *            </div>
 *         );
 *     }
 * }
 *
 * /
