﻿﻿photourl=$("#pichost").val();
//整理过的

//点击放大图片的空白处回到首页的时候,清空放大页面里面的数据
$("#img_big_under_div").on("click",function(){
    turnSmall();
})
//图片从大到小时候的函数
function turnSmall(){
	if($("#whoisindex").val()=="new")
		{
		history.replaceState(null,'',"/pc/order/news");
		}
	else{history.replaceState(null,'',"/");}
     
	$(".greetings").css({
        "display":"none"
    });
    $("#release").css("display","none");
    $("#add_add").css("display","none");
    $(".discuss").css("display","none"); 
    $(".headUl").html("");
    $(".bottom_discuss").val("");
    $("#input").css({
        "display":"none"
    })
    $(".fontColor").css({
        "display":"none"
    })
    $(".textarea").css({
        "display":"none"
    })
    $(".authorCode").hide();
    $("#img_big_under_div").css({
        "background":"transparent"
    })
    $("#img_big_above_div").animate({
        "top":"300%"
    },500)
    $(".tIme").animate({
        "top":"300%"
    },500,function(){
        $(this).css({
            "display":"none"
        })
    })
    $(".downchange").animate({"bottom":"-50%","opacity":"0","filter":"alpha(opacity=0)","display":"none"},1000);
    $("#img_big_under_div").css({"display":"none"});
    $("#under_data_statistics").css({"display":"none"});    
    $("#footer").css("display","none");
    $(".scroll_bg").css({"overflow-y":"auto","position":"fixed","bottom":0});
    $(".ul").html("");
    $(".unapprove img").attr("src","http://photo.ssyer.com/lib/unapprove.png");
    $(".unapprove").unbind();
    $(".scroll_bg").scrollTop(0);
    $("#footer").unbind("scroll");
    $(".scroll_bg").unbind("scroll");
    $(".discuss").hide();
    setTimeout(function(){
        $("body").css({"overflow":"auto"});
        $("#largePic").css("background-image","") //清除图片的背景图片,防止下次打开放大页面的时候,出现上一次页面的缓存
        $("#img_big_above_div").css({"top":"0px","bottom":"0px"});
        $(".textarea").val("");        
    },200)   
    document.title="别样网-无版权免费大尺寸图片共享平台";
}

// 点击瀑布流放大图片js
// 点击图片上面的阴影层出现放大的整张图片
var ip=returnCitySN["cip"]; 
$(".s2_mask").live("click",function(){
    $(this).prev().find("img").click();
    var This=this;
    var orderId=$(this).find(".mask_b_div1_span4").attr("data-code");
    if($(this).attr("picid")!=undefined){
        orderId=$(this).attr("picid");
    }
    localStorage.setItem("orderId",orderId);
    $(".ibad_top_download").attr("data-id",orderId);
    $("#downloadCount").html($(this).attr("data-downloadCount"));
   
})


$(".img_container_div a img,.my_collect_all>img,.my_collect_div img").live("click",function(e){
	var pageTitle=$(this).parent().parent().parent().attr("headline");
		if(pageTitle == undefined || pageTitle == null || pageTitle == "null" ||pageTitle==""){
			pageTitle="别样网-无版权免费大尺寸图片共享平台";
		}else{
			pageTitle="别样网	|	"+pageTitle;	
		}
		
//	console.log(pageTitle);
	document.title=pageTitle;
    var This=this;
    var orderId=$(this).parent().next().find(".mask_b_div1_span3").attr("data-id");
        $.ajax({
        	"type":"get",
        	"url":$('#p_s_f_website_url').val()+"/"+orderId
        })
        var newUrl = "/pc/order/"+orderId;
        window.location.hash=orderId;
        history.replaceState(null,'',newUrl);
        $(".tousupicId").text(orderId);
    
    
    
    var s1_url=$(this).attr("src"); //获取到外面瀑布流中小图的url 
//  console.log(src)
    var s3_x=s1_url.indexOf("?");
    var s4_url2=s1_url.substr(0,s3_x);
    var xtop=$("body").scrollTop();
    var src=$(this).attr("src"); //获取到点击图片的链接地址，此时获取到的是oss 加参 以后的链接   
    $("#bg_w img").attr("src",src);
    var pwid=parseInt($("#bg_w img").css("width"));
    var phei=parseInt($("#bg_w img").css("height"));    
    var widthScale=parseInt($(window).width())/pwid;//浏览器窗口与图片宽度的比例
    var nowHeight=widthScale*phei;  //图片按照浏览器的比例 
    if(nowHeight>parseInt($(window).height())){
        $("#largePic").css("height",nowHeight)
    }else{
        $("#largePic").css("height",parseInt($(window).height())+"px")
    }
 
  
    $("#largePic").css({
         "background-image":"url("+src+")",
         "background-position":"50% center",
         "background-size":"cover"
         });
   
    var jienum=src.indexOf("?");
    var src=src.substring(0,jienum); //此时获取到的是没有参数的链接  
    $("#largePic").attr("data_src",src);
    if($(this).parent().hasClass("my_collect_div")){
        src=$(this).attr("src"); 
    }
    var img1=new Image();
    img1.src =src; 
  
    var imgSize=$(this).attr("data-size");
    img1.onload = function() {
        var img1W=img1.width;
        var img1H=img1.height;
        var imgSize=$(This).attr("data-size");
        var pixel=img1W+","+img1H;
        if(imgSize){            
        }else{
            $.ajax({
                "type":"post",
                "url":$('#p_s_f_website_url').val()+"/pc/order/updatePixelByOrderId",
                "data":{"orderId":orderId,"pixel":pixel},
                success:function(data){
                }
            })  
        }       
        $("#largePic").attr("data-width",img1.width);
        $("#largePic").attr("data-height",img1.height);
        var xiangsu=img1.width+"·"+img1.height; //获取图片的原始像素值
        $(".uds_size_p").html(xiangsu);//将像素值赋值给底部的数据栏
        var widthScale=parseInt($(window).width())/img1.width;//浏览器窗口与图片宽度的比例
        var nowHeight=widthScale*img1.height;  //图片按照浏览器的比例 
        var src2=$("#largePic").attr("data_src");
        //console.log(src2,src);
        if (src2==src){
        	$("#largePic").css({
                "background-image":"url("+src+")",
                "background-position":"50% center",
                "background-size":"cover"
                });
        }
         
    }
    
    //每次出现放大图片的时候，让其位于顶部，不至于出现下面的图片信息
    $("#img_big_above_div").css({
        "top":"0px"
    })
    $("#img_big_under_div").css({
        "background":"white"
    })
        
    var auId=$(this).parent().next().find(".mask_b_div1_span1").attr("au-id"); // 表示当前图片的作者ID
    
    
    $(".ibad_top_headImg").attr({"au-id":auId});  //大图里面的头像中加入图片作者的id
    var x=find(src,'/',2);
    var src6=src.substring(x+1);
    $(".ibad_top_download").attr({"data-src":src6});
    var fid= $(this).parent().next().find(".mask_b_div1_span4").attr("data-code"); //表示当前图片的id 
    $(".ibad_top_download").attr({"data-id":fid});
    $(".ibad_top_like").attr({"data-code":fid});
    var s2_params="phone="+fid;
   if($("body").hasClass("index_page")){
       window.location.hash=s2_params;
   }                  
    
    $("#big_img").on("click",function(){
        window.location.hash="";
    })
    
    var gid=$(this).attr("data-code");
    var countnum= $(this).parent().next().find(".mask_b_div1_span5").text();
    $("#like_count").html(countnum);
    var s2_like=$(this).attr("data-like");
    if($(this).attr("data-download")!=""){
    $("#downloadCount").html($(this).attr("data-downloadcount"))
    }
    var s2_view=$(this).attr("data-view");
    if($(this).parent().hasClass("my_collect_div")){
        $("#like_count").html(s2_like);
        $("#downloadCount").html($(this).attr("data-download"))
    }           

    //获取到此图片的详情信息,表示这是首页的瀑布流
    if($(".home-box").hasClass("index_page")){
    //ajax开始    
        $.ajax({
            "type":"post",
            "url":$('#p_s_f_website_url').val()+"/pc/order/details",
            "data":{"orderId":fid},
            success:function(data){
                if(data.data.data.approve=="check_y"){
                    $(".unapprove img").attr("src","http://photo.ssyer.com/lib/approve.png");
                    $(".unapprove").unbind();
                }
                else if(data.data.data.approve=="check_in"){
                    $(".unapprove img").attr("src","http://photo.ssyer.com/lib/unapprove.png")
                    
                    $(".unapprove").on("click",function(){
                        reminder("正在审核中，请关注审核结果");
                        return false;
                    })
                }
                else if(data.data.data.approve=="check_n"){
                        $(".unapprove img").attr("src","http://photo.ssyer.com/lib/unapprove.png")
                        
                        $(".unapprove").on("click",function(){
                            reminder("审核不通过，请推荐高质量图片");
                        })
                }
                else if(data.data.data.approve==""||data.data.data.approve==null){
                    $(".unapprove").on("click",function(){
                        $(".unapprove img").attr("src","http://photo.ssyer.com/lib/unapprove.png")
                        var userId=$(".ibad_top_download").attr("data-id");
                        $.ajax({
                            type:"post",
                            url:$('#p_s_f_website_url').val()+"/pc/order/approveConfirm",
                            data:{"orderId":userId},
                            success:function(res){
                                console.log(res.data.errorMsg);
                                if(res.data.errorMsg==""||res.data.errorMsg==null){
                                    reminder("正在提交审核，请稍等")
                                }
                                else{reminder(res.data.errorMsg);}
                            }
                        })
                        return false;
                    })
                }
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
                if(!downloadCount){
                    downloadCount=0; //如果下载量不存在的话,赋为0;
                }
                $("#like_count").html(data.collectCount); //顶部爱心后面获取到点赞的人数
                $(".uds_like_p").html(data.collectCount); //底部获取到点赞的人数
                $(".uds_view_p").html(data.viewCount); //获取此图片的浏览量
                $(".uds_download_p").html(downloadCount); //获取此图片的下载量
                var headline=data.headline;
                if(!headline){
                    headline="用户未上传"
                }
                $(".s2_picMata_head").html(headline);
                var picMata=data.picMata;
                if(!picMata){
                    picMata="用户未上传";
                }
                $(".s2_picMata_det").text(picMata);
                $(".ibad_top_like1").addClass("ibad_top_like");
                $(".ibad_top_like").attr({"data-code":data.id});
                if(data.isCollect == true){
                    $(".like_icon_span").css({
                        "background":"url(http://photo.ssyer.com/lib/like.png) no-repeat",
                        "background-size":"100% 100%"
                    })
                    $(".ibad_top_like1").removeClass("ibad_top_like");
                }else {
                    $(".like_icon_span").css({
                        "background":"url(http://photo.ssyer.com/lib/unlike.png) no-repeat",
                        "background-size":"100% 100%"
                    })
                }
            },
            error:function(){         
            }
        })
    }      
    var head_src=$(this).parent().next().find("img").attr("src");
    var zz=$(this).parent().next().find(".mask_b_div1_span2").html();

    $("#img_big_under_div").css({
        "display":"block",
    })
    $(".uds_view_p").html(s2_view);
    $(".uds_like_p").html(s2_like);
//    在这里追加放大图片后的图片信息
        $("#ibad_top_headImg_img").attr({"src":head_src});
        $(".author_img img").attr({"src":head_src});
        $(".itp_zz").html(zz);
        $(".author_name span:last-child").html(zz);
    if($("#img_big_under_div").css("display") == "block"){
        toBig();
        $("body").css({
            "overflow":"hidden"
        })
    } 
//滚动事件书写
    $("#footer").scrollTop(0);
    $(".scroll_bg").scrollTop(0);
    var wwidth=$(window).width();
    var wheight=$(window).height();

    $.ajax({
        type:"post",
        url:$('#p_s_f_website_url').val()+"/pc/order/details_text",
        data:{"orderId":orderId},
        success:function(res){
        	var obj=res.data;
        	var aliPay = obj.BieyangOrder.payCollection; //支付宝的收款码链接
            var wxPay = obj.BieyangOrder.wechatCollection;	//微信的收款码链接
            if(aliPay == null||aliPay == "" && wxPay == null ||wxPay==""){	//没有收款码的话则隐藏竖线和打赏的按钮
            	$(".segmentation").css("display","none");
            	$(".exceptional").css("display","none");
            }else if(aliPay != null || wxPay != null){	//有收款码的话则展示竖线和打赏的按钮
            	$(".segmentation").css("display","inline-block");
            	$(".exceptional").css("display","inline-block");
            }
            var headStr = " ";
    		var headImgNums = obj.BieyangGuestbookAndUserInfo.totalCount;
    		if(headImgNums > 10){
    			var headImgNum = headImgNums-10;
    			$(".badge").css("display","block").find(".otherNum").text(headImgNum);
    		}
    		headImgNums=(headImgNums>10)?10:headImgNums;
    		if(obj.BieyangGuestbookAndUserInfo.datas){
	    		 for(var i = 0; i <headImgNums;i++){
	    			var face = obj.BieyangGuestbookAndUserInfo.datas[i].face;
	    			if(face == null|| face == ""){
	    				face="http://photo.ssyer.com/lib/nopic_user.jpg";
	    			}
	    			headStr += '<li class="headLi" data-userId="'+obj.BieyangGuestbookAndUserInfo.datas[i].userId+'" style="background:url('+face+') no-repeat center center;background-size:100% 100%"></li>';
		    			$(".headUl>li").eq(i).css({"background":"url("+face+") no-repeat center center","background-size":"100% 100%"});
	    		 }
	    		}else{
	    			
	    		}
    		$(".headUl").html("");
    		$(".headUl").append(headStr);
        	
        	
            var src=res.data.BieyangOrder.pictureUrl;
            $("#largePic").attr("data_src",src);
            var aliPay = res.data.BieyangOrder.payCollection;
            var wxPay = res.data.BieyangOrder.wechatCollection;
            var content = res.data.BieyangGuestbookAndUserInfo.datas;
            //console.log(res.data);
            var img1=new Image();
            img1.src =src+"?x-oss-process=image/resize,w_360";
            
            var img1=new Image();
            img1.src =src; 

            img1.onload = function() {
            	 var img1W=img1.width;
                 var img1H=img1.height;
            
            var sheight=img1H/img1W*wwidth;
            var y=Math.abs(sheight-wheight);
            var z=-sheight+80;
            var aa=-y-60;             
            var bb=sheight-wheight;
            //console.log(bb,sheight,wheight);
            var picid3=$(".ibad_top_download").attr("data-id");
            if(picid3==orderId){
            
          if(content!=null){
          $.ajax({
              type:"post",
              url:$('#p_s_f_website_url').val()+"/pc/guestbook/list",
              data:{"orderId":orderId,"start":0,"limit":10},
              success:function(data){
                  //console.log(data);
            	  function getViewPortHeight() {
	    		        return document.documentElement.clientHeight || document.body.clientHeight;
	    		    }
	    		    var x=getViewPortHeight();
                   var commheight=data.data.totalCount*150;
                   var x=getViewPortHeight();
                   var data=data.data.datas;
                   var str_1="";
                   for(var i = 0; i < data.length; i++){
                       
                       var readTime = new Date(data[i].gmtCreate);
                       var face = data[i].face;
                       var rTm = readTime.getMonth()+1;
                       if(face == null|| face == ""){
                           face=photourl+"/nopic_user.jpg";
                       }
                       str_1 += '<li class="li1"><div class="div1"><div class="headImg" style="background:url('+face+') no-repeat center center;background-size:100% 100%"></div><div class="headName"><h5 class="commentator">'+data[i].nickname+'</h5><p class="readingtime"><span class="rTy">'+readTime.getFullYear()+'</span>年<span class="rTm">'+rTm+'</span>月<span class="rTd">'+readTime.getDate()+'</span>日</p></div></div><div class="div2"><p class="comment">'+data[i].content+'</p></div></li>';

                   }
                   $(".ul").append(str_1);
                   
                   var picid2=data[0].orderId;
                   
                   if(picid2==orderId){
                   
                   if(commheight>x*0.8){
                   $(".scroll_bg").css("padding-bottom",commheight+100);
                   $("#under_data_statistics").css({"display":"block","bottom":0.9*x-60+"px"});
                   var numi=0;  
                                  
                $(".scroll_bg").unbind("scroll");
                   $(".scroll_bg").on("scroll",function(){
                          var y=parseInt($(".scroll_bg").scrollTop());
                          var z=parseInt($("#largePic").css("height"));
                          //console.log($(".scroll_bg").scrollTop());
                          
                          var d=Math.round(0.1015*x);
                          
                           if(z-y<=d){
                        	   //console.log(z,y,d);
                                  $(".scroll_bg").css({"overflow-y":"hidden","position":"absolute","padding-bottom":0,"bottom":0.9*x});
                           }
                           
                           else if(y>bb){
		    		        	 $(".discuss").show();
		    		        	 $(".headImgs").hide();
		    		        	 $(".down").hide();
		    		        	 $(".ft_ts_icon").hide();
		    		        	 $(".ft_cutoff").hide();
		    		        	 $(".ft_picmata_icon").hide();
		    		         }
		    		         else if(y<bb){ 
		    		        	 $(".discuss").hide();
		    		        	 $(".headImgs").show();
		    		        	 $(".down").show();
		    		        	 $(".ft_ts_icon").show();
		    		        	 $(".ft_cutoff").show();
		    		        	 $(".ft_picmata_icon").show();
		    		         }
                         //回到顶部按钮Top	
   	    		     	$(".toTop").on("click",function(){
   	    		     		$(".scroll_bg").css({"overflow-y":"auto","padding-bottom":"90vh","bottom":"0"});
   	    		     		var timer = setInterval(function(){
   	    		     	      //获取滚动条距离顶部高度
   	    		     	      var osTop = $(".scroll_bg").scrollTop();
   	    		     	      var ispeed = Math.floor(-osTop / 7);
   	    		     	     $(".scroll_bg").scrollTop(osTop+ispeed);	    		     	    
   	    		     	      //到达顶部，清除定时器
   	    		     	      if (osTop == 0) {
   	    		     	        clearInterval(timer);
   	    		     	       $("#footer").scrollTop(0);
   	    		     	      };
   	    		     	      isTop = true; 
   	    		     	    },20);
   	    		     	});
   	    		     //回到顶部效果结束
                      });                  
                   
                  var scrollFlag=false;
                  $("#footer").scrollTop(0);
                  var count=0;
                   $("#footer").on("scroll",function(){
                          //console.log($("#div1").height(),$("#div1").scrollTop(),$(".div2").height())
                       
                          var sctop=Math.ceil($("#footer").scrollTop());
                          var sheight=parseInt($("#footer").css("height"));
                          var theight=parseInt($("#commentant").css("height"));
                          var scorl=sctop+sheight;                         
                           if($("#footer").scrollTop()<=0){
                                  $(".scroll_bg").css({"overflow-y":"auto","position":"fixed","padding-bottom":0.9*x,"bottom":0});
                                 // console.log("到上面了");
                                 // console.log($("#footer").scrollTop());
                           }
                            if(scorl>=theight){
                                if(!scrollFlag){
                                	scrollFlag=true;
                                	 numi+=10;
                                $.ajax({
                                       type:"post",
                                       url:$('#p_s_f_website_url').val()+"/pc/guestbook/list",
                                       data:{"orderId":orderId,"start":numi,"limit":10},
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
                            }
                           }
                            
                      //$("#div1").focus();
                      })  
              
                   $("#under_data_statistics").css("display","block");

                   //console.log($('#commentant').css("top"));
                   
                   //给页面绑定滑轮滚动事件  
                   
                  //判斷高度結束
                   }else{
                	   $(".scroll_bg").css("padding-bottom",commheight+140);
                       $("#under_data_statistics").css({"display":"block","bottom":commheight+80});
                       $(".scroll_bg").unbind("scroll");
                       $(".scroll_bg").on("scroll",function(){
                    	   
                           var y=parseInt($(".scroll_bg").scrollTop());
                           var z=parseInt($("#largePic").css("height"));
                           if(y>bb){
		    		        	 $(".discuss").show();
		    		        	 $(".headImgs").hide();
		    		        	 $(".down").hide();
		    		        	 $(".ft_ts_icon").hide();
		    		        	 $(".ft_cutoff").hide();
		    		        	 $(".ft_picmata_icon").hide();
		    		         }
		    		         else if(y<bb){ 
		    		        	 $(".discuss").hide();
		    		        	 $(".headImgs").show();
		    		        	 $(".down").show();
		    		        	 $(".ft_ts_icon").show();
		    		        	 $(".ft_cutoff").show();
		    		        	 $(".ft_picmata_icon").show();
		    		         }
                         //回到顶部按钮Top	
      	    		     	$(".toTop").on("click",function(){
      	    		     		var timer = setInterval(function(){
      	    		     	      //获取滚动条距离顶部高度
      	    		     	      var osTop = $(".scroll_bg").scrollTop();
      	    		     	      var ispeed = Math.floor(-osTop / 7);
      	    		     	     $(".scroll_bg").scrollTop(osTop+ispeed);	    		     	    
      	    		     	      //到达顶部，清除定时器
      	    		     	      if (osTop == 0) {
      	    		     	        clearInterval(timer);
      	    		     	      };
      	    		     	      isTop = true; 
      	    		     	    },20);
      	    		     	});
      	    		     //回到顶部效果结束
                           //console.log($(".scroll_bg").scrollTop());
                            
                       }); 
                   }
                   
                   }
                  //div 滚动了

               
                   clearTimeout(timer);
                   var timer=setTimeout(function(){
                   //$(".ul").html("");
                   $("#footer").css("display","block");
                  
                 },500)               
               
            }                             
          });
        } else{
            $(".scroll_bg").css("padding-bottom","60px");
            $(".scroll_bg").scrollTop(0);
            $(".scroll_bg").unbind("scroll");
            $("#under_data_statistics").css("position","fixed");
            $("#under_data_statistics").css("bottom","0");  
            $("#under_data_statistics").css("display","block");
               $(".scroll_bg").on("scroll",function(){
                   var y=parseInt($(".scroll_bg").scrollTop());
                   var z=parseInt($("#largePic").css("height"));

               });
        } 
          
            }
          
            } 

      }
    }) 
	 		   
})



//判断浏览器类型
    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; //判断是否IE浏览器
        if (userAgent.indexOf("Trident") > -1) {
            return "Edge";
        } //判断是否Edge浏览器
    }


function SaveAs5(imgURL)
{
    var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
    for(; oPop.document.readyState != "complete"; )
    {
        if (oPop.document.readyState == "complete")break;
    }
    oPop.document.execCommand("SaveAs");
    oPop.close();
}


function oDownLoad(url) {
    myBrowser();
    if (myBrowser()==="IE"||myBrowser()==="Edge"){
        //IE
        odownLoad.href="#";
        var oImg=document.createElement("img");
        oImg.src=url;
        oImg.id="downImg";
        var odown=document.getElementById("down");
        odown.appendChild(oImg);
        SaveAs5(document.getElementById('downImg').src)
    }else{
        //!IE
        odownLoad.href=url;
        odownLoad.download="";
    }
   
    
}

    var odownLoad=document.getElementById("downLoad");
    odownLoad.onclick=function () {
    	
        var y=localStorage.getItem("id");   //表示是第几种情况
        var src=$("#largePic").attr("data_src");    //图片的原始尺寸
        var picId=$(this).attr("picId");
        if (y==0){       	
            var num=src.indexOf(".com/");
            src=src.substr(num+5);
            OSSdownload(src);   //使用阿里云下载原图
            $.ajax({
                "type":"post",
                "url":$('#p_s_f_website_url').val()+"/pc/order/down_order",
                "data":{"orderId":picId},
                success:function(data){                   
                }        
            })   
            return false;
         }
         else if(y==1){
             src=src+"?x-oss-process=image/resize,w_500";            
             oDownLoad(src);
         }
         else if(y==2){
             src=src+"?x-oss-process=image/resize,w_900";
             oDownLoad(src);
         }
         else if(y==3){
             src=src+"?x-oss-process=image/resize,w_1080";
             oDownLoad(src);
         }
         else if(y==4){
             var width=parseInt($(".downchange_top_2 ul li:nth-child(5) input:first-child").val());
             var height=parseInt($(".downchange_top_2 ul li:nth-child(5) input:last-child").val());
             src=src+"?x-oss-process=image/resize,w_"+width;
             oDownLoad(src);
         }
        $.ajax({
            "type":"post",
            "url":$('#p_s_f_website_url').val()+"/pc/order/down_order",
            "data":{"orderId":picId},
            success:function(data){                   
            }        
        })       
    }


//放大图片以后放大图里面的下载实现
$(".ibad_top_download").on("click",function(){
	$(".chang:eq(0)").css({background:"rgba(204, 204, 204, 1)",color:"#ffffff"}).siblings().css({background:"rgba(255, 255, 255, 1)",color:"#666666"});
	localStorage.setItem("id", "0");
    var picId=$(this).attr("data-id");
    $("#downLoad").attr({"picId":picId});
    if($(".home-box").hasClass("index_page")){
    var src=$(this).attr("data-src");
    //获取图片原图大小
    var maxwidth=$("#largePic").attr("data-width");
    var maxheight=$("#largePic").attr("data-height");
    $(".maxwidth").html(maxwidth);
    $(".maxheight").html(maxheight);
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
    $(".downchange").animate({"bottom":"50%","opacity":"1","filter":"alpha(opacity=100)"},1000);
    var orderId=$(this).attr("data-id");
//    $.ajax({
//        "type":"post",
//        "url":$('#p_s_f_website_url').val()+"/pc/order/down_order", //此链接有问题..
//        "data":{"orderId":orderId},
//        success:function(data){  //返回给我一个实际的图片的点赞数量，塞进里面
//                  
//        }       
//    })
    return false;
    }
})
//放大图片以后放大图里面的点赞实现

$(".ibad_top_like1").on("click",function(e){
    if($(this).hasClass("ibad_top_like")){
    if($(".home-box").hasClass("index_page")){
    e=event||window.event;
    e.stopPropagation();
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
    $(".like_icon_span").css({
        "background":"url(http://photo.ssyer.com/lib/like.png) no-repeat",
        "background-size":"100% 100%"
    })
    var cid=$(this).attr("data-code");
//  console.log(cid);
    if($(".home-box").hasClass("index_page")){
    $.ajax({
        "type":"post",
        "url":$('#p_s_f_website_url').val()+"/pc/order/orderLike",
        "data":{"orderId":cid,"ip":ip},
        success:function(data){
          if(data.rspCode == 0){
//            reminder(data.rspMsg);
              $("#like_count").html(data.data);
              $(".uds_like_p").html(data.data);
          }
          $(".ibad_top_like1").removeClass("ibad_top_like");
          $(".like_icon_span").css({
                    "background":"url(http://photo.ssyer.com/lib/like.png) no-repeat",
                    "background-size":"100% 100%"
                })
          return false;
        },
        error:function(){
        }
      })
    }
    return false;
}
    }else {
        return false;
    }
})


//$(".my_collect_div_img").on("click",function(e){
//    var src=$(this).attr("src");
//    e=event||window.event;
//    $("#img_big_under_div").css({
//        "display":"block",
//    })
//    $("#big_img").attr({
//        "src":src
//    })
//    if($("#img_big_under_div").css("display") == "block"){
//        toBig();
//        $("body").css({
//            "position":"fixed"
//        })
//    }
//})

    
    
function toBig(){
    

// 出现打赏二维码
$(".ibad_top_reward").hover(function(){
    $(".paycode_div").css("display","block");
},function(){
    $(".paycode_div").css("display","none");
})

// 出现顶部图标的提示
$(".ibad_top_info").hover(function(){
    $(".title_info").css("display","block");
},function(){
    $(".title_info").css("display","none");
})
$(".ibad_top_reward").hover(function(){
    $(".title_pay").css("display","block");
},function(){
    $(".title_pay").css("display","none");
})
$(".ibad_top_like").hover(function(){
    $(".title_like").css("display","block");
},function(){
    $(".title_like").css("display","none");
})
$(".ibad_top_download").hover(function(){
    $(".title_download").css("display","block");
},function(){
    $(".title_download").css("display","none");
})

}

//头像点击事件
$(".ibad_top_headImg").on("click",function(e){
    var uid=$(".ibad_top_headImg").attr("au-id");
    window.location.href=$('#p_s_f_website_url').val()+"/pc/order/ud?ud=ssyer/cerother&id="+uid;
    return false;
})


$(function(){
    var coll_url=window.location.href;
    var coll_x=coll_url.indexOf("/#");
//  console.log(coll_x);
    var coll_url_params1=coll_url.substr(coll_x+2);
//  console.log(coll_url_params1); //phone=xxxx
    var coll_url_params2=coll_url_params1.substring(6);
    var coll_url_params3=coll_url_params1.substring(0,5)
//  console.log(coll_url_params2); // 参数中的图片id
//  console.log(coll_url_params3); // iphone
    if(coll_url_params3 == "phone"){
//      console.log("是图片收藏");
        $(".red_cha_img").click();
        
        $.ajax({
            "type":"post",
            "url":$('#p_s_f_website_url').val()+"/pc/order/details",
            "data":{orderId:coll_url_params2},
            success:function(data){
                var data=data.data.data;
                var pictureUrl=data.pictureUrl;
                $("#img_big_under_div").css({
                    "display":"block"
                })
                $("#big_img").attr({
                    "src":pictureUrl
                })
            },
            error:function(){
                
            }
        })
        
    }else {

    }
//打赏
    $(".exceptional").click(function(){
        //$(".exceptionalUi").css("display","block");
    	$(".authorCode").show();
		$(".authorCode").animate({"top":"30%"},1000);
        var orderId = localStorage.getItem("orderId");

        $.ajax({
            type:"post",
            url:$('#p_s_f_website_url').val()+"/pc/order/details_text",
            data:{"orderId":orderId},
            success:function(res){   		
                var aliPay = res.data.BieyangOrder.payCollection;
                var wxPay = res.data.BieyangOrder.wechatCollection;
                var authorHead = res.data.BieyangOrder.face;
                var authorNick = res.data.BieyangOrder.nickname;
                $(".alipayCode").css({"background":"url("+aliPay+") no-repeat center center","background-size":"100% 100%"});
                $(".wxpayCode").css({"background":"url("+wxPay+") no-repeat center center","background-size":"100% 100%"});
                $(".authorHead").css({"background":"url("+authorHead+") no-repeat center center","background-size":"100% 100%"});
                $(".authorNickname").text(authorNick);
            }
        })  
        return false;
    });
    $(".delete").click(function(){
    	$(".authorCode").animate({"top":"-358px"},1000);
		setTimeout(function(){
			$(".authorCode").hide();
		}, 1000); 
		return false;
    });
//    $(".exceptionalUi").click(function(){
//        $(".exceptionalUi").css("display","none");
//        return false;
//    });  
})
window.onresize=function(){  
    var widthScale1=parseInt($(window).width())/parseInt($("#largePic").attr("data-width"));
    var nowHeight1=widthScale1*parseInt($("#largePic").attr("data-height"));
    if(nowHeight1>parseInt($(window).height())){
        $("#largePic").css("height",nowHeight1)
    }else{
        $("#largePic").css("height",parseInt($(window).height())+"px")
    } 
}  

$(".release_1").on("click",function(){
    if($("#isSign").val() == 0){
//      console.log("未登录");
        $(".login").triggerHandler("click");        
    }else if($("#isSign").val() == 1){
//      console.log("已经登录了");
    }
})

$(".hideTsInfo").on("click",function(){
    if($(".tIme").css("display")!="block"){
        $(".tIme").css({
            "display":"block",
            "top":"0"
        });
        $(".greetings").css("display","block");
        $("#input").css("display","block");
        $(".textarea").css("display","block");
        $(".fontColor").css("display","block");
        $("#release").css("display","none");
        $("#add_add").css("display","block");
        
    }else{
        $(".tIme").css("display","none");
        $(".greetings").css("display","none");
        $("#input").css("display","none");
        $(".textarea").css("display","none");
        $(".textarea").val("");
        $(".fontColor").css("display","none");
        $("#release").css("display","none");
        $("#add_add").css("display","none");
    }   
    return false;
})

$(".close").on("click",function(){
    $(".downchange").animate({"bottom":"-50%","opacity":"0","filter":"alpha(opacity=0)","display":"none"},1000);
})
//------------------------------------------------------------------------------------------------
//鼠标滑动出现投诉信息
$(".s2_complain").hover(function(){
    $(".s2_complain_div").css({
        "display":"block"
    })
},function(){
    $(".s2_complain_div").css({
        "display":"none"
    })
})
//点击投诉信息,阻止页面关闭
$(".s2_complain").on("click",function(){
    return false;
})
//鼠标滑动出现图片的元属性
$(".s2_picMata").hover(function(){
    $(".s2_picMata_div").css({
        "display":"block"
    })
},function(){
    $(".s2_picMata_div").css({
        "display":"none"
    })
})
//点击图片信息,阻止页面关闭
$(".s2_picMata").on("click",function(){
    return false;
})

function getViewPortHeight() {
                return document.documentElement.clientHeight || document.body.clientHeight;
            }

$("#release2").on("click",function(){
    if($("#isSign").val() == 0){
//      console.log("未登录");
        $(".login").triggerHandler("click");        
    }else if($("#isSign").val() == 1){
    	
        	var imgComment = $(".bottom_discuss");
      	    var content=imgComment.val();
      	    if(content.length > 120 || content.length < 1){
    	    	return false;
    	    }else{
//    	    	var locaUrl=window.location.href;
//    	    	var s2_picId_loca=locaUrl.lastIndexOf("?");
//    			var orderId=locaUrl.substring(s2_picId_loca+1);
    	  	    //var orderUserId=$(".userId").text();
    	  	    //console.log(orderId,orderUserId);
    	    	$.ajax({
    	    		type: "post",
    	            url: $('#p_s_f_website_url').val()+"/pc/guestbook/guestbook",            
    	            data: {
    	            	"content":content,
    	            	"orderId":orderId  	
    	            },
    	            success: function (data) {
    	                if(data.data.success == true){
    	                	 location.reload();
//    	                	if(data.rspCode == 0){
//    	                		$(".susu").css("display","block").stop().animate({
//    	                			opacity:"0",
//    	                			filter:"alpha(opacity=0)"
//    	                		},1000);
//    	                		var opaSusu = $(".susu").css("opacity");
//    	                		if(opaSusu == "0"){
//    	                			$(".susu").css("display","none");
//    	                		}
//    	                	}
    	                }
    	                
    	                var fg_authorNick1=$(".itp_zz").html();
    	                //console.log(fg_authorNick1);
    	                publishMessage1(fg_authorNick1);
    	                
    	                
    	                
    	            },
    	            error:function(){
    	            	console.log(2222);
    	            }
    	        });
    	    }
            return false;
        	
    }
    
})