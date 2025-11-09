package com.erms.service;

import com.erms.model.Announcement;
import com.erms.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository repo;

    public List<Announcement> getAll() {
        return repo.findAll();
    }

    public Announcement save(Announcement announcement) {
        return repo.save(announcement);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
