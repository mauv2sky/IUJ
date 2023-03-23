package com.iuj.backend.repository;

import com.iuj.backend.api.domain.entity.infra.Subway;
import com.iuj.backend.api.repository.infra.SubwayRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@RequiredArgsConstructor
@ActiveProfiles("dev")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SubwayRepositoryTest {

    @Autowired
    private SubwayRepository subwayRepository;

    @Test
    @DisplayName("지하철 하나 가져오기 test")
    @Order(1)
    public void getFirstSubway() {
        //given
        int id = 1;

        //when
        Subway s = subwayRepository.getReferenceById(id);

        //then
        assertThat(s.getId()).isEqualTo(id);

    }

}
