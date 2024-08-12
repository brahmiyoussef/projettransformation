package org.mt103toiso20022.bloc1;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.util.Map;

public class Mapper1 {

    private final Mapper1Elements elementsMapper;

    public Mapper1() {
        this.elementsMapper = new Mapper1Elements();
    }

    public void mapBlock1ToIso20022(Document doc, Map<String, String> block1Fields) throws Exception {
        // Crée l'élément racine AppHdr
        Element appHdr = doc.createElement("AppHdr");
        appHdr.setAttribute("xmlns", "urn:iso:std:iso:20022:tech:xsd:head.001.001.02");
        doc.appendChild(appHdr);

        // Ajoute l'élément Fr en utilisant Mapper1Elements
        Element frElement = elementsMapper.createFrElement(doc, block1Fields.get("logicalTerminal"));
        appHdr.appendChild(frElement);

        // Ajoute d'autres éléments en utilisant Mapper1Elements
        /*
        Element bizMsgIdr = elementsMapper.createBizMsgIdrElement(doc, block1Fields.get("sessionNumber"), block1Fields.get("sequenceNumber"));
        appHdr.appendChild(bizMsgIdr);

        Element appID = elementsMapper.createAppIDElement(doc, block1Fields.get("applicationId"));
        appHdr.appendChild(appID);

        Element svcID = elementsMapper.createSvcIDElement(doc, block1Fields.get("serviceId"));
        appHdr.appendChild(svcID);
         */
    }
}
