package com.deloitte.fi.bulkinsert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.deloitte.fi.bulkinsert.model.FileStorageProperties;

@EnableConfigurationProperties({
        FileStorageProperties.class
})

@EnableDiscoveryClient
@SpringBootApplication
public class WeatherDetailsBulkInsertApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeatherDetailsBulkInsertApplication.class, args);
	}
}
