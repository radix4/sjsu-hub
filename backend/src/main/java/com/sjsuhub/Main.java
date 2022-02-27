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
		friends.add("friend1@gmail.com");
		friends.add("friend2@gmail.com");
		friends.add("friend3@gmail.com");

		Set<String> friendRequests = new HashSet<>();
		friendRequests.add("friendrequest1@gmail.com");
		friendRequests.add("friendrequest2@gmail.com");
		friendRequests.add("friendrequest3@gmail.com");

		User user = new User("email", "ln", "fn", "pw", friends, friendRequests);
		User user2 = new User("email2", "ln", "fn", "pw", friends, friendRequests);


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
			}
		};
	}

}
