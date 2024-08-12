package org.mt103toiso20022.bloc1;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class Mapper1Elements {

    public Element createFrElement(Document doc, String logicalTerminal) {
        Element fr = doc.createElement("Fr");

        Element fiId = doc.createElement("FIId");
        fr.appendChild(fiId);

        Element finInstnId = doc.createElement("FinInstnId");
        fiId.appendChild(finInstnId);

        Element bicfi = doc.createElement("BICFI");
        bicfi.appendChild(doc.createTextNode(logicalTerminal));  // Logical Terminal Address (BICFI)
        finInstnId.appendChild(bicfi);

        return fr;
    }

    public Element createBizMsgIdrElement(Document doc, String sessionNumber, String sequenceNumber) {
        Element bizMsgIdr = doc.createElement("BizMsgIdr");
        bizMsgIdr.appendChild(doc.createTextNode(sessionNumber + sequenceNumber)); // Session Number + Sequence Number
        return bizMsgIdr;
    }

    public Element createAppIDElement(Document doc, String applicationId) {
        Element appID = doc.createElement("AppID");
        appID.appendChild(doc.createTextNode(applicationId));  // Application ID (e.g., F for FIN)
        return appID;
    }

    public Element createSvcIDElement(Document doc, String serviceId) {
        Element svcID = doc.createElement("SvcID");
        svcID.appendChild(doc.createTextNode(serviceId));  // Service ID (e.g., 01 for FIN/GPA)
        return svcID;
    }

}
