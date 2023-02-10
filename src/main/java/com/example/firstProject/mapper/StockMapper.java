package com.example.firstProject.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface StockMapper {

    List<Map<String, Object>> fetch() throws Exception;

}
