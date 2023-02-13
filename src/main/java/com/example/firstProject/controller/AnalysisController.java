package com.example.firstProject.controller;

import com.example.firstProject.dto.DummyData;
import com.example.firstProject.dto.LoginData;
import com.example.firstProject.service.AnalysisService;
import com.example.firstProject.util.ObjectUtils;
import com.example.firstProject.util.ReturnCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

/**
* 주가 분석 화면용 콘트롤러
*
* @author Choi Bo Kyung
* @version 2023-01-22 최초생성
*
* <b>History:</b>
**/

@Slf4j
@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    /*@Autowired
    public void setAnalysisService(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }*/

    /**
    * 테마 목록 조회
    **/
    @GetMapping(value = "/theme", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getTheme(HttpServletRequest request, HttpSession session) throws Exception{

        List<HashMap<String,Object>> themeList = analysisService.getThemeList();
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("themeList", themeList);
        return res;
    }

    /** 테마 별 주식 목록 조회  **/
    @GetMapping(value = "/stock/{themePk}", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getStockList(@PathVariable String themePk, HttpServletRequest request, HttpSession session) throws Exception{

        if(!ObjectUtils.isNumber(themePk, true)) return ReturnCode.E_400.getHashMap();

        List<HashMap<String,Object>> stockList = analysisService.getStockList(Integer.parseInt(themePk));
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("stockList", stockList);
        return res;
    }


    /**
     * 테마 별 수익률 상위 4개 - 특정 테마
     **/
    @GetMapping(value = "/theme/top4/{themePk}", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getThemeTop4Each(@PathVariable String themePk, HttpServletRequest request, HttpSession session) throws Exception{

        if(!ObjectUtils.isNumber(themePk, true)) return ReturnCode.E_400.getHashMap();

        List<HashMap<String,Object>> top4List = analysisService.getThemeTop4List(Integer.parseInt(themePk));
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("top4List", top4List);
        return res;
    }

    /**
     * 테마 별 수익률 상위 4개 - 전체 테마
     **/
    @GetMapping(value = "/theme/top4/all", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getThemeTop4All(HttpServletRequest request, HttpSession session) throws Exception{

        List<HashMap<String,Object>> themeList = analysisService.getThemeTop4ListAll();
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("themeList", themeList);
        return res;
    }

    /** 최근 10일 주가 조회 **/
    @GetMapping(value = "/analysis/{stockPk}", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getStock10Days(@PathVariable String stockPk, HttpServletRequest request, HttpSession session) throws Exception{

        if(!ObjectUtils.isNumber(stockPk, true)) return ReturnCode.E_400.getHashMap();

        List<HashMap<String,Object>> stock10Days = analysisService.getStock10Days(Integer.parseInt(stockPk));
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("stock10Days", stock10Days);
        return res;
    }

    /** 크롤링 데이터 전체 조회 **/
    @GetMapping(value = "/crawling", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getCrawling( HttpServletRequest request, HttpSession session) throws Exception{

        List<HashMap<String,Object>> crawlingList = analysisService.getCrawling();
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("crawlingList", crawlingList);
        return res;
    }

    /** 개별 종목 dummy 데이터 전체 조회 **/
    @PostMapping(value = "/dummy", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> getDummy(@RequestBody DummyData dummyData, HttpServletRequest request, HttpSession session) throws Exception{

        List<HashMap<String,Object>> dummyList = analysisService.getDummy(dummyData.getName());
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.put("dummyList", dummyList);
        return res;
    }


}

