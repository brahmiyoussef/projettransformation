package com.backend.domain.entities;

public enum EntryType {
    XML("xml"),
    JSON("json");

    private final String type;

    EntryType(String type) {
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

