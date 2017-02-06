/**
 * Created by Administrator on 2015/11/9.
 */

var matx;  //控件
var fpcHandle;  //指纹缓冲区
/**
 * 初始化指纹机
 */
function initFingerprint() {
    try {
        matx = document.getElementById("myativx");
        matx.FPEngineVersion = "9";
        matx.Threshold = 25;
        matx.SensorIndex = 0;
        matx.EnrollCount = 2;   //登记指纹的次数
        if (matx.InitEngine() == 0 & matx.SensorSN != "") {
            //alert(matx.SensorSN)
            $.get("/fingerprint/checkauthority?r=" + Math.random() + "&sensorSN=" + matx.SensorSN, function(data){
                if(!data){
                    $("#fingerPrintDiv").hide();
                    $("#loginDiv").show();
                    alert("该指纹机未授权,请联系管理员")
//                            $("#fingerPrintDiv").css("display","none")
                } else {
                    $("#fingerPrintDiv").show();
                    $("#loginDiv").hide();
                }
            },'json')
        } else {
            $("#loginDiv").show();
            $("#fingerPrintDiv").hide();
        }
        //matx.BeginCaputre();
        //alert("init success")
    }catch (e) {
        $("#loginDiv").show();
        $("#fingerPrintDiv").hide();
        alert("初始化指纹机失败,请联系管理员")
    }
}

/**
 * 初始化高速缓冲区  erp表
 */
function initErpFpcHandle(){
    fpcHandle = matx.CreateFPCacheDB();
    var timestamp = (new Date()).valueOf();
    $.ajax({
        url: "/fingerprint/erpuser/list?timestamp=" + timestamp,
        type: "get",
        dataType: "json",
        cache: "false",
        success: function(data){
            for(var key in data){
                //alert(data[key])
                matx.AddRegTemplateStrToFPCacheDB(fpcHandle, key, data[key]);
            }
        }});
    /*$.get("/fingerprint/erpuser/list",function(data){
        for(var key in data){
            //alert(data[key])
            matx.AddRegTemplateStrToFPCacheDB(fpcHandle, key, data[key]);
        }
    },'json');*/

    //alert("初始化高速缓冲区成功")
};

/**
 * 验证指纹
 */
function validFgp(){
    $("#fortst").text("现在可以开始验证指纹了");



    initErpFpcHandle();

}

function success(){
    $("#fortst").text("验证指纹成功!");
}


/*
<SCRIPT type="text/javascript" FOR="myativx" EVENT="OnEnroll(ActionResult) ">
var tmp = matx.GetTemplateAsString();
$("#fingerprint").val(tmp);
$("#forReg").val('登记成功!')

</SCRIPT>*/
