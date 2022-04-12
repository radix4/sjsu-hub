package com.sjsuhub.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TutoringSession {

    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Integer id;

    /* Tutor info */
    private String name;
    private String email;
    private String biography;
    private String contactInformation;

    /* Session info */
    private String title;
    private String course;
    private String availableTime;
    private String location;
    private boolean isTutor;    // distinguish between tutor or tutee post

    public TutoringSession(String name, String email, String biography, String contactInformation, String title, String course, String availableTime, String location, boolean isTutor) {
        this.name = name;
        this.email = email;
        this.biography = biography;
        this.contactInformation = contactInformation;
        this.title = title;
        this.course = course;
        this.availableTime = availableTime;
        this.location = location;
        this.isTutor = isTutor;
    }
}
