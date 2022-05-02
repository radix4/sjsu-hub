package com.sjsuhub.controllers;


import com.sjsuhub.entities.User;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.PostRepository;
import com.sjsuhub.repositories.UserRepository;

import java.util.Arrays;

import org.json.simple.*;
import org.json.simple.parser.*;

import javax.tools.JavaFileObject;



import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="/posts")
public class PostController {
    @Autowired
    private PostRepository postRepository; 


    /////////////////// CRUD FOR USER POSTS ///////////////////////////////
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add") //Post Request for adding new user posts
    public @ResponseBody String addNewForumPost(@RequestBody Post post){
        
        Post p = new Post();
        try {
        p.setPostTitle(post.getPostTitle());
        p.setPostContent(post.getPostContent());
        p.setUserName(post.getUserName());
        p.setPostCategory(post.getPostCategory());

        postRepository.save(p);

        return "Success! Post by user " + p.getId() + " has now been created";
        } catch (Exception e) {
            throw(e);
        }
        
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/all") //works
    public @ResponseBody Iterable<Post> getAllForumPosts(){
        try {
            return postRepository.findAll();
        } catch (Exception e) {
            throw(e);
        }
        
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/{id}") //get post by id
    public @ResponseBody Post getForumPostById(@PathVariable Integer id){ //works
        
        try {
            if(postRepository.existsById(id)){
                return postRepository.findById(id).get();
            }
            else{
                return null;
            }
        } catch (Exception e) {
            throw(e);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/comment") //get post by id
    public @ResponseBody String addForumCommentById(@PathVariable Integer id, @RequestBody String comment){ //works
 
        String newComment = "";
        try {
            if(postRepository.existsById(id)){
                String jsonString = comment;
                JSONParser parser = new JSONParser();
                JSONObject obj;
                try {
                   obj = (JSONObject)parser.parse(jsonString);
                   newComment = (String) obj.get("comment");
                } catch(ParseException e) {
                   e.printStackTrace();
                }
                System.out.println("comment:" + comment);
                Post forumPost = postRepository.getForumPostById(id);
                if(forumPost.getForumComments() != null){
                for(int i = 0; i < forumPost.getForumComments().length; i++){
                    if(forumPost.getForumComments()[i].equals(newComment)){
                        return "This comment already exists in this forum page";
                    }
                }
                String[] commentsArr = Arrays.copyOf(forumPost.getForumComments(), (forumPost.getForumComments().length) + 1);
                
                commentsArr[forumPost.getForumComments().length] = newComment; 
                forumPost.setForumComments(commentsArr); 
                postRepository.save(forumPost);
                return "Comment Added";
                }else{
                    //if its empty, just add it to the array so its not null
                    String[] commentsArr = new String[1];
                    commentsArr[0] = newComment;
                    forumPost.setForumComments(commentsArr);
                    postRepository.save(forumPost);
                    return "array was null we added one to it";
                }

            }
            return "add comment by id failed";
        } catch (Exception e) {
            throw(e);
        }
        
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/{id}/getAllComments")
    public @ResponseBody String[] getAllForumComments(@PathVariable Integer id){

        String[] nullFixer = new String[1];
        nullFixer[0] = "There are no comments";
        try {
            if(postRepository.existsById(id)){
                try {
                       
                        if(postRepository.findById(id).get().getForumComments() == null){
                            postRepository.findById(id).get().setForumComments(nullFixer);
                        }
                    return postRepository.findById(id).get().getForumComments();
                } catch (Exception e) {
                    throw(e);
                }
            }
        } catch (Exception e) {
            throw(e);       
        }
        return null;       
    }   



    /*@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/update") //works
    public @ResponseBody String updateForumPostbyId(@PathVariable Integer id){

        if(postRepository.existsById(id)){
            String updateTest = "I have been updated by ID";
            postRepository.findById(id).get().setPostContent(updateTest);
            postRepository.save(postRepository.findById(id).get());
            return  "Updated";
        }
        return "not Updated";

    }*/

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/{id}/delete")           //works
    public @ResponseBody String deleteForumPost(@PathVariable Integer id){

        if(postRepository.existsById(id)){
            postRepository.deleteById(id);
            return  "DELETED";
        }

        return "Not Deleted";
    }

}
