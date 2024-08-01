package com.backend.adapter;

import com.backend.domain.services.TransformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/convert")
public class FileConversionController {

    @Autowired
    private TransformationService transformationService;

    @PostMapping(value = "/{fromFormat}/{toFormat}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE, MediaType.TEXT_PLAIN_VALUE})
    public String convertFile(
            @RequestParam("file") MultipartFile file,
            @PathVariable String fromFormat,
            @PathVariable String toFormat) throws IOException {
        String input = new String(file.getBytes(), StandardCharsets.UTF_8);
        return transformationService.convert(input, fromFormat, toFormat);
    }
}
