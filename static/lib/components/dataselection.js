"use strict";

define([], function () {
    var DataSelectionPanel = React.createClass({
        displayName: "DataSelectionPanel",

        render: function render() {
            return React.createElement("select", { className: "input-medium", id: "selectDataSource" });
        },

        componentDidMount: function componentDidMount() {
            var handle = this.props.handleSelection;

            $.get("/csvdata", function (data) {
                var result = $.parseJSON(data);
                var dataSourceSelect = $("#selectDataSource");
                dataSourceSelect.select2({
                    data: result,
                    tags: "true",
                    width: "256px",
                    placeholder: "选择数据源",
                    allowClear: true
                });

                dataSourceSelect.val(null).trigger("change");

                dataSourceSelect.change(function () {
                    console.log("New Data Source selected : " + $(this).val());
                    handle($(this).val());
                });
            });
        }
    });

    return DataSelectionPanel;
});