package com.sjsuhub.entities;

import lombok.Data;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity // This tells Hibernate to make a table out of this class
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    // @Id
    @Column(unique = true)
    private String email;
    private String firstName;
    private String lastName;
    private String password;

    /* Friends and Friend-Requests are mutually exclusive */

    @ElementCollection
    @CollectionTable(name = "friends", joinColumns = {@JoinColumn(name = "email", referencedColumnName = "email")})
    @Column(name = "friends")
    private Set<String> friends = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "friend_requests", joinColumns = { @JoinColumn(name = "email", referencedColumnName = "email")})
    @Column(name = "friend_requests")
    private Set<String> friendRequests = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "sent_friend_requests", joinColumns = { @JoinColumn(name = "email", referencedColumnName = "email")})
    @Column(name = "sent_friend_requests")
    private Set<String> sentFriendRequests = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "createdEvents", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "createdEvents")
    private Set<String> createdEvents = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "eventsAttending", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "eventsAttending")
    private Set<String> eventsAttending = new HashSet<>();

    public User() {
    }

    public User(String email, String firstName, String lastName, String password, Set<String> friends) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.friends = friends;
    }

    // public String toString() {
    //     String s = "";
    //     s += "Name: " +  this.firstName + " " + this.lastName + "\n";

    // }


    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password){
        this.password = password;
    }


    public void setFriends(Set<String> friends){
        this.friends = friends;
    }

    public Set<String> getFriends(){
        return friends;
    }

    public void setFriendRequests(Set<String> friendRequests){
        this.friendRequests = friendRequests;
    }

    public Set<String> getFriendRequests(){
        return friendRequests;
    }

    public void setSentFriendRequests(Set<String> sentFriendRequests){
        this.sentFriendRequests = sentFriendRequests;
    }

    public Set<String> getSentFriendRequests(){
        return sentFriendRequests;
    }

    public void setCreatedEvents(Set<String> createdEvents){
        this.createdEvents = createdEvents;
    }

    public Set<String> getCreatedEvents(){
        return createdEvents;
    }

    public void setEventsAttending(Set<String> eventsAttending){
        this.eventsAttending = eventsAttending;
    }

    public Set<String> getEventsAttending(){
        return eventsAttending;
    }

    





    

}
