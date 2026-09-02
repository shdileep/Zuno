package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.Review;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    private final DataStoreService dataStoreService;

    public ReviewController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(
            @RequestParam(required = false, defaultValue = "false") boolean highlightedOnly) {
        if (highlightedOnly) {
            return ResponseEntity.ok(dataStoreService.getHighlightedReviews());
        }
        return ResponseEntity.ok(dataStoreService.getAllReviews());
    }

    @PostMapping
    public ResponseEntity<Review> postReview(@RequestBody Review review) {
        if (review.getUserName() == null || review.getUserName().isBlank()) {
            review.setUserName(dataStoreService.getCurrentUser().getName());
            review.setUserAvatar(dataStoreService.getCurrentUser().getAvatarUrl());
            review.setUserProfession(dataStoreService.getCurrentUser().getProfession());
            review.setUserId(dataStoreService.getCurrentUser().getId());
        }
        dataStoreService.addReview(review);
        return ResponseEntity.ok(review);
    }
}
