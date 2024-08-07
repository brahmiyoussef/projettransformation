package com.backend.infrastructure.postgres.entities;

import jakarta.persistence.*;

@Entity
@Table(name="output_table")
public class OutputFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_format", nullable = false)
    private String targetFormat;

    @Column(name = "converted_content", columnDefinition = "TEXT")
    private String convertedContent;

    @OneToOne
    @JoinColumn(name = "input_file_id", nullable = false)
    private InputFile inputFile;

    public OutputFile() {
    }

    public OutputFile(String targetFormat, String convertedContent, InputFile inputFile) {
        this.targetFormat = targetFormat;
        this.convertedContent = convertedContent;
        this.inputFile = inputFile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTargetFormat() {
        return targetFormat;
    }

    public void setTargetFormat(String targetFormat) {
        this.targetFormat = targetFormat;
    }

    public String getConvertedContent() {
        return convertedContent;
    }

    public void setConvertedContent(String convertedContent) {
        this.convertedContent = convertedContent;
    }

    public InputFile getInputFile() {
        return inputFile;
    }

    public void setInputFile(InputFile inputFile) {
        this.inputFile = inputFile;
    }

    @Override
    public String toString() {
        return "OutputFile{" +
                "id=" + id +
                ", targetFormat='" + targetFormat + '\'' +
                ", convertedContent='" + convertedContent + '\'' +
                ", inputFile=" + inputFile +
                '}';
    }
}
