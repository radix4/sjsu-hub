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


    public void setName(String name){
        this.name = name;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setBiography(String biography){
        this.biography = biography;
    }
    public void setContactInformation(String contactInformation){
        this.contactInformation = contactInformation;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public void setCourse(String course){
        this.course = course;
    }
    public void setAvailableTime(String availableTime){
        this.availableTime = availableTime;
    }
    public void setLocation(String location){
        this.location = location;
    }
    public void setTutor(boolean isTutor){
        this.isTutor = isTutor;
    }
    public String getName(){
        return name;
    }
    public String getEmail(){
        return email;
    }
    public String getBiography(){
        return biography;
    }
    public String getContactInformation(){
        return contactInformation;
    }
    public String getTitle(){
        return title;
    }
    public String getCourse(){
        return course;
    }
    public String getAvailableTime(){
        return availableTime;
    }
    public String getLocation(){
        return location;
    }
    public boolean isTutor(){
        return isTutor;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public Integer getId(){
        return id;
    }

    
}
