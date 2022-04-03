package com.sjsuhub.controllers;

import com.sjsuhub.entities.TutoringSession;
import com.sjsuhub.repositories.TutoringSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path="/tutoring-sessions")
public class TutoringSessionController {

    @Autowired
    private TutoringSessionRepository tutoringSessionRepository;

    public TutoringSessionController(TutoringSessionRepository repository) {
        this.tutoringSessionRepository = repository;
    }

    @GetMapping
    public Iterable<TutoringSession> getAll() {
        return tutoringSessionRepository.findAll();
    }

    @PostMapping
    public @ResponseBody TutoringSession addOne(@RequestBody TutoringSession session) {
        return tutoringSessionRepository.save(session);
    }

    @PutMapping("/{id}")
    public @ResponseBody TutoringSession updateOne(@RequestBody TutoringSession newSession, @PathVariable Integer id) {
        return tutoringSessionRepository.findById(id)
                .map(session -> {
                    session.setName(newSession.getName());
                    session.setEmail(newSession.getEmail());
                    session.setBiography(newSession.getBiography());
                    session.setContactInformation(newSession.getContactInformation());

                    session.setTitle(newSession.getTitle());
                    session.setCourse(newSession.getCourse());
                    session.setAvailableTime(newSession.getAvailableTime());
                    session.setLocation(newSession.getLocation());
                    session.setTutor(newSession.isTutor());

                    return tutoringSessionRepository.save(session);
                })
                .orElseGet(() -> {
                    newSession.setId(id);
                    return tutoringSessionRepository.save(newSession);
                });
    }


    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable Integer id) {
        tutoringSessionRepository.deleteById(id);
    }

    @DeleteMapping("/delete-all")
    public void deleteAll() {
        tutoringSessionRepository.deleteAll();
    }
}
