package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.JobApplication;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final DataStoreService dataStoreService;

    public ApplicationController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(dataStoreService.getAllApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getApplicationById(@PathVariable String id) {
        JobApplication app = dataStoreService.getApplicationById(id);
        if (app == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(app);
    }

    @PostMapping("/apply")
    public ResponseEntity<JobApplication> applyForJob(@RequestBody Map<String, String> request) {
        String opportunityId = request.get("opportunityId");
        String note = request.get("note");
        JobApplication app = dataStoreService.createApplication(opportunityId, note);
        if (app == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(app);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<JobApplication> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, Object> request) {
        String newStatus = (String) request.get("status");
        boolean offerConfirmed = Boolean.TRUE.equals(request.get("offerConfirmed"));
        JobApplication app = dataStoreService.updateApplicationStatus(id, newStatus, offerConfirmed);
        if (app == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(app);
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<JobApplication> addComment(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        String comment = request.get("comment");
        dataStoreService.addCommentToApplication(id, comment);
        JobApplication app = dataStoreService.getApplicationById(id);
        return ResponseEntity.ok(app);
    }
}
