package com.backend.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class OutputFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "input_file_id", nullable = false)
    private InputFile inputFile;

    private String resultContent;



    // Default constructor required by JPA
    public OutputFile() {
    }

    public OutputFile(InputFile inputFile, String resultContent) {
        this.inputFile = inputFile;
        this.resultContent = resultContent;

    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InputFile getInputFile() {
        return inputFile;
    }

    public void setInputFile(InputFile inputFile) {
        this.inputFile = inputFile;
    }

    public String getResultContent() {
        return resultContent;
    }

    public void setResultContent(String resultContent) {
        this.resultContent = resultContent;
    }



}
