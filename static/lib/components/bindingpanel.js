"use strict";

define(["comp/bindingselection"], function (BindingSelection) {

    var selectedBinding = {};

    var BindingPanel = React.createClass({
        displayName: "BindingPanel",

        render: function render() {
            var bindings = this.props.bindings;
            var values = this.props.values;
            var handle = this.handleSelect;
            return React.createElement(
                "form",
                null,
                bindings.map(function (binding) {
                    return React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "label",
                            null,
                            binding.name,
                            " (",
                            binding.type,
                            ") : "
                        ),
                        React.createElement(BindingSelection, { name: binding.name, value: values, handleSelection: handle, isMultiple: binding.maxFeed > 1 })
                    );
                })
            );
        },

        componentDidMount: function componentDidMount() {},

        handleSelect: function handleSelect(nv) {
            for (var p in nv) {
                selectedBinding[p] = nv[p];
            }

            this.props.handleBinding(selectedBinding);
        }
    });

    return BindingPanel;
});