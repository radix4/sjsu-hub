package com.sjsuhub;

import com.sjsuhub.controllers.UserController;
import com.sjsuhub.entities.TutoringSession;
import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.EventRepository;
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

	@Autowired
	private EventRepository eventRepository;

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		/* Clean up database data */
		userRepository.deleteAll();
		tutoringSessionRepository.deleteAll();
		eventRepository.deleteAll();


		/* User table: Pre-configure data */
		final String KEY = "12dj192jd1902jdsnadfjasdf120iasdojasd";


		Set<String> friends = new HashSet<>();
		friends.add("Rhea@gmail.com");
		Set<String> friends2 = new HashSet<>();
		friends2.add("Luna@gmail.com");
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
				new TutoringSession( "Josh", "josh@sjsu.edu", "Expert in DS&Algo, a senior at SJSU", "(925) 123-1234", "Available for tutoring", "Data Structure and Algorithm", "Mon-Weds | 3 to 4 PM", "Online via Zoom", true);
		TutoringSession tutoringSession2 =
				new TutoringSession( "Rhea", "Rhea@sjsu.edu", "A fabulous Spartan student. Great at CS", "(408) 333 4444", "Tutee needed! Please contact for more info.", "Software Management", "Fri-Sat | 9 to 5 PM", "On-campus SJSU Library", true);
		TutoringSession tutoringSession3 =
				new TutoringSession( "Thang", "thang@sjsu.edu", "A struggling SWE student at SJSU, need tutor!", "(408) 333 4444", "Help needed for CS 101", "Intro to Computer Science", "Fri-Sat | 9 to 5 PM", "Online via Zoom", false);

		tutoringSessionRepository.save(tutoringSession);
		tutoringSessionRepository.save(tutoringSession2);
		tutoringSessionRepository.save(tutoringSession3);



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