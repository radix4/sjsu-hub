package com.sjsuhub.entities;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@Data
@Entity

public class Event {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    // creator email
    private String creator;
    private String title;
    private String description;

    // table of ids of users who are attending
    @ElementCollection
    @CollectionTable(name = "attendees", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "attendees")
    private Set<String> attendees = new HashSet<>();

    private double latdegrees;
    private String latdir;
    private double longdegrees;
    private String longdir;

    private String start;
    private String end;


    /*

        HAD ERRORS ON MY END SO CREATING GETTOR/SETTERS
    */

    public void setAttendees(Set<String> attendees){
        this.attendees = attendees;
    }

    public Set<String> getAttendees(){
        return attendees;
    }


    public void setCreator(String creator){
        this.creator = creator;
    }

    public String getCreator(){
        return creator;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getTitle(){
        return title;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }

    public void setLatdegrees(double latdegrees){
        this.latdegrees = latdegrees;
    }

    public double getLatdegrees(){
        return latdegrees;
    }

    public void setLatdir(String latdir){
        this.latdir = latdir;
    }

    public String getLatdir(){
        return latdir;
    }

    public void setLongdegrees(double longdegrees){
        this.longdegrees = longdegrees;
    }

    public double getLongdegrees(){
        return longdegrees;
    }

    public void setLongdir(String longdir){
        this.longdir = longdir;
    }

    public String getLongdir(){
        return longdir;
    }

    public void setStart(String start){
        this.start = start;
    }

    public String getStart(){
        return start;
    }

    public void setEnd(String end){
        this.end = end;
    }

    public String getEnd(){
        return end;
    }

    public Integer getId(){
        return id;
    }




}