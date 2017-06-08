define(["comp/ml/aamlview",
        "ml/viz/aaviz"
        ], function(ML, AAViz) {

    var name = "association_analysis";
    var shortName = "aa";

    var buildTrainParameterHandler = function(trainPara, dataBinding){
        trainPara.label = dataBinding.mainpoint;
        trainPara.features = dataBinding.otherpoint.join();
    };

    var renderPredictVizHandler = function(option, dataBinding) {
        var aaviz = new AAViz(option);
        aaviz.render();
    };

    var ClassificationPage = React.createClass({
        render: function() {
            return ( 
                <ML modelName={name} modelShortName={shortName} buildTrainParameterHandler={buildTrainParameterHandler} renderPredictVizHandler={renderPredictVizHandler} />
            );
        },
        componentDidMount: function() {
        }
    });

    return ClassificationPage;
});