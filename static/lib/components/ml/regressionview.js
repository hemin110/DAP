"use strict";

define(["comp/ml/mlview", "ml/viz/regressionviz"], function (ML, Viz) {

    var name = "Regression";
    var shortName = "regression";

    var buildTrainParameterHandler = function buildTrainParameterHandler(trainPara, dataBinding) {
        trainPara.target = dataBinding.Target;
        trainPara.train = dataBinding.Features.join();
    };

    var renderPredictVizHandler = function renderPredictVizHandler(option, dataBinding) {
        option.target = dataBinding.Target;
        var viz = new Viz(option);
        viz.render();
    };

    var RegressionPage = React.createClass({
        displayName: "RegressionPage",

        render: function render() {
            return React.createElement(ML, { modelName: name, modelShortName: shortName, buildTrainParameterHandler: buildTrainParameterHandler, renderPredictVizHandler: renderPredictVizHandler });
        },
        componentDidMount: function componentDidMount() {}
    });

    return RegressionPage;
});