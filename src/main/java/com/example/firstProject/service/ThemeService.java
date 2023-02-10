package com.example.firstProject.service;

import com.example.firstProject.mapper.StockMapper;
import com.example.firstProject.mapper.ThemeMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ThemeService {

    private final ThemeMapper mapper;

    public ThemeService(ThemeMapper mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, Object>> fetch() throws Exception {
        return mapper.fetch();
    }
}
