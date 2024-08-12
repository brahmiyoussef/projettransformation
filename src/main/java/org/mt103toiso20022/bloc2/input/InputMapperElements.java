package org.mt103toiso20022.bloc2.input;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.Map;

public class InputMapperElements {

    private final InputMapper inputMapper = new InputMapper();

    public void mapInputToIso20022(Document doc, Map<String, String> block2Fields) {
        Element appHdr = (Element) doc.getDocumentElement();

        inputMapper.addToElement(appHdr, doc, "MsgType", block2Fields.get("messageType"));
        inputMapper.addToElement(appHdr, doc, "DestAddr", block2Fields.get("destinationAddress"));

        if (block2Fields.get("priority") != null) {
            inputMapper.addToElement(appHdr, doc, "Priority", block2Fields.get("priority"));
        }

        if (block2Fields.get("deliveryMonitoring") != null) {
            inputMapper.addToElement(appHdr, doc, "DeliveryMonitoring", block2Fields.get("deliveryMonitoring"));
        }

        if (block2Fields.get("obsolescencePeriod") != null) {
            inputMapper.addToElement(appHdr, doc, "ObsolescencePeriod", block2Fields.get("obsolescencePeriod"));
        }
    }
}
