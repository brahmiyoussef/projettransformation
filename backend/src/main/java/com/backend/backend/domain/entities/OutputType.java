package com.backend.backend.domain.entities;
public enum OutputType {
    XML("xml"),
    JSON("json");

    private final String type;

    OutputType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return type;
    }
}

