"use strict";

define(["comp/common/collapse", "comp/common/panel", "comp/dataselection", "comp/vizselection", "comp/bindingpanel", "viz/manager"], function (Collapse, Panel, DataSelection, VizSelection, BindingPanel, Viz) {

    var vizData = undefined;
    var vizType = undefined;
    var vizBinding = undefined;

    var handleDataSelection = function handleDataSelection(val) {
        if (val !== null) {
            updateData(val);
        } else {
            vizData = undefined;
        }
    };

    var handleVizSelection = function handleVizSelection(val) {
        var binding = undefined;
        if (val !== null) {
            vizType = val;
            binding = Viz.getVizBinding(val);
        } else {
            //
            vizType = undefined;
            binding = undefined;
        }

        updateBindingPanel(binding);
        updateViz();
    };

    var updateData = function updateData(name) {
        $.get("/data/" + name, function (data) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            vizData = data.data;
        });
    };

    var updateBindingPanel = function updateBindingPanel(binding) {
        $("#vizBindingPanel").empty();

        if (binding) {
            var props = {};
            props.bindings = binding;
            props.values = vizData[0];
            props.handleBinding = handleBindingUpdate;

            ReactDOM.render(React.createElement(BindingPanel, props), document.getElementById('vizBindingPanel'));
        }
    };

    var handleBindingUpdate = function handleBindingUpdate(binding) {
        vizBinding = binding;
        updateViz();
    };

    var updateViz = function updateViz() {
        var option = Viz.buildOption(vizData, vizBinding, vizType);
        if (option) {
            var myChart = echarts.init(document.getElementById('chartPanel'));
            myChart.setOption(option);
        }
    };

    var VizPage = React.createClass({
        displayName: "VizPage",

        render: function render() {
            var styles = {};
            styles.height = "400px";
            styles.width = "100%";
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
                            { title: "\u9009\u62E9\u6570\u636E\u6587\u4EF6", id: "SelectDataCollapse" },
                            React.createElement(DataSelection, { handleSelection: handleDataSelection })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u9009\u62E9\u53EF\u89C6\u5316\u7C7B\u578B", id: "SelectVizCollapse" },
                            React.createElement(VizSelection, { handleSelection: handleVizSelection })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u7ED1\u5B9A\u6570\u636E", id: "SelectBindingCollapse" },
                            React.createElement("div", { id: "vizBindingPanel" })
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-8" },
                    React.createElement(
                        Panel,
                        { id: "VizMain", title: "\u53EF\u89C6\u5316\u5C55\u793A\u7A97\u53E3" },
                        React.createElement("div", { id: "chartPanel", style: styles })
                    )
                )
            );
        },

        componentDidMount: function componentDidMount() {
            $('#SelectDataCollapse').collapse('show');
            $('#SelectVizCollapse').collapse('show');
            $('#SelectBindingCollapse').collapse('show');
        }
    });

    return VizPage;
});