package com.decheng.util;

/**
 * Created by mdc on 2016/04/22.
 */
public class ExcelImportCustomerStockItem {

    @ExcelVOAttribute(name = "商品名称", column = "A")
    public String name;

    @ExcelVOAttribute(name = "品牌名称", column = "B")
    public String brandName;

    @ExcelVOAttribute(name = "顶级分类", column = "C")
    public String rootCategory;

    @ExcelVOAttribute(name = "二级分类", column = "D")
    public String secondaryCategory;

    @ExcelVOAttribute(name = "条形码", column = "E")
    public String barCode;

    @ExcelVOAttribute(name = "供应商", column = "F")
    public String supplier;

    @ExcelVOAttribute(name = "结算状态", column = "G")
    public String payType;

    public long line;

    @Override
    public String toString() {
        return "";
    }
}
