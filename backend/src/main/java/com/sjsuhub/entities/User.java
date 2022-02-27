package com.sjsuhub.entities;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String email;
    private String firstName;
    private String lastName;
    private String password;

    /* Friends and Friend-Requests are mutually exclusive */

    @ElementCollection
    @CollectionTable(name = "user_friends", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "friends")
    private Set<String> friends = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "user_friend_requests", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "friend_requests")
    private Set<String> friendRequests = new HashSet<>();

    public User(String email, String firstName, String lastName, String password, Set<String> friends) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.friends = friends;
    }


    public User() {

    }

    public User(String email, Set<String> friends) {
        this.email = email;
        this.friends = friends;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getFriends() {
        return friends;
    }

    public void setFriends(Set<String> friends) {
        this.friends = friends;
    }

    public Set<String> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(Set<String> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public String toString() {
        return  "\n---User---\n" +
                "\nName: " + firstName + " " + lastName +
                "\nEmail: " + email +
                "\nPassword: " + password;
    }
}
