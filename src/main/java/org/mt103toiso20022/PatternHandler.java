package org.mt103toiso20022;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternHandler {

    private Pattern pattern;

    public PatternHandler(String regex) {
        this.pattern = Pattern.compile(regex);
    }

    public Matcher getMatcher(String input) {
        return pattern.matcher(input);
    }

    public boolean matches(String input) {
        Matcher matcher = getMatcher(input);
        return matcher.find();
    }
}
