package com.iuj.backend.util.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Converter
public class StringToIntegerListConverter implements AttributeConverter<List<Integer>, String> {
    @Override
    public String convertToDatabaseColumn(List<Integer> attribute){
        return (attribute != null) ? attribute.toString() : null;
    }

    @Override
    public List<Integer> convertToEntityAttribute(String dbData){
        dbData = dbData.substring(1, dbData.length()-1);
        dbData = dbData.replaceAll(" ", "");
        List<Integer> list = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(dbData, ",");
        while(st.hasMoreTokens()){
            String numStr = st.nextToken();
            if(isNumeric(numStr)) {
                list.add(Integer.valueOf(numStr));
            }
        }
        return list;
    }
    private static boolean isNumeric(String str){
        return str != null && str.matches("[0-9.]+");
    }

}