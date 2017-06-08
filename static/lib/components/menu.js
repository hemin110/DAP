"use strict";

define(["event/manager"], function (EventBus) {
    var MenuItem = React.createClass({
        displayName: "MenuItem",

        render: function render() {
            return React.createElement(
                "li",
                { role: "presentation" },
                React.createElement(
                    "a",
                    { role: "menuitem", className: "menu_item", href: "#", onClick: this.handleClick },
                    this.props.name
                )
            );
        },
        handleClick: function handleClick() {
            EventBus.trigger("MenuEvent_" + this.props.name);
        }
    });

    var Menu = React.createClass({
        displayName: "Menu",

        render: function render() {
            var items = this.props.items;

            if (items.length > 0) {
                return React.createElement(
                    "li",
                    { className: "dropdown" },
                    React.createElement(
                        "a",
                        { className: "dropdown-toggle", "data-toggle": "dropdown" },
                        this.props.showname,
                        React.createElement("span", { className: "caret" })
                    ),
                    React.createElement(
                        "ul",
                        { className: "dropdown-menu", role: "menu", "aria-labelledby": "dropdownMenu" },
                        items.map(function (result) {
                            return React.createElement(MenuItem, { name: result });
                        })
                    )
                );
            } else {
                return React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.handleClick },
                        this.props.showname
                    )
                );
            }
        },
        handleClick: function handleClick() {
            EventBus.trigger("MenuEvent_" + this.props.name);
        }
    });

    return Menu;
});