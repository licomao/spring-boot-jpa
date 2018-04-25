package com.dameng.controller;


import com.dameng.model.acl.CustUser;
import com.dameng.repository.CustUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    CustUserRepository custUserRepository;

    @RequestMapping("/hello")
    public String index(@AuthenticationPrincipal CustUser user) {
        CustUser custUser = new CustUser();
        custUser.username = "aaaa";
        custUser.password = "111111111";
        custUserRepository.save(custUser);
        System.out.println("111");
        return "Hello World";
    }

}