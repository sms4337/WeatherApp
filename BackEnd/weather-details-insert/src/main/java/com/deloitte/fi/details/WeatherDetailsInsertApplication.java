package com.deloitte.fi.details;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class WeatherDetailsInsertApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeatherDetailsInsertApplication.class, args);
	}
}
