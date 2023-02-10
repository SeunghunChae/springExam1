package com.example.firstProject.service;

import com.example.firstProject.mapper.StockMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StockService {

    private final StockMapper mapper;

    public StockService(StockMapper mapper) {
        this.mapper = mapper;
    }

    public List<Map<String, Object>> fetch() throws Exception {
        return mapper.fetch();
    }
}
