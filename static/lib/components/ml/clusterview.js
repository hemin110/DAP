"use strict";

define(["comp/ml/mlview", "ml/viz/clsviz"], function (ML, Viz) {

    var name = "Cluster";
    var shortName = "cluster";

    var buildTrainParameterHandler = function buildTrainParameterHandler(trainPara, dataBinding) {
        trainPara.train = dataBinding.Features.join();
    };

    var renderPredictVizHandler = function renderPredictVizHandler(option, dataBinding) {
        option.target = dataBinding.Target;
        var viz = new Viz(option);
        viz.render();
    };

    var ClusterPage = React.createClass({
        displayName: "ClusterPage",

        render: function render() {
            return React.createElement(ML, { modelName: name, modelShortName: shortName, buildTrainParameterHandler: buildTrainParameterHandler, renderPredictVizHandler: renderPredictVizHandler });
        },
        componentDidMount: function componentDidMount() {}
    });

    return ClusterPage;
});