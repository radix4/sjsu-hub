package com.sjsuhub.entities;

import java.io.Serializable;

public class Comment implements Serializable{
    private String comment;
    private String userEmail;

    public Comment(String comment, String userEmail){
        this.comment = comment;
        this.userEmail = userEmail;
    }

    public void setComment(String comment){
        this.comment = comment;
    }

    public String getComment(){
        return comment;
    }

    public void setUserEmail(String userEmail){
        this.userEmail = userEmail;
    }

    public String getUserEmail(){
        return userEmail;
    }
}
