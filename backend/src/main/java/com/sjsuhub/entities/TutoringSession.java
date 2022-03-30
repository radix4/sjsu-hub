package com.sjsuhub.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class TutoringSession {

    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Integer id;
    private String email;
    private String title;
    private String course;
    private String availableTime;
    private String location;
    private String biography;
    private String goal;
    private String contactInformation;
    private boolean isTutor;    // distinguish between tutor or tutee post

}
