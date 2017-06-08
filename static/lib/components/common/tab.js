"use strict";

define([], function () {
    var Tab = React.createClass({
        displayName: "Tab",

        render: function render() {
            var styles = {};
            styles.overflow = "auto";

            var items = this.props.data;
            return React.createElement(
                "div",
                { ref: "Tab" },
                React.createElement(
                    "ul",
                    { className: "nav nav-tabs", role: "tablist" },
                    items.map(function (item) {
                        var id = "#" + item.name;
                        return React.createElement(
                            "li",
                            { role: "presentation" },
                            React.createElement(
                                "a",
                                { href: id, "aria-controls": item.name, role: "tab", "data-toggle": "tab" },
                                item.title
                            )
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { className: "tab-content" },
                    items.map(function (item) {
                        return React.createElement("div", { role: "tabpanel", className: "tab-pane", id: item.name });
                    })
                )
            );
        },
        componentDidMount: function componentDidMount() {
            var me = this.refs.Tab;
            $(me).find('a:first').tab('show');
        }
    });

    return Tab;
});