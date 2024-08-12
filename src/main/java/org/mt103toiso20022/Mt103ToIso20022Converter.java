package org.mt103toiso20022;

import org.mt103toiso20022.bloc1.Mapper1;
import org.mt103toiso20022.bloc1.Parser1;
import org.mt103toiso20022.bloc2.Mapper2;
import org.mt103toiso20022.bloc2.Parser2;
import org.w3c.dom.Document;

import java.util.Map;

public class Mt103ToIso20022Converter {

    public static void main(String[] args) {
        try {
            // Parse and map the MT103 blocks to ISO 20022
            Map<String, String> block1Fields = parseBlock1("{1:F01CHASGBLL1111000000}");
            Map<String, String> block2Fields = parseBlock2("{2:O2021345160418SOGEFRPPAXXX0089725497N}");

            // Create the ISO 20022 XML document
            XmlDocumentHandler xmlHandler = new XmlDocumentHandler();
            Document iso20022Doc = xmlHandler.createDocument();

            // Map the parsed fields to the XML document
            mapBlocksToIso20022(iso20022Doc, block1Fields, block2Fields);

            // Save the document to the file system
            String filePath = "src\\main\\resources\\test.xml";
            xmlHandler.saveDocument(iso20022Doc, filePath);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Map<String, String> parseBlock1(String block1) {
        Parser1 block1Parser = new Parser1();
        return block1Parser.parseBlock1(block1);
    }

    private static Map<String, String> parseBlock2(String block2) {
        Parser2 block2Parser = new Parser2();
        return block2Parser.parseBlock2(block2);
    }

    private static void mapBlocksToIso20022(Document doc, Map<String, String> block1Fields, Map<String, String> block2Fields) throws Exception {
        Mapper1 block1Mapper = new Mapper1();
        block1Mapper.mapBlock1ToIso20022(doc, block1Fields);

        Mapper2 block2Mapper = new Mapper2();
        block2Mapper.mapBlock2ToIso20022(doc, block2Fields);
    }
}
