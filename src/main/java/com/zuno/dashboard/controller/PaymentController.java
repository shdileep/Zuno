package com.zuno.dashboard.controller;

import com.zuno.dashboard.model.LeaderboardEntry;
import com.zuno.dashboard.model.PaymentRecord;
import com.zuno.dashboard.service.DataStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final DataStoreService dataStoreService;

    public PaymentController(DataStoreService dataStoreService) {
        this.dataStoreService = dataStoreService;
    }

    @GetMapping("/payments")
    public ResponseEntity<Map<String, Object>> getPaymentSummary() {
        List<PaymentRecord> payments = dataStoreService.getAllPayments();
        double totalEarned = dataStoreService.getCurrentUser().getTotalEarnings();
        double pendingVerification = payments.stream()
                .filter(p -> "Pending Employer Verification".equalsIgnoreCase(p.getStatus()))
                .mapToDouble(PaymentRecord::getAmount)
                .sum();
        double credited = payments.stream()
                .filter(p -> "Credited".equalsIgnoreCase(p.getStatus()))
                .mapToDouble(PaymentRecord::getAmount)
                .sum();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalEarned", totalEarned);
        summary.put("thisWeekEarnings", dataStoreService.getCurrentUser().getThisWeekEarnings());
        summary.put("thisMonthEarnings", dataStoreService.getCurrentUser().getThisMonthEarnings());
        summary.put("walletBalance", credited);
        summary.put("pendingVerification", pendingVerification);
        summary.put("records", payments);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(
            @RequestParam(required = false, defaultValue = "content") String profession) {
        return ResponseEntity.ok(dataStoreService.getLeaderboard(profession));
    }
}
