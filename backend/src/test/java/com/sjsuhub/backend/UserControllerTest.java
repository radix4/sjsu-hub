package com.sjsuhub.backend;

import com.sjsuhub.Main;
import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void login() {
        String loginUrl = "http://localhost:" + port + "/users/login";

        /* Case 1: Expect success */
        User user = new User();
        user.setEmail("Luna@gmail.com");
        user.setPassword("Luna");

        String response = this.restTemplate.postForObject(loginUrl, user, String.class);

        assertEquals(user.getEmail(), response);

        /* Case 2: Expect fail, user doesn't exist */
        User user2 = new User();
        user2.setEmail("notexist@gmail.com");
        user2.setPassword("notexist");

        String response2 = this.restTemplate.postForObject(loginUrl, user2, String.class);

        assertEquals("Fail", response2);

        /* Case 2: Expect fail, wrong password */
        User user3 = new User();
        user3.setEmail("Luna@gmail.com");
        user3.setPassword("wrongpass");

        String response3 = this.restTemplate.postForObject(loginUrl, user3, String.class);

        assertEquals("Fail", response3);
    }


    @Test
    public void addNewUser() {
        String addNewUserURL = "http://localhost:" + port + "/users/add";

        /* Case 1: Expect success */
        User user = new User();
        user.setEmail("testaddnewuser@gmail.com");
        user.setPassword("test");

        String response = this.restTemplate.postForObject(addNewUserURL, user, String.class);

        String expected = "Success! User with email " + user.getEmail() + " is now registered.";
        assertEquals(expected, response);


        /* Case 2: Expect fail */
        User user2 = new User();
        user2.setEmail("");
        user2.setPassword("");

        String response2 = this.restTemplate.postForObject(addNewUserURL, user2, String.class);

        String expected2 = "Fail to create user.";
        assertEquals(expected2, response2);

        /* Case 3: Expect fail */
        User user3 = new User();
        user3.setEmail("asdfsd");
        user3.setPassword("");

        String response3 = this.restTemplate.postForObject(addNewUserURL, user3, String.class);

        String expected3 = "Fail to create user.";
        assertEquals(expected3, response3);


        /* Case 4: Expect fail */
        User user4 = new User();
        user4.setEmail("");
        user4.setPassword("asdfasd");

        String response4 = this.restTemplate.postForObject(addNewUserURL, user4, String.class);

        String expected4 = "Fail to create user.";
        assertEquals(expected4, response4);
    }


}