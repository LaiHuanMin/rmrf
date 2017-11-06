 photourl=$("#pichost").val();
//首页页面加载时根据url判断是最新还是喜欢
$(function(){
	var whichpage=$("#whoisindex").val();
	if(whichpage == "new"){
			$(".head_new").click();	
			$(".sc2").css({
				"background":"url("+photourl+"/three1.png)"
			})
			$(".sc1").css({
				"background":"url("+photourl+"/two.png)"
			})
	}else{
			$(".head_like").click();	
	}	
})

//添加cookie
function addCookie(name,value,days,path){  
	    var name = escape(name);  
	    var value = escape(value);  
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

// OSS对象生成
  var client = new OSS.Wrapper({
    	region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAIWM44IMDuH16R',
    accessKeySecret: 'odtZ52n9JViv4DWy9MkfRjsWpoDpmj',
    bucket: 'ssyer'
  });

//生成瀑布流初始化
function waterfallInit(){
	new AnimOnScroll( document.getElementById( 'grid' ), {
		minDuration : 0.4,
	 	maxDuration : 0.7,
	 	viewportFactor : 0.2
	} );
}

//获取首页标签
function getLabel(){
$.ajax({
    "type":"post",
    "url":$('#p_s_f_website_url').val()+"/pc/label/all",
    success:function(data){
    	var data_sort=data.data.BieyangClassificationList;	    	    	
    	
    	var data=data.data.BieyangLabelList;
    	
    	for(var k in data_sort){
	    	  var bq=data_sort[k].name;
	    	  var id=data_sort[k].id;
	    	  var lis=$('<li><h2><a value="'+id+'" class="label_b">'+bq+'</a></h2></li>');
	    	  $(".s3_sort").append(lis);
	      }
      for(var k in data){
    	  var bq=data[k].name;
    	  var id=data[k].id;
    	  var lis=$('<li><a value="'+id+'" class="label_a">'+bq+'</a></li>');
    	  $(".head_label").append(lis);
      }
    },
    error:function(){	      
    }
  })	  	  
}

//获取指定字符串中某个字符第n次出现的位置
function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}


//调取首页的标签 顶部三个统计数据等信息,在页面加载的时候就执行
$(function(){	
	getLabel();
})

// 点击切换瀑布流的样式 
$(".sc1").on("click",function(){  //变成双列布局
	$(this).attr({"data-sel":"1"})
	$(this).css({
		"background":"url("+photourl+"/two1.png)"
	})
	$(".sc2").css({
		"background":"url("+photourl+"/three.png)"
	})
	$(".grid li").css({
		"width":"50%"
	})
	var actwid=parseInt($("#grid li").css("width"))-22;
	$(".active_bg").css("height",actwid*0.68+"px");
	$(".activity_name").css("font-size","30px");
	$(".activity_address").css("font-size","16px");
	$(".activity_limittime").css("font-size","14px");	
	waterfallInit();
})
$(".sc2").on("click",function(){	//变成三列布局
	$(".sc1").removeAttr("data-sel");
	$(this).css({
		"background":"url("+photourl+"/three1.png)"
	})
	$(".sc1").css({
		"background":"url("+photourl+"/two.png)"
	})	
	$(".grid li").css({
		"width":"33.3%"
	})
	var actwid=parseInt($("#grid li").css("width"))-22;
	$(".active_bg").css("height",actwid*0.68+"px");
	$(".activity_name").css("font-size","20px");
	$(".activity_address").css("font-size","14px");
	$(".activity_limittime").css("font-size","12px");	
	waterfallInit();
})


// 首页返回顶部按钮
!function(o) {
    "use strict";
    o.fn.toTop = function(t) {
        var i = this,
        e = o(window),
        s = o("html, body"),
        n = o.extend({
            autohide: !0,
            offset: 420,
            speed: 500,
            position: !0,
            right: 15,
            bottom: 30
        },
        t);
        i.css({
            cursor: "pointer"
        }),
        n.autohide && i.css("display", "none"),
        n.position && i.css({
            position: "fixed",
            right: n.right,
            bottom: n.bottom
        }),
        i.click(function() {
            s.animate({
                scrollTop: 0
            },
            n.speed)
        }),
        e.scroll(function() {
            var o = e.scrollTop();
            n.autohide && (o > n.offset ? i.fadeIn(n.speed) : i.fadeOut(n.speed))
        })
    }
} (jQuery);
$('.to-top').toTop({
    autohide: true,
    offset: 420,
    speed: 500,
    right: 15,
    bottom: 30
});

//大于1400屏幕显示三列
var zz=$(window).width();
if (zz>1400){
	$(".sc1").attr("data-sel","0");
	$(".sc2").css({
		"background":"url("+photourl+"/three1.png)"
	})
	$(".sc1").css({
		"background":"url("+photourl+"/two.png)"
	})
}

// 瀑布流的遮罩层
$(function(){
  $(".img_container_div").css({
    "position":"relative",
    "overflow":"hidden"
  })
})

//window.onload=function(){}

 var timer=setInterval(function(){
	var len=$(".shown").length;
	if(len>=2){
		$(".data_count").slideDown(200);
		clearInterval(timer);
	}		
 },500);
 
 
$("#search").on("click",function(){
	if($(".txt").val()!= ""){
		$("#leeimg").css({
			"display":"none"
		})
	}else {
	}
})
$("html").click(function(e){
	//console.log(e);
	//console.log(e.clientX,e.clientY)
	if($(".downchange").css("opacity")==1||$(".downchange").css("filter")=="alpha(opacity=100)"){
		if(getAd(e)){
			$(".downchange").stop().animate({"bottom":"-50%","opacity":"0","filter":"alpha(opacity=0)","display":"none"},1000);
		}else{
			
		}
	}
})
//获取鼠标位置与div的距离
function getAd(e){
	var obj=document.getElementsByClassName("downchange")[0];
	
	//console.log(e.clientX,obj.offsetLeft,$(".downchange").width())
	var x=obj.offsetLeft-($(".downchange").width()/2);
	var y=(document.body.clientHeight-$(".downchange").height())/2;
	//console.log(y);
	if(e.clientX<x){
		return true
	}else if(e.clientX>x&&e.clientY<y&&e.clientX<x+$(".downchange").width()){
		return true
	}else if(e.clientX>x&&e.clientY>y+$(".downchange").height()&&e.clientX<x+$(".downchange").width()){
		return true
	}else if(e.clientX>x+$(".downchange").width()){
		return true
	}
}

//	首页下载功能的实现
$(".mask_b_div1_span3").live("click",function(){
	$(".chang:eq(0)").css({background:"rgba(204, 204, 204, 1)",color:"#ffffff"}).siblings().css({background:"rgba(255, 255, 255, 1)",color:"#666666"});
	localStorage.setItem("id", "0");
	var picId=$(this).attr("data-id");
    $("#downLoad").attr({"picId":picId});
    if($(".home-box").hasClass("index_page")){
    
    //获取图片原图大小
    var maxwidth=$(this).parent().parent().parent().prev().find("img").attr("data-size").split(",")[0];
    var maxheight=$(this).parent().parent().parent().prev().find("img").attr("data-size").split(",")[1];
    $(".maxwidth").html(maxwidth);
    $(".maxheight").html(maxheight);
    }
    var headImg=$(this).parent().prev().find(".mask_b_div1_span1").find("img").attr("src");
    var headName=$(this).parent().prev().find(".mask_b_div1_span2").text();
    //console.log(headImg)
    $(".author_img img").attr("src",headImg);
    $(".author_name p span").text(headName);
    //console.log(maxwidth,maxheight)
    var orderId=$(this).attr("data-id");
    $.ajax({
        "type":"post",
        "url":$('#p_s_f_website_url').val()+"/pc/order/details",
        "data":{"orderId":orderId},
        success:function(data){
            
            var data=data.data.data;
            var downloadCount=data.downloadCount;
            var date= new Date(data.gmtCreate);
            var seperator1 = "-";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
            $(".author_name p:last-child").html(currentdate);
        }
    })
    getDown(maxwidth,maxheight);
	var src=$(this).parent().parent().parent().prev().find("img").attr("src");
	/*var beg=find(src,'/',2);
	var src5=src.substring(beg+1);
	var x=src5.indexOf("?");
	src5=src5.substring(0,x);*/
	var src5=src.split("?")[0];
	//console.log(src5)
	$("#largePic").attr("data_src",src5)
	//OSSdownload(src5);
     
	return false;
})

function getDown(maxwidth,maxheight){
	 
	    var rate=maxheight/maxwidth;
	    $(".downchange_top_2 ul li:nth-child(2) span:last-child").html(parseInt(500*rate));
	    $(".downchange_top_2 ul li:nth-child(3) span:last-child").html(parseInt(900*rate));
	    $(".downchange_top_2 ul li:nth-child(4) span:last-child").html(parseInt(1080*rate));
	    $(".downchange_top_2 ul li:nth-child(5) input:first-child").on("change",function(){
	        if(parseInt($(this).val())>parseInt(maxwidth)){
	            $(this).val(maxwidth);
	        }
	        $(".downchange_top_2 ul li:nth-child(5) input:last-child").val(Math.round($(this).val()*rate));
	    });
	    $(".downchange_top_2 ul li:nth-child(5) input:last-child").on("change",function(){
	        if(parseInt($(this).val())>parseInt(maxheight)){
	            $(this).val(maxheight);
	        }
	        $(".downchange_top_2 ul li:nth-child(5) input:first-child").val(Math.round($(this).val()/rate));
	    });
	    
	    
	    //$(".bg").show();
	    //$(".bg_1").show();
	    //console.log(44);
	    $(".downchange").css({"display":"block"});
	    $(".downchange").stop().animate({"bottom":"50%","opacity":"1","filter":"alpha(opacity=100)"},1000);
	    //var orderId=$(this).attr("data-id");
//	    $.ajax({
//	        "type":"post",
//	        "url":$('#p_s_f_website_url').val()+"/pc/order/down_order", //此链接有问题..
//	        "data":{"orderId":orderId},
//	        success:function(data){  //返回给我一个实际的图片的点赞数量，塞进里面
//	                  
//	        }       
//	    })
	    return false;
	    
}


var ip=returnCitySN["cip"];  
//  点赞   首页的点赞先取消，后期打开... 
 $(".mask_b_div1_span4").live("click",function(e){
	 if($(this).hasClass("mask_b_div1_span4_1")){
		 return false;
	 }
     e=event||window.event;
     var This=$(this);
     var ex=$(this).offset().left;
     var ey=$(this).offset().top;
     $(".add1").css({
         "display":"inline-block",
         "position":"fixed",
         "top":ey-25+"px",
         "left":ex+1+"px"
     });
     $(".add1").fadeOut(1000);
     $(this).css({
         "background":"url("+photourl+"/wtlikehed.png) no-repeat",
         "background-size":"100% 100%"
     })
     
     var orderId=$(this).attr("data-code");
     var orderUserId=$("#s9_userid").val();
     if($("#islogin_ipt").val()==1){	//已经登录的
    	 $.ajax({
             "type":"post",
             "url":$('#p_s_f_website_url').val()+"/pc/order/orderLike", //此链接有问题..
             "data":{"orderId":orderId,"orderUserId":orderUserId},
             success:function(data){  //返回给我一个实际的图片的点赞数量，塞进里面
                 This.next().html(data.data);                
                 This.parent().parent().parent().prev().find("img").attr({"data-like":data.data});                         
                 reminder("点赞成功"); 
                 This.addClass("mask_b_div1_span4_1");
             },
             error:function(){
                 reminder("点赞失败");
             }
             
         })
     }else{		//还没有登录的
    	 $.ajax({
             "type":"post",
             "url":$('#p_s_f_website_url').val()+"/pc/order/orderLike", //此链接有问题..
             "data":{"orderId":orderId,"ip":ip},
             success:function(data){  //返回给我一个实际的图片的点赞数量，塞进里面
                 This.next().html(data.data);                
                 This.parent().parent().parent().prev().find("img").attr({"data-like":data.data});                         
                 reminder("点赞成功"); 
             },
             error:function(){
                 reminder("点赞失败");
             }
             
         })
     }
    
     return false;
 })



//	首页点击头像，进入他的个人主页
	$(".mask_b_div1_span1").live("click",function(){
		return false;
	})
	
//	从首页点击图片上面的头像，进入他的列表
	$(".mask_b_div1_span1").live("click",function(){
		var uid=$(this).attr("au-id");
		window.location.href=$('#p_s_f_website_url').val()+"/pc/order/ud?ud=ssyer/cerother&id="+uid;
	})
	
	
//点击标签，改变被点击的标签的样式
	$(".head_label li a").live("click",function(){
	if(!$(this).hasClass("label_a1")){
	$(this).addClass("label_a1");
		$(this).parent().siblings().find("a").removeClass("label_a1");
		$(this).css({
			"border":"2px solid #099",
			"border-radius":"10px",
			"padding":"1px 6px"
		})
		$(this).parent().siblings().find("a").css({
			"border":"none",
			"border-radius":"none",
			"padding":"0px"
		})
	}else{
		$(this).removeClass("label_a1");
		$(this).css({
			"border":"none",
			"border-radius":"none",
			"padding":"0px"
		})
	}
	$(".label_b").css({
		"border":"none",
		"border-radius":"none",
		"padding":"0px"
	})
	$(".label_b").removeClass("label_b1");
	})

//点击分类，改变被点击的标签的样式
	$(".s3_sort li a").live("click",function(){
	if(!$(this).hasClass("label_b1")){
	$(this).addClass("label_b1");
		$(this).parent().parent().siblings().find("a").removeClass("label_b1");
		$(this).css({
			"border":"2px solid #099",
			"border-radius":"10px",
			"padding":"1px 6px"
		})
		$(this).parent().parent().siblings().find("a").css({
			"border":"none",
			"border-radius":"none",
			"padding":"0px"
		})
	}else {
	$(this).removeClass("label_b1");
	$(this).css({
			"border":"none",
			"border-radius":"none",
			"padding":"0px"
	})
	}
	$(".label_a").css({
		"border":"none",
		"border-radius":"none",
		"padding":"0px"
	})
	$(".label_a").removeClass("label_a1");
	})
var scrollFenye=false;	
//鼠标滚动，实现分页数据的加载	
function jiazai(){
	var lilen1=$(".index_page #grid li").length;
      var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var x= $("#active").val();
        if(x==0){
        	$("#active").val("2");
        }
            if(scrollHeight-scrollTop-windowHeight <=380){           	
	if(!scrollFenye){
		$("#leeimg").css("display","block");
		scrollFenye=true;	
		var whichpage=$("#whoisindex").val();
		if(whichpage == "new"){		//最新
			fenyeFind();
			$("#grid li:nth-child("+lilen1+")").attr({"ajax-p":2});	
		}else{
			fenyeFind("check_y");	//精选
			$("#grid li:nth-child("+lilen1+")").attr({"ajax-p":2});	
		}
	}
            }
}
	
//点击按钮实现数据栏的显示和隐藏

$(".sc3").on("click",function(){
	dataShowHide();
})

function dataNavHide(){  //让首页的数据标签导航消失
	$(".nav").css({
		"position":"fixed",
//		"top":"-198px"
		"top":"-149px"
	})
		$(".home-box").css({
			"position":"relative",
			"margin-top":"167px"
		})
		$(".sc3").attr({"dat":"0"});
	$(".sc3").css({
		"background":"url("+photourl+"/drop_btn02.png)",
		"transform":"rotate(180deg)",
		"transition":"all 1s linear"
	})
}
function dataNavShow(){		//让首页的数据标签导航出现
	$(".nav").css({
		"position":"fixed",
		"top":"0px"
	})
		$(".home-box").css({
			"position":"relative",
			"margin-top":"311px"
		})
		$(".sc3").attr({"dat":"1"});
	$(".sc3").css({
		"background":"url("+photourl+"/drop_btn01.png)",
		"transform":"rotate(360deg)",
		"transition":"all 1s linear"
	})
}


//点击sc3 切换统计数据的显示和隐藏
function dataShowHide(){
	if($(".sc3").attr("dat") == 1){    //1表示是显示的状态
		dataNavHide();		
	}else if($(".sc3").attr("dat") == 0){  //0表示的是隐藏的状态
		dataNavShow();
	}
}

//滚动鼠标来改变顶部数据栏的显示和隐藏 ，并且加载首页的分页是数据
var agent = navigator.userAgent;
if (/.*Firefox.*/.test(agent)) {
    document.addEventListener("DOMMouseScroll", function(e) {
        e = e || window.event;
        var detail = e.detail;
        if (detail < 0) {
        	if($(window).scrollTop() == 0){   
        		dataNavShow();		
        	}           
        } else {
        	 if($(".sc3").attr("dat") == 1){
        		 dataNavHide();       		 
             }
             jiazai();    //这里引用一波jiazai()函数，如果把判断浏览器的代码写了两遍，那么前面的会失效？
        }
    });
} else {
   document.body.onmousewheel = function(event) {
    event = event || window.event;
    var wheelDelta=event.wheelDelta;
    if(wheelDelta>0){	//鼠标向上滚动
    	if($(window).scrollTop() == 0){   
    		dataNavShow();		
    	}
    }else{	//鼠标向下滚动
        if($(".sc3").attr("dat") == 1){
        	dataNavHide();
        }
        jiazai();    //这里引用一波jiazai()函数，如果把判断浏览器的代码写了两遍，那么前面的会失效？
    }
    }     
};
         
  
	
	
//首次微信登陆以后弹出框
	 // 发送验证码调用的ajax
    $("#wdl_btn1").on("click",function(){
    console.log(111);
    var mobile=$("#wdl_tel").val();
        $.ajax({
            "type":"post",
            "url":$('#p_s_f_website_url').val()+"/pc/reg/send_reg_code",
            "data":{"mobile":mobile},
            success:function(data){
				if(data.rspCode == 10001){
				reminder(data.rspMsg);
				}
				if(data.rspCode == 0){
				reminder(data.rspMsg);
				}
				$("#wdl_btn1").css({
					"background":"#ddd"
				})
				var sec=60;
				var str="";
				var timer=setInterval(function(){
					sec--;
					str=sec+"s后再次发送";
					$("#wdl_btn1").val(str);
					$("#wdl_btn1").attr({"disabled":"disabled"})
					if(sec<=0){
					clearInterval(timer);
					$("#wdl_btn1").val("发送验证码");
					$("#wdl_btn1").css({
					"background":"#099"
					})
					$("#wdl_btn1").attr({"disabled":false})
					}
				},1000)
				
				
            },
            error:function(){

            }
        })
    })
    // 点击取消关闭模态框
    $("#wdl_cancel").on("click",function(){
        $(".wechat_modal_div").css({
            "display":"none"
        })
    })

    // 点击确定的时候调用ajax
    $("#wdl_send").on("click",function(){
        tel_test();
        //这里获取表单里面的数据
        if($(".wdl_err").text() == ""){
        var nickname=$("#wdl_nick").val();
        var mobile=$("#wdl_tel").val();
        var password=$("#wdl_pass").val();
        var code=$("#wdl_code").val();
           $.ajax({
            "type":"post",
            "url":$('#p_s_f_website_url').val()+"/pc/reg/updates",
            "data":{"nickname":nickname,"mobile":mobile,"password":password,"code":code},
            success:function(data){
				if(data.data.success == true){
				if(data.rspCode == 0){
					reminder(data.rspMsg);
				}
				}
				if(data.rspCode == 10002){
					reminder(data.rspMsg);
				}
				if(data.data.errorCode == 10031){
					reminder(data.data.errorMsg);
				}
				window.location.reload();
            },
            error:function(){

            }
        }) 
        }else {
        }
        
         
    })

    // 手机号码的正则表达式验证
    function tel_test(){
      var pat=/^1[0-9]{10}$/;
    var tel=$("#wdl_tel").val();
    if(pat.test(tel)){
        $("#wdl_tel").next().text("");
    }else{
        $("#wdl_tel").next().text("请输入正确的手机号码");
    }  
    }
	
    $(".wd_cha").on("click",function(){
  	  $(".wechat_modal_div").css({
  		  "display":"none"
  	  })
    })
    

// --------------------------------------------------------------------------------------------------------------------   
    


        function previewImageWe(file)
        {
	  console.log("weixin");
          var MAXWIDTH  = 900; 
          var MAXHEIGHT = 900;
          var div = document.getElementById('wm_div');
          if (file.files && file.files[0])
          {
              div.innerHTML ='<img id=wm_img onclick=$("#previewImg").click()>';
              var img = document.getElementById('wm_img');
              img.onload = function(){
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width  =  rect.width;
                img.height =  rect.height;
              }
              var reader = new FileReader();
              reader.onload = function(evt){img.src = evt.target.result;}
              reader.readAsDataURL(file.files[0]);
          }
          else //兼容IE
          {
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=wm_img>';
            var img = document.getElementById('wm_img');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
            metadata();
            div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
          }
          console.log(555);
          s2UpLoadImg();
          console.log(666);
        } 
  
//上传文件时获取文件名
  function getFileName(id){
  	var x0=$("#"+id).val();
  	var x=$("#"+id).val().lastIndexOf("\\")+1;
  	var x2=x0.substring(x);
  	return x2;
  }

  //获取20170521格式的
  function getTime(){
  	var date=new Date();
  	var y=date.getFullYear();
  	var m=date.getMonth()+1;
  	var d=date.getDate();
  	if(m<10){
  		m="0"+m;
  	}
  	if(d<10){
  		d="0"+d;
  	}
  	var time=y+""+m+d;
  	return time;
  }
  // 生成uuid防止重名

  	function uuidfn() {
  	    var s = [];
  	    var hexDigits = "0123456789abcdef";
  	    for (var i = 0; i < 36; i++) {
  	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  	    }
  	    s[14] = "4"; 
  	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
  	    s[8] = s[13] = s[18] = s[23] ;	 
  	    var uuid = s.join("");
  	    return uuid;
  	}



  // 获取用户id
  	var userId=$(".userId").text();
  // 上传OSS图片
  const getChars = (str)=> {
   const matches = str.match(/([\u4e00-\u9fa5\w]*)/ig);
   var a = '';
   matches.forEach(item=> item && (a += item));
   return a;
  };
   var progress = function (p) {
    return function (done) {
   
      var bar = document.getElementById('progress-bar');
      bar.style.width = Math.floor(p * 100) + '%';
      bar.innerHTML = Math.floor(p * 100) + '%';
      done();
    }
  };
  	function OSSuploadWe(e){
  		console.log(444);
        	var file=$("#previewImg")[0].files[0];  //踩过的坑来了 ，这里的$("#previewImg")[0]需要有[0];
  		var time=getTime();
  		var uuid1=uuidfn();
  		var index = getFileName("previewImg") .lastIndexOf("\.");  
  		var  type= getFileName("previewImg").substring(index + 1, getFileName("previewImg") .length);
  		var  url2=getChars(getFileName("previewImg"))
        	var url1='user/'+userId+'/'+time+'/order/'+uuid1+url2;
        	url1=url1+"."+type;
        	var storeAs = url1;
  	       $("#div3").text(url1);
//  	       console.log(file.name + ' => ' + storeAs);
  	      client.multipartUpload(storeAs, file, {
    }).then(function (result) {
  	        var s2_imgUrl="http://photo.ssyer.com/"+url1;
	        $.ajax({
	        	"type":"post",
	        	"url":$('#p_s_f_website_url').val()+"/pc/userinfo/update_WechatandPayByuserId",
	        	"data":{"wechatCollection":s2_imgUrl},
	        	success:function(data){
	        		if(data.data.success == true){  
	        			reminder("微信收款码上传成功");
	        			setTimeout(function(){
	        				window.location.reload();
	        			},1500)
	        			
	        		}
	        	},
	        	error:function(){
	        	}
	        })
  	        
  	        
  	        
  	      }).catch(function (err) {
  	      }); 
  	    return url1;
  	}


  	$("#download").on("click",function(){
  			url3="";//这里的值根据点击时候来获取对应图片的src作为参数传给url;这里获取到的url可能有路径的前缀后缀问题，可能需要进行字符串的截取拼接
  			OSSdownload(url3);
  	})
  	
  	// OSS下载图片
  	function OSSdownload(url){
  		console.log(323223);
        var x=url.lastIndexOf("/")+1;
        var url1=url.substring(x);
        //console.log(url1);
        var objectKey = url; //后期传值
        var saveAs = url1;
        var result = client.signatureUrl(objectKey, {
          expires: 3600,
          response: {
            'content-disposition': 'attachment; filename="' + saveAs + '"'
          }
        });
        window.location = result;
  	}

  function s2UpLoadImg(e){
	  if($(this).attr("dat")!=1){
		  console.log(9999);
	  	OSSuploadWe(e);
	  	}
	  	$(this).attr({"dat":"1"});
	  }

  
  
// ------------------------------------------------------------------------------------------------------------------------
 
  
//支付宝收款码的上传
//  $(".s2_alipay_div").on("click",function(){
//	$("#previewImg1").click();
//  })

   //图片上传预览    IE是用了滤镜。  preview(相机外面的div)  换成 wm_div   previewImg不换       wm_img(原来的相机图标) 换imghead
          function previewImageAli(file){
            var MAXWIDTH  = 900; 
            var MAXHEIGHT = 900;
            var div = document.getElementById('am_div');
            if (file.files && file.files[0])
            {
                div.innerHTML ='<img id=am_img onclick=$("#previewImg1").click()>';
                var img = document.getElementById('am_img');
                img.onload = function(){
                  var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                  img.width  =  rect.width;
                  img.height =  rect.height;
                }
                var reader = new FileReader();
                reader.onload = function(evt){img.src = evt.target.result;}
                reader.readAsDataURL(file.files[0]);
            }
            else //兼容IE
            {
              var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
              file.select();
              var src = document.selection.createRange().text;
              div.innerHTML = '<img id=am_img>';
              var img = document.getElementById('am_img');
              img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
              var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
              status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
              metadata();
              div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
            }
            s2UpLoadImg_ali();
          }
       
    
  //上传文件时获取文件名
    function getFileName(id){
    	var x0=$("#"+id).val();
    	var x=$("#"+id).val().lastIndexOf("\\")+1;
    	var x2=x0.substring(x);
    	return x2;
    }

    //获取20170521格式的
    function getTime(){
    	var date=new Date();
    	var y=date.getFullYear();
    	var m=date.getMonth()+1;
    	var d=date.getDate();
    	if(m<10){
    		m="0"+m;
    	}
    	if(d<10){
    		d="0"+d;
    	}
    	var time=y+""+m+d;
    	return time;
    }
    // 生成uuid防止重名

    	function uuidfn() {
    	    var s = [];
    	    var hexDigits = "0123456789abcdef";
    	    for (var i = 0; i < 36; i++) {
    	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    	    }
    	    s[14] = "4"; 
    	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
    	    s[8] = s[13] = s[18] = s[23] ;	 
    	    var uuid = s.join("");
    	    return uuid;
    	}

     var progress = function (p) {
      return function (done) {
     
        var bar = document.getElementById('progress-bar');
        bar.style.width = Math.floor(p * 100) + '%';
        bar.innerHTML = Math.floor(p * 100) + '%';
        done();
      }
    };
    	function OSSupload_ali(e){
          	var file=$("#previewImg1")[0].files[0];  //踩过的坑来了 ，这里的$("#previewImg")[0]需要有[0];
    		var time=getTime();
    		var uuid1=uuidfn();
    		var index = getFileName("previewImg1") .lastIndexOf("\.");  
    		var  type= getFileName("previewImg1").substring(index + 1, getFileName("previewImg1") .length);
    		var  url2=getChars(getFileName("previewImg1"))
          	var url1='user/'+userId+'/'+time+'/order/'+uuid1+url2;
          	url1=url1+"."+type;
          	var storeAs = url1;
    	       $("#div3").text(url1);
    	       console.log(file.name + ' => ' + storeAs);
    	      client.multipartUpload(storeAs, file, {
      }).then(function (result) {
    	  		console.log(result);
      	    console.log(555555);
    	        console.log(result.url);
    	        console.log(result.name);

    	        var s2_imgUrl="http://photo.ssyer.com/"+result.name;
    	        console.log(s2_imgUrl);
    	        $.ajax({
    	        	"type":"post",
    	        	"url":$('#p_s_f_website_url').val()+"/pc/userinfo/update_WechatandPayByuserId",
    	        	"data":{"payCollection":s2_imgUrl},
    	        	success:function(data){
    	        		if(data.data.success == true){
//    	        			console.log("支付宝收款码上传成功");
    	        			reminder("支付宝收款码上传成功");
    	        			setTimeout(function(){
    	        				window.location.reload();
    	        			},1500)
    	        			
    	        			
    	        		}
    	        	},
    	        	error:function(){
    	        	}
    	        })
    	        
    	      }).catch(function (err) {

    	      }); 
    	    return url1;
    	}

;
    function s2UpLoadImg_ali(e){
  	  if($(this).attr("dat")!=1){
  	  OSSupload_ali(e);
  	  	}
  	  	$(this).attr({"dat":"1"});
  	  }
		
	$(".mC_a").on("click",function(){
		$(".user_operations").css({
			"display":"block"
		})
	})
	
	
$("#wm_img").on("click",function(){
	$(".codeModal").css({
		"display":"block"
	})
	$("#s3_uC_slide").attr({"isshow":"2"});
})

$("#s5_uC_upfile").on("click",function(){
	$("#s5_uC_upfile_hide").click();
	uploadCodeDefine5()
})
function uploadCodeDefine5(){
	var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: 'photourl/nopic_user.jpg'
    }
	 var cropper = $('#s5_uC_modal_head').cropbox(options);
	var fileName;
	var fileExtension;
    $('#s5_uC_upfile_hide').on('change', function(){
    	fileName=this.files[0].name; //获取到上传文件的文件名
    	fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = $('#s5_uC_modal_head').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
    })
    $("#s5_uC_modal_com").on("click", function(){
        var img = cropper.getDataURL(); //img即为截图后的base64 编码
        var s2_beginNum=img.indexOf(";base64,");
        img=img.substring(s2_beginNum+8);
        	$.ajax({
        		"type":"post",
        		"url":$('#p_s_f_website_url').val()+"/pc/userinfo/update_WechatandOrPay",
        		"data":{"wechatCollection":img,"wechatOrpayName":fileExtension},       		
        		success:function(data){
        			reminder("微信收款码修改成功");
        			setTimeout(function(){
        				window.location.reload();
        			},2000)
        			
        		}
        	})
    })
    $("#s5_uC_slide").on("change",function(){
    	cropper.zoomIn();
    })
	
	
}



	$("#am_img").on("click",function(){
		$(".s6_codeModal").css({
			"display":"block"
		})
		$("#s3_uC_slide").attr({"isshow":"3"});
	})

	$("#s6_uC_upfile").on("click",function(){
		$("#s6_uC_upfile_hide").click();
		console.log(66666666666);
		uploadCodeDefine6()
	})
	function uploadCodeDefine6(){
	var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: 'photourl/nopic_user.jpg'
    }
	 var cropper = $('#s6_uC_modal_head').cropbox(options);
	 var fileName;
	 var fileExtension;
    $('#s6_uC_upfile_hide').on('change', function(){
    	fileName=this.files[0].name; //获取到上传文件的文件名
    	fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        var reader = new FileReader();
        reader.onload = function(e) {
            options.imgSrc = e.target.result;
            cropper = $('#s6_uC_modal_head').cropbox(options);
        }
        reader.readAsDataURL(this.files[0]);
    })
    $("#s6_uC_modal_com").on("click", function(){
        var img = cropper.getDataURL(); //img即为截图后的base64 编码
        	console.log(img);
        	var s2_beginNum=img.indexOf(";base64,");
            img=img.substring(s2_beginNum+8);
        	$.ajax({
        		"type":"post",
        		"url":$('#p_s_f_website_url').val()+"/pc/userinfo/update_WechatandOrPay",
        		"data":{"payCollection":img,"payName":fileExtension},       		
        		success:function(data){
        			reminder("支付宝收款码修改成功");
        			setTimeout(function(){
        				window.location.reload();	
        			},2000)
        			
        		}
        	})
        
    })
    $("#s6_uC_slide").on("change",function(){
    	cropper.zoomIn();
    })		
}

//
////叉号按钮关闭首页上传二维码页面
//	$(".red_cha_img1").on("click",function(){
//		$(".s2_rednew_back").css({
//			"display":"none"
//		})
//	})
////	页面空白阴影关闭首页上传二维码页面
//	$(".s2_rednew_back").on("click",function(){
//		$(".s2_rednew_back").css({
//			"display":"none"
//		})
//	})
////	上传二维码页面的阻止冒泡
//	$(".rednew").on("click",function(e){
//	e=event||window.event;
//	e.stopPropagation();
//	})

	//点击关闭首页上传收款码的提示框
$(".code_tips_details span").on("click",function(){
	$(".code_tips").css({
		"display":"none"
	})
})
	//判断用户是否是首次登陆,只有在登陆后的首次会出现提示
$(function(){
	var isUserLogin=$("#isLogin").val();
	if(isUserLogin){
		var isCodeTipsShow=getCookieValue("code_tips");
		if(!isCodeTipsShow){
			$(".code_tips").css({
				"display":"block"
			});
			addCookie("code_tips","1",2,"/");
		}else{
			$(".code_tips").css({
				"display":"none"
			});
		}	
	}
	
	//用户注册时显示隐藏用户注册协议
	$(".close_agreement").on("click",function(){
		$(".agreement_details_modal").css({
			"display":"none"
		})
	})
	$("#agree_bieyang_a").on("click",function(){
		$(".agreement_details_modal").css({
			"display":"block"
		})
	})
	
})
	

$(function(){
	//发布按钮1效果
    $(".release_1").on("click",function(){   	
    	if($("#isSign").val() == 0){
    		$(".login").triggerHandler("click");
    		return false;
    	}else if($("#isSign").val() == 1){   	
    	var imgComment = $(".textarea");
  	    var content=imgComment.val();
  	  if(content.length > 120 || content.length < 1){
	    	return false;
	    }else{
	  	    var orderId=$(".ibad_top_like1").attr("data-code");
	  	    var orderUserId=$(".userId").text()
	    	$.ajax({
	    		type: "post",
	            url: $('#p_s_f_website_url').val()+"/pc/guestbook/guestbook",            
	            data: {
	            	"content":content,
	            	"orderId":orderId,
	            	"orderUserId":orderUserId    	
	            },
	            success: function (data) {
	//                console.log(data);
	                if(data.data.success == true){
	                	if(data.rspCode == 0){
	//                		reminder(data.rspMsg);
	                		$(".susu").css("display","block").stop().animate({
	                			opacity:"0",
	                			filter:"alpha(opacity=0)"
	                		},1000);
	                		setTimeout(function(){
	                			location.reload();
	                		},1000);
	                		var opaSusu = $(".susu").css("opacity");
	                		if(opaSusu == "0"){
	                			$(".susu").css("display","none");
	                		}
	                	}
	                }
	                $(".textarea").val("");
	                //$("#largePic").click();	             
	                var fg_authorNick1=$(".itp_zz").html();
	                publishMessage1(fg_authorNick1);
	                $(".ul").html("");
	                $.ajax({
                        type:"post",
                        url:$('#p_s_f_website_url').val()+"/pc/guestbook/list",
                        data:{"orderId":orderId,"start":0,"limit":10},
                        success:function(data){
                            var data=data.data.datas;
                            var str_2="";
                            var gmtCreate = data.gmtCreate;
                            scrollFlag=false;
                            if(data.length<1){
                                $(".noMore").css("display","block").stop().animate({
                                    opacity:"0.6",
                                    filter:"alpha(opacity=60)"
                                },800);
                                setTimeout(function(){
                                    $(".noMore").stop().animate({
                                        opacity:"0",
                                        filter:"alpha(opacity=0)"
                                    },800);
                                    var opaNomore = $(".noMore").css("opacity");
                                    if(opaNomore == 0){
                                        $(".noMore").css("display","none");
                                    }
                                },1000);
                                
                            }else{
                                for(var i = 0; i < data.length; i++){
                                    if(data[i].gmtCreate == null){
                                        //console.log(null);
                                    }
                                    var readTime = new Date(data[i].gmtCreate);
                                    var rTm = readTime.getMonth()+1;
                                    var face = data[i].face;
                                    if(face == null){
                                        face=photourl+"/nopic_user.jpg";
                                    }
                                    str_2 += '<li class="li1"><div class="div1"><div class="headImg" style="background:url('+face+') no-repeat center center;background-size:100% 100%"></div><div class="headName"><h5 class="commentator">'+data[i].nickname+'</h5><p class="readingtime"><span class="rTy">'+readTime.getFullYear()+'</span>年<span class="rTm">'+rTm+'</span>月<span class="rTd">'+readTime.getDate()+'</span>日</p></div></div><div class="div2"><p class="comment">'+data[i].content+'</p></div></li>';
                                }
                                $(".ul").append(str_2);
                                $(".loading").css("display","block");
                                setTimeout(function(){
                                    $(".loading").css("display","none");
                                },1000);
                            }
                            
                        },
                        error:function(){
                            console.log(2222);
                        }
                    
                });
	                //window.open($('#p_s_f_website_url').val()+"/pc/order/ud?ud=ssyer/figureTalk&orderId="+orderId)
	            }
	        });
	    }
        return false;
    	}
    });
    //按钮2 发布
    $("#release2").live("click",function(){
    	if($("#isSign").val()==0){
    		$(".s2_back").css({
    			"display":"block"
    		})
    	}else if($("#isSign").val()==1){
    	var imgComment = $(".bottom_discuss");
  	    var content=imgComment.val();
  	  var orderId=$(".ibad_top_like1").attr("data-code");
  	    if(content.length > 120 || content.length < 1){
	    	return false;
	    }else{
	    	var locaUrl=window.location.href;
	  	    var orderUserId=$(".userId").text();
	    	$.ajax({
	    		type: "post",
	            url: $('#p_s_f_website_url').val()+"/pc/guestbook/guestbook",            
	            data: {
	            	"content":content,
	            	"orderId":orderId,
	            	"orderUserId":orderUserId    	
	            },
	            success: function (data) {
	                if(data.data.success == true){
	                	 location.reload();

	                }
	                
	                var fg_authorNick1=$(".itp_zz").html();
	                console.log(fg_authorNick1);
	                publishMessage1(fg_authorNick1);
	                
	                
	                
	            },
	            error:function(){
	            	console.log(2222);
	            }
	        });
	    }
        return false;
    	}
    });
})

$(function(){
	
	$.ajax({
		"type":"post",
		"url":$('#p_s_f_website_url').val()+"/pc/message/myMessage",
		"data":{"start":0,"limit":5,"reading":1},
		success:function(data){
			$(".tip_div_all").html("");
			var data=data.data.datas;
			var timer=Date.parse(new Date());
			if(!data){
//				reminder("图片已经被删除");
				return false;
			}
			var datalen=data.length;
			if(datalen>=1){
				$(".prompt_span_tips").css({
					"display":"inline-block"
				})
			}			
		}
	})	
	
	
})

//活动详情点击事件
$(".active_list").live("click",function(){
	var id=$(this).attr("active-id");
	window.open($('#p_s_f_website_url').val()+"/pc/activity/activity_DIY/"+id,'_blank')
})

$(window).resize(function() {
	var actwid=parseInt($("#grid li").css("width"))-22;
	$(".active_bg").css("height",actwid*0.68+"px");

});

