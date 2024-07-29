package com.backend.backend.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
public class InputFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private EntryType entryType;

    private String entryContent;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private OutputType outputType;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "User_id", nullable = false)
    private com.backend.backend.domain.entities.User User;

    // Constructors, getters, setters

    public InputFile() {
        // Default constructor required by JPA
    }

    public InputFile(EntryType entryType, String entryContent, OutputType outputType, LocalDateTime timestamp, com.backend.backend.domain.entities.User User) {
        this.entryType = entryType;
        this.entryContent = entryContent;
        this.outputType = outputType;
        this.timestamp = timestamp;
        this.User = User;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EntryType getEntryType() {
        return entryType;
    }

    public void setEntryType(EntryType entryType) {
        this.entryType = entryType;
    }

    public String getEntryContent() {
        return entryContent;
    }

    public void setEntryContent(String entryContent) {
        this.entryContent = entryContent;
    }

    public OutputType getOutputType() {
        return outputType;
    }

    public void setOutputType(OutputType outputType) {
        this.outputType = outputType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return User;
    }

    public void setUser(User User) {
        this.User = User;
    }
}



