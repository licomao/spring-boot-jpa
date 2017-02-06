package com.decheng.util;

/**
 * Created by wenjie on 2016/7/28.
 */
public class ExcelExportVehicleInfo {

    @ExcelVOAttribute(name = "车牌号", column = "A", isExport = true)
    public String plateNumber;

    @ExcelVOAttribute(name = "姓名", column = "B", isExport = true)
    public String name;

    @ExcelVOAttribute(name = "性别", column = "C", isExport = true)
    public String gender;

    @ExcelVOAttribute(name = "联系方式", column = "D", isExport = true)
    public String mobile;

    @ExcelVOAttribute(name = "品牌", column = "E", isExport = true)
    public String brand;

    @ExcelVOAttribute(name = "车型", column = "F", isExport = true)
    public String version;


}
