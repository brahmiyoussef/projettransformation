package com.backend.domain.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

public class OutputFile implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private List<Item> items;

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;

        private String name;
        private int age;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}
