package com.sjsuhub;

import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class Main implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}


	// test code
	@Override
	public void run(String... args) throws Exception {
		// Cleanup database tables.
		userRepository.deleteAll();

		Set<String> friends = new HashSet<>();
		friends.add("2");

		Set<String> friends2 = new HashSet<>();
		friends2.add("1");


		User user = new User("1", "1", "1", "1", friends);
		User user2 = new User("2", "2", "2", "2", friends2);


		userRepository.save(user);
		userRepository.save(user2);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/users/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/posts/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/friends/***").allowedOrigins("http://localhost:3000");
				// this should allow all endpoints from http://localhost:3000
				registry.addMapping("/***").allowedOrigins("http://localhost:3000");
			}
		};
	}

}
