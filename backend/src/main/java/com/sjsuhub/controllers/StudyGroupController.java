package com.sjsuhub.controllers;




import java.util.Arrays;

import org.json.simple.*;
import org.json.simple.parser.*;

import javax.tools.JavaFileObject;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.sjsuhub.entities.Post;
import com.sjsuhub.entities.StudyGroup;
import com.sjsuhub.repositories.PostRepository;
import com.sjsuhub.repositories.StudyGroupRepository;
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

@RestController
@RequestMapping(path="/studygroups")
public class StudyGroupController {
    @Autowired
    private StudyGroupRepository studyRepository;


    /////////////////// CRUD FOR STUDY GROUPS ///////////////////////////////
    //Include code to create a study group and code to join a study group
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="/add") //post request for a new study group
    public @ResponseBody String addNewStudyGroup(@RequestBody StudyGroup newGroup){
       
        StudyGroup sg = new StudyGroup();
        try {
            String[] nullFixer = new String[1];
            nullFixer[0] = "This is an empty Study group";
            sg.setSubject(newGroup.getSubject());
            sg.setDescription(newGroup.getDescription());
            sg.setMeetingDay(newGroup.getMeetingDay());
            sg.setMeetingTime(newGroup.getMeetingTime());
            sg.setMeridiem(newGroup.getMeridiem());
            sg.setMembers(nullFixer);
            studyRepository.save(sg);
            return "Success! Study Group " + sg.getId() + " has now been created";

        } catch (Exception e){
            
            throw(e);
        }
       
    }

    //get all study groups
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/all")
    public @ResponseBody Iterable<StudyGroup> getAllStudyGroups() {
        try {
            return studyRepository.findAll();
        } catch (Exception e) {
            
            throw(e);
        }
    }


    //get By Id
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/{id}") //get post by id
    public @ResponseBody StudyGroup getStudyGroupById(@PathVariable Integer id){ //works
        
        try {
            if(studyRepository.existsById(id)){
                return studyRepository.findById(id).get();
            }else{
                return null;
            }
        } catch (Exception e) {
            throw(e);
        }
       
    }

   
    
    
    //delete by Id
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path="/{id}/delete")           
    public @ResponseBody String deleteStudyGroup(@PathVariable Integer id){
        try {
            if(studyRepository.existsById(id)){
                studyRepository.deleteById(id);
                return  "DELETED";
            }
    
            return "Not Deleted";           
        } catch (Exception e) {
            throw(e);
        }
    }

    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path="/{id}/join")
    public @ResponseBody String joinStudyGroupById(@PathVariable Integer id, @RequestBody String user){
  

        String newUser = "";

        try {
            if(studyRepository.existsById(id)){
                String jsonString = user;
                JSONParser parser = new JSONParser();
                JSONObject obj;
                try {
                   obj = (JSONObject)parser.parse(jsonString);
                   newUser = (String) obj.get("user");
                   System.out.println("new User: " + newUser);
                } catch(ParseException e) {
                   e.printStackTrace();
                }
                StudyGroup group = studyRepository.getStudyGroupById(id);
                
                if(!(group.getMembers()[0].equals("This is an empty Study group"))){
                for(int i = 0; i < group.getMembers().length; i++){
                    if(group.getMembers()[i].equals(newUser)){
                        return "This user already exists in this study group";
                    }
                }
                String[] membersArr = Arrays.copyOf(group.getMembers(), (group.getMembers().length) + 1);

                membersArr[group.getMembers().length] = newUser; 
                group.setMembers(membersArr); 
                studyRepository.save(group);
                return "Study GROUP jOINED";
                }else{
                    
                    String[] membersArr = new String[1];
                    membersArr[0] = newUser;
                    group.setMembers(membersArr);
                    studyRepository.save(group);
                    return "array was null we added one to it";
                }

            }
            return "join sg by id failed";
        } catch (Exception e) {
            throw(e);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/{id}/getAllUsers")
    public @ResponseBody String[] getAllStudyGroupUsers(@PathVariable Integer id){
        try {
            if(studyRepository.existsById(id)){
                try {
                    return studyRepository.findById(id).get().getMembers();
                } catch (Exception e) {
                    throw(e);
                }
            }
        } catch (Exception e) {
            System.out.println("error in second find all");
            throw(e);
            
        }
        return null;
        
    }


    

    
    

    
}
