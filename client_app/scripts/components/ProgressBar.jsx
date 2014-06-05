/** @jsx React.DOM */

var React = require('react');


module.exports = React.createClass({
	
	render: function(){

		var progressBarStyle = {
			width: this.props.progress + '%'
		};

		return (
			<div className="progressBarComponent">
				<div className="progressBar" style={progressBarStyle}></div>
				<span className="progressText">{this.props.progress}%</span>
			</div>
		);
	}
});