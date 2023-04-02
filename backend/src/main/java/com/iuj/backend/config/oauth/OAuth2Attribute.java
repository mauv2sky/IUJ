package com.iuj.backend.config.oauth;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@Getter
@ToString
@Builder(access = AccessLevel.PRIVATE)
class OAuth2Attribute {
    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;
    private String name;

    static OAuth2Attribute of(String provider, String attributeKey, Map<String, Object> attributes) {
        switch(provider) {
            case "google":
                return ofGoogle(attributeKey, attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attribute ofGoogle(String attributeKey, Map<String, Object> attributes) {
        return OAuth2Attribute.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("email", email);

        return map;
    }
}