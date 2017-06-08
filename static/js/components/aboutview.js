define([], function() {
    var AboutPage = React.createClass({
        render: function() {
            return ( 
                <div className="container">
					<div className="row clearfix">
						<div className="col-md-12 column">
							<div className="jumbotron">
								<h2>
									<font>大数据 小应用</font>
								</h2>
								<p>
									生活中会实时的产生大量的数据并保存在数据库中,数据中蕴含着大量的信息,需要通过数据挖掘将其挖掘出来,并产生其应有的价值.
								</p>
								<p>
									 <a className="btn btn-primary btn-large" href="/show">开始使用</a>
								</p>
							</div>
						</div>
					</div>
					<div className="row clearfix">
						<div className="col-md-3 column">
							<div className="panel-group" id="panel-239050">
								<div className="panel panel-default">
									<div className="panel-heading">
										 <a className="panel-title" data-toggle="collapse" data-parent="#panel-239050" href="#panel-element-304980">分类</a>
									</div>
									<div id="panel-element-304980" className="panel-collapse in">
										<div className="panel-body">
											<a href="#panelknn" className="list-group-item">KNN</a>
											<a href="#panelBayes" className="list-group-item">Bayes</a>
											<a href="#panelsvm" className="list-group-item">SVM</a>
											<a href="#panelrfc" className="list-group-item">RFC</a>
											<a href="#panelbaggingclassify" className="list-group-item">baggingclassify</a>
										</div>
									</div>
								</div>
								<div className="panel panel-default">
									<div className="panel-heading">
										 <a className="panel-title collapsed" data-toggle="collapse" data-parent="#panel-239050" href="#panel-element-339924">回归</a>
									</div>
									<div id="panel-element-339924" className="panel-collapse collapse">
										<div className="panel-body">
											Anim pariatur cliche...
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9 column">
							<div className="panel panel-default" id = "panelknn">
								<div className="panel-heading">
									<h3 className="panel-title">
										KNN
									</h3>
								</div>
								<div className="panel-body">
									KNN介绍...
								</div>
								<div className="panel-footer">
									分类算法-KNN
								</div>
							</div>
							
							<div className="panel panel-default" id = "panelsvm">
								<div className="panel-heading">
									<h3 className="panel-title">
										SVM
									</h3>
								</div>
								<div className="panel-body">
									SVM介绍...
								</div>
								<div className="panel-footer">
									分类算法-SVM
								</div>
							</div>
							
							<div className="panel panel-default" id = "panelrfc">
								<div className="panel-heading">
									<h3 className="panel-title">
										RFC
									</h3>
								</div>
								<div className="panel-body">
									RFC介绍...
								</div>
								<div className="panel-footer">
									分类算法-RFC
								</div>
							</div>
							
							<div className="panel panel-default" id = "panelBayes">
								<div className="panel-heading">
									<h3 className="panel-title">
										Bayes
									</h3>
								</div>
								<div className="panel-body">
									Bayes介绍...
								</div>
								<div className="panel-footer">
									分类算法-Bayes
								</div>
							</div>
							
							<div className="panel panel-default" id = "panelbaggingclassify">
								<div className="panel-heading">
									<h3 className="panel-title">
										baggingclassify
									</h3>
								</div>
								<div className="panel-body">
									baggingclassify介绍...
								</div>
								<div className="panel-footer">
									分类算法-baggingclassify
								</div>
							</div>
							
							<div className="panel panel-default" id = "panelknn">
								<div className="panel-heading">
									<h3 className="panel-title">
										KNN
									</h3>
								</div>
								<div className="panel-body">
									KNN介绍...
								</div>
								<div className="panel-footer">
									分类算法-KNN
								</div>
							</div>
						</div>
					</div>
				</div>
            );
        }
    });

    return AboutPage;
});