"use strict";

define(["viz/manager"], function (Viz) {
    var VizSelectionPanel = React.createClass({
        displayName: "VizSelectionPanel",

        render: function render() {
            return React.createElement("select", { className: "input-medium", id: "selectVizType" });
        },

        componentDidMount: function componentDidMount() {
            var handle = this.props.handleSelection;
            var vizTypeSelect = $("#selectVizType");
            var types = Viz.getVizTypes();
            vizTypeSelect.select2({
                data: types,
                tags: "true",
                width: "256px",
                placeholder: "选择可视化类型",
                allowClear: true
            });

            vizTypeSelect.val(null).trigger("change");

            vizTypeSelect.change(function () {
                console.log("New Viz Type selected : " + $(this).val());
                handle($(this).val());
            });
        }
    });

    return VizSelectionPanel;
});