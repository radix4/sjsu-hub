package com.sjsuhub.controllers;

import com.sjsuhub.entities.TutoringSession;
import com.sjsuhub.repositories.TutoringSessionRepository;
import com.sjsuhub.security.SecurityEscape;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping(path="/tutoring-sessions")
@NoArgsConstructor
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
        session = sanitizedTutoringSession(session);
        return tutoringSessionRepository.save(session);
    }

    @PutMapping("/{id}")
    public @ResponseBody TutoringSession updateOne(@RequestBody TutoringSession sessionBody, @PathVariable Integer id) {
        final TutoringSession newSession = sanitizedTutoringSession(sessionBody);
        //newSession = sanitizedTutoringSession(newSession);
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

    private static TutoringSession sanitizedTutoringSession(TutoringSession session) {
        if (session == null) return session;

        if (session.getName() != null) session.setName(SecurityEscape.sanitizeString(session.getName()));
        if (session.getEmail() != null) session.setEmail(SecurityEscape.sanitizeString(session.getEmail()));
        if (session.getBiography() != null) session.setBiography(SecurityEscape.sanitizeString(session.getBiography()));
        if (session.getContactInformation() != null) session.setContactInformation(SecurityEscape.sanitizeString(session.getContactInformation()));

        if (session.getTitle() != null) session.setTitle(SecurityEscape.sanitizeString(session.getTitle()));
        if (session.getCourse() != null) session.setCourse(SecurityEscape.sanitizeString(session.getCourse()));
        if (session.getAvailableTime() != null) session.setAvailableTime(SecurityEscape.sanitizeString(session.getAvailableTime()));
        if (session.getLocation() != null) session.setLocation(SecurityEscape.sanitizeString(session.getLocation()));


        return session;
    }
}
