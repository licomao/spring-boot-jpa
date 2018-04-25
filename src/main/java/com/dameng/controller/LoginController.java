package com.dameng.controller;

import com.dameng.model.acl.CustUser;
import freemarker.ext.beans.BeansWrapper;
import freemarker.template.TemplateHashModel;
import freemarker.template.TemplateModelException;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

import java.util.Optional;

import static com.dameng.utils.CollectionUtil.*;

/**
 * Created by mdc on 2017/5/10.
 */
@Controller
public class LoginController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    @Transactional(readOnly = true)
    public ModelAndView index(HttpServletRequest request, @AuthenticationPrincipal CustUser user) {
        request.getSession().setAttribute("AUTHORITY", getAuthorityModel());
        request.getSession().setAttribute("user", user);
        return new ModelAndView("/index", map(entry("AUTHORITY", getAuthorityModel()), entry("user", user)));
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login(@RequestParam Optional<String> error) {
        return new ModelAndView("/login", map(
                entry("error", error)
        ));
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    @Transactional(readOnly = true)
    public ModelAndView index(@AuthenticationPrincipal CustUser user) {
        return new ModelAndView("/index", map(
                entry("AUTHORITY", getAuthorityModel()),
                entry("user", user)
        ));
    }


    public static TemplateHashModel getAuthorityModel() {
        BeansWrapper wrapper = BeansWrapper.getDefaultInstance();
        TemplateHashModel staticModels = wrapper.getStaticModels();
        TemplateHashModel fileStatics = null;
        try {
            fileStatics = (TemplateHashModel) staticModels.get("com.dameng.AuthorityConst");
        } catch (TemplateModelException e) {
            throw new RuntimeException("AuthorityConst is not found in classpath");
        }
        return fileStatics;
    }
}
