package com.sjsuhub.backend;

import com.sjsuhub.Main;
import com.sjsuhub.controllers.ChatController;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)

public class ChatControllerTest {
    @Autowired
    private ChatController controller;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void greetingDefaultMessage() throws Exception {
        assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/ws",
                String.class)).contains("Welcome to SockJS!");
    }

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

}
