package com.zuno.dashboard.model;

import java.util.ArrayList;
import java.util.List;

public class JobApplication {
    private String id;
    private String opportunityId;
    private Opportunity opportunity;
    private String candidateId;
    private String candidateName;
    private String appliedDate;
    private String status; // Applied, Under Review, Shortlisted, Selected / Offer Confirmed, Rejected, Completed
    private double stipend;
    private boolean offerConfirmed;
    private String paymentStatus; // Pending Verification, Employer Verified & Paid, Credited to Wallet
    private String candidateNote;
    private List<String> comments;

    public JobApplication() {
        this.comments = new ArrayList<>();
    }

    public JobApplication(String id, String opportunityId, Opportunity opportunity, String candidateId,
                          String candidateName, String appliedDate, String status, double stipend,
                          boolean offerConfirmed, String paymentStatus, String candidateNote, List<String> comments) {
        this.id = id;
        this.opportunityId = opportunityId;
        this.opportunity = opportunity;
        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.appliedDate = appliedDate;
        this.status = status;
        this.stipend = stipend;
        this.offerConfirmed = offerConfirmed;
        this.paymentStatus = paymentStatus;
        this.candidateNote = candidateNote;
        this.comments = comments != null ? comments : new ArrayList<>();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOpportunityId() { return opportunityId; }
    public void setOpportunityId(String opportunityId) { this.opportunityId = opportunityId; }

    public Opportunity getOpportunity() { return opportunity; }
    public void setOpportunity(Opportunity opportunity) { this.opportunity = opportunity; }

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getAppliedDate() { return appliedDate; }
    public void setAppliedDate(String appliedDate) { this.appliedDate = appliedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getStipend() { return stipend; }
    public void setStipend(double stipend) { this.stipend = stipend; }

    public boolean isOfferConfirmed() { return offerConfirmed; }
    public void setOfferConfirmed(boolean offerConfirmed) { this.offerConfirmed = offerConfirmed; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getCandidateNote() { return candidateNote; }
    public void setCandidateNote(String candidateNote) { this.candidateNote = candidateNote; }

    public List<String> getComments() { return comments; }
    public void setComments(List<String> comments) { this.comments = comments; }
}
