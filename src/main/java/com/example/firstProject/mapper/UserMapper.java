package com.example.firstProject.mapper;

import com.example.firstProject.dto.LoginData;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

/**
 * 사용자 맵퍼 - 인터페이스 클래스
 *
 * @author Choi Bo Kyung
 * @version 2023-01-23 최초생성
 *
 * <b>History:</b>
 **/

@Mapper
public interface UserMapper {

    HashMap login(LoginData loginData) throws Exception;

}
