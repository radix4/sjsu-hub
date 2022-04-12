package com.sjsuhub.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.sjsuhub.Main;
import com.sjsuhub.entities.TutoringSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;



@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class TutoringSessionControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    public void getAll() {
        String getAllURL = "http://localhost:" + port + "/tutoring-sessions";

        ResponseEntity<TutoringSession[]> response = this.restTemplate.getForEntity(
                getAllURL, TutoringSession[].class
        );

        TutoringSession[] tutoringSessions = response.getBody();
        assertEquals(2, tutoringSessions.length);

    }


    @Test
    public void addOne() {
        String addOneUrl = "http://localhost:" + port + "/tutoring-sessions";

        TutoringSession tutoringSession =
                new TutoringSession( "test1", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);


        TutoringSession response = this.restTemplate
                .postForObject(addOneUrl, tutoringSession, TutoringSession.class);

        assertEquals(tutoringSession.getName(), response.getName());
        assertEquals(tutoringSession.getEmail(), response.getEmail());
        assertEquals(tutoringSession.getBiography(), response.getBiography());
        assertEquals(tutoringSession.getContactInformation(), response.getContactInformation());
        assertEquals(tutoringSession.getTitle(), response.getTitle());
        assertEquals(tutoringSession.getCourse(), response.getCourse());
        assertEquals(tutoringSession.getAvailableTime(), response.getAvailableTime());
        assertEquals(tutoringSession.getLocation(), response.getLocation());
        assertEquals(tutoringSession.isTutor(), response.isTutor());
    }


}