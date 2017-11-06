$(document).ready(function(){
    var bg_w=$(".bg").width()+"px";
    var bg_h=$(".bg").height()+"px";
    //var bottom_h=$(".downchange").height()-$(".downchange .downchange_top").height()+"px";
    $(".bg_1").css({width:bg_w,height:bg_h});
    $(".downchange .downchange_bottom").css("height","100px");
    $(".chang:eq(0)").css({background:"rgba(204, 204, 204, 1)",color:"#ffffff"});
    localStorage.setItem("id","0");
});
/*close旋转*/
//$(".close").hover(function(){
//   $(this).css({"animation":"change 1s linear"})
//},function(){
//     $(this).css({"animation":"change_1 1s linear"})
//})

/*选择大小*/
$(".chang").each(function(){
    $(this).click(function(){
        $(this).css({background:"rgba(204, 204, 204, 1)",color:"#ffffff"});
        $(this).siblings().css({background:"rgba(255, 255, 255, 1)",color:"#666666"});
        $(".chang_1").css({border:"0",background:"none",color:"#bbbbbb"});
        var a=$(this).index();
        if(a==4){
        	$(this).children("input").css({color:"#ffffff"})
        }else{
        	$(".chang:eq(4)").children("input").css({color:"#666666"})
        }
        
        localStorage.setItem("id", a);
        console.log(localStorage.getItem("id"))
})	
})

