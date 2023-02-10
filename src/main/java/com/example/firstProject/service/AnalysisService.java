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

    /** 테마 별 수익률 상위 4개 **/
    List<HashMap<String, Object>> getThemeTop4List(int themePk) throws Exception;

    /** 테마 별 투자 상세 내역 **/
    List<HashMap<String, Object>> getThemeBuyDetail(int parseInt, int userPk) throws Exception;

    /** 테마 별 주가 예측 **//*
    List<HashMap<String, Object>> getThemeForecast(int parseInt) throws Exception;*/
}
