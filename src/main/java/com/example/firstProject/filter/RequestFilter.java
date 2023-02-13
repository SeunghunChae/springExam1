package com.example.firstProject.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
* DL IIMP : 리퀘스트 필터, 로그 
*
* @author Choi Bo Kyung
* @version 2022-02-07 최초생성
*
* <b>History:</b>
**/


@Slf4j
@Order(Ordered.LOWEST_PRECEDENCE -1)
@PropertySource("classpath:system.properties")
@Component
public class RequestFilter implements Filter {

    @Value("${non_log_list}")
    private String nonLogList;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String url = httpServletRequest.getRequestURL().toString();
        String uri = httpServletRequest.getRequestURI();
        String host = httpServletRequest.getRemoteHost();
        String methodType = httpServletRequest.getMethod();

        RequestWrapper bufferedRequest = new RequestWrapper((HttpServletRequest) request); //XSS filter 포함
        ResponseWrapper bufferedResponse = new ResponseWrapper((HttpServletResponse) response);

        /** LOG **/

        boolean logWrite = true;
        StringBuilder logSb = new StringBuilder();
        String[] nonLogLists = nonLogList.split(","); //로그 제외 url

        for (String str : nonLogLists) {
            if(url.contains(str) || uri.equals("/")){ logWrite = false; }
        }

        if(logWrite){

            logSb.append("\n-------------------------------------------------------------------");
            logSb.append("\nRequest URL         : ").append(url);
            logSb.append("\nRequest URI         : ").append(((HttpServletRequest) request).getRequestURI());
            logSb.append("\nRemote Host         : ").append(host);
            logSb.append("\nmethod              : ").append(methodType);
            logSb.append("\nRequest Parameter   : ").append(bufferedRequest.getAllParameters());
            logSb.append("\nRequest Body        : ").append(bufferedRequest.getInputStream().toString());
        }

        //다음 진행 실행 (기존 req, res 를 수정된 것으로 대체함)
        chain.doFilter(bufferedRequest, bufferedResponse);

        if (logWrite) {
            logSb.append("\nResponse Parameter  : ").append(bufferedResponse.getContent());
            log.info(logSb.toString());
        }

    }
}
