"use strict";

require(["comp/menubar", "comp/mainview", "comp/aboutview", "comp/dataview", "comp/vizview", "comp/ml/classificationview", "comp/ml/regressionview", "comp/ml/clusterview", "event/manager", "comp/otherview", "comp/logout", "comp/ml/associationanalysisationview", "comp/datapre"], function (Menu, Main, About, Data, Viz, CLS, Regression, Cluster, EventBus, Other, LogOut, AA, DataPre) {

    console.log("Nothing happend yet~ ");

    var handleMainmenu = function handleMainmenu() {
        ReactDOM.render(React.createElement(Main, null), document.getElementById('container'));
    };

    var handleLogOut = function handleLogOut() {
        ReactDOM.render(React.createElement(LogOut, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_LogOut", handleLogOut);

    var handleAboutmenu = function handleAboutmenu() {
        ReactDOM.render(React.createElement(About, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_About", handleAboutmenu);

    //
    var handleDataPremenu = function handleDataPremenu() {
        ReactDOM.render(React.createElement(DataPre, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Datapre", handleDataPremenu);
    //

    var handleDatamenu = function handleDatamenu() {
        ReactDOM.render(React.createElement(Data, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Data", handleDatamenu);

    var handleVizmenu = function handleVizmenu() {
        ReactDOM.render(React.createElement(Viz, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Visualization", handleVizmenu);

    var handleCLSmenu = function handleCLSmenu() {
        ReactDOM.render(React.createElement(CLS, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Classification", handleCLSmenu);

    var handleRegressionmenu = function handleRegressionmenu() {
        ReactDOM.render(React.createElement(Regression, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Regression", handleRegressionmenu);

    var handleClustermenu = function handleClustermenu() {
        ReactDOM.render(React.createElement(Cluster, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_Cluster", handleClustermenu);

    var handleAAmenu = function handleAAmenu() {
        ReactDOM.render(React.createElement(AA, null), document.getElementById('container'));
    };

    EventBus.register("MenuEvent_association_analysis", handleAAmenu);

    var handleOther = function handleOther() {
        ReactDOM.render(React.createElement(Other, null), document.getElementById('container'));
    };
    EventBus.register("MenuEvent_Other", handleOther);

    $("#home_link").click(function () {
        handleMainmenu();
    });

    var props0 = {
        show: "数据预处理",
        name: "Datapre",
        id: "Datapre",
        items: []
    };

    var props1 = {
        show: "加载数据",
        name: "Data",
        id: "Data",
        items: []
    };
    var props2 = {
        show: "数据分析",
        name: "Analysis",
        id: "Analysis",
        items: ["Visualization", "Classification", "Cluster", "Regression", "association_analysis"]
    };
    var props3 = {
        show: "帮助",
        name: "About",
        id: "About",
        items: []
    };

    var data = [props0, props1, props2, props3];

    ReactDOM.render(React.createElement(Menu, {
        data: data
    }), document.getElementById('menubar'));

    handleMainmenu();
});