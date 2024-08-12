package org.mt103toiso20022.bloc2;

import org.mt103toiso20022.bloc2.input.InputMapper;
import org.mt103toiso20022.bloc2.output.OutputMapperElements;
import org.w3c.dom.Document;

import java.util.Map;

public class Mapper2 {

    private final InputMapper inputMapper = new InputMapper();
    private final OutputMapperElements outputMapperElements = new OutputMapperElements();

    public void mapBlock2ToIso20022(Document doc, Map<String, String> block2Fields) throws Exception {
        String messageSource = block2Fields.get("messageSource");

        if ("input".equals(messageSource)) {
            outputMapperElements.mapOutputToIso20022(doc, block2Fields);
        } else if ("output".equals(messageSource)) {
            outputMapperElements.mapOutputToIso20022(doc, block2Fields);
        }
    }
}
