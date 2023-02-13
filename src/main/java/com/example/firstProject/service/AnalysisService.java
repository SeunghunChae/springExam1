package com.example.firstProject.service;

import java.util.HashMap;
import java.util.List;

/**
* 주가 분석 서비스 - 인터페이스 클래스
*
* @author Choi Bo Kyung
* @version 2023-01-23 최초생성
*
* <b>History:</b>
**/

public interface AnalysisService {

    /** 테마 목록 조회 **/
    List<HashMap<String, Object>> getThemeList() throws Exception;

    /** 테마별 주식 목록 조회 **/
    List<HashMap<String, Object>> getStockList(int themePk) throws Exception;

    /** 테마 별 수익률 상위 4개 - 특정 테마 **/
    List<HashMap<String, Object>> getThemeTop4List(int themePk) throws Exception;

    /** 테마 별 수익률 상위 4개 - 전체 테마 **/
    List<HashMap<String, Object>> getThemeTop4ListAll() throws Exception;

    /** 최근 10일 주가 조회 **/
    List<HashMap<String, Object>> getStock10Days(int stockPk) throws Exception;

    /** 크롤링 데이터 전체 조회 **/
    List<HashMap<String, Object>> getCrawling() throws Exception;

    /** 개별 종목 dummy 데이터 - 이름으로 조회 **/
    List<HashMap<String, Object>> getDummy(String name) throws Exception;

    /** 개별 종목 dummy 데이터 - 전체 조회 **/
    List<HashMap<String, Object>> getDummyAll() throws Exception;
}
