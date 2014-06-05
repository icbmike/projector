/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	
	handleMaskClick: function(){
		React.unmountComponentAtNode(document.getElementById('modalAnchor'));
	},
	
	interceptClick: function(e){
		e.stopPropagation();
	},
	
	render: function(){
		return (
			<div className="modalComponent" onClick={this.handleMaskClick}>
				<div className="modalContainer" onClick={this.interceptClick}>
					<button className="closeButton" onClick={this.handleMaskClick}>
						<i className="fa fa-times-circle-o"></i>
					</button>
					{this.props.children}
				</div>
			</div>
		);
	}
});