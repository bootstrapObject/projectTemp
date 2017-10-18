/**
 * 绘图工具
 * 
 * 初始化js条件
 * <script src="/js/jquery.min.js" />
 * <script src="/js/echarts/echarts.min.js" />
 * <script src="/js/echarts/theme/macarons.js" />
 * <script src="/customjs/echartUtil/data.format.js" />
 */
$(function() {
	
	var drawChartUtil = {
		
		/**
		 * 上下文
		 */
		doc : window.document,
		
		/**
		 * echart工具
		 */
		echartUtil : {
			
			/**
			 * 线图
			 * @param chart echart实例
			 * @param data Object 后端数据
			 * @param isNewChart boolean 是否为新建图表
			 * @param option {} 选项参数  {
		 	 * 		dataZoom: true | false 是否开启缩放
		 	 *		dataZoomFun: 缩放回调函数，只有在dataZoom为true时，该参数有效
			 * }
			 */
			drawLine: function(chart, data, isNewChart, option) {
				var drawData = data.data,
					legend = [],
					drawKey = [],
					drawValue = [],
					single = null,
					tmp = null,
					svals = null;
				for (var i = 0, len = drawData.length; i < len; i ++) {
					single = drawData[i];
					legend.push(single.name);
					svals = single.value;
					drawValue = [];
					for (var j = 0, jlen = svals.length; j < jlen; j ++) {
						tmp = svals[j];
	 					for (var key in tmp) {
	 						if(i == 0) {
	 							drawKey.push(new Date(key * 1000).format('hh:mm:ss'));
	 						}
	 						drawValue.push(tmp[key]);
	 					}
					}
					single.clipOverflow = false;
					single.type = 'line';
					single.data = drawValue;
				}
				var chartOption = {
		            legend: {
		            	left : 'center',
		            	top : 'bottom',
		            	textStyle: {
		            		color: '#CCCCCC'
		            	},
		            	data: legend
		            },
		            tooltip: {
		                trigger: 'axis',
		                axisPointer: {
		                    animation: false
		                }
		            },
		            xAxis: {
		            	type: 'category',
		            	axisLine: {
		            		lineStyle: {
		            			color: '#CCCCCC'
		            		}
		            	},
		            	data: drawKey
		            },
		            yAxis: {
		            	type: 'value',
		            	axisLine: {
		            		lineStyle: {
		            			color: '#CCCCCC'
		            		}
		            	}
	            	},
		            series: drawData
		        };
		        this.chartTitle(data, chartOption);
		        this.chartDataZoom(option, chartOption);
				chart.setOption(chartOption);
				if(isNewChart && option.dataZoom && option.dataZoomFun) {
					var dataValue = drawData[0].value,
						getKey = this.getKey;
					chart.on('dataZoom', function(e) {
						var startIndex = 0, endIndex = 0,
							batch = e.batch[0];
						if(batch.start == 0 && batch.end == 100) { // 还原状态
							startIndex = 0;
							endIndex = dataValue.length - 1;
						} else { // 缩放状态
							startIndex = batch.startValue;
							endIndex = batch.endValue;
						}
						option.dataZoomFun(getKey(dataValue[startIndex]), getKey(dataValue[endIndex]));
					});
				}
			},
			
			/**
			 * 线图
			 * @param chart echart实例
			 * @param data Object 后端数据
			 * @param isNewChart boolean 是否为新建图表
			 * @param option {} 选项参数  {
			 * 		clickFun: 饼图点击回调函数
			 * }
			 */
			drawPie: function(chart, data, isNewChart, option) {
				var drawData = data.data;
				var chartOption = {
					series: {
						type : 'pie',
						center: ['50%', '55%'],
						data : drawData
					}
				};
				this.chartTitle(data, chartOption);
				chart.setOption(chartOption);
				if(isNewChart && option.clickFun) {
					chart.on('click', function(p) {
						option.clickFun(p.data);
					});
				}
			},
			
			/**
			 * 设置图表表头
			 * @param data 源数据
			 * @param chartOption 图标参数 
			 */
			chartTitle: function(data, chartOption) {
				var starttime = data.starttime,
					endtime = data.endtime,
					plotName = data.plotName;
				chartOption.title = {
	                text: plotName,
	            	textStyle: {
	            		color: '#CCCCCC'
	            	},
	                left: 'center',
	                subtext: new Date(starttime * 1000).format('yyyy-MM-dd hh:mm:ss') + 
	                ' 至 ' + new Date(endtime * 1000).format('yyyy-MM-dd hh:mm:ss')
	            };
			},
			
			/**
			 * 是否开启图形缩放
			 * @param option 开启参数
			 * @param chartOption 图表参数
			 */
			chartDataZoom: function(option, chartOption) {
		        if(option.dataZoom) {
		        	chartOption.toolbox = {
		            	feature: {
		            		dataZoom: {
		            			yAxisIndex: false,
		            			title: {
		            				zoom: '缩放',
		            				back: '还原'
		            			}
		            		}
		            	}
		            }
		        }
			},
			
			/**
			 * 获取第一个key值
			 * @param obj 源数据
			 */
			getKey: function(obj) {
				var key = 0;
				for(var k in obj) {
					key = k;
					break;
				}
				
				return parseInt(key);
			}
		},
		
		/**
		 * 画图总入口
		 * @param domId String
		 * @param url String 
		 * @param params {}
		 * @param option {}
		 * 
		 */
		drawChart : function(domId, url, params, option) {
			var echartUtil = this.echartUtil,
				chartDom = this.doc.getElementById(domId),
				myChart = echarts.getInstanceByDom(chartDom),
				isNewChart = false;
			if(!option) { // 参数选项初始化
				option = {};
			}
			if(!myChart) {
				myChart = echarts.init(chartDom, 'macarons');
				isNewChart = true;
			}
	 	    myChart.showLoading();
	 		$.ajax({
	 			url : url,
	 			type : 'POST',
	 			async : true,
	 			data : params,
	 			timeout : 5000,
	 			dataType : 'json',
	 			success : function(data) {
	 				switch (data.type) {
	 					case 'line' : echartUtil.drawLine(myChart, data, isNewChart, option); break;
	 					case 'pie' : echartUtil.drawPie(myChart, data, isNewChart, option); break;
	 				}
	 			},
	 			error : function(xhr, status) {
	 				console.log('图形数据出现错误');
	 				console.log(xhr);
	 				console.log(status);
	 			},
	 			complete : function() {
	 				myChart.hideLoading();
	 			}
	 		});
		},
			
		/**
		 * 图形销毁
		 * @param domId String 节点ID
		 * 
		 */
		chartDispose : function(domId) {
			echarts.dispose(this.doc.getElementById(domId));
		},
		
		/**
		 * 图形重置大小
		 * @param domId String 节点ID
		 * @param width number|String 宽度 
		 * @param height number|String 高度
		 * 
		 */
		chartResize : function(domId, width, height) {
    		var option = {
    			width: 'auto',
    			height: 'auto'
    		};
    		if(width) {
    			option.width = width;
    		}
    		if(height) {
    			option.height = height;
    		}
    		var chartDom = this.doc.getElementById(domId);
    		echarts.getInstanceByDom(chartDom).resize({
				opts : option
			});
		}
	};
	
	// 封装入jQuery
	$.extend({
		
		/**
		 * 画图总入口
		 * @param domId String 节点ID
		 * @param url String 访问URL
		 * @param params {} 后端参数
		 * @param option {
		 * 		line: {
		 * 			dataZoom: true | false 是否开启缩放
		 * 			dataZoomFun: 缩放回调函数，只有在dataZoom为true时，该参数有效
		 * 		}
		 * 
		 * 		pie: {
		 * 			clickFun: 饼图点击回调函数
		 * 		}
		 * }
		 */
    	drawChart: function(domId, url, params, option) {
        	drawChartUtil.drawChart(domId, url, params, option);
    	},
    	
    	/**
		 * 图形销毁
		 * @param domId 节点ID
		 */
    	chartDispose : function(domId) {
    		drawChartUtil.chartDispose(domId);
    	},
    	
    	/**
		 * 图形重置大小
		 * @param domId String 节点ID
		 * @param width number|String 宽度 
		 * @param height number|String 高度
		 */
    	chartResize : function(domId, width, height) {
    		drawChartUtil.chartResize(domId, width, height);
    	}
	});
});
