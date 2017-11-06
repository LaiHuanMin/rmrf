//弹出框的样式
function reminder(infor){
    $(".reminderMessage span").html(infor);
    $(".reminder").css("display","block");
    $('.reminder').delay(2000).hide(0);
}

// 顶部的登录、注册按钮点击事件
function denglu(e){
  $("#s2_back").css({
    "display":"block"
  })
  $("#s2_log_reg").css({
	  "height":"490px"
  })
  $("#s2_log_reg_form_div2").css({
    "display":"none"
  })
  $("#s2_log_reg_form_div").css({
    "display":"block"
  })
  $(".login_nav").css({
    "font-weight":"bold"
  })
  $(".reg_nav").css({
    "font-weight":"normal"
  })
  setTimeout(function(){
	  if($("#s2_back").css("display") == "block"){
		  $(".geetest_radar_tip").triggerHandler("click");
	  }
  },3000)
}
function zhuce(){
  $("#s2_back").css({
    "display":"block"
  })
  $("#s2_log_reg").css({
	  "height":"690px"
  })
  $("#s2_log_reg_form_div").css({
    "display":"none"
  })
  $("#s2_log_reg_form_div2").css({
    "display":"block"
  })
  $(".login_nav").css({
    "font-weight":"normal"
  })
  $(".reg_nav").css({
    "font-weight":"bold"
  })
}
$("#denglu").live("click",function(){
  denglu();
  
})
$("#zhuce").live("click",function(){
  zhuce();
})
// 点击登录注册列表空白退出
$("#s2_back").on("click",function(){
  $("#s2_back").css({
    "display":"none"
  })
})

function getEvent(){
    if(window.event)    {return window.event;}
    func=getEvent.caller;
    while(func!=null){
        var arg0=func.arguments[0];
        if(arg0){
            if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                || arg0.constructor==KeyboardEvent)
                ||(typeof(arg0)=="object" && arg0.preventDefault
                && arg0.stopPropagation)){
                return arg0;
            }
        }
        func=func.caller;
    }
    return null;
}




function cancelBubble()
{
    var e=getEvent();
    if(window.event){
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble=true;//阻止冒泡
    }else if(e.preventDefault){
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }
}



$("#s2_log_reg").on("click",function(e){
	cancelBubble();
})
// 登录注册表单的切换
function login_form_btn(){
  $(".login_nav").css({
    "font-weight":"bold"
  })
  $(".reg_nav").css({
    "font-weight":"normal"
  })
  $("#s2_log_reg_form_div").css({
    "display":"block"
  })
  $("#s2_log_reg_form_div2").css({
    "display":"none"
  })
}
function reg_form_btn(){
   $(".reg_nav").css({
    "font-weight":"bold"
  })
  $(".login_nav").css({
    "font-weight":"normal"
  })
  $("#s2_log_reg_form_div2").css({
    "display":"block"
  })
  $("#s2_log_reg_form_div").css({
    "display":"none"
  })
}
$(".login_nav").on("click",function(){
    login_form_btn();
})
$(".reg_nav").on("click",function(){
    reg_form_btn()
})
$(".close_log_reg_form").on("click",function(){
  $("#s2_back").css({
    "display":"none"
  })
})
// 侧边栏的登录注册
$(".left_register").on("click",function(){
  $(".left-navbox").animate({
    "left":"-300px"
  },500,"swing",function(){
    $(".left-slidebox").css({
      "display":"none"
    })
    $("#zhuce").click();
  })
});
$(".left_login").on("click",function(){
  $(".left-navbox").animate({
    "left":"-300px"
  },500,"swing",function(){
    $(".left-slidebox").css({
      "display":"none"
    })
    $("#denglu").click();
  })
})


//注册表单的合法性验证
//昵称的合法性验证 不能是纯数字的名字
function testName(name){
	var pat=/^[0-9]*$/;
	if(pat.test(name)){
		$("#s1_nick").siblings(".s2_reg_err").html("昵称不能是纯数字");
	}else {
		$("#s1_nick").siblings(".s2_reg_err").html("");
	}
}
$("#s1_nick").on("blur",function(){
	var str=$(this).val();
	testName(str);
})

//注册时发送手机验证码
$("#bnt_sms").on("click",function(){
		sendMessageCode();
	});

function sendMessageCode(){
	var code=$("#s1_tel").val();
	if(!code){
		reminder("请输入手机号码");
	}else{
		$.ajax({
			"type":"post",
			"url":$('#p_s_f_website_url').val()+"/pc/reg/send_reg_code",
			data:{"mobile":code},
			success:function(data){				
				if(data.rspMsg=="操作成功"){
					reminder("短信验证码已发送,10分钟内有效");
					$("#bnt_sms").css({
						"background":"#aaa",					
					})
					$("#bnt_sms").val("60s后重试");
					$("#bnt_sms").off();
					var countDownTime=60;
					var countMsg;
					var timer=setInterval(function(){
						countDownTime--;
						if(countDownTime<=0){
							clearInterval(timer);
							$("#bnt_sms").val("获取验证码");
							$("#bnt_sms").css({
								"background":"#73475a",					
							})
							$("#bnt_sms").on("click",function(){
								sendMessageCode();
							});
						}else{
							 countMsg=countDownTime+"s后可重新获取";
							$("#bnt_sms").val(countMsg);	
						}						
					},1000)
					
				}else{
					reminder(data.rspMsg);
				}				
			},
			error:function(){
				reminder("短信发送失败,请稍后再试");
			}
		})
	}
		
}




//限制输入框最多能够输入的数字为11位
function phoneNum(id,btn){
var Id="#"+id;
var Btn="#"+btn;
$(Id).on("input propertychange",function(){
    var This=$(this);
    var _val=$(this).val();
    if(_val.length>11){
        var new_val=_val.substring(0,11);
        This.val(new_val);
    }
});
$(Id).on("keyup",function(){
    var This=$(this);
    var _val=$(this).val();
    This.val(This.val().replace(/[^\d]/g,"")); //限制数字以外的其他字符的输入
    if(_val.length==11){
        if(!isPhone(_val)){
            return false;
        }
        $(Btn).css("background","#73475a");
        $(Btn).attr("disabled",false);
    }else{
        $(Btn).css("background","#aaa");
        $(Btn).attr("disabled",true);
    }    
})
}
//手机号码的正则表达式验证
function isPhone(str){
    var reg=/^1[0-9]{10}$/;
    return reg.test(str);
}
phoneNum("s1_tel","bnt_sms");




//手机号最多输入11位
$("#s1_tel").on("input propertychange", function() { 
        var $this = $(this); 
            _val = $this.val(); 
        if(_val.length > 11) { 
            $this.val(_val.substring(0, 11)); 
        } 
    });

//验证码最多输入6位
$("#s1_mesv").on("input propertychange", function() { 
        var $this = $(this); 
            _val = $this.val(); 
        if(_val.length > 6) { 
            $this.val(_val.substring(0, 6)); 
        } 
    });




//两次输入密码一致的合法性验证
$("#s1_pass2").on("blur",function(){
	var str1=$("#s1_pass").val();
	var str2=$("#s1_pass2").val();
	if(str1!=str2){
		$("#s1_pass").addClass("error");
		reminder("两次密码不一致");
//		$("#register_btn").css({
//			"background":"#eee"
//		})
	}else{
		$("#s1_pass").removeClass("error");
	}
})


//注册表单的提交
$("#register_btn").on("click",function(){
	var nick = $("#s1_nick").val();
	var tel = $("#s1_tel").val();
	var mes = $("#s1_mesv").val();
	var pass = $("#s1_pass").val();
	var pass2 = $("#s1_pass2").val();
	if(nick!="" && tel!="" && mes!="" && pass!="" && pass2!="" && !$("#s1_pass").hasClass("error")){
		$.ajax({
			"type":"post",
			"url":$('#p_s_f_website_url').val()+"/pc/reg/create",
			"data":{"mobile":tel,"code":mes,"password":pass,"nickname":nick},
			success:function(data){
				if(data.rspCode == 0 && data.data.success == true){
					reminder(data.rspMsg); //表示注册成功
					window.location.href=$('#p_s_f_website_url').val()+"/pc/order/ud?ud=ssyer/wxgz";
				}else if(data.rspCode == 10002){
					reminder(data.rspMsg); //表示手机号验证码错误
				}else if(data.data.errorCode == 10031){
					reminder(data.data.errorMsg);// 表示用户名已存在
				}			
			},
			error:function(){
				reminder("请获取验证码或者注册失败");
			}
		})
	}	
})

//同意别样协议
$("#agree_bieyang").on("click",function(){
	if($("#agree_bieyang").get(0).checked){
		$("#register_btn").attr({"disabled":false});
		$("#register_btn").css({
			"background":"#73475a"
		})
	}else {
		$("#register_btn").attr({"disabled":true});
		$("#register_btn").css({
			"background":"#eee"
		})
	}
})


$(".repass_a").on("click",function(){
	window.location.href=$('#p_s_f_website_url').val()+"/pc/order/ud?ud=ssyer/repass";
})
$(".tologin").on("click",function(){
	$("#denglu").click();
})


$("#embed-submit").on("click",function(){
	checkUser();
})

//初步检测登陆表单的信息是否填写了，如果没写，不允许提交
function checkUser(){
	var tel = $("#s2_login_tel").val();
	var pass = $("#s2_login_pass").val();
	if(tel == ""){
		reminder("用户名不能为空");
		return false;
	}
	if(pass == ""){
		reminder("密码不能为空");
		return false;
	}
//	document.getElementById("s6_login_form").submit();
//	$("#s6_login_form").submit();
	var loginId=$("input[name='loginId']").val();
	var password=$("input[name='password']").val();
	$.ajax({
		"type":"post",
		"url":$('#p_s_f_website_url').val()+"/bieyang/login",
		"data":{"loginId":loginId,"password":password},
		success:function(data){
			console.log(data);
			if(data.data.success == false){
				reminder(data.data.errorMsg);
				return false;
			}
			if(data.rspCode == 0){
//				reminder(data.rspMsg);
				window.location.reload();
//				window.location.href=$('#p_s_f_website_url').val();
			}
		},
		error:function(data){
			reminder("密码错误...");
			console.log(data);
		}
	})
	
	
}

//	$.ajax({
//		// 获取id，challenge，success（是否启用failback）
//		url: "http://www.after90s.xin/web/StartCaptchaServlet.php?type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
//		type: "post",
//		dataType: "json",
//		async : true,
//		success: function (data) {
//			// 使用initGeetest接口
//			// 参数1：配置参数
//			// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
////			console.log(12)
//			initGeetest({
//				gt: data.gt,
//				challenge: data.challenge,
//				product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
//				offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
//				// 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
//			}, handlerEmbed);
//		}
//	});
//	var handlerEmbed = function (captchaObj) {
//		$("#embed-submit").click(function (e) {
//			var validate = captchaObj.getValidate();
//			if (!validate) {
//				$("#notice")[0].className = "show";
//				setTimeout(function () {
//					$("#notice")[0].className = "hide";
//				}, 2000);
//				e.preventDefault();
//			}else{
//				/*loginFormSubmit();*/
//				checkUser();
//			}
//		});
//		// 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
//		captchaObj.appendTo("#embed-captcha");
//		captchaObj.onReady(function () {
//			$("#wait")[0].className = "hide";
//		});
//		// 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
//	};

//点击立即登录
$("#s8_login").on("click",function(){
	$(".login_nav").triggerHandler("click");
	$("#s2_log_reg").css({
		"height":"490px"
	})
});
//点击立即注册
$(".s2_reg_span4").on("click",function(){
	$(".reg_nav").triggerHandler("click");
	$("#s2_log_reg").css({
		"height":"690px"
	})
})

//输入框失焦底框变白
$("#s2_log_reg_form_div2 input[type='text'],#s2_log_reg_form_div2 input[type='tel'],#s2_log_reg_form_div2 input[type='password'],#s2_log_reg_form_div2 input[type='number']").on("blur",function(){
	var _val=$(this).val();
	if(_val){
		$(this).css({
			"background":"#fff"
		});
	}else{
		$(this).css({
			"background":"#eee"
		});
	}
})

$("#s2_login_tel,#s2_login_pass").on("blur",function(){
	var _val=$(this).val();
	if(_val){
		$(this).css({
			"background":"#fff"
		});
	}else{
		$(this).css({
			"background":"#eee"
		});
	}
})

$("#s2_log_reg_form_div2 input").on("input propertychange",function(){
	var val1=$("#s1_nick").val();
	var val2=$("#s1_tel").val();
	var val3=$("#s1_mesv").val();
	var val4=$("#s1_pass").val();
	var val5=$("#s1_pass2").val();
	if(val1 && val2 && val3 && val4 && val5){
		$("#register_btn").css({
			"background":"#73475a",
			"color":"#fff"
		})
	}else{
		$("#register_btn").css({
			"background":"#eee",
			"color":"#999"
		})
	}
})
	
$("#s2_login_tel,#s2_login_pass").on("input propertychange",function(){
	var val1=$("#s2_login_tel").val();
	var val2=$("#s2_login_pass").val();
	if(val1 && val2){
		$("#embed-submit").css({
			"background":"#73475a",
			"color":"#fff"
		})
	}else{
		$("#embed-submit").css({
			"background":"#eee",
			"color":"#999"
		})
	}
})	
	
	
	
	
	
	
	
