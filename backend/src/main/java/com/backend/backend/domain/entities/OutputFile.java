package com.backend.backend.domain.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
@Entity
@Table(name="Output_table")
public class OutputFile{

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

    public String getConvertedContent() {
        return convertedContent;
    }

    public InputFile getInputFile() {
        return inputFile;
    }

    public void setInputFile(InputFile inputFile) {
        this.inputFile = inputFile;
    }

    public void setConvertedContent(String convertedContent) {
        this.convertedContent = convertedContent;
    }

    public void setTargetFormat(String targetFormat) {
        this.targetFormat = targetFormat;
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
/* public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;

        private String name;
        private int age;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }*/
}
