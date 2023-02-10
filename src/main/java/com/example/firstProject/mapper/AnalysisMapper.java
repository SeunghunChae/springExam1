package com.example.firstProject.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

/**
* 주가 분석 맵퍼 - 인터페이스 클래스
*
* @author Choi Bo Kyung
* @version 2023-01-23 최초생성
*
* <b>History:</b>
**/

@Mapper
public interface AnalysisMapper {

    List<HashMap<String, Object>> getThemeList() throws Exception;

    List<HashMap<String, Object>> getStockList(int themePk) throws Exception;

    List<HashMap<String, Object>> getThemeTop4List(int themePk) throws Exception;

    List<HashMap<String, Object>> getThemeBuyDetail(@Param("themePk") int themePk, @Param("loginUserPk")int loginUserPk) throws Exception;
}
