package com.dameng;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerProperties;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
public class Application {
	@Autowired
	protected FreeMarkerProperties properties;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
