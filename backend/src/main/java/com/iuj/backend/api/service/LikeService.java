package com.iuj.backend.api.service;

import java.util.List;

import com.iuj.backend.api.domain.dto.request.GetPlaceLikeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.repository.like.LikeRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public List<LikeBuilding> getAllLikesByEmail(String email) {
        return likeRepository.findByEmail(email);
    }

    public void addLike(GetPlaceLikeRequest request, String authToken) {
        // authToken으로 email 받아와야함
        String email = "qwer"; // 임시로 email 값을 설정

        // email을 사용하여 LikeBuilding 엔티티를 조회
        List<LikeBuilding> existingLikes = likeRepository.findByEmail(email);
        if (existingLikes.isEmpty()) {
            // LikeBuilding 엔티티가 존재하지 않으면 새로운 LikeBuilding 엔티티를 생성하여 저장
            LikeBuilding newLike = new LikeBuilding(request, email);
            System.out.println(newLike);
//            newLike.getPlaces().add(request);
//            likeRepository.save(newLike);
        }
    }


//    public void delLike(PlaceLikeRequest request, String authToken) {
//        // authToken으로 email 받아와야함
//        String email = "qwer"; // 임시로 email 값을 설정
//
//        // email을 사용하여 LikeBuilding 엔티티를 조회
//        List<LikeBuilding> existingLikes = likeRepository.findByEmail(email);
//        if (!existingLikes.isEmpty()) {
//            // LikeBuilding 엔티티가 존재하면 해당 엔티티에서 request 값을 삭제하고 저장
//            LikeBuilding existingLike = existingLikes.get(0);
//            existingLike.getPlaces().remove(request);
//            likeRepository.save(existingLike);
//        }
//    }

}
