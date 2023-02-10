package com.example.firstProject.service;

import com.example.firstProject.dto.LoginData;

import java.util.HashMap;

/**
 * 사용자 서비스 - 인터페이스 클래스
 *
 * @author Choi Bo Kyung
 * @version 2023-01-23 최초생성
 *
 * <b>History:</b>
 **/

public interface UserService {

    /** 사용자 인증 요청(로그인) **/
    HashMap login(LoginData loginData) throws Exception;

}
