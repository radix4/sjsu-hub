package com.sjsuhub.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class StudyGroup {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    //id is universal?
    private String subject;
    private String description;
    private String meetingDay; //date?
    private String meetingTime; 
    private String meridiem;
    private String[] members; // users object import? //maybe change to arraylist?

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getSubject(){
        return subject;
    }

    public void setSubject(String subject){
        this.subject = subject;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }

    public String getMeetingDay(){
        return meetingDay;
    }

    public void setMeetingDay(String meetingDay){
        this.meetingDay = meetingDay;
    }

    public String getMeetingTime(){
        return meetingTime;
    }

    public void setMeetingTime(String meetingTime){
        this.meetingTime = meetingTime;
    }

    public String getMeridiem(){
        return meridiem;
    }

    public void setMeridiem(String meridiem){
        this.meridiem = meridiem;
    }

    public String[] getMembers(){
        return members;
    }

    public void setMembers(String[] members){
        this.members = members;
    }

    public String toString(){
        return  "\n---Post---\n" +
                "\nID: " + id + " " +
                "\nSubject: " + subject + 
                "\nDescription: " + description + 
                "\nMeetingDay: " + meetingDay;
    }







}
