"use strict";

define(["comp/ml/aamlview", "ml/viz/aaviz"], function (ML, AAViz) {

    var name = "association_analysis";
    var shortName = "aa";

    var buildTrainParameterHandler = function buildTrainParameterHandler(trainPara, dataBinding) {
        trainPara.label = dataBinding.mainpoint;
        trainPara.features = dataBinding.otherpoint.join();
    };

    var renderPredictVizHandler = function renderPredictVizHandler(option, dataBinding) {
        var aaviz = new AAViz(option);
        aaviz.render();
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