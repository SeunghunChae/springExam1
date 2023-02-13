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
    public List<HashMap<String, Object>> getThemeTop4ListAll() throws Exception {

        // 전체 테마 리스트
        List<HashMap<String,Object>> themeListOriginal = analysisMapper.getThemeList();
        List<HashMap<String,Object>> themeList = ObjectUtils.keyToCamelCase(themeListOriginal);

        // 테마 pk 별로 top4 리스트 조회 후, map 에 추가
        for (HashMap<String, Object> theme : themeList) {
            int themePk = Integer.parseInt(theme.get("no").toString());
            List<HashMap<String,Object>> top4List = analysisMapper.getThemeTop4List(themePk);
            theme.put("top4List",ObjectUtils.keyToCamelCase(top4List));
        }
        return themeList;
    }

    /** 최근 10일 주가 조회 **/
    @Override
    public List<HashMap<String, Object>> getStock10Days(int stockPk) throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getStock10Days(stockPk);
        return ObjectUtils.keyToCamelCase(result);
    }

    /** 크롤링 데이터 전체 조회 **/
    @Override
    public List<HashMap<String, Object>> getCrawling() throws Exception {
        List<HashMap<String,Object>> result = analysisMapper.getCrawling();
        return ObjectUtils.keyToCamelCase(result);
    }
}
