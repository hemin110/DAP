"use strict";

define([], function () {
    var BindingSelection = React.createClass({
        displayName: "BindingSelection",

        render: function render() {
            if (this.props.isMultiple) {
                return React.createElement("select", { className: "input-medium", ref: "selectType",
                    multiple: "multiple" });
            } else {
                return React.createElement("select", { className: "input-medium", ref: "selectType" });
            }
        },

        componentDidMount: function componentDidMount() {
            var data = this.props.value;
            var handle = this.props.handleSelection;
            var select = $(this.refs.selectType);
            var name = this.props.name;

            select.select2({
                data: data,
                tags: "true",
                width: "256px",
                placeholder: name,
                allowClear: true
            });

            select.val(null).trigger("change");

            select.change(function () {
                var nv = {};
                nv[name] = $(this).val();
                handle(nv);
            });
        }
    });

    return BindingSelection;
});