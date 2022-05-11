package com.sjsuhub.controllers;



import com.sjsuhub.entities.Comment;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.PostRepository;

import java.util.ArrayList;

//pick up here, add repository. 


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


    //test with postman this should work...
    //have to account for object return in service and js files
    //works
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/comment") //get post by id
    public @ResponseBody String addForumCommentById(@PathVariable Integer id, @RequestBody Comment comment){ //works
 


        String newComment = "";
        String newUser = "";
        try {
            if(postRepository.existsById(id)){
                String jsonString1 = comment.getComment();
                System.out.println("json String 1" + comment.getComment());
                JSONParser parser = new JSONParser();
                JSONObject obj1;
                String jsonString2 = comment.getUserEmail();
                System.out.println("json String 1" + comment.getUserEmail());
                JSONObject obj2;
                
                newComment = comment.getComment();
              
               
                newUser = comment.getUserEmail();

                System.out.println("comment:" + newComment); //these turn out blank
                System.out.println("user: " + newUser); //no error now these are just null.. which is why .equals doesnt work 
                Post forumPost = postRepository.getForumPostById(id);
                if(forumPost.getCommentList() != null){
                for(int i = 0; i < forumPost.getCommentList().size(); i++){
                    if(forumPost.getCommentList().get(i).getComment().equals(newComment)){
                        return "This comment already exists in this forum page";
                    }
                }
      
                
                ArrayList<Comment> commentList = forumPost.getCommentList(); //could result in null, have case for this. it will come in as null
                
                

               
                
                System.out.println("commentList length: " + commentList.size());
               
                Comment saveableComment = new Comment(newComment, newUser);
                commentList.add(saveableComment);
                forumPost.setCommentList(commentList); 
                postRepository.save(forumPost);
                return newComment;
                }else{
                    //if its empty, just add it to the array so its not null
                    
                    ArrayList<Comment> commentList = new ArrayList<>(1);
                    commentList.add(new Comment(newComment,newUser));
                    forumPost.setCommentList(commentList);
                    postRepository.save(forumPost);
                    return newComment;
                }

            }
            return "add comment by id failed";
        } catch (Exception e) {
            throw(e);
        }
        
    }


     


    //works as well.
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/{id}/getAllComments")
    public @ResponseBody ArrayList<Comment> getAllForumComments(@PathVariable Integer id){

       
        try {
            if(postRepository.existsById(id)){
                try {
                       
                    return postRepository.findById(id).get().getCommentList();
                } catch (Exception e) {
                    throw(e);
                }
            }
        } catch (Exception e) {
            throw(e);       
        }
        return null;
    }   



   

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
