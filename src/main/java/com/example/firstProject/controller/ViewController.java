package com.example.firstProject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping(value = "/main")
    public String main() {
        return "main";
    }

    @GetMapping(value = "/calendar")
    public String calendar() {
        return "calendar";
    }
}
