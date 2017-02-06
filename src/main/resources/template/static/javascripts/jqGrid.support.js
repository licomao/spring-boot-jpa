$(function () {
    // Initialize jqGrid...
    if ($.jgrid) {
        $.extend($.jgrid.defaults, {
            autowidth:true,
            height:'100%',
            mtype:'GET',
            datatype:'json',
            rowList:[10, 20, 30],
            rowNum:20,
            viewrecords:true,
            pager:'#toolBar',
            hidegrid:false,
            regional:'cn',
            jsonReader:{root:"rows",
                        page:"page",
                        total:"total",
                        records:"records",
                        repeatitems:false,
                        cell:"cell"},
            gridComplete: function() {
                if (typeof postGridComplete == 'function') postGridComplete();
            }
        });

        $.extend($.jgrid.edit, {
            recreateForm:true,
            closeAfterEdit:true,
            closeAfterAdd:true,
            savekey:[true,13],
            closeOnEscape:true,
            //serializeEditData:renamePostDataProperties,
            beforeShowForm:(typeof prepareFields == 'function' ? prepareFields : null),
            afterSubmit:resolveError
        });

        $.extend($.jgrid.del, {
            closeOnEscape:true
        });

        $.extend($.jgrid.search, {
            recreateFilter:true,
            closeAfterSearch:true,
            closeOnEscape:true,
            multipleSearch:true,
            groupOps:[{op:"AND",text:"所有"}]
        });

    }

    //$.datepicker.setDefaults({dateFormat:"yy-mm-dd"});
});

function yesNoFormatter(cellvalue, options, rowObject) {
    if (cellvalue == false) return "否";
    else return "是";
}

function yesNoUnformatter(cellvalue, options, cellobject) {
    if("否" == cellvalue) return "false";
    else return "true";
}

/**
 * Accept error response from server and resolve the error.
 *
 * @param response
 * @param postdata
 * @returns
 */
function resolveError(response, postdata) {
    return [response.result, response.message, 0];
}