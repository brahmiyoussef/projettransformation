package org.mt103toiso20022.bloc2.output;

import org.mt103toiso20022.PatternHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;

public class OutputParser {

    private static final String OUTPUT_PATTERN = "\\{2:O(\\d{3})(\\d{4})(\\d{6})([A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[A-Z][0-9A-Z]{3})(\\d{6})(\\d{4})([SUN]?)\\}";
    private final PatternHandler outputPatternHandler;

    public OutputParser() {
        this.outputPatternHandler = new PatternHandler(OUTPUT_PATTERN);
    }

    public Map<String, String> parseOutputBlock(String block2) {
        Map<String, String> block2Fields = new HashMap<>();
        Matcher matcher = outputPatternHandler.getMatcher(block2);
        if (matcher.matches()) {
            block2Fields.put("messageSource", "output");
            block2Fields.put("inputOutputId", "O");
            block2Fields.put("messageType", matcher.group(1));  // Type de message SWIFT (e.g., 103)
            block2Fields.put("inputTime", matcher.group(2));  // Heure d'entrée
            block2Fields.put("MIR", matcher.group(3));  // Référence d'entrée du message (MIR)
            block2Fields.put("outputDate", matcher.group(4));  // Date de sortie
            block2Fields.put("outputTime", matcher.group(5));  // Heure de sortie
            block2Fields.put("priority", matcher.group(6));  // Priorité
        }
        System.out.println("la structure de bloc2 Output apres parsing : "+block2Fields);
        return block2Fields;
    }
}
