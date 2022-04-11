package com.sjsuhub.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsuhub.controllers.TutoringSessionController;
import com.sjsuhub.entities.TutoringSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(TutoringSessionController.class)
public class TutoringSessionControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testAddOne() throws Exception {
        TutoringSession tutoringSession = new TutoringSession(null, "test1", "test1", "test1", "test1", "test1", "test1", "test1", "test", true);

        this.mockMvc.perform(post("/").content(asJsonString(tutoringSession)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                .contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$.name").value(tutoringSession.getName()));
    }

    @Test
    public void shouldReturnDefaultMessage() throws Exception {
        this.mockMvc.perform(get("/tutoring-sessions/greeting")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("Hello, World")));
    }


    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}