"use strict";

define([], function () {
    var Other = React.createClass({
        displayName: "Other",

        render: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "\u8FD9\u91CC\u663E\u793A\u4F60\u7684\u4E2A\u4EBA\u4FE1\u606F"
                )
            );
        }
    });

    return Other;
});