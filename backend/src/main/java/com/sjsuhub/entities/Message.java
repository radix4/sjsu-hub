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
}
