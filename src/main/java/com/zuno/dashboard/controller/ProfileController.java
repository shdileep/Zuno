package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.UserProfile;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    private final DataStoreService dataStoreService;

    public ProfileController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @GetMapping
    public ResponseEntity<UserProfile> getCurrentProfile() {
        return ResponseEntity.ok(dataStoreService.getCurrentUser());
    }

    @PutMapping
    public ResponseEntity<UserProfile> updateProfile(@RequestBody UserProfile updated) {
        dataStoreService.updateCurrentUser(updated);
        return ResponseEntity.ok(dataStoreService.getCurrentUser());
    }

    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteProfile() {
        dataStoreService.deleteCurrentUser();
        return ResponseEntity.ok(Map.of("message", "Profile deleted successfully"));
    }
}
