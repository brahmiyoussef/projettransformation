package org.mt103toiso20022.bloc2.output;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.Map;

public class OutputMapperElements {

    private final OutputMapper outputMapper = new OutputMapper();

    public void mapOutputToIso20022(Document doc, Map<String, String> block2Fields) {
        Element appHdr = (Element) doc.getDocumentElement();
        Element to = doc.createElement("To");
        appHdr.appendChild(to);
        Element fiId = doc.createElement("FIId");
        to.appendChild(fiId);
        Element finInstnId = doc.createElement("FinInstnId");
        fiId.appendChild(finInstnId);
        outputMapper.addToElement(finInstnId, doc, "BICFI", block2Fields.get("outputDate"));
/*
        outputMapper.addToElement(appHdr, doc, "InputTime", block2Fields.get("inputTime"));
        outputMapper.addToElement(appHdr, doc, "MIR", block2Fields.get("MIR"));
        outputMapper.addToElement(appHdr, doc, "OutputDate", block2Fields.get("outputDate"));
        outputMapper.addToElement(appHdr, doc, "OutputTime", block2Fields.get("outputTime"));
        if (block2Fields.get("priority") != null) {
            outputMapper.addToElement(appHdr, doc, "Priority", block2Fields.get("priority"));
        }
 */
    }
}
