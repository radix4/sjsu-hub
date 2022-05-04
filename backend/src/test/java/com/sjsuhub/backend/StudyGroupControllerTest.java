package com.sjsuhub.backend;


import com.sjsuhub.Main;
import com.sjsuhub.entities.StudyGroup;
import com.sjsuhub.repositories.StudyGroupRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import junit.extensions.TestSetup;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class StudyGroupControllerTest {
    @LocalServerPort
    private int port;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private StudyGroupRepository studyRepository;

    @Test
    public void addNewStudyGroup(){

        String studyGroupUrl = "http://localhost:" + port + "/studygroups/add";

        StudyGroup sg = new StudyGroup();

        String testString[] = new String[1];
        testString[1] = "test";

        sg.setSubject("test");
        sg.setDescription("test");
        sg.setMeetingDay("Monday");
        sg.setMeetingTime("5");
        sg.setMeridiem("PM");
        //check here
        sg.setMembers(testString);


        String response = this.restTemplate.postForObject(studyGroupUrl, sg, String.class);

        String expected = "Success! studygroup with subject " + sg.getSubject() + " is now created.";
        assertEquals(expected, response);



    }

    @Test
    public void getAllStudyGroups(){
        String getAllURL = "http://localhost:" + port + "/studygroups/all";

        ResponseEntity<StudyGroup[]> response = this.restTemplate.getForEntity(
                getAllURL, StudyGroup[].class
        );

        StudyGroup[] studyGroups = response.getBody();
        assertNotNull(studyGroups);
    }

    @Test
    public void getStudyGroupById(){

        String testString[] = new String[1];
        testString[1] = "test";
        StudyGroup sg = new StudyGroup();
        sg.setSubject("test");
        sg.setDescription("test");
        sg.setMeetingDay("Monday");
        sg.setMeetingTime("5");
        sg.setMeridiem("PM");
        //check here
        sg.setMembers(testString);
        int id =  studyRepository.save(sg).getId();

        String getOneUrl = "http://localhost:" + port + "/studygroups/" + id;

        StudyGroup sg2 = this.restTemplate.postForObject(getOneUrl, sg, StudyGroup.class);

        assertTrue(!sg2.equals(null));

    }

    @Test
    public void deleteStudyGroupById(){
        String testString[] = new String[1];
        testString[1] = "test";
        StudyGroup sg = new StudyGroup();
        sg.setSubject("test");
        sg.setDescription("test");
        sg.setMeetingDay("Monday");
        sg.setMeetingTime("5");
        sg.setMeridiem("PM");
        //check here
        sg.setMembers(testString);
        int id =  studyRepository.save(sg).getId();

        String deleteOneUrl = "http://localhost:" + port + "/studygroups/" + id + "delete";

        this.restTemplate.delete(deleteOneUrl);

        assertEquals(true, studyRepository.findById(id).isEmpty());
        assertTrue(studyRepository.findById(id).isEmpty());        
    }

    @Test
    public void joinStudyGroupById(){

        String testString[] = new String[1];
        testString[1] = "test";
        String newMember = "josh";


        StudyGroup sg = new StudyGroup();
        sg.setSubject("test");
        sg.setDescription("test");
        sg.setMeetingDay("Monday");
        sg.setMeetingTime("5");
        sg.setMeridiem("PM");
        //check here
        sg.setMembers(testString);
        int id =  studyRepository.save(sg).getId();

        String joinSgUrl = "http://localhost:" + port + "/studygroups/" + id + "join";

        this.restTemplate.put(joinSgUrl, sg, newMember);

        assertEquals(true, !(studyRepository.findById(id).get().getMembers() == null));
        
    }



}