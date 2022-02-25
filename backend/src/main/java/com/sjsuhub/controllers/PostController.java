/*package com.sjsuhub.controllers;


import com.sjsuhub.entities.User;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.PostRepository;
import com.sjsuhub.repositories.UserRepository;



import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="/demo")
public class PostController {
   @Autowired
    private PostRepository postRepository; //post repo

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/users/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        User n = new User();
        String email = user.getEmail();
        User preExistingUser = userRepository.findByEmail(email);
        System.out.println("MainController.java addNewUser " + preExistingUser);
        if (preExistingUser != null) {
            return "Error! Email " + email + " is already registered. Would you like to login?";
        }
        else {
            n.setFirstName(user.getFirstName());
            n.setLastName(user.getLastName());
            n.setEmail(user.getEmail());
            n.setPassword(user.getPassword());
            userRepository.save(n);
            return "Success! User with id " + n.getId() + " is now registered.";
        }
    }

    /////////////////// CRUD FOR USER POSTS ///////////////////////////////

    @PostMapping(path="/posts/add") //Post Request for adding new user posts
    public @ResponseBody String addNewPost(@RequestBody Post post){
        
        Post p = new Post();

        p.setPostTitle(post.getPostTitle());
        p.setPostContent(post.getPostContent());
        p.setUserName(post.getUserName());
        p.setPostCategory(post.getPostCategory());
        System.out.println("new post variable" + p.toString());
        postRepository.save(p); 
        return "Success! Post by user " + p.getId() + " has now been created";
    }



    @GetMapping(path="/posts/all") //works
    public @ResponseBody Iterable<Post> getAllPosts(){
        return postRepository.findAll();
    }

    @GetMapping(path="/posts/findbyUser") //find post by username  // works
    public @ResponseBody String getPostByUserName(@RequestBody Post post){ //works
        
        //Post p = new Post();
        String userName = post.getUserName();
        Post newPost = postRepository.findByUserName(userName);
        return newPost.getUserName(); 
    }


    @GetMapping(path="/posts/{id}") //get post by id
    public @ResponseBody String getPostById(@PathVariable Integer id){ //works
        
        if(postRepository.existsById(id)){
            return postRepository.findById(id).get().getPostTitle();
        }

        return "get post by id failed";
    }


    @PutMapping(path="/posts/{id}/update") //works
    public @ResponseBody String updatePostbyId(@PathVariable Integer id){

        if(postRepository.existsById(id)){
            String updateTest = "I have been updated by ID";
            postRepository.findById(id).get().setPostContent(updateTest);
            postRepository.save(postRepository.findById(id).get());
            return  "Updated";
        }
        return "not Updated";

    }


    @DeleteMapping(path="/posts/{id}/delete")           //works
    public @ResponseBody String deletePost(@PathVariable Integer id){

        if(postRepository.existsById(id)){
            postRepository.deleteById(id);
            return  "DELETED";
        }

        return "Not Deleted";
    }

}
*/