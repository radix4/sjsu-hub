package com.sjsuhub.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private String postTitle;
    private String postContent;
    private String userName; // can prlly just use user? - should be email
    private String postCategory;

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getPostContent(){
        return postContent;
    }

    public void setPostTitle(String postTitle){
        this.postTitle = postTitle;
    }

    public String getPostTitle(){
        return postTitle;
    }

    public void setPostContent(String postContent){
        this.postContent = postContent;
    }

    public String getUserName(){
        return userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getPostCategory(){
        return postCategory;
    }

    public void setPostCategory(String postCategory){
        this.postCategory = postCategory;
    }

    public String toString(){
        return  "\n---Post---\n" +
                "\nID: " + id + " " +
                "\nContent: " + postContent + 
                "\nUser Name: " + userName + 
                "\nPost Category: " + postCategory;
    }
    

}
