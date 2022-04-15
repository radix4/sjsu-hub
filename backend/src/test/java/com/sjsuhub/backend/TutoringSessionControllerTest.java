package com.sjsuhub.backend;

import com.sjsuhub.Main;
import com.sjsuhub.entities.TutoringSession;
import com.sjsuhub.repositories.TutoringSessionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class TutoringSessionControllerTest
{
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TutoringSessionRepository tutoringSessionRepository;


    @Test
    public void getAll() {
        String getAllURL = "http://localhost:" + port + "/tutoring-sessions";

        ResponseEntity<TutoringSession[]> response = this.restTemplate.getForEntity(
                getAllURL, TutoringSession[].class
        );

        TutoringSession[] tutoringSessions = response.getBody();
        assertNotNull(tutoringSessions);
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


    @Test
    public void updateOne() {
        TutoringSession session =
                new TutoringSession( "test1", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);
        int id =  tutoringSessionRepository.save(session).getId();

        String updateOneUrl = "http://localhost:" + port + "/tutoring-sessions/" + id;

        TutoringSession updatedSession = new TutoringSession( "updated name", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);

        HttpEntity<TutoringSession> requestUpdate = new HttpEntity<>(updatedSession);

        HttpEntity<TutoringSession> response = this.restTemplate
                .exchange(updateOneUrl, HttpMethod.PUT, requestUpdate, TutoringSession.class);
        // need to cast HttpEntity to POJO
    }


    @Test
    public void deleteOne() {
        TutoringSession session =
                new TutoringSession( "test1", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);
        int id =  tutoringSessionRepository.save(session).getId();

        String deleteOneUrl = "http://localhost:" + port + "/tutoring-sessions/" + id;

        this.restTemplate.delete(deleteOneUrl);

        assertEquals(true, tutoringSessionRepository.findById(id).isEmpty());
        assertTrue(tutoringSessionRepository.findById(id).isEmpty());
    }

    @Test
    public void deleteAll() {
        String deleteOneUrl = "http://localhost:" + port + "/tutoring-sessions/";
        this.restTemplate.delete(deleteOneUrl);

        assertEquals(true, tutoringSessionRepository.findById(0).isEmpty());
    }

}