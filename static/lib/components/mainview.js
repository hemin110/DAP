"use strict";

define([], function () {
    var Main = React.createClass({
        displayName: "Main",

        render: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("img", { src: "resources/main.png" })
            );
        }
    });

    return Main;
});