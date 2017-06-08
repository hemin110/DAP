// D3 based visuaization for classification result
define([], function() {
    var margin = {
        top: 50,
        right: 30,
        bottom: 50,
        left: 50
    };

    var AAViz = function(option) {
        this._trainData = option.data;
        
        var predicter = option.predict;
        //取数组
        //打印数组
        //1 切分数据
        var showArr = new Array();
        var pararr = predicter.split('#');
        for(var i = 0 ; i<pararr.length ; i++){
        	var temarr = pararr[i]
        	var newtemparr = new Array();
        	for(var j = 0; j<temarr.split(',').length ; j++){
        		newtemparr.push(parseInt(temarr.split(',')[j]))
        	}
        	showArr.push(newtemparr)
        }
        this._predictData = showArr;
        this._predictScale = option.scale;
        this._features = option.features;
        this._target = option.target+",";
		//取得列表
		//合并array
		var tageetarr = this._target.split(",")
		var titlename = tageetarr.concat(this._features)
		titlename.splice(1,1)
		this._titlename = titlename;
        this._rootContainerId = option.containerId;
        this._width = option.size.width - margin.left - margin.right;
        this._height = option.size.height - margin.top - margin.bottom;
        this._color = d3.scale.category10();
		//.attr("width", this._width + margin.left + margin.right)
        //.attr("height", this._height + margin.top + margin.bottom)

		
        this._svg = d3.select("#" + this._rootContainerId).append("svg")
            .attr("width", 450)
            .attr("height", 450)
            .append("g")
            .attr("transform", "translate(" + 450/2 + "," + 450/2 + ")");
    };

    AAViz.prototype.render = function() {

        var color = this._color;

        var titlename = this._titlename;
        //var titlename = [ "北京" , "上海" , "广州" , "深圳" , "香港"  ];
        var popudata = this._predictData;        
        //
        console.log(popudata);
        var popudata1 = [
		  [ 90,81,36 ],
		  [ 81,100,11 ],
		  [ 36,11,99]
		];
		console.log(popudata1);
		var chord_layout = d3.layout.chord()
								.padding(0.03)
								.sortSubgroups(d3.descending())
								.matrix(popudata);
		
		var groups = chord_layout.groups();
		var chords = chord_layout.chords();
		
		
		var width = this._height;
		var height = this._height;
		
		var innerRadius = width/2 * 0.7;
		var outerRadius = innerRadius * 1.1;
		
		var outer_arc =  d3.svg.arc()
					 .innerRadius(innerRadius)
					 .outerRadius(outerRadius);
		
		var g_outer = this._svg.append("g");
		g_outer.selectAll("path")
				.data(groups)
				.enter()
				.append("path")
				.style("fill", function(d) { return color(d.index); })
				.style("stroke", function(d) { return color(d.index); })
				.attr("d", outer_arc );
			
		g_outer.selectAll("text")
				.data(groups)
				.enter()
				.append("text")
				.each( function(d,i) { 
					d.angle = (d.startAngle + d.endAngle) / 2; 
					d.name = titlename[i];
				})
				.attr("dy",".35em")
				.attr("transform", function(d){
					return "rotate(" + ( d.angle * 180 / Math.PI ) + ")" +
						   "translate(0,"+ -1.0*(outerRadius+10) +")" +
						    ( ( d.angle > Math.PI*3/4 && d.angle < Math.PI*5/4 ) ? "rotate(180)" : "");
				})
				.text(function(d){
					return d.name;
				});
				
		var inner_chord =  d3.svg.chord()
						.radius(innerRadius);
		this._svg.append("g")
			.attr("class", "chord")
		    .selectAll("path")
			.data(chords)
		    .enter()
			.append("path")
			.attr("d", inner_chord )
		    .style("fill", function(d) { return color(d.source.index); })
			.style("opacity", 1)
			.on("mouseover",function(d,i){
				d3.select(this)
					.style("fill","yellow");
			})
			.on("mouseout",function(d,i) { 
				d3.select(this)
					.transition()
                    .duration(1000)
					.style("fill",color(d.source.index));
			});
    };
    return AAViz;
});
