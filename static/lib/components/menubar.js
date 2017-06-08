"use strict";

define(["comp/menu", "comp/logout"], function (Menu, LogOut) {
    var MenuBar = React.createClass({
        displayName: "MenuBar",

        render: function render() {
            var items = this.props.data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    { className: "nav navbar-nav" },
                    items.map(function (result) {
                        return React.createElement(Menu, { showname: result.show, name: result.name, key: result.id, items: result.items });
                    })
                ),
                React.createElement(LogOut, null)
            );
        },
        handleClicks: function handleClicks() {
            EventBus.trigger("MenuEvent_Other");
        }
    });

    return MenuBar;
});