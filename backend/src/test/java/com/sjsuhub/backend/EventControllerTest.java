package com.sjsuhub.backend;

import com.sjsuhub.Main;
import com.sjsuhub.repositories.EventRepository;
import com.sjsuhub.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class EventControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Test
    public void addNewEvent() {

    }

    @Test
    public void getAllEvent() {
        
    }

    @Test
    public void deleteEvent() {
        
    }

    @Test
    public void attend() {
        
    }

    @Test
    public void unattend() {
        
    }

    @Test
    public void updateEvent() {
        
    }
}
