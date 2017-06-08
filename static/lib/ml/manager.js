"use strict";

// Singlton to manipulate all visualization
define([], function () {
    var ML = {};

    var aaBinding = [{
        "name": "mainpoint",
        "type": "Category",
        "maxFeed": 1
    }, {
        "name": "otherpoint",
        "type": "Measure",
        "maxFeed": 10
    }];

    var clsBinding = [{
        "name": "Label",
        "type": "Category",
        "maxFeed": 1
    }, {
        "name": "Features",
        "type": "Measure",
        "maxFeed": 10
    }];

    var regressionBinding = [{
        "name": "Target",
        "type": "Measure",
        "maxFeed": 1
    }, {
        "name": "Features",
        "type": "Measure",
        "maxFeed": 10
    }];

    var clusterBinding = [{
        "name": "Features",
        "type": "Measure",
        "maxFeed": 10
    }];

    ML.getBinding = function (type) {
        if (type === "Classification") {
            return clsBinding;
        } else if (type === "Regression") {
            return regressionBinding;
        } else if (type === "Cluster") {
            return clusterBinding;
        } else if (type === "association_analysis") {
            return aaBinding;
        }
        return undefined;
    };
    return ML;
});