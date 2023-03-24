package com.iuj.backend.api.service;

import java.util.List;

import com.iuj.backend.api.domain.dto.request.LikeBuildingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.repository.like.LikeRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public List<LikeBuilding> getAllLikesByEmail(String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        List<LikeBuilding> likeBuildings = likeRepository.findByEmail(email);
//        System.out.println(likeRepository.findByEmail(email));

        for (LikeBuilding likeBuilding : likeBuildings) {
//            System.out.println(likeBuilding);
            Long building_id = likeBuilding.getBuilding_id();
            String type = likeBuilding.getType();
//            String email = likeBuilding.getEmail();


        }


//        response = [{name, address, deal, type, id}, {객체2}, ...]

        return likeRepository.findByEmail(email);
    }

    public void addLike(LikeBuildingRequest request, String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // email을 사용하여 LikeBuilding 엔티티를 조회
        List<LikeBuilding> existingLikes = likeRepository.findByEmail(email);

        LikeBuilding searchBuilding = new LikeBuilding(request.getBuilding_id(), request.getType(), email);

        if (!existingLikes.contains(searchBuilding)) {
            // searchBuilding 엔티티가 existingLikes에 존재하지 않으면 저장
            likeRepository.save(searchBuilding);
        }
    }


    public void delLike(LikeBuildingRequest request, String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        LikeBuilding searchBuilding = new LikeBuilding(request.getBuilding_id(), request.getType(), email);
        // 삭제
        likeRepository.delete(searchBuilding);

    }

}
