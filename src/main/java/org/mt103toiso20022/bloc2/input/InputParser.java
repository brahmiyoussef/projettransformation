package org.mt103toiso20022.bloc2.input;

import org.mt103toiso20022.PatternHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;

public class InputParser {

    private static final String INPUT_PATTERN = "\\{2:I(\\d{3})(\\w{12})([A-Z])?(\\d)?(\\d{3})?}";
    private final PatternHandler inputPatternHandler;

    public InputParser() {
        this.inputPatternHandler = new PatternHandler(INPUT_PATTERN);
    }

    public Map<String, String> parseInputBlock(String block2) {
        Map<String, String> block2Fields = new HashMap<>();
        Matcher matcher = inputPatternHandler.getMatcher(block2);
        if (matcher.matches()) {
            block2Fields.put("messageSource", "input");
            block2Fields.put("inputOutputId", "I");
            block2Fields.put("messageType", matcher.group(1));  // Type de message SWIFT (e.g., 103)
            block2Fields.put("destinationAddress", matcher.group(2));  // Address destination SWIFT
            block2Fields.put("priority", matcher.group(3));  // Priority
            block2Fields.put("deliveryMonitoring", matcher.group(4));  // Surveillance de la livraison
            block2Fields.put("obsolescencePeriod", matcher.group(5));  // Period d'obsolescence
        }
        System.out.println("la structure de bloc2 Input apres parsing : "+block2Fields);
        return block2Fields;
    }
}
