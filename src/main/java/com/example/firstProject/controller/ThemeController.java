package com.example.firstProject.controller;

import com.example.firstProject.service.StockService;
import com.example.firstProject.service.ThemeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class ThemeController {

    private final ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping(value = "/theme")
    @ResponseBody
    public List<Map<String, Object>> fetch() throws Exception {
        return themeService.fetch();
    }
}
