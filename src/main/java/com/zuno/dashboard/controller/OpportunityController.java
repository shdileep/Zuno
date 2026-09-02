package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.Opportunity;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = "*")
public class OpportunityController {

    private final DataStoreService dataStoreService;

    public OpportunityController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @GetMapping
    public ResponseEntity<List<Opportunity>> getOpportunities(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city) {
        return ResponseEntity.ok(dataStoreService.searchOpportunities(query, category, city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(@PathVariable String id) {
        Opportunity opp = dataStoreService.getOpportunityById(id);
        if (opp == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(opp);
    }
}
