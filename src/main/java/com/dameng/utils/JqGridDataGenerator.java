package com.dameng.utils;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

import static com.dameng.utils.CollectionUtil.*;


public class JqGridDataGenerator {

    public static Map<String, Object> getDataJson(Page page) {
        return map(
                entry("total", page.getTotalPages()),
                entry("page", page.getNumber()+1),
                entry("records", page.getTotalElements()),
                entry("rows", page.getContent())
        );
    }

    public static Map<String, Object> getNativeDataJson(List list,int total,int rows,int page){
//        int pageTotal = (total/rows) +1;
        int pageTotal = (total+rows-1)/rows;
        return map(
                entry("total", pageTotal),
                entry("page", page),
                entry("records", total),
                entry("rows", list)
        );
    }

}
