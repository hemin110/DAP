define(["comp/menu" , "comp/logout"], function(Menu , LogOut) {
    var MenuBar = React.createClass({
        render: function() {
            var items = this.props.data;
            return ( 
            	<div>
	                <ul className="nav navbar-nav">
	                    {items.map(function(result) {
	                        return <Menu showname = {result.show} name={result.name} key={result.id} items={result.items}></Menu>;
	                    })}
	                </ul>
	               	<LogOut></LogOut>
	               	
               	</div>
            );
        },
        handleClicks:function(){
        	EventBus.trigger("MenuEvent_Other");
        }
    });

    return MenuBar;
});