package com.example.firstProject.service;

import com.example.firstProject.mapper.AnalysisMapper;
import com.example.firstProject.util.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

/**
 * ILMS : 주가 분석 서비스 - 구현 클래스
 *
 * @author Choi Bo Kyung
 * @version 2023-01-23 최초생성
 *
 * <b>History:</b>
 **/

@Service
public class AnalysisServiceImpl implements AnalysisService {

    private AnalysisMapper analysisMapper;

    @Autowired
    public void setAnalysisMapper(AnalysisMapper analysisMapper) {
        this.analysisMapper = analysisMapper;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public List<HashMap<String, Object>> getThemeList() throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getThemeList();
        return ObjectUtils.keyToCamelCase(result);
    }

    @Override
    public List<HashMap<String, Object>> getStockList(int themePk) throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getStockList(themePk);
        return ObjectUtils.keyToCamelCase(result);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public List<HashMap<String, Object>> getThemeTop4List(int themePk) throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getThemeTop4List(themePk);
        return ObjectUtils.keyToCamelCase(result);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public List<HashMap<String, Object>> getThemeBuyDetail(int themePk, int loginUserPk) throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getThemeBuyDetail(themePk, loginUserPk);
        return ObjectUtils.keyToCamelCase(result);
    }

    /*@Override
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public List<HashMap<String, Object>> getThemeForecast(int themePk) throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getThemeForecast(themePk);
        return ObjectUtils.keyToCamelCase(result);
    }*/
}
