package com.example.firstProject.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Digits;

/**
 * 더미데이터 data
 *
 * @author Choi Bo Kyung
 * @version 2023-02-13 최초생성
 *
 * <b>History:</b>
 **/

@Data
public class DummyData {

    /** 더미데이터 주식 이름 **/
    @Length(min = 1, max = 100)
    private String name;

}
