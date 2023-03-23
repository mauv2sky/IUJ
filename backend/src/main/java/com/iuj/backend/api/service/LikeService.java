package com.iuj.backend.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iuj.backend.api.domain.entity.LikeBuilding;
import com.iuj.backend.api.repository.like.LikeRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public List<LikeBuilding> getAllLikesByEmail(String email) {
//        System.out.println(likeRepository.findByEmail(email));
        return likeRepository.findByEmail(email);
//        return likeRepository.findAll();

    }
}
