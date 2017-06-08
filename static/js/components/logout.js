define(["event/manager"], function(EventBus) {
    var LogOut = React.createClass({
    	
    	getInitialState:function(){
    		return  {
    			username : "",

    		};
    	},
    	componentDidMount: function() {
          this.serverRequest = $.get("/checkname", function (result) {
            var lastGist = result;
            this.setState({
              username: lastGist
            });
          }.bind(this));
        },
    	
    	componentWillUnmount: function() {
          this.serverRequest.abort();
        },
    	
        render: function() {
        	
            return ( 
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-expanded="false"><i class="fa fa-user fa-fw"></i>&nbsp;{this.state.username}&nbsp;<span className="caret"></span></a>
                        <ul className="dropdown-menu" role="menu">
                            <li><a href="#" onClick={this.handleClicks}>测试页面1</a></li>
                            <li><a href="#" onClick={this.handleClick}>测试页面2</a></li>
                            <li><a href="/signout" onClick={this.handleClick}><i className="fa fa-sign-out fa-fw"></i>退出登陆</a></li>
                        </ul>
                    </li>
                </ul>
            );
        },
        handleClicks: function(){
            EventBus.trigger("MenuEvent_Other");
        }
    });

    return LogOut;
});