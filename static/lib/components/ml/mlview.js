"use strict";

define(["comp/common/collapse", "comp/common/panel", "comp/dataselection", "comp/bindingpanel", "comp/common/tab", "ml/viz/clsviz", "ml/manager"], function (Collapse, Panel, DataSelection, BindingPanel, Tab, CLSViz, ML) {

    var modelName = undefined;
    var modelShortName = undefined;

    var predictResultLabel = "Predict Result";
    var dataUrl = "/data/";

    var modelCreateUrl = undefined;
    var trainUrl = undefined;
    var predictVizUrl = undefined;
    var predictUrl = undefined;
    var modelListUrl = undefined;

    var buildTrainParameter = undefined;
    var renderPredictViz = undefined;

    var trainData = undefined;
    var dataName = undefined;
    var modelType = undefined;
    var dataBinding = undefined;
    var modelId = undefined;

    var tabOption = [{
        "name": "viz",
        "title": "可视化展示"
    }, {
        "name": "predict",
        "title": "预测"
    }];

    var initParameters = function initParameters() {
        modelCreateUrl = "/ml/" + modelShortName + "/create";
        trainUrl = "/ml/" + modelShortName + "/train";
        predictVizUrl = "/ml/" + modelShortName + "/predictViz";
        predictUrl = "/ml/" + modelShortName + "/predict";
        modelListUrl = "/mlmodel/list/" + modelName;
    };

    var handleDataSelection = function handleDataSelection(val) {
        $('#SelectBindingCollapse').collapse('show');
        $("#mlBindingPanel").empty();
        dataName = val;

        if (val) {
            updateData(val);
        } else {
            trainData = undefined;
        }
    };

    var updateData = function updateData(name) {
        var para = {};
        para.headerOnly = true;

        $.get(dataUrl + name, para, function (data) {
            var csv = data.csv;
            var data = Papa.parse(csv);
            trainData = data.data;

            var props = {};
            props.bindings = ML.getBinding(modelName);
            props.values = trainData[0];
            props.handleBinding = handleBinding;

            ReactDOM.render(React.createElement(BindingPanel, props), document.getElementById('mlBindingPanel'));
        });
    };

    var handleBinding = function handleBinding(binding) {
        dataBinding = binding;
        $('#TrainCollapse').collapse('show');
    };

    var handleTrain = function handleTrain() {
        console.log("strat to train the whole dataset~");
        var para = {};
        para.type = modelType;

        $.get(modelCreateUrl, para, function (data) {
            if (data.result === "Success") {
                modelId = data.model;

                var trainPara = {};
                trainPara.id = modelId;
                trainPara.data = dataName;
                //trainPara.label = dataBinding.Label;
                //trainPara.features = dataBinding.Features.join();

                buildTrainParameter(trainPara, dataBinding);

                $.get(trainUrl, trainPara, function (tdata) {
                    if (tdata.result === "Success") {

                        updateTrainResult();
                        updateVizPanel();
                    } else {
                        alert("Failed to train the model : " + modelType);
                    }
                });
            } else {
                alert("Failed to create the model : " + modelType);
            }
        });
    };

    var updateTrainResult = function updateTrainResult() {
        var props = {};
        props.cols = dataBinding.Features.slice(0); // Clone the array

        ReactDOM.render(React.createElement(PredictDataTable, props), document.getElementById('predict'));

        var vprops = {};
        vprops.id = "vizpanel";

        ReactDOM.render(React.createElement(PredictVizPanel, vprops), document.getElementById('viz'));
    };

    var updateVizPanel = function updateVizPanel() {
        var param = {};
        param.id = modelId;
        param.scale = 30;

        $.get(predictVizUrl, param, function (data) {
            if (data.result === "Success") {
                // Convert ' to " which is json standard

                var predictVizData = $.parseJSON(data.predict.replace(/\'/g, "\""));
                console.log(predictVizData);

                var option = {};
                option.size = {};
                option.size.width = $("#vizpanel").width();
                option.size.height = $("#vizpanel").height();
                option.features = dataBinding.Features;
                option.containerId = "vizpanel";
                option.data = predictVizData.data;
                option.predict = predictVizData.predict;
                option.scale = param.scale;
                option.title = predictVizData.rmse.toFixed(3);
                console.log(predictVizData.rmse.toFixed(3));

                $("#vizpanel").empty();
                renderPredictViz(option, dataBinding);
            }
        });
    };

    var PredictRow = React.createClass({
        displayName: "PredictRow",

        render: function render() {
            var tdata = this.props.data;
            return React.createElement(
                "tr",
                { ref: "predictRow" },
                tdata.map(function (item) {
                    if (item !== predictResultLabel) {
                        return React.createElement(
                            "td",
                            null,
                            React.createElement("input", { placeholder: item })
                        );
                    } else {
                        return React.createElement(
                            "td",
                            { key: "resultCell" },
                            React.createElement("div", { ref: "resultCell" })
                        );
                    }
                })
            );
        },
        componentDidMount: function componentDidMount() {
            var me = this.refs.predictRow;
            var result = this.refs.resultCell;
            $(me).focusout(function () {
                var data = [];
                var ready = true;
                $(this).find("input").each(function (index, item) {
                    var text = $(this).val();
                    if (text.length > 0) {
                        // TODO
                        // Validate if the feature is a number
                        data.push(parseFloat(text));
                    } else {
                        ready = false;
                    }
                });

                if (ready) {
                    var para = {};
                    para.id = modelId;
                    para.data = JSON.stringify([data]);
                    $.get(predictUrl, para, function (pdata) {
                        if (pdata.result === "Success") {
                            var label = $.parseJSON(pdata.predict.replace(/\'/g, "\""));
                            $(result).text(label[0]);
                        } else {
                            alert("failed to predict the result!");
                        }
                    });
                }
            });
        }
    });

    var PredictDataTable = React.createClass({
        displayName: "PredictDataTable",

        render: function render() {
            var tdata = this.props.cols;
            tdata.push(predictResultLabel);
            return React.createElement(
                "table",
                { id: "predictTable", className: "table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        tdata.map(function (item) {
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
                    React.createElement(PredictRow, { data: tdata })
                )
            );
        },
        componentDidMount: function componentDidMount() {}
    });

    var PredictVizPanel = React.createClass({
        displayName: "PredictVizPanel",

        render: function render() {
            var styles = {};
            styles.width = "100%";
            styles.height = "400px";
            return React.createElement("div", { id: this.props.id, style: styles });
        },
        componentDidMount: function componentDidMount() {}
    });

    var MLPage = React.createClass({
        displayName: "MLPage",


        render: function render() {
            modelName = this.props.modelName;
            modelShortName = this.props.modelShortName;
            buildTrainParameter = this.props.buildTrainParameterHandler;
            renderPredictViz = this.props.renderPredictVizHandler;

            initParameters();
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
                            { title: "\u9009\u62E9\u6A21\u578B", id: "SelectModelCollapse" },
                            React.createElement("select", { className: "input-medium", id: "selectModelType" })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u9009\u62E9\u6570\u636E\u6587\u4EF6", id: "SelectDataCollapse" },
                            React.createElement(DataSelection, { handleSelection: handleDataSelection })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u9009\u62E9\u8BAD\u7EC3\u6570\u636E", id: "SelectBindingCollapse" },
                            React.createElement("div", { id: "mlBindingPanel" })
                        ),
                        React.createElement(
                            Collapse,
                            { title: "\u8BAD\u7EC3\u6A21\u578B", id: "TrainCollapse" },
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "button",
                                    { className: "btn btn-default btn-xs", onClick: handleTrain },
                                    "\u8BAD\u7EC3"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-md-8" },
                    React.createElement(
                        Panel,
                        { id: "MLMain", title: "\u9884\u6D4B\u5C55\u793A" },
                        React.createElement(Tab, { data: tabOption })
                    )
                )
            );
        },
        componentDidMount: function componentDidMount() {
            $('#SelectModelCollapse').collapse('show');
            $.get(modelListUrl, function (data) {
                var data = $.parseJSON(data);
                var ModelSelect = $("#selectModelType");
                ModelSelect.select2({
                    data: data,
                    tags: "true",
                    width: "256px",
                    placeholder: "请选择一个模型",
                    allowClear: true
                });

                ModelSelect.val(null).trigger("change");

                ModelSelect.change(function () {
                    $('#SelectDataCollapse').collapse('show');
                    modelType = $(this).val();
                });
            });
        }
    });

    return MLPage;
});