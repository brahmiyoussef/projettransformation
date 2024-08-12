package org.mt103toiso20022.bloc2.output;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class OutputMapper {

    public Element createElement(Document doc, String tagName, String textContent) {
        Element element = doc.createElement(tagName);
        element.appendChild(doc.createTextNode(textContent));
        return element;
    }

    public void addToElement(Element parent, Document doc, String tagName, String textContent) {
        if (textContent != null && !textContent.isEmpty()) {
            Element element = createElement(doc, tagName, textContent);
            parent.appendChild(element);
        }
    }
}
