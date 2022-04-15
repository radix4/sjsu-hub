package com.sjsuhub;

import com.sjsuhub.controllers.UserController;
import com.sjsuhub.entities.TutoringSession;
import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.TutoringSessionRepository;
import com.sjsuhub.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@Configuration
public class Main implements CommandLineRunner {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TutoringSessionRepository tutoringSessionRepository;

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		/* Clean up database data */
		userRepository.deleteAll();
		tutoringSessionRepository.deleteAll();


		/* User table: Pre-configure data */
		final String KEY = "12dj192jd1902jdsnadfjasdf120iasdojasd";


		Set<String> friends = new HashSet<>();
		friends.add("Rhea");
		Set<String> friends2 = new HashSet<>();
		friends2.add("Luna");
		User user = new User("Luna@gmail.com", "Luna", "Aliaj", UserController.hmac_sha256(KEY, "Luna"), friends);
		User user2 = new User("Rhea@gmail.com", "Rhea", "Dash", UserController.hmac_sha256(KEY, "Rhea"), friends2);
		userRepository.save(user);
		userRepository.save(user2);

		userRepository.save(new User("Lun333a@gmail.com", "Luna", "Aliaj", "secretLuna", friends));
		userRepository.save(new User("Luna444@gmail.com", "Luna", "Aliaj", "secretLuna", friends));
		userRepository.save(new User("Luna555@gmail.com", "Luna", "Aliaj", "secretLuna", friends));
		userRepository.save(new User("Luna666@gmail.com", "Luna", "Aliaj", "secretLuna", friends));

		/* Tutoring Session table: Pre-configure data */
		TutoringSession tutoringSession =
				new TutoringSession( "test1", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);
		TutoringSession tutoringSession2 =
				new TutoringSession( "test2", "test2", "test2", "test2", "test2", "test2", "test2", "test2", false);

		tutoringSessionRepository.save(tutoringSession);
		tutoringSessionRepository.save(tutoringSession2);




	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/users/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/posts/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/friends/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/friends/send-request/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/friends/getAllFriends/*").allowedOrigins("http://localhost:3000");
				registry.addMapping("/*").allowedOrigins("http://localhost:3000");
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
				registry.addMapping("/***").allowedOrigins("http://localhost:3000");
				registry.addMapping("/***")
						.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
			}
		};
	}

}