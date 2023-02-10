package com.example.firstProject.controller;

import com.example.firstProject.dto.LoginData;
import com.example.firstProject.service.UserService;
import com.example.firstProject.util.ReturnCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;

/**
 * 사용자 콘트롤러
 *
 * @author Choi Bo Kyung
 * @version 2023-01-22 최초생성
 *
 * <b>History:</b>
 **/

@Slf4j
@RestController
@RequestMapping(value = "/api")
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     *사용자 인증 요청(로그인)
     **/
    @PostMapping(value = "/login", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> login(@RequestBody @Valid LoginData loginData, HttpServletRequest request, HttpSession session) throws Exception{

        //디비 조회
        HashMap<String,Object> loginResult = userService.login(loginData);

        //사용자 없음
        if(loginResult == null || loginResult.size() == 0) return ReturnCode.E_400.getHashMap();

        //세션 설정
        session.setAttribute("loginUserPk", loginResult.get("userPk").toString());
        session.setAttribute("loginUserId", loginResult.get("userId").toString());
        session.setAttribute("loginUserName", loginResult.get("userName").toString());

        //사용자 정보 담아서 응답
        HashMap<String,Object> res = ReturnCode.S_0.getHashMap();
        res.putAll(loginResult);
        return res;
    }

    /**
     *사용자 인증 삭제(로그아웃)
     **/
    @DeleteMapping(value = "/logout", produces="application/json; charset=utf-8")
    @ResponseBody
    public HashMap<String,Object> logout(HttpServletRequest request, HttpSession session) throws Exception{

        //세션 삭제
        session.invalidate();
        return ReturnCode.S_0.getHashMap();
    }





}

