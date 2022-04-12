package com.sjsuhub.controllers;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * APIs:
 *  1) GET all users: http://localhost:8080/users/all
 *  2) POST Login: http://localhost:8080/users/login
 *  3) POST Add user: http://localhost:8080/users/add
 */

@RestController // This means that this class is a Controller
@RequestMapping(path="/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;


    private final static String KEY = "12dj192jd1902jdsnadfjasdf120iasdojasd";

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Error! Email " + user.getEmail() + " is already registered. Would you like to login?";
        }

        /* Hashing password */
        String plainText = user.getPassword();
        byte[] hashByte = hmac_sha256(KEY, plainText);
        java.util.Base64.Encoder encoder = java.util.Base64.getEncoder();
        String hashPassword = encoder.encodeToString(hashByte);
        user.setPassword(hashPassword);

        User responseUser = userRepository.save(user);
        return "Success! User with id " + responseUser.getId() + " is now registered.";
    }

    private static byte[] hmac_sha256(String secretKey, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256") ;
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256") ;
            mac.init(secretKeySpec) ;
            byte[] digest = mac.doFinal(data.getBytes()) ;
            return digest ;
        } catch (InvalidKeyException e1) {
            throw new RuntimeException("Invalid key exception while converting to HMAC SHA256") ;
        } catch (NoSuchAlgorithmException e2) {
            throw new RuntimeException("Java Exception Initializing HMAC Crypto Algorithm") ;
        }
    }

    @PostMapping(path="/login")
    public @ResponseBody String login(@RequestBody User user){
        if (user.getEmail() == null|| user.getPassword() == null)
            return "";

        User n = userRepository.findByEmail(user.getEmail());

        if (n == null) return "";

        if ((n.getEmail().equals(user.getEmail())) && (n.getPassword().equals(user.getPassword())))
            return "Login success.";
        else
            return "";
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



    //////////////// END OF CRUD FOR ALL POSTS //////////////////////////




    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }


}
