"use strict";

define(["comp/ml/mlview", "ml/viz/clsviz"], function (ML, CLSViz) {

    var name = "Classification";
    var shortName = "cls";

    var buildTrainParameterHandler = function buildTrainParameterHandler(trainPara, dataBinding) {
        trainPara.label = dataBinding.Label;
        trainPara.features = dataBinding.Features.join();
    };

    var renderPredictVizHandler = function renderPredictVizHandler(option, dataBinding) {
        var clsviz = new CLSViz(option);
        clsviz.render();
    };

    var ClassificationPage = React.createClass({
        displayName: "ClassificationPage",

        render: function render() {
            return React.createElement(ML, { modelName: name, modelShortName: shortName, buildTrainParameterHandler: buildTrainParameterHandler, renderPredictVizHandler: renderPredictVizHandler });
        },
        componentDidMount: function componentDidMount() {}
    });

    return ClassificationPage;
});