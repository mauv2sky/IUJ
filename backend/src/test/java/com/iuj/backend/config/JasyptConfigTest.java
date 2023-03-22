package com.iuj.backend.config;

import org.assertj.core.api.Assertions;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("jasypt 테스트")
public class JasyptConfigTest {

    @Test
    void jasypt() {
        String url = "db-iuj.cj557j0pfgbg.ap-northeast-2.rds.amazonaws.com";
        String username = "iujuser";
        String password = "!uj2023";

        String encryptUrl = jasyptEncrypt(url);
        String encryptUsername = jasyptEncrypt(username);
        String encryptPassword = jasyptEncrypt(password);

        System.out.println("encryptUrl : " + encryptUrl);
        System.out.println("encryptUsername : " + encryptUsername);
        System.out.println("encryptPassword" + encryptPassword);

        Assertions.assertThat(url).isEqualTo(jasyptDecrypt(encryptUrl));
    }

    private String jasyptEncrypt(String input) {
        String key = "NiceE103!";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.encrypt(input);
    }

    private String jasyptDecrypt(String input) {
        String key = "NiceE103!";
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        encryptor.setPassword(key);
        return encryptor.decrypt(input);
    }
}
