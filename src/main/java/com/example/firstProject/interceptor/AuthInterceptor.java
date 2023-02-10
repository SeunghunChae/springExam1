package com.example.firstProject.interceptor;

import com.example.firstProject.exception.UnauthorizedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
* ILMS :  권한 관리 인터셉터
*     
* @author Choi Bo Kyung
* @version 2022-02-08 최초생성
* 
* <b>History:</b>
**/


@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(
			HttpServletRequest request,
			HttpServletResponse response,
			Object handler) throws Exception {

		//세션이 유효 하지 않다면, 인증 권한 만료 --> 로그인 페이지로
		if (!request.isRequestedSessionIdValid()) {
			throw new UnauthorizedException();
		}

		//Controller 의 method 가 아니면, 다음 chain 진행
		if(!(handler instanceof HandlerMethod)) return true;

		return true;
	}
}

