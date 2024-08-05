package com.backend.backend.domain.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class HtmlToJsonConverter {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static JsonNode convertHtmlToJson(String htmlContent) throws IOException {
        Document doc = Jsoup.parse(htmlContent);
        Element body = doc.body();
        return elementToJson(body);
    }

    private static JsonNode elementToJson(Element element) {
        Elements children = element.children();
        if (children.isEmpty()) {
            return mapper.createObjectNode().put(element.tagName(), element.text());
        } else {
            ObjectNode objectNode = mapper.createObjectNode();
            for (Element child : children) {
                objectNode.set(child.tagName(), elementToJson(child));
            }
            return objectNode;
        }
    }
}
