package com.example.demo;

import javax.servlet.annotation.WebServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

//	@Bean
//	public ServletRegistrationBean mysqlServletRegistrationBean() {
//		ServletRegistrationBean registrationBean =
//				new ServletRegistrationBean(new WebServlet());
//		registrationBean.addUrlMappings("/console/*");
//		return registrationBean;
//	}

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);

	}
}
