"use strict";

define([], function () {
	var AboutPage = React.createClass({
		displayName: "AboutPage",

		render: function render() {
			return React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "col-md-12 column" },
						React.createElement(
							"div",
							{ className: "jumbotron" },
							React.createElement(
								"h2",
								null,
								React.createElement(
									"font",
									null,
									"\u5927\u6570\u636E \u5C0F\u5E94\u7528"
								)
							),
							React.createElement(
								"p",
								null,
								"\u751F\u6D3B\u4E2D\u4F1A\u5B9E\u65F6\u7684\u4EA7\u751F\u5927\u91CF\u7684\u6570\u636E\u5E76\u4FDD\u5B58\u5728\u6570\u636E\u5E93\u4E2D,\u6570\u636E\u4E2D\u8574\u542B\u7740\u5927\u91CF\u7684\u4FE1\u606F,\u9700\u8981\u901A\u8FC7\u6570\u636E\u6316\u6398\u5C06\u5176\u6316\u6398\u51FA\u6765,\u5E76\u4EA7\u751F\u5176\u5E94\u6709\u7684\u4EF7\u503C."
							),
							React.createElement(
								"p",
								null,
								React.createElement(
									"a",
									{ className: "btn btn-primary btn-large", href: "/show" },
									"\u5F00\u59CB\u4F7F\u7528"
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row clearfix" },
					React.createElement(
						"div",
						{ className: "col-md-3 column" },
						React.createElement(
							"div",
							{ className: "panel-group", id: "panel-239050" },
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ className: "panel-heading" },
									React.createElement(
										"a",
										{ className: "panel-title", "data-toggle": "collapse", "data-parent": "#panel-239050", href: "#panel-element-304980" },
										"\u5206\u7C7B"
									)
								),
								React.createElement(
									"div",
									{ id: "panel-element-304980", className: "panel-collapse in" },
									React.createElement(
										"div",
										{ className: "panel-body" },
										React.createElement(
											"a",
											{ href: "#panelknn", className: "list-group-item" },
											"KNN"
										),
										React.createElement(
											"a",
											{ href: "#panelBayes", className: "list-group-item" },
											"Bayes"
										),
										React.createElement(
											"a",
											{ href: "#panelsvm", className: "list-group-item" },
											"SVM"
										),
										React.createElement(
											"a",
											{ href: "#panelrfc", className: "list-group-item" },
											"RFC"
										),
										React.createElement(
											"a",
											{ href: "#panelbaggingclassify", className: "list-group-item" },
											"baggingclassify"
										)
									)
								)
							),
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ className: "panel-heading" },
									React.createElement(
										"a",
										{ className: "panel-title collapsed", "data-toggle": "collapse", "data-parent": "#panel-239050", href: "#panel-element-339924" },
										"\u56DE\u5F52"
									)
								),
								React.createElement(
									"div",
									{ id: "panel-element-339924", className: "panel-collapse collapse" },
									React.createElement(
										"div",
										{ className: "panel-body" },
										"Anim pariatur cliche..."
									)
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "col-md-9 column" },
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelknn" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"KNN"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"KNN\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-KNN"
							)
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelsvm" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"SVM"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"SVM\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-SVM"
							)
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelrfc" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"RFC"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"RFC\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-RFC"
							)
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelBayes" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"Bayes"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"Bayes\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-Bayes"
							)
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelbaggingclassify" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"baggingclassify"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"baggingclassify\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-baggingclassify"
							)
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", id: "panelknn" },
							React.createElement(
								"div",
								{ className: "panel-heading" },
								React.createElement(
									"h3",
									{ className: "panel-title" },
									"KNN"
								)
							),
							React.createElement(
								"div",
								{ className: "panel-body" },
								"KNN\u4ECB\u7ECD..."
							),
							React.createElement(
								"div",
								{ className: "panel-footer" },
								"\u5206\u7C7B\u7B97\u6CD5-KNN"
							)
						)
					)
				)
			);
		}
	});

	return AboutPage;
});