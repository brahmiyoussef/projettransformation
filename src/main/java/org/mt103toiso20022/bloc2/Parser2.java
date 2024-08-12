package org.mt103toiso20022.bloc2;

import org.mt103toiso20022.bloc2.input.InputParser;
import org.mt103toiso20022.bloc2.output.OutputParser;

import java.util.Map;

public class Parser2 {

    private final InputParser inputParser = new InputParser();
    private final OutputParser outputParser = new OutputParser();

    public Map<String, String> parseBlock2(String block2) {
        if (block2.startsWith("{2:I")) {
            return inputParser.parseInputBlock(block2);
        } else if (block2.startsWith("{2:O")) {
            return outputParser.parseOutputBlock(block2);
        }
        return null;
    }
}
