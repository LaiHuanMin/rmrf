﻿ photourl=$("#pichost").val();
//生成瀑布流初始化
function waterfallInit(){
	new AnimOnScroll( document.getElementById( 'grid' ), {
		minDuration : 0.4,
	 	maxDuration : 0.7,
	 	viewportFactor : 0.2
	} );
}

//初始化活动数量
//var count=$("#active").attr("count");
var ip=returnCitySN["cip"];
//$.ajax({
//    "type":"post",
//    "url":$('#p_s_f_website_url').val()+"/pc/activity/activityList",
//    "data":{"start":"0",limit:"1","ip":ip},
//    success:function(data){
//    	console.log(data);
//    	$("#active").attr("count",data.data.totalCount);
//    }
//})
//消息提示的弹出
function reminder(infor){
    $(".reminderMessage span").html(infor);
    $(".reminder").css("display","block");
    $('.reminder').delay(3000).hide(0);
}
//在搜索input里面打完字直接按回车开启搜索
$(".txt").on("keydown",function(e){
	e=event||window.event;
	if(e.keyCode == 13){
		$("#search").click();
	}
})
//加cookie
function addCookie(name,value,days,path){  
    var name = escape(name);  
    var value = value;  
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires + path;  
}  
//获取cookie
function getCookieValue(name){  
    //用处理字符串的方式查找到key对应value  
    var name = escape(name);  
    //读cookie属性，这将返回文档的所有cookie  
    var allcookies = document.cookie;         
    //查找名为name的cookie的开始位置  
    name += "=";  
    var pos = allcookies.indexOf(name);      
    //如果找到了具有该名字的cookie，那么提取并使用它的值  
    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败  
        var start = pos + name.length;                  //cookie值开始的位置  
        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie  
        var value = allcookies.substring(start,end); //提取cookie的值  
        return (value);                           //对它解码        
    }else{  //搜索失败，返回空字符串  
        return "";  
    }  
} 
//删除cookie
function deleteCookie(name,path){  
    var name = escape(name);  
    var expires = new Date(0);  
    path = path == "" ? "" : ";path=" + path;  
    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
}

//点击最新
$(".head_new").live("click",function(){
	$(".span_tips").css("display","none");		//清除红线提示
	$("#bieyang_label_id").attr({"value":""});	//清除标签
	$("#bieyang_sort_id").attr({"value":""});	//清除分类
	$(".txt").val("");	//清除搜索条件
	clearImg();
	$("#active").val("0");
	$("#active").attr("data-search","0");
	fenyeFind();
//	$(".sc2").click();	//最新页面是三栏展示的
})
//点击精选
$(".head_like").live("click",function(){
	$("#bieyang_label_id").attr({"value":""}); //清除标签
	$("#bieyang_sort_id").attr({"value":""}); //清除分类
	$(".txt").val("");	//清除搜索条件
	$("#active").val("0");
	$("#active").attr("data-search","0");
	clearImg();
	fenyeFind("check_y");
})
//最新/精选的函数
function fenyeFind(approve){
//	approve=approve||"";
	var num=parseInt($("#active").val());
    var startnum=num*20;  
    var totalcount=parseInt($("#active").attr("totalcount"));
    //console.log(totalcount,num);
    if(startnum<totalcount||totalcount<=0){
    
	if(approve==null||approve==""){
		var params={"headline":$(".txt").val(),"classificationId":$("#bieyang_sort_id").attr("value"),"labelId":$("#bieyang_label_id").attr("value"),"start":startnum,"limit":20};
		var url="/pc/order/newsOrderList";
	}
	else if(approve=="check_y"){
		var params={"start":startnum,"limit":20};
		
		var url="/pc/order/approveOrderList";
	}
	//var params={"headline":$(".txt").val(),"approve":approve,"classificationId":$("#bieyang_sort_id").attr("value"),"labelId":$("#bieyang_label_id").attr("value"),"start":$("#grid li").length,"limit":20};
	//每次调用的时候，清空瀑布流里面的数据,以便重新将图片塞进去	
  		
	$.ajax({
		"type":"post",
		"url":$('#p_s_f_website_url').val()+url,
		"data":params,
		success:function(data){
			$("#active").attr("totalcount",data.data.totalCount);
			var data=data.data.datas;
			//console.log(url);
			
			if(!data){
				reminder("未查询到相关结果");
				return false;
			}
			var datalen=data.length;
			for(var k in data){			
				var s2_url=data[k].pictureUrl;  
				var s2_head=data[k].face;
				var s2_name=data[k].nickname;
				var s2_love=data[k].collectCount;
				var orderId=data[k].id;
				var uid=data[k].userId;	
				var s2_label=data[k].labelId;  //图片的标签类型,可能为null
				var s2_headline=data[k].headline;  
				var collectCount=data[k].collectCount; 
				var viewCount=data[k].viewCount; 
				var isCollect=data[k].isCollect; 
				var downloadCount="";
				var pixel=data[k].pixel;
				var count=data[k].count;
				var picMata=data[k].picMata;
				if(data[k].downloadCount!=null){
				downloadCount=data[k].downloadCount;
				}
				s2_url=s2_url+"?x-oss-process=image/resize,m_lfit,h_720,w_720";
				//如果用户没有上传头像，那么设置一个默认头像给他
				var qw2;
				if(!s2_head){
					s2_head=photourl+"/nopic_user.jpg";
				}
//				如果没有上传用户的昵称，则不显示
				if(!s2_name){
					s2_name="";
				}
				//如果没有图片的标签分类，则将null改为"" 空字符串，以免后台出现问题
				if(s2_label == null){
					s2_label=="";
				}
				if(isCollect == true){
					isCollect=1;
					qw2=" mask_b_div1_span4_1";
				}else if(isCollect == null){
					isCollect=0;
					qw2="";
				}
				if(pixel){
					
				}else{
					pixel="";					
				}
				if(!picMata){
					picMata=""
				}
				//如果有评论,则添加数字提示
					if(!count){
						var s2_img=$('<li ajax-p="1" headline="'+s2_headline+'" labelId="'+s2_label+'"><div class="img_container_div"><a><img picMata="'+picMata+'" alt="'+s2_headline+'" data-size="'+pixel+'" data-view="'+viewCount+'" data-download="'+downloadCount+'" data-like="'+collectCount+'" src="'+s2_url+'"></a><div class="s2_mask"><div class="mask_b"><div class="mask_b_div1"><span class="mask_b_div1_span1" au-id="'+uid+'"><img src="'+s2_head+'" alt=""></span><span class="mask_b_div1_span2">'+s2_name+'</span></div><div class="mask_b_div2"><span data-id="'+orderId+'" class="mask_b_div1_span3"></span><span class="mask_b_div1_span4'+qw2+'" love="'+isCollect+'" data-code="'+orderId+'"></span><span class="mask_b_div1_span5">'+s2_love+'</span></div></div></div></li>');	
					}else{
						var s2_img=$('<li ajax-p="1" headline="'+s2_headline+'" labelId="'+s2_label+'"><div class="img_container_div"><a><img picMata="'+picMata+'" alt="'+s2_headline+'" data-size="'+pixel+'" data-view="'+viewCount+'" data-download="'+downloadCount+'" data-like="'+collectCount+'" src="'+s2_url+'"><span class="ts_iden">+'+count+'</span></a><div class="s2_mask"><div class="mask_b"><div class="mask_b_div1"><span class="mask_b_div1_span1" au-id="'+uid+'"><img src="'+s2_head+'" alt=""></span><span class="mask_b_div1_span2">'+s2_name+'</span></div><div class="mask_b_div2"><span data-id="'+orderId+'" class="mask_b_div1_span3"></span><span class="mask_b_div1_span4'+qw2+'" love="'+isCollect+'" data-code="'+orderId+'"></span><span class="mask_b_div1_span5">'+s2_love+'</span></div></div></div></li>');	
					}
				
					$(".grid").append(s2_img);
					
//				if(k == 5 || k == 19){
//					waterfallInit();
//				}
			}
			var ip=returnCitySN["cip"]; 	
			//console.log(num);
    			$.ajax({
    		        "type":"post",
    		        "url":$('#p_s_f_website_url').val()+"/pc/activity/activityList",
    		        "data":{"start":num,"limit":"1","ip":ip},
    		        success:function(data){
    		        	//console.log(data);
    		        	var count=data.data.totalCount;
    		        	var data=data.data.datas;
    		        	if(data){
    		        		var time1=new Date(data[0].activityStart);
        		        	year1=time1.getFullYear();
        		        	month1=time1.getMonth()+1;
        		        	date1=time1.getDate();
        		        	if(month1<10){
        		        		month1="0 "+month1;
        		        	}
        		        	if(date1<10){
        		        		date1="0 "+date1;
        		        	}
        		 
        		        	//var limittime= time1.getFullYear()+"."+month1+"."+date1;
        		        	var limittime= month1+" 月 "+date1+" 日";
        		        	var src=data[0].activityPic+'?x-oss-process=image/resize,m_lfit,h_720,w_720';
        		        	var address=data[0].activityProvince+" , "+data[0].activityCity;       		        	
        		        	var active=$('<li ajax-p="1" class="active_list" active-id="'+data[0].id+'"><div class="active_bg" style="background:url('+src+') 50% 50%;background-size: cover;"></div><div class="activity_article"><div class="activity_icon"><img src="http://photo.ssyer.com/lib/address_icon.png" style="width:8%"></div><div class="activity_name">'+data[0].activityTheme+'</div><div class="activity_address">'+address+'</div><div class="activity_limittime">'+limittime+'</div></div></li>');
        		        	//<img src="'+data[0].activityPic+'?x-oss-process=image/resize,m_lfit,h_720,w_720'+" >
        			var x=num*21+Math.floor(Math.random()*5);
        			var y=$("#active").attr("data-search");
        			if(y=="0"){
        				$(".grid li:eq("+x+")").before(active);
        			}
    		        	}
    		        	
    			else{}
    		        	
                waterfallInit();
                scrollFenye=false;
                num++;
    			$("#active").val(num);    			
    			
    				if($(".sc1").attr("data-sel") == 1){	//表明此时是二列
        				$(".grid li").css({
        					"width":"50%"
        				});
        				$(".active_list").css({
        					"width":"50%"
        				})
        				var actwid=parseInt($("#grid li").css("width"))-22;
    		        	//console.log(actwid);
    		        	$(".active_bg").css("height",actwid*0.68+"px");
    		        	$(".activity_name").css("font-size","30px");
    		        	$(".activity_address").css("font-size","16px");
    		        	$(".activity_limittime").css("font-size","14px");	
        			}else{	//表明此时是三列
        				$(".grid li").css({
        					"width":"33.3%"
        				});
        				$(".active_list").css({
        					"width":"33.3%"
        				})
        				var actwid=parseInt($("#grid li").css("width"))-22;
    		        	//console.log(actwid);
    		        	$(".active_bg").css("height",actwid*0.68+"px");
    		        	$(".activity_name").css("font-size","20px");
    		        	$(".activity_address").css("font-size","14px");
    		        	$(".activity_limittime").css("font-size","12px");	
        			}
    			
    					
    		        }
    		        
    		     })
    		
    		
		       
			
			
			if($("img").attr("alt")==""){
				$(this).removeAttr("alt");
			}

					
				
			$("#leeimg").css("display","none");
		}
	})
	
   }else{
	   $("#leeimg").css("display","none");
	   $("#nomore").show();
   	setTimeout(function () { $("#nomore").hide() }, 3000);
   }
}


//点击搜索
$("#search").live("click",function(){
	var text=$(".txt").val();
	$("#active").val("0");
	$("#active").attr("data-search","1");
	if(!text){
		return false;
	}else{
		$("#bieyang_label_id").attr({"value":""});
		$("#bieyang_sort_id").attr({"value":""});
		$(".menu ul li a").css({
			"font-weight":"300",
			"color":"#ccc"
		})
		$(".menu ul li:nth-child(2) a").css({
			"font-weight":"500",
			"color":"#292c15"
		})
		clearImg();
		var fw=$(".head_like").css("fontWeight");
		$("#whoisindex").val("new");
		$("#active").val("0");
			fenyeFind();
//			setTimeout(function(){
//				$(".sc2").click();
//			},500)			
		}		
	})	

//点击标签的时候，出现相对应的具有该标签内容
$(".label_a").live("click",function(){
	var value=$(this).attr("value");
	if($(this).hasClass("label_a1")){	//表示是已经被点击的标签
		$("#bieyang_label_id").attr({"value":value});	
	}else{
		$("#bieyang_label_id").attr({"value":""});
	}	
	$("#bieyang_sort_id").attr({"value":""});
	$(".txt").val("");
	clearImg();
	$("#active").val("0");
	fenyeFind();
})

//点击分类的时候，出现相对应的具有该标签内容
$(".label_b").live("click",function(){
	var value=$(this).attr("value");
	if($(this).hasClass("label_b1")){
		$("#bieyang_sort_id").attr({"value":value});
	}else {
		$("#bieyang_sort_id").attr({"value":""});
	}	
	$("#bieyang_label_id").attr({"value":""});
	$(".txt").val("");
	clearImg();
	$("#active").val("0");
	fenyeFind();
})

//清除瀑布流里面的图片	
function clearImg(){
	$(".grid").html("");	
}


$(".search_bob input").on('input propertychange', function (e) {
	if($(this).attr("value")!=""){
		$(".closeSearch").css("display","inline-block");
	}else{
		$(".closeSearch").css("display","none");
	}
});

$(".closeSearch").click(function(){
	$(this).css("display","none");
	$(".search_bob input").attr("value","");	
});
//鼠标移到头像icon上出现顶部导航栏
$(".memberCenter").hover(function(){
	$(".user_operations").css({
		"display":"block"
	})
},function(){
	$(".user_operations").css({
		"display":"none"
	})
})
//顶部导航栏上字体颜色的悬浮改变
$(".user_operations li a").hover(function(){
	$(this).css({
		"color":"#000",
		"font-weight":"bold",
	})
},function(){
	$(this).css({
		"color":"#b3b3b3",
		"font-weight":"normal",
	})
})
var timer;
//鼠标移到...上面 出现关于我们
$(".headMore").hover(function(){
	$(".head_more_div").css({
		"display":"block"
	})
},function(){
	 timer=setTimeout(function(){
		$(".head_more_div").css({
			"display":"none"
		})
	},500)	
})
$(".head_more_div").hover(function(){
	clearTimeout(timer);
	$(this).css({
		"display":"block"
	})
},function(){
	$(this).css({
		"display":"none"
	})
})

$("#aboutUs_a").hover(function(){
	$(this).css({
		"color":"#999"
	})
},function(){
	$(this).css({
		"color":"#fff"
	})
})
$("#kmo").hover(function(){
	$(this).css({
		"color":"#999"
	})
},function(){
	$(this).css({
		"color":"#fff"
	})
})
$("#index_wx_share").hover(function(){
	$(this).css({
		"color":"#999"
	})
},function(){
	$(this).css({
		"color":"#fff"
	})
})

//点击顶部导航切换了不同的字体颜色
$(".menu ul li a").on("click",function(){
	$(this).css({
		"font-weight":"500",
		"color":"#292c15"
	})
	$(this).parent().siblings().find("a").css({
		"font-weight":"300",
		"color":"#ccc"
	})
})

//消息铃铛的鼠标悬停出现提示
function tipHover(){
	var timer;
$(".prompt_span").hover(function(){	
	$.ajax({
		"type":"post",
		"url":$('#p_s_f_website_url').val()+"/pc/message/myMessage",
		"data":{"start":0,"limit":5,"reading":1},  //鼠标悬停的时候,这里的值传1,直接写死
		success:function(data){
			$(".tip_div_all").html("");	//首先清空提示栏里面的内容
			var data=data.data.datas;
			var timer=Date.parse(new Date()); //获取当前的时间戳,最后的三位是000
			if(!data){
				$(".prompt_span_tips").css({
					"display":"none"
				})
				return false;
			}
			var datalen=data.length;
			
			for(var k in data){
				var content=data[k].content;
				var nickname=data[k].nickname;
				var face=data[k].face;
				var title=data[k].title;
				var id=data[k].id;
				var associatedId=data[k].associatedId;//图片id
				var gmtCreate=data[k].gmtCreate;
				var diff=timer+1000*60-gmtCreate;
				var sec=diff/1000;	//秒数
				var min=sec/60; //分钟数
				var hour=min/60;	//小时数
				var day=hour/24;	//天数
				if(sec<60){
					var time=Math.ceil(sec)+"秒前";
				}else{
					if(min<60){
						var time=Math.ceil(min)+"分钟前";
					}else{
						if(hour<24){
							var time=Math.ceil(hour)+"小时前";
						}else {
							var time=Math.ceil(day)+"天前";
						}						
					}
				}
				if(!face){
					face=photourl+"/nopic_user.jpg";
				}				
				var s2_mes=$('<div class="tip_div" picid="'+associatedId+'" comid="'+id+'"><div class="td_head"><img class="td_head_img" src='+face+'></div><div class="td_right"><p class="td_p1"><span class="td_nick">'+nickname+'</span> · <span class="td_time">'+time+'</span></p><p class="td_p2">留言了您的作品<span>'+title+'</span>。</p></div></div>');
				$(".tip_div_all").append(s2_mes);
			} 
			if($(".tip_div").length <= 0){
				console.log("数据为空了");
				$(".prompt_span_tips").css({
					"display":"none"
				})
				console.log(111);
				$(".top_tips").css({
					"display":"none"
				})
			}else{
				$(".top_tips").css({
					"display":"block"
				})
			}
		}
	})

},function(){	
	timer=setTimeout(function(){
		$(".top_tips").css({
			"display":"none"
		})
			$(".tip_div_all").html("");
	},500)
})
$(".top_tips").hover(function(){	//鼠标移动到铃铛消息提示框
	clearTimeout(timer);
	$(this).css({
		"display":"block"
	})
},function(){
	$(this).css({
		"display":"none"
	})	
})	
}
//点击消息推送细目事件
$(".tip_div").live("click",function(){	
	var orderId=$(this).attr("picid");
	var comId=$(this).attr("comid");
	$.ajax({
		"type":"post",
		"url":$('#p_s_f_website_url').val()+"/pc/message/updateReadingByid",
		"data":{"id":comId},
		success:function(data){
			var data=data.data;
			if(data){
				window.open($('#p_s_f_website_url').val()+"/pc/order/"+orderId);
			}else if(!data){
				return false;
			}		
		}
	})
});
$(function(){
	tipHover(); 	//消息铃铛的鼠标悬停出现提示	
})

$("#index_wx_share").on("click",function(){
	$(".jiathis_button_weixin").click();
	$(this).css({
		"color":"#999"
	})
})

//打开摄像大赛
$("#kmo").on("click",function(){
//	var cookie=getCookieValue("session_user_info_s");
//	console.log(cookie);
//	$.ajax({
//		"type":"post",
//		"url":"http://vot.ssyer.com/setCookie",
//		"data":{"cookie":cookie},
//		success:function(data){
//			
//		}
//	})
	window.open($('#p_s_f_website_url').val()+"/ssyer_tpindex");
})








