/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

	handleTabClick: function (e) {

		this.setState({
			selectedIndex: Array.prototype.indexOf.call(this.refs.tabLabels.getDOMNode().childNodes, e.target)
		});
	},

	getInitialState: function(){
		return {
			selectedIndex : 0
		};
	},

	render: function () {

		var tabLabels = React.Children.map(this.props.children, function(component, index) {
			var classString = "tab" + (index === this.state.selectedIndex ? " active" : "");

			return <li className={classString} onClick={this.handleTabClick}>{component.props.tabTitle}</li>;
		}.bind(this));

		var content = this.props.children !== undefined
			? this.props.children[this.state.selectedIndex]
			: <span>No children</span>;

		var className = "tabComponent " + (this.props.orientation == 'vertical' ? "vertical" : "horizontal");

		return (
			<div className={className}>
				<ul className="tabs" ref="tabLabels">
					{tabLabels}
				</ul>
				<div className="tabContent">
					{content}
				</div>
			</div>
		);
	}

});