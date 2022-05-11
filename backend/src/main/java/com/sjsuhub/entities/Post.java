package com.sjsuhub.entities;

import lombok.Data;

import com.sjsuhub.entities.Comment;

import java.util.ArrayList;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private String postTitle;
    private String postContent;
    private String userName; // can prlly just use user? - should be email
    private String postCategory;
    private String[] forumComments;
    private Comment[] newComments;
    @Column(length = 1000)
    private ArrayList<Comment> commentList;

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public String getPostContent(){
        return postContent;
    }

    public void setPostContent(String postContent){
        this.postContent = postContent;
    }

    public void setPostTitle(String postTitle){
        this.postTitle = postTitle;
    }

    public String getPostTitle(){
        return postTitle;
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

    public String[] getForumComments(){
        return forumComments;
    }

    public void setForumComments(String[] forumComments){
        this.forumComments = forumComments;
    }

    public Comment[] getNewForumComments(){
        return newComments;
    }

    public void setNewForumComments(Comment[] newForumComments){
        this.newComments = newForumComments;
    }

    public ArrayList<Comment> getCommentList(){
        return commentList;
    }

    public void setCommentList(ArrayList<Comment> commmentList){
        this.commentList = commmentList;
    }

    public String toString(){
        return  "\n---Post---\n" +
                "\nID: " + id + " " +
                "\nContent: " + postContent + 
                "\nUser Name: " + userName + 
                "\nPost Category: " + postCategory;
    }
    

}
