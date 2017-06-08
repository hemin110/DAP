"use strict";

define(["event/manager"], function (EventBus) {
    var LogOut = React.createClass({
        displayName: "LogOut",


        getInitialState: function getInitialState() {
            return {
                username: ""

            };
        },
        componentDidMount: function componentDidMount() {
            this.serverRequest = $.get("/checkname", function (result) {
                var lastGist = result;
                this.setState({
                    username: lastGist
                });
            }.bind(this));
        },

        componentWillUnmount: function componentWillUnmount() {
            this.serverRequest.abort();
        },

        render: function render() {

            return React.createElement(
                "ul",
                { className: "nav navbar-nav navbar-right" },
                React.createElement(
                    "li",
                    { className: "dropdown" },
                    React.createElement(
                        "a",
                        { href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button",
                            "aria-expanded": "false" },
                        React.createElement("i", { "class": "fa fa-user fa-fw" }),
                        "\xA0",
                        this.state.username,
                        "\xA0",
                        React.createElement("span", { className: "caret" })
                    ),
                    React.createElement(
                        "ul",
                        { className: "dropdown-menu", role: "menu" },
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", onClick: this.handleClicks },
                                "\u6D4B\u8BD5\u9875\u97621"
                            )
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", onClick: this.handleClick },
                                "\u6D4B\u8BD5\u9875\u97622"
                            )
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "/signout", onClick: this.handleClick },
                                React.createElement("i", { className: "fa fa-sign-out fa-fw" }),
                                "\u9000\u51FA\u767B\u9646"
                            )
                        )
                    )
                )
            );
        },
        handleClicks: function handleClicks() {
            EventBus.trigger("MenuEvent_Other");
        }
    });

    return LogOut;
});