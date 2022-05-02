package com.sjsuhub.backend;


import com.sjsuhub.Main;
import com.sjsuhub.entities.Post;
import com.sjsuhub.repositories.PostRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;


import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = Main.class,
        webEnvironment = WebEnvironment.RANDOM_PORT)
public class PostControllerTest{
    @LocalServerPort
    private int port;
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private PostRepository postRepository;   

    @Test
    public void addNewForumPost(){
        String forumPostUrl = "http://localhost:" + port + "/posts/add";

        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(["test"]);

        String response = this.restTemplate.postForObject(forumPostUrl, p, String.class);

        String expected = "Success! forum with subject " + p.getPostTitle() + " is now created.";
        assertEquals(expected, response);       

    }

    @Test
    public void getAllForumPosts(){
        String getAllURL = "http://localhost:" + port + "/posts/all";

        ResponseEntity<Post[]> response = this.restTemplate.getForEntity(
                getAllURL, Post[].class
        );

        Post[] studyGroups = response.getBody();
        assertNotNull(studyGroups);
    }

    @Test
    public void getForumPostById(){


        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(["test"]);


        int id =  postRepository.save(p).getId();

        String getOneUrl = "http://localhost:" + port + "/posts/" + id;

        Post p2 = this.restTemplate.getForObject(getOneUrl, p, Post.class);

        assertTrue(!p2.isEmpty());

    }

    @Test
    public void addForumCommentById(){

    }

    @Test
    public void getAllForumComments(){
        
    }


    @Test
    public void deleteForumPost(){

        Post p = new Post();
        p.setPostTitle("test");
        p.setPostContent("test");
        p.setPostCategory("test");
        p.setUserName("test");
        p.setForumComments(["test"]);


        int id =  postRepository.save(p).getId();

        String deleteOneUrl = "http://localhost:" + port + "/posts/" + id + "delete";

        this.restTemplate.delete(deleteOneUrl);

        assertEquals(true, postRepository.findById(id).isEmpty());
        assertTrue(postRepository.findById(id).isEmpty());     
    }

    

}