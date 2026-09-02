package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.ExportRequest;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/export")
@CrossOrigin(origins = "*")
public class ExportController {

    private final DataStoreService dataStoreService;

    public ExportController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @PostMapping("/stats")
    public ResponseEntity<byte[]> exportStats(@RequestBody ExportRequest request) {
        String format = request.getFormat() != null ? request.getFormat().toUpperCase() : "CSV";
        StringBuilder content = new StringBuilder();

        if ("JSON".equals(format)) {
            content.append("{\n")
                    .append("  \"user\": \"").append(dataStoreService.getCurrentUser().getName()).append("\",\n")
                    .append("  \"profession\": \"").append(dataStoreService.getCurrentUser().getProfession()).append("\",\n")
                    .append("  \"totalEarnings\": ").append(dataStoreService.getCurrentUser().getTotalEarnings()).append(",\n")
                    .append("  \"thisMonthEarnings\": ").append(dataStoreService.getCurrentUser().getThisMonthEarnings()).append(",\n")
                    .append("  \"thisWeekEarnings\": ").append(dataStoreService.getCurrentUser().getThisWeekEarnings()).append(",\n")
                    .append("  \"exportType\": \"").append(request.getExportType()).append("\",\n")
                    .append("  \"dateRange\": \"").append(request.getDateRange()).append("\",\n")
                    .append("  \"totalApplications\": ").append(dataStoreService.getAllApplications().size()).append(",\n")
                    .append("  \"generatedAt\": \"").append(java.time.LocalDateTime.now()).append("\"\n")
                    .append("}");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"zuno_stats_" + System.currentTimeMillis() + ".json\"")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(content.toString().getBytes(StandardCharsets.UTF_8));
        } else {
            // Default CSV format
            content.append("Metric,Value,Period,Notes\n");
            content.append("Candidate Name,").append(dataStoreService.getCurrentUser().getName()).append(",All Time,Zuno Verified Profile\n");
            content.append("Selected Profession,").append(dataStoreService.getCurrentUser().getProfession()).append(",Current,Active\n");
            content.append("Total Earnings,₹").append(dataStoreService.getCurrentUser().getTotalEarnings()).append(",All Time,Verified Payouts\n");
            content.append("Monthly Earnings,₹").append(dataStoreService.getCurrentUser().getThisMonthEarnings()).append(",Current Month,Verified\n");
            content.append("Weekly Earnings,₹").append(dataStoreService.getCurrentUser().getThisWeekEarnings()).append(",Current Week,Verified\n");
            content.append("Current Rank,#").append(dataStoreService.getCurrentUser().getCurrentRank()).append(",Domain Leaderboard,Top Tier\n");
            content.append("Applications Submitted,").append(dataStoreService.getAllApplications().size()).append(",All Time,Tracked in Zuno\n");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"zuno_stats_" + System.currentTimeMillis() + ".csv\"")
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .body(content.toString().getBytes(StandardCharsets.UTF_8));
        }
    }
}
