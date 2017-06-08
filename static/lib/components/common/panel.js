"use strict";

define([], function () {
    var Panel = React.createClass({
        displayName: "Panel",

        render: function render() {
            var styles = {};
            styles.overflow = "auto";
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "h3",
                        { className: "panel-title" },
                        this.props.title
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body", id: this.props.id, style: styles },
                    this.props.children
                )
            );
        }
    });

    return Panel;
});