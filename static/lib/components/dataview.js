"use strict";

define(["comp/common/collapse", "comp/common/panel", "comp/dataselection"], function (Collapse, Panel, DataSelection) {

    var DataUploadPanel = React.createClass({
        displayName: "DataUploadPanel",

        render: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { role: "form", method: "post", encType: "multipart/form-data",
                        onSubmit: this.trackFormSubmission },
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement("input", { id: "input-id", type: "file", name: "file" })
                    )
                )
            );
        },

        componentDidMount: function componentDidMount() {
            $("#input-id").fileinput({
                'showPreview': true,
                'uploadUrl': '/csvdata',
                'allowedFileExtensions': ['csv']
            });
        }
    });

    var handleSelection = function handleSelection(val) {
        if (val !== null) {
            updateDataTable(val);
        } else {
            $('#dataTablePanel').empty();
        }
    };

    var updateDataTable = function updateDataTable(name) {
        var para = {};
        //para.headerOnly = true;

        $.get("/data/" + name, para, function (data) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            console.log(data);

            $('#DataTablePanel').empty();

            //TODO : Update Loading State with icon?
            ReactDOM.render(React.createElement(DataTable, {
                data: data.data
            }), document.getElementById('dataTablePanel'));

            $('#dataTable').DataTable();
        });
    };

    var DataTablePanel = React.createClass({
        displayName: "DataTablePanel",

        render: function render() {
            return React.createElement(Panel, { id: "dataTablePanel", title: "\u6570\u636E\u5C55\u793A" });
        },
        componentDidMount: function componentDidMount() {}
    });

    var DataRow = React.createClass({
        displayName: "DataRow",

        render: function render() {
            var rowData = this.props.data;
            return React.createElement(
                "tr",
                null,
                rowData.map(function (item) {
                    return React.createElement(
                        "td",
                        null,
                        item
                    );
                })
            );
        }
    });

    var DataTable = React.createClass({
        displayName: "DataTable",

        render: function render() {
            var tdata = this.props.data;
            var header = tdata[0];
            tdata.splice(0, 1);

            return React.createElement(
                "table",
                { id: "dataTable", className: "table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        header.map(function (item) {
                            return React.createElement(
                                "th",
                                null,
                                item
                            );
                        })
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    tdata.map(function (item) {
                        return React.createElement(DataRow, { data: item });
                    })
                )
            );
        },
        componentDidMount: function componentDidMount() {}
    });

    var DataPage = React.createClass({
        displayName: "DataPage",

        render: function render() {
            return React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                        "div",
                        { className: "panel-group", role: "tablist", "aria-multiselectable": "true" },
                        React.createElement(
                            Collapse,
                            { title: "\u9009\u62E9\u6570\u636E", id: "SelectDataCollapse" },
                            React.createElement(DataSelection, { headerOnly: "true", handleSelection: handleSelection })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u6DFB\u52A0\u6570\u636E", id: "DataUploadCollapse" },
                            React.createElement(DataUploadPanel, null)
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-8" },
                    React.createElement(DataTablePanel, null)
                )
            );
        },

        componentDidMount: function componentDidMount() {
            $('#SelectDataCollapse').collapse('show');
        }
    });

    return DataPage;
});