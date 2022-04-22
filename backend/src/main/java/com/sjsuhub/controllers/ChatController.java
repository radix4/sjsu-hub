package com.sjsuhub.controllers;

import com.sjsuhub.entities.Message;

import com.sjsuhub.security.SecurityEscape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller

public class ChatController {
    //declare topics to send messages to particular users
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    // /GroupChatPage/message because application destination is /app
    // whenever user sends message to /message, the message is received at this particular method
    @MessageMapping("/message")
    //when a message is received to this particular mapping,
    // send the message to chatroom or public topic
    @SendTo("/chatroom/public")
    //receive data from chatroom and send message to corresponding chatroom topic
    public Message receivePublicMessage(@Payload Message message){
        message = sanitizedMessage(message);

        return message;
    }

    @MessageMapping("/private-message")
    public Message receivePrivateMessage(@Payload Message message){
        message = sanitizedMessage(message);

        //user listens to a particular message e.g. /user/Alex/private
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }

    private static Message sanitizedMessage(Message message) {
        if (message == null) return message;

        if (message.getSenderName() != null) message.setSenderName(SecurityEscape.sanitizeString(message.getSenderName()));
        if (message.getReceiverName() != null) message.setReceiverName(SecurityEscape.sanitizeString(message.getReceiverName()));
        if (message.getMessage() != null) message.setMessage(SecurityEscape.sanitizeString(message.getMessage()));

        return message;
    }


}
