package com.iuj.backend.api.service;

import com.iuj.backend.api.domain.dto.response.*;
import com.iuj.backend.api.domain.entity.infra.*;
import com.iuj.backend.api.repository.infra.CinemaRepository;
import com.iuj.backend.api.repository.infra.GalleryRepository;
import com.iuj.backend.api.repository.infra.LibraryRepository;
import com.iuj.backend.api.repository.infra.ParkRepository;
import com.iuj.backend.util.Near;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CultureService {
    private final ParkRepository parkRepository;
    private final GalleryRepository galleryRepository;
    private final LibraryRepository libraryRepository;
    private final CinemaRepository cinemaRepository;

    public List<CinemaDto> findNearbyCinemas(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Cinema> cinemas = cinemaRepository.findAllCinemaBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<CinemaDto> cinemaDtos = new ArrayList<>();
        for (Cinema cinema : cinemas) {
            CinemaDto cinemaDto = new CinemaDto(
                    cinema.getId(),
                    cinema.getName(),
                    cinema.getLat(),
                    cinema.getLng(),
                    cinema.getAddr()
            );
            cinemaDtos.add(cinemaDto);
        }
        return cinemaDtos;
    }

    public List<LibraryDto> findNearbyLibrarys(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Library> librarys = libraryRepository.findAllLibraryBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<LibraryDto> libraryDtos = new ArrayList<>();
        for (Library library : librarys) {
            LibraryDto libraryDto = new LibraryDto(
                library.getId(),
                library.getName(),
                library.getLat(),
                library.getLng(),
                library.getAddr(),
                library.getType()
            );
            libraryDtos.add(libraryDto);
        }
        return libraryDtos;
    }

    public List<GalleryDto> findNearbyGallerys(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Gallery> gallerys = galleryRepository.findAllGalleryBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<GalleryDto> galleryDtos = new ArrayList<>();
        for (Gallery gallery : gallerys) {
            GalleryDto galleryDto = new GalleryDto(
                    gallery.getId(),
                    gallery.getName(),
                    gallery.getLat(),
                    gallery.getLng(),
                    gallery.getAddr()
            );
            galleryDtos.add(galleryDto);
        }
        return galleryDtos;
    }

    public List<ParkDto> findNearbyParks(String lat, String lng){

        Near near = new Near();
        String[] latlng = near.calLatLng(lat, lng);

        List<Park> parks = parkRepository.findAllParkBtwlngAndlat(latlng[0],latlng[1], latlng[2],latlng[3]);

        List<ParkDto> parkDtos = new ArrayList<>();
        for (Park park : parks) {
            ParkDto parkDto = new ParkDto(
                    park.getId(),
                    park.getName(),
                    park.getLat(),
                    park.getLng(),
                    park.getType(),
                    park.getAddr()
            );
            parkDtos.add(parkDto);
        }
        return parkDtos;
    }

}
