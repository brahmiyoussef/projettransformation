package com.backend.infrastructure.postgres.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "input_table")
public class InputFile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "filename", nullable = false)
    private String filename;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "input_type", nullable = false)
    private String inputType;

    @Column(name = "output_type")
    private String outputType;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public InputFile() {
        this.timestamp = LocalDateTime.now(); // Set default timestamp to current time
    }

    // Parameterized constructor
    public InputFile(String filename, String content, String inputType, String outputType, User user) {
        this.filename = filename;
        this.content = content;
        this.inputType = inputType;
        this.outputType = outputType;
        this.user = user;
        this.timestamp = LocalDateTime.now(); // Set default timestamp to current time
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public String getOutputType() {
        return outputType;
    }

    public void setOutputType(String outputType) {
        this.outputType = outputType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "InputFile{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", content='" + content + '\'' +
                ", inputType='" + inputType + '\'' +
                ", outputType='" + outputType + '\'' +
                ", timestamp=" + timestamp +
                ", user=" + user +
                '}';
    }
}
