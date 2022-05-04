package com.sjsuhub.controllers;

import com.sjsuhub.entities.User;

import com.sjsuhub.repositories.UserRepository;
import java.util.Arrays;

import org.json.simple.*;
import org.json.simple.parser.*;

import javax.tools.JavaFileObject;
import com.sjsuhub.security.SecurityEscape;
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
import java.util.Iterator;

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


    private final static String KEY = "12dj192jd1902jdsnadfjasdf120iasdojasd";

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestBody User user) {
        user = sanitizedUser(user);

        if (user == null || user.getEmail() == null || user.getPassword() == null ||  user.getEmail().isEmpty() || user.getPassword().isEmpty()) {
            return "Fail to create user.";
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Error! Email " + user.getEmail() + " is already registered. Would you like to login?";
        }

        /* Hashing password */
        String plainText = user.getPassword();
        String hashPassword = hmac_sha256(KEY, plainText);
        user.setPassword(hashPassword);

        User responseUser = userRepository.save(user);
        return "Success! User with email " + responseUser.getEmail() + " is now registered.";
    }

    @PostMapping(path="/login")
    public @ResponseBody String login(@RequestBody User user) {
        user = sanitizedUser(user);
        if (user.getEmail() == null|| user.getPassword() == null)
            return "Fail";

        User n = userRepository.findByEmail(user.getEmail());
        if (n == null) return "Fail";

        String hashPassword = hmac_sha256(KEY, user.getPassword());

        if ((n.getEmail().equals(user.getEmail())) && (n.getPassword().equals(hashPassword)))
            return n.getEmail();
        else
            return "Fail";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/find")
    public @ResponseBody String findByEmail(@RequestBody String email){
        Iterable<User> u1 = userRepository.findAll();
        String newEmail = "";
        System.out.println("parameter email: " + email);
        String jsonString = email;
        JSONParser parser = new JSONParser();
        JSONObject obj;
                try {
                   obj = (JSONObject)parser.parse(jsonString);
                   newEmail = (String) obj.get("email");
                } catch(ParseException e) {
                   e.printStackTrace();
                }
        try {
            for(User u : u1){
                System.out.println("emails: " + u.getEmail());
                if(u.getEmail().equals(newEmail)){
                    String firstname = u.getFirstName();
                    String lastname = u.getLastName();
                    String fullname = firstname + " " + lastname;
                    return fullname;
                }
            }
            return "unfound";
        } catch (Exception e) {
            throw(e);
        }
        
    }

    public static String hmac_sha256(String secretKey, String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256") ;
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256") ;
            mac.init(secretKeySpec) ;
            byte[] digest = mac.doFinal(data.getBytes()) ;
            java.util.Base64.Encoder encoder = java.util.Base64.getEncoder();
            return encoder.encodeToString(digest);
        } catch (InvalidKeyException e1) {
            throw new RuntimeException("Invalid key exception while converting to HMAC SHA256") ;
        } catch (NoSuchAlgorithmException e2) {
            throw new RuntimeException("Java Exception Initializing HMAC Crypto Algorithm") ;
        }
    }

    private User sanitizedUser(User user) {
        if (user == null) return user;

        if (user.getEmail() != null) user.setEmail(SecurityEscape.sanitizeString(user.getEmail()));
        if (user.getFirstName() != null) user.setFirstName(SecurityEscape.sanitizeString(user.getFirstName()));
        if (user.getLastName() != null) user.setLastName(SecurityEscape.sanitizeString(user.getLastName()));
        if (user.getPassword() != null) user.setPassword(SecurityEscape.sanitizeString(user.getPassword()));

        return user;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }


}
