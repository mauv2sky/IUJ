package com.iuj.backend.api.domain.dto.common;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class BoundDto {
    private String[] sw;
    private String[] ne;
}
