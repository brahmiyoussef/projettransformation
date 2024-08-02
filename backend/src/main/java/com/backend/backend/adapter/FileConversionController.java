package com.backend.backend.adapter;

import com.backend.backend.domain.entities.InputFile;
import com.backend.backend.domain.entities.OutputFile;
import com.backend.backend.domain.repositories.InputFileRepository;
import com.backend.backend.domain.repositories.OutputFileRepository;
import com.backend.backend.domain.services.TransformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/convert")
public class FileConversionController {
    @Autowired
    private InputFileRepository inputFileRepository;

    @Autowired
    private OutputFileRepository outputFileRepository;

    @Autowired
    private TransformationService transformationService;

    @PostMapping(value = "/{fromFormat}/{toFormat}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public String convertFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String fromFormat,
            @PathVariable String toFormat) throws IOException {
        String input = new String(file.getBytes(), StandardCharsets.UTF_8);
        // Perform file conversion
        String convertedContent = transformationService.convert(input, fromFormat, toFormat);
        InputFile inputFile = new InputFile();
        inputFile.setFilename(file.getOriginalFilename());
        inputFile.setContent(input);
        inputFile.setInputType(fromFormat);
        inputFile.setOutputType(toFormat);
        inputFile.setTimestamp(LocalDateTime.now());

        inputFile = inputFileRepository.save(inputFile);


        // Save converted file metadata to OutputFile
        OutputFile outputFile = new OutputFile();
        outputFile.setTargetFormat(toFormat);
        outputFile.setConvertedContent(convertedContent);
        outputFile.setInputFile(inputFile);

        outputFileRepository.save(outputFile);
        return convertedContent;
    }

    @GetMapping("/history")
    public List<InputFile> getFileHistory() {
        return inputFileRepository.findAll();
    }

    @GetMapping("/output/{id}")
    public OutputFile getOutputFile(@PathVariable Long id) {
        return outputFileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Output file not found"));
    }
}
