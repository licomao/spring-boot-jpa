/**
 * 通用的jquery扩展插件书写位置 引入到generalFrame.ftl
 * Created by swj on 2015/10/22.
 */

(function ($) {
    $.fn.extend({
        /**
         * jqGrid打印方法 入参格式如下  此方法下不隐藏标签线条 如input边框
         * 不支持label标签取值 id
         * (这个typeA已经不用了  考虑兼容问题放着  typeB方法持续更新  后续都调用typeB)
         * {
            "arr":[{
                "index":['姓名','电话','VIN号','车牌号','车型','汽车排量','上次保养里程','已行驶里程','销售单号'],
                "ids":['realName','mobile','vin','carNum','carType','engineDisplacement','lastMaintenanceMileage','mileage','saleNoView'],
                "elementNum":2
            },{
                "index":['合计','现金','pos机','App费用','接车人员'],
                "ids":['sum','payment.cashAmount','payment.posAmount','payment.appAmount','receiver'],
                "elementNum":5
            }],
            "jqGridTables":[{
                "labels":['品名','单价','分类','数量','实际售价','折后售价','折扣率','施工人员','会员卡项目'],
                "names":['orderedItem.name','price','count','receivable','receivablediscount','discount','worker','purchased_care_suite_id'],
                "jqGridId":'customList',
                "afterIndex":0
            }]

        }
         * @param msgObj
         */
        "jqPrintDataTypeA": function (msgObj) {
            var ips = $("#printDiv").find("input");
            var tes = $("#printDiv").find("textarea");
            for (var i = 0; i < ips.length; i++) {

                if (ips[i].type == "text") {
                    ips[i].style.border = "none";
                }
            }
            for (var i = 0; i < tes.length; i++) {

                $(tes[i]).css("border", "none");
                $(tes[i]).css("resize", "none");
            }

            var addIndex = [];//用于存储 jqGrid插入坐标大于最大下标的jqhtml
            var jqHtmlMaps = [];//jqhtml的数组

            if (msgObj && msgObj.jqGridTables) {
                //存在需要打印的jqGrid集合
                var jqGridTables = msgObj.jqGridTables;
                for (var i = 0; i < jqGridTables.length; i++) {
                    var jqResult = {};
                    var jqGrid = jqGridTables[i];//jqGridId labels names
                    var jqGridId = jqGrid['jqGridId'];
                    var labels = jqGrid['labels'];
                    var names = jqGrid['names'];
                    var ids = $("#" + jqGridId).getDataIDs();
                    var jqHtml = "<legend>库存调拨 -> 修改调拨单</legend><table style='width: 100%' ><tr><td></td>";
                    for (var j = 0; j < labels.length; j++) {   //表头
                        jqHtml = jqHtml + "<td>" + labels[j] + "</td>";
                    }
                    jqHtml += "</tr>";

                    for (var j = 0; j < ids.length; j++) {
                        var obj = $("#" + jqGridId).getRowData(ids[j]);
                        var index = j + 1;
                        jqHtml += "<tr><td>" + index + "</td>";
                        for (var k = 0; k < names.length; k++) {
                            //if(k == 0)
                            /* if(names[k] == "worker"){
                             jqHtml = jqHtml + "<td>" + $("#receiver-"+obj["id"]).text() + "</td>";
                             }*/
                            /* var tdvalue = obj[names[k]];
                             if(tdvalue == ""){
                             tdvalue = "&aaa"
                             }*/
                            //jqHtml = jqHtml + "<td>" + tdvalue + "</td>";
                            jqHtml = jqHtml + "<td>" + obj[names[k]] + "</td>";
                        }
                        jqHtml += "</tr>";
                    }
                    jqHtml += "</table>";   //jqHtml 拼装完成 key value形式存储 key为目标索引
//                    jqMap.indexNum = jqHtml;
                    jqResult.afterIndex = jqGrid['afterIndex'];
                    jqResult.jqHtml = jqHtml;
                    jqHtmlMaps.push(jqResult);
//                    jqIndex.push(jqGrid['afterIndex']);
//                    jqHtmls.push(jqHtml);

                }
            }
            if (msgObj && msgObj.arr) {
                var arr = msgObj.arr;
                var printhtml = "";

                for (var i = 0; i < arr.length; i++) {
                    var tableNum = i + 1;
                    var obj = arr[i];

                    var indexArr = obj['index'];
                    var idArr = obj['ids'];
                    var lineChange = 5;
                    if (obj['elementNum']) {
//                        alert(obj['elementNum']);
                        lineChange = obj['elementNum'];
                    }
                    var parttable = "<table style='width: 100%' ><tr>";

                    for (var j = 0; j < indexArr.length; j++) {
                        var index = j + 1;
                        parttable = parttable + "<td>" + indexArr[j] + "</td>";
                        var id = idArr[j];
                        var idValue = id.indexOf(".") == -1 ? $("#" + id).val() : document.getElementById(id).value;
                        parttable = parttable + "<td>" + idValue + "</td>";
                        if (index % lineChange == 0) {
                            parttable += "</tr><tr>";
                        }
                    }
                    parttable += "</tr></table><br>";
                    printhtml += parttable;
                    for (var k = 0; k < jqHtmlMaps.length; k++) {
                        var jqResult = jqHtmlMaps[k];
                        if (jqResult.afterIndex == i) {
                            printhtml += jqResult.jqHtml;   //找到需要添加的索引位置添加
                        } else if (i == arr.length - 1 && jqResult.afterIndex >= arr.length) {
                            addIndex.push(jqResult.jqHtml);//该索引位置大于 最大长度
                        }
                    }
                }
                for (var k = 0; k < addIndex.length; k++) {
                    printhtml += addIndex[k];
                }
                window.document.body.innerHTML = printhtml;
                window.print();
                window.location.reload();
            } else {
                //alert(jqHtmlMaps.length)
                if (jqHtmlMaps.length > 0) {
                    var printhtml = "";
                    for (var k = 0; k < jqHtmlMaps.length; k++) {
                        printhtml += jqHtmlMaps[k].jqHtml;
                    }
                    window.document.body.innerHTML = printhtml;
                    window.print();
                    window.location.reload();
                }
            }
        },

        "initBorderStyle":function(isConfig){
            var config = {bottomSold:"",topSold:"",borderAttr:""};
            if (isConfig.outBorderStyle == "topAndBottom") {
                //config.bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                //config.topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                config.borderAttr = "border-top-style: solid;border-top-width: 1px;border-bottom-style: solid;border-bottom-width: 1px;";
            } else if (isConfig.outBorderStyle == "bottom") {
                //config.bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                config.borderAttr = "border-bottom-style: solid;border-bottom-width: 1px;";
            } else if (isConfig.outBorderStyle == "top") {
                config.borderAttr = "border-top-style: solid;border-top-width: 1px;";
                //config.topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
            }
            if (isConfig.outBorderStyle == "topAndBottomHr") {
                config.bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                config.topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                //borderAttr = "border-top-style: solid;border-bottom-style: solid;";
            } else if (isConfig.outBorderStyle == "bottomHr") {
                config.bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                //borderAttr = "border-bottom-style: solid;";
            } else if (isConfig.outBorderStyle == "topHr") {
                //borderAttr = "border-top-style: solid;";
                config.topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
            }
            return config;
        },


        /**
         * 打印  使用案例  printDiv是一个包裹住打印内容的DIV  用来去除框线之类的
         *
         *
         $("#printDiv").jqPrintDataWithoutBorder({
//            headHtml:"车辆维修委托书",//上面这种跟下面这种都可以
            headHtml:"<legend style='font-size: x-large' align='center' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆维修委托书</legend>",
            arr: [
                    [
                    {text: "单位", id: "organizationName", colspan: 2 },
                    {text: "地址", id: "shopAddress" },
                    {text: "电话", id: "shopPhone" },
                    {row: 2 }
                ], [
                    {text: "工单号码", id: "saleNoView", type: "text" },
                    {text: "车主名称", id: "nameView", type: "text" },
                    {text: "送修人", id: "nameView", type: "text", colspan:2 },
                    {text: "电话", id: "phoneView", type: "text", colspan:4 },
                    {text: "车牌号码", id: "plateNumberView", type: "text" },
                    {text: "车牌颜色", },
                    {text: "车架号码", },
                    {text: "发动机号码", },
                    {text: "车辆分类代号", value: "E类车", colspan:2 },
                    {text: "供给系统类型", value: "□ 汽油   □ 柴油   □ 电动   □ 混动", colspan:2 },
                    {text: "进厂日期",colspan:2},
                    {text: "进厂里程", id:"mileageView", colspan:2, type: "text"},
                    {row: 4, widthStyle: "100%", outBorderStyle: "topAndBottom" }
//                    {row: 3, widthStyle: "100%", outBorderStyle: "topAndBottom" }
                ], [
                    {text: "用户需求描述(含变更)"},
                    {text: "", colon: false },
                    {text: "", colon: false },
                    {text: "", colon: false },
                    {text: "", colon: false },
                    {row: 1, widthStyle: "100%", outBorderStyle: "bottom" }
                ], [
                    {text: "维修建议(含变更)" },
                    {text: "", colon: false },
                    {text: "", colon: false },
                    {text: "", colon: false },
                    {row: 1, widthStyle: "100%", outBorderStyle: "bottom" }
                ], [
                    {text: "工时费(预计)合计", id: "hoursAmountView", formatter:function(value){
                        return value + "¥";
                    }},
                    {text: "工时费=结算工时x单价", colon: false },
                    {widthStyle: "auto"}
                ], [
                    {text: "材料费(预计)", id: "materialAmountView", formatter:function(value){
                        return value + "¥";
                    }},
                    {widthStyle: "auto"}
                ], [
                    {text: "维修费用=材料费+工时费维修费用(预计)", id: "sum", type: "text", formatter:function(value){
                        return value + "¥";
                    }},
                    {text: "金额大写",id: "sum", type: "text", formatter:function(cellvalue){
                        return numberUpper(cellvalue);
                    }},
                    {text: "注:在车辆维修过程中,因车辆内在原因,需增加维修项目或扩大维修范围时,应当征得托修方", colspan:2 ,colon:false},
                    {widthStyle:"auto",row:2}
                ]
            ],
            jqGridTables: [{
                labels: ['维修项目','结算工时','单价(元/工时)','工时费(元 )','备注'],
                names: ['name','laborHours','cost','laborHours','space'],
                jqGridId: 'workHoursList',
                headText: '经双方协商，确定维修项目及所需配件如下',
                afterIndex: 3,
                outBorderStyle: "topAndBottom"
            },{
                labels: ['配件名称','配件性质','数量','单价','金额'],
                names: ['orderedItem.name','rootCategory','count','price','receivablediscount','receivable'],
                jqGridId: 'customList',
//                headText: '商品列表',
                afterIndex: 4,
                outBorderStyle: "topAndBottom"
            }]
         })

         * @param msgObj
         */
        "jqPrintDataTypeB": function (msgObj) {
            var addIndex = [];//用于存储 jqGrid插入坐标大于最大下标的jqhtml
            var jqHtmlMaps = [];//jqhtml的数组
            var printhtml = "<div style='font-size: small;' >";
            if (msgObj && msgObj.headHtml) {
                printhtml += msgObj.headHtml;
            }
            if (msgObj && msgObj.jqGridTables) {//获取jqGrid表格数组
                //存在需要打印的jqGrid集合
                var jqGridTables = msgObj.jqGridTables;
                for (var i = 0; i < jqGridTables.length; i++) {
                    var jqResult = {};//jqGrid表格对象  两个属性  afterIndex:控制表格的位置 jqHtml:表格的html
                    var jqGrid = jqGridTables[i];//jqGridId labels names
                    var jqGridId = jqGrid['jqGridId'];
                    if (!document.getElementById(jqGridId))continue;
                    var labels = jqGrid['labels'];  //表头字段组 对应jqGrid 每行的labels属性
                    var names = jqGrid['names'];    //表格属性   对应jqGrid 每行的name属性
                    var borderAttr = "";
                    var indexHead = jqGrid.indexHead != null ? jqGrid.indexHead : "";
                    //if(jqGrid.indexHead != null)
                    //var indexHead = jqGrid.headHead;
                    if (jqGrid['outBorderStyle']) {
                        borderAttr = "border-top-style: solid;border-top-width: 1px;border-bottom-style: solid;border-bottom-width: 1px;";
                    }
                    //var ids = $("#" + jqGridId).getDataIDs();   //获取jqGrid row的 id集合
                    var obj = $("#" + jqGridId).jqGrid("getRowData");

                    var jqHtml = "";
                    if (jqGrid.headText != null) {
                        //jqHtml = jqHtml + jqGrid.headText;
                        jqHtml = jqHtml + "<legend>" + jqGrid.headText + "</legend>"
                    }
                    jqHtml += "<table style='white-space: nowrap;width: 100%;" + borderAttr + "' ><tr><td style='text-align: center'>" + indexHead + "</td>";
                    for (var j = 0; j < labels.length; j++) {   //表头
                        jqHtml = jqHtml + "<th>" + labels[j] + "</th>";
                    }
                    jqHtml += "</tr>";
                    var index = 0;
                    jQuery(obj).each(function () {
                        index += 1;
                        jqHtml += "<tr style='text-align: center' ><td>" + index + "</td>";
                        for (var k = 0; k < names.length; k++) {
                            jqHtml = jqHtml + "<td>" + this[names[k]] + "</td>";
                        }
                        jqHtml += "</tr>";
                    });

                    jqHtml += "</table><br>";   //jqHtml 拼装完成 key value形式存储 key为目标索引
                    jqResult.afterIndex = jqGrid['afterIndex'];
                    jqResult.jqHtml = jqHtml;
                    jqHtmlMaps.push(jqResult);
                }
            }
            if (msgObj && msgObj.arr) {//拼装传入的arr参数 并插入jqGrid表格html
                var arr = msgObj.arr;
                //var printhtml = "";
                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    var forIndex = obj.length;
                    var lineChange = 5;
                    var isConfig = obj[obj.length - 1];


                    var parttable = "";
                    if (isConfig.text == null) {
                        if (isConfig.row != null) lineChange = isConfig.row;
                        //lineChange = isConfig.row != null ? isConfig.row : 5;
                        forIndex = forIndex - 1;
                        if (isConfig.headText != null) {
                            parttable += "<legend >" + isConfig.headText + "</legend>"
                        }
                    }
                    //var topSold = "";
                    //var bottomSold = "";
                    //var borderAttr = "";
                    var config = {};
                    config = $.fn.initBorderStyle(isConfig);
                    /*if (isConfig.outBorderStyle == "topAndBottom") {
                        bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        //borderAttr = "border-top-style: solid;border-bottom-style: solid;";
                    } else if (isConfig.outBorderStyle == "bottom") {
                        bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        //borderAttr = "border-bottom-style: solid;";
                    } else if (isConfig.outBorderStyle == "top") {
                        //borderAttr = "border-top-style: solid;";
                        topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                    }
                    if (isConfig.outBorderStyle == "topAndBottom") {
                        bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        //borderAttr = "border-top-style: solid;border-bottom-style: solid;";
                    } else if (isConfig.outBorderStyle == "bottom") {
                        bottomSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                        //borderAttr = "border-bottom-style: solid;";
                    } else if (isConfig.outBorderStyle == "top") {
                        //borderAttr = "border-top-style: solid;";
                        topSold = "<hr style='height:1px;border:none;border-top:1px solid #555555;' />";
                    }*/
                    if (isConfig.widthStyle != null) {

                        //parttable += topSold + "<table style='width:" + isConfig.widthStyle + ";" + borderAttr + " ' ><tr>";
                        parttable += config.topSold + "<table style='white-space: nowrap;width:" + isConfig.widthStyle + ";" + config.borderAttr + " ' ><tr>";
                    } else {
                        //parttable += "<table style='width: 100%;" + borderAttr + "'  ><tr>";
                        parttable += config.topSold + "<table style='white-space: nowrap;width: 100%;" + config.borderAttr + "'  ><tr>";
                    }
                    var index = 0;
                    //var widthPercent = 100/lineChange;
                    for (var j = 0; j < forIndex; j++) {
                        index++;

                        var id = obj[j].id;
                        var tdAttributeText = obj[j].tdAttribute;
                        var colspan = obj[j].colspan;
                        var colon = obj[j].colon == false ? "" : ":";
                        var value = obj[j].value;
                        if (value == null) {
                            value = "&nbsp"
                        }
                        if (colspan != null) {
                            index += (colspan - 1);
                        } else {
                            colspan = 1;
                        }
                        if (id == null) {
                            parttable = parttable + "<td  colspan='" + colspan + "' " + tdAttributeText + ">" + obj[j].text + colon + "</td><td>" + value + "</td>";
                            if (index % lineChange == 0) {
                                parttable += "</tr><tr>";
                            }
                        }
                        if (!document.getElementById(id))continue;

                        parttable = parttable + "<td>" + obj[j].text + colon + "</td>";
                        var idValue = obj[j].type == "text" ? $("#" + id).text() : document.getElementById(id).value;
                        var formatterFunction = obj[j].formatter;
                        if ($.isFunction(formatterFunction)) {
                            idValue = formatterFunction(idValue);
                        }
                        parttable = parttable + "<td colspan='" + colspan + "'  " + tdAttributeText + " >" + idValue + "</td>";
                        if (index % lineChange == 0) {
                            parttable += "</tr><tr>";
                        }
                    }
                    //parttable += "</tr></table><br>" + bottomSold;
                    parttable += "</tr></table><br>" + config.bottomSold;
                    printhtml += parttable;
                    for (var k = 0; k < jqHtmlMaps.length; k++) {
                        var jqResult = jqHtmlMaps[k];
                        if (jqResult.afterIndex == i) {
                            printhtml += jqResult.jqHtml;   //找到需要添加的索引位置添加
                        } else if (i == arr.length - 1 && jqResult.afterIndex >= arr.length) {
                            addIndex.push(jqResult.jqHtml);//该索引位置大于 最大长度
                        }
                    }
                }
                for (var k = 0; k < addIndex.length; k++) {
                    printhtml += addIndex[k];
                }
                printhtml += "</div>"
                window.document.body.innerHTML = printhtml;
                window.print();
                window.location.reload();
            } else {//不存在arr时走这里 直接顺序打印jqGrid表格组
                if (jqHtmlMaps.length > 0) {
                    for (var k = 0; k < jqHtmlMaps.length; k++) {
                        printhtml += jqHtmlMaps[k].jqHtml + "</div>";
                    }
                    window.document.body.innerHTML = printhtml;
                    window.print();
                    window.location.reload();
                }
            }

        }
    })
})(jQuery);

(function ($) {
    /**
     * 该方法内部调用jqPringtDataTypeB方法  多做了一步清除获取到的标签范围内的Input textarea框线
     * @param options
     */
    $.fn.jqPrintDataWithoutBorder = function (options) {
        //var opts = $.extend({}, $.fn.jqPrintDataWithoutBorder.defaults, options);
        //var opts = $.extend({}, $.fn.jqPrintDataWithoutBorder.defaults, options);
        //alert('参数值:aaa:'+opts.aaa+';bbb:'+opts.bbb);
        var ips = $(this).find("input");
        var tes = $(this).find("textarea");
        for (var i = 0; i < ips.length; i++) {

            if (ips[i].type == "text") {
                ips[i].style.border = "none";
            }
        }
        for (var i = 0; i < tes.length; i++) {

            $(tes[i]).css("border", "none");
            $(tes[i]).css("resize", "none");
        }

        $.fn.jqPrintDataTypeB(options);

    };
    //默认参数书写位置
    $.fn.jqPrintDataWithoutBorder.defaults = {};
    //$.fn.foo5.defaults = {aaa:'1',bbb:'2'};
})(jQuery);

/**
 * 日期格式化 格式化到时分秒 2015-10-21 13:50:24
 *
 *
 * @param cellvalue
 * @returns {string}
 */
function formatterDateWithSecond(cellvalue) {
    if (cellvalue) {
        var date = new Date(cellvalue);

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var H;
        /*if(browser == "Chrome"){
         //                                     H = date.getHours()-8;
         }else{
         H = date.getHours();
         }*/
        H = date.getHours();
        var M = date.getMinutes();
        var s = date.getSeconds();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (H < 10 ? ('0' + H) : H) + ':' + (M < 10 ? ('0' + M) : M) + ':' + (s < 10 ? ('0' + s) : s);
    }
}

/**
 * 日期格式化 格式化到年月日 2015-10-21
 *
 * @param cellvalue
 * @returns {string}
 */
function formatterDate(cellvalue) {
    if (cellvalue) {
        var date = new Date(cellvalue);

        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var H;
        /*if(browser == "Chrome"){
         //                                     H = date.getHours()-8;
         }else{
         H = date.getHours();
         }*/

        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    }
}

/**
 * 带"," 逗号的数字转纯数字  去除逗号 不带逗号则不做修改
 * @param price
 * @returns {string|*}
 */
function formatterPrice(price) {
    price = price + "";

    if (price.indexOf(",") == -1 ? false : true) {
        price = price.replace(/,/g, '');
    }
    return price;
}

/**
 * 数字转化成百分比 保留百分化后1位小数
 * @param value
 * @returns {*}
 */
function formatterPercent(value) {

    if (!isNaN(value)) value = parseFloat(value)
    value = value * 100 + "";
    var index = value.indexOf(".");
    value = index == -1 ? value : value.substring(0, index + 2);
    return value;
}

/**
 * 数字转成中文大写
 * @param n
 * @returns {*}
 */
function numberUpper(n) {
    if (n == 0)
        return "零";
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}