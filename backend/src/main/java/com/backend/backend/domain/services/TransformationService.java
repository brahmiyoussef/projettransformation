package com.backend.backend.domain.services;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.util.logging.Logger;

@Service
@Transactional

public class TransformationService {

    private static final Logger logger = Logger.getLogger(TransformationService.class.getName());

    public String convert(String input, String fromFormat, String toFormat) {
        try {
            switch (fromFormat) {
                case "xml":
                    if ("json".equals(toFormat)) {
                        return xmlToJson(input);
                    } else if ("yaml".equals(toFormat)) {
                        return xmlToYaml(input);
                    }
                    break;
                case "json":
                    if ("xml".equals(toFormat)) {
                        return jsonToXml(input);
                    } else if ("yaml".equals(toFormat)) {
                        return jsonToYaml(input);
                    }
                    break;
                case "yaml":
                    if ("xml".equals(toFormat)) {
                        return yamlToXml(input);
                    } else if ("json".equals(toFormat)) {
                        return yamlToJson(input);
                    }
                    break;
                default:
                    throw new UnsupportedOperationException("Unsupported format: " + fromFormat);
            }
        } catch (IOException e) {
            logger.severe("Error while converting content: " + e.getMessage());
            throw new RuntimeException("Error while converting content", e);
        }
        throw new UnsupportedOperationException("Unsupported conversion: " + fromFormat + " to " + toFormat);
    }

    private String xmlToJson(String xml) throws IOException {
        Object obj = deserializeFromXml(xml);
        return serializeToJson(obj);
    }

    private String jsonToXml(String json) throws IOException {
        Object obj = deserializeFromJson(json);
        return serializeToXml(obj);
    }
    private String xmlToYaml(String xml) throws IOException {
        Object obj = deserializeFromXml(xml);
        return serializeToYaml(obj);
    }
    private String yamlToXml(String yaml) throws IOException {
        Object obj = deserializeFromYaml(yaml);
        return serializeToXml(obj);
    }
    private String jsonToYaml(String json) throws IOException {
        Object obj = deserializeFromJson(json);
        return serializeToYaml(obj);
    }

    private String yamlToJson(String yaml) throws IOException {
        Object obj = deserializeFromYaml(yaml);
        return serializeToJson(obj);
    }
    private Object deserializeFromXml(String xml) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        return xmlMapper.readValue(xml, new TypeReference<Object>() {});
    }

    private Object deserializeFromJson(String json) throws IOException {
        ObjectMapper jsonMapper = new ObjectMapper();
        return jsonMapper.readValue(json, new TypeReference<Object>() {});
    }

    private String serializeToXml(Object obj) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        return xmlMapper.writeValueAsString(obj);
    }

    private String serializeToJson(Object obj) throws IOException {
        ObjectMapper jsonMapper = new ObjectMapper();
        return jsonMapper.writeValueAsString(obj);
    }
    private Object deserializeFromYaml(String yaml) {
        Yaml yamlParser = new Yaml();
        return yamlParser.load(yaml);
    }
    private String serializeToYaml(Object obj) {
        Yaml yaml = new Yaml();
        return yaml.dump(obj);
    }
}
