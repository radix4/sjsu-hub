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
    private String id;

    // id of User who creates event
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

}