"use strict";

define([], function () {
    var CollapsePanel = React.createClass({
        displayName: "CollapsePanel",

        render: function render() {
            var id = "#" + this.props.id;
            var headId = "heading_" + this.props.id;
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-heading", role: "tab", id: headId },
                    React.createElement(
                        "h4",
                        { className: "panel-title" },
                        React.createElement(
                            "a",
                            { role: "button", "data-toggle": "collapse", "data-parent": "#accordion", href: id, "aria-expanded": "true", "aria-controls": this.props.id },
                            this.props.title
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { id: this.props.id, className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": headId },
                    React.createElement(
                        "div",
                        { className: "panel-body" },
                        this.props.children
                    )
                )
            );
        }
    });

    return CollapsePanel;
});