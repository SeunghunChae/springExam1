package com.example.firstProject.config;

import com.example.firstProject.interceptor.AuthInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
* ILMS : XSS필터, 인터셉터, CORS 매핑
*
* @author Choi Bo Kyung
* @version 2021-02-03 최초생성
*
* <b>History:</b>
**/

@Configuration
@PropertySource("classpath:system.properties")
public class WebMvcConfig implements WebMvcConfigurer {

    private static AuthInterceptor authInterceptor;

    @Autowired
    public void setAuthInterceptor(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Value("${non_auth_list}")
    private String nonAuthList;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //권한 체크 인터셉터 설정
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(nonAuthList.split(","));
    }

    // 404 발생시 index.html 로 이동시키는 코드
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/notFound").setViewName("forward:/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name());
    }    
}
