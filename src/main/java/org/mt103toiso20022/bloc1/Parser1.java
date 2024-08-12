package org.mt103toiso20022.bloc1;

import org.mt103toiso20022.PatternHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;

public class Parser1 {
    private static final String pattern = "\\{1:(.){1}(\\d{2})([A-Z]{4}[A-Z]{1}[A-Z]{3})(\\d{4})(\\d{6})\\}";
    private final PatternHandler patternHandler;
    public Parser1() {
        this.patternHandler = new PatternHandler(pattern);
    }
    public Map<String, String> parseBlock1(String block1) {
        Map<String, String> block1Fields = new HashMap<>();
        Matcher matcher = patternHandler.getMatcher(block1);

        if (matcher.find()) {
            block1Fields.put("applicationId", matcher.group(1)); // Application ID
            block1Fields.put("serviceId", matcher.group(2)); // Service ID
            block1Fields.put("logicalTerminal", matcher.group(3)); // Logical Terminal Address
            block1Fields.put("sessionNumber", matcher.group(4)); // Session Number
            block1Fields.put("sequenceNumber", matcher.group(5)); // Sequence Number
        } else {
            // Gérer le cas où la chaîne ne correspond pas au motif
            System.out.println("Bloc 1 non valid");
        }
        System.out.println("la structure de bloc1 apres parsing : "+block1Fields);
        return block1Fields;
    }
}
