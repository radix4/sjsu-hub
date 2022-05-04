package com.sjsuhub.entities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private Status status;

    public void setSenderName(String senderName){
        this.senderName = senderName;
    }

    public String getSenderName(){
        return senderName;
    }

    public void setReceiverName(String receiverName){
        this.receiverName = receiverName;
    }

    public String getReceiverName(){
        return receiverName;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getMessage(){
        return message;
    }

    public void setStatus(Status status){
        this.status = status;
    }

    public Status getStatus(){
        return status;
    }

    

    
}

