package com.decheng;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.util.Properties;

@Configuration
@ControllerAdvice
public class WebConfig extends WebMvcConfigurerAdapter {

    @Autowired
    protected FreeMarkerProperties properties;

//    @Autowired
//    private SessionInitializationInterceptor sessionInitializationInterceptor;
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(sessionInitializationInterceptor);
//    }

    @InitBinder
    public void binder(WebDataBinder binder) {
        binder.initDirectFieldAccess();
        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
    }

    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource resource = new ResourceBundleMessageSource();
        resource.setBasename("messages");
        return resource;
    }

    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPaths(this.properties.getTemplateLoaderPath());
        configurer.setPreferFileSystemAccess(false); // this is all we need
        configurer.setDefaultEncoding(this.properties.getCharset().toString());
        Properties settings = new Properties();
        settings.putAll(this.properties.getSettings());
        configurer.setFreemarkerSettings(settings);
        return configurer;
    }

    //*************************************************************************
    // Class Definition
    //*************************************************************************

}
