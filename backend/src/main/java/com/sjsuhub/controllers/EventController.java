package com.sjsuhub.controllers;

import com.sjsuhub.entities.User;
import com.sjsuhub.repositories.UserRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

import com.sjsuhub.entities.Event;
import com.sjsuhub.repositories.EventRepository;

import com.sjsuhub.security.SecurityEscape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;
    
    @PostMapping(path="/addEvent")
    public @ResponseBody String addNewEvent(@RequestBody Event event) {
        event = sanitizedEvent(event);
        
        Event e = new Event();
       
        e.setCreator(event.getCreator());
        e.setTitle(event.getTitle());
        e.setDescription(event.getDescription());

        e.setLatdegrees(event.getLatdegrees());
        e.setLatdir(event.getLatdir());
        e.setLongdegrees(event.getLongdegrees());
        e.setLongdir(event.getLongdir());
        
        e.setStart(event.getStart());
        e.setEnd(event.getEnd());
        System.out.println(e.toString());

        e = eventRepository.save(e);

        return "Success! Event with id " + e.getId() + " and title " + e.getTitle() + " has been saved.\n";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        // This returns a JSON or XML with the events
        return eventRepository.findAll();
    }

    @PutMapping(path="/delete-event")
    public @ResponseBody String deleteEvent(@RequestBody Event event) {
        event = sanitizedEvent(event);

        Optional<Event> optionalEvent = eventRepository.findById(event.getId());
        event = optionalEvent.get();

        if (event == null)
            return "Error: That event does not exist and cannot be deleted.";
            
        // delete event from creator's list of events
        Set<String> attendees = event.getAttendees();
        User u = userRepository.findByEmail(event.getCreator());
        u.getCreatedEvents().remove(event.getId().toString());
        userRepository.save(u);

        // delete event from attendees' lists
        for (String s : attendees) {
            u = userRepository.findByEmail(s);
            u.getEventsAttending().remove(event.getId().toString());
            userRepository.save(u);
        }

        // delete event itself
        eventRepository.delete(event);
        
        return  "Event with id " + event.getId() + " and title " + event.getTitle() + " deleted.";
       
    }

    @PostMapping(path="/attend")
    public @ResponseBody String joinEvent(@RequestBody Event event ) {
        event = sanitizedEvent(event);

        User u = userRepository.findByEmail(event.getAttendees().stream().findFirst().get());
        u.getEventsAttending().add(event.getId() + "");
        userRepository.save(u);

        Optional<Event> optionalEvent = eventRepository.findById(event.getId());
        Event e = optionalEvent.get();
        e.getAttendees().add(u.getEmail());
        eventRepository.save(e);

        return "User " + u.getEmail() + " now attending event " + e.getId() + " " + e.getTitle();
    }

    @PostMapping(path="/unattend")
    public @ResponseBody String leaveEvent(@RequestBody Event event ) {
        event = sanitizedEvent(event);

        User u = userRepository.findByEmail(event.getAttendees().stream().findFirst().get());
        u.getEventsAttending().remove(event.getId());
        userRepository.save(u);

        Optional<Event> optionalEvent = eventRepository.findById(event.getId());
        Event e = optionalEvent.get();
        e.getAttendees().remove(u.getEmail());
        eventRepository.save(e);

        return "User " + u.getEmail() + " no longer attending event " + e.getId() + " " + e.getTitle();
    }

    // Users can change everything except creator and people attending via update method
    @PutMapping(path="/update")
    public @ResponseBody String updateEvent(@RequestBody Event event) {
        event = sanitizedEvent(event);

        Optional<Event> optionalEvent = eventRepository.findById(event.getId());
        Event e = optionalEvent.get();
        
        e.setCreator(e.getCreator());
        e.setTitle(event.getTitle());
        e.setDescription(event.getDescription());

        e.setLatdegrees(event.getLatdegrees());
        e.setLatdir(event.getLatdir());
        e.setLongdegrees(event.getLongdegrees());
        e.setLongdir(event.getLongdir());

        e.setAttendees(e.getAttendees());
        
        e.setStart(event.getStart());
        e.setEnd(event.getEnd());
        
        eventRepository.save(e);

        return "Event updated";
    }

    private static Event sanitizedEvent(Event event) {
        if (event == null) return event;

        if (event.getCreator() != null) event.setCreator(SecurityEscape.sanitizeString(event.getCreator()));
        if (event.getTitle() != null) event.setTitle(SecurityEscape.sanitizeString(event.getTitle()));
        if (event.getDescription() != null) event.setDescription(SecurityEscape.sanitizeString(event.getDescription()));
        if (event.getLatdir() != null) event.setLatdir(SecurityEscape.sanitizeString(event.getLatdir()));
        if (event.getLongdir() != null) event.setLongdir(SecurityEscape.sanitizeString(event.getLongdir()));
        if (event.getStart() != null) event.setStart(SecurityEscape.sanitizeString(event.getStart()));
        if (event.getEnd() != null) event.setEnd(SecurityEscape.sanitizeString(event.getEnd()));

        return event;
    }


}
