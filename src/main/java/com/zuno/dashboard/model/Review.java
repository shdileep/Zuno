package com.zuno.dashboard.model;

public class Review {
    private String id;
    private String userId;
    private String userName;
    private String userAvatar;
    private String userProfession;
    private String reviewType; // ZUNO_APP_REVIEW or JOB_COMMENT
    private String relatedJobId;
    private String relatedJobTitle;
    private int rating; // 1 to 5
    private String reviewText;
    private double verifiedEarnings; // e.g. 30000
    private String verifiedPeriod; // e.g. "Last 3 months"
    private boolean highlightOnMainPage;
    private String createdAt;

    public Review() {}

    public Review(String id, String userId, String userName, String userAvatar, String userProfession,
                  String reviewType, String relatedJobId, String relatedJobTitle, int rating,
                  String reviewText, double verifiedEarnings, String verifiedPeriod,
                  boolean highlightOnMainPage, String createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.userProfession = userProfession;
        this.reviewType = reviewType;
        this.relatedJobId = relatedJobId;
        this.relatedJobTitle = relatedJobTitle;
        this.rating = rating;
        this.reviewText = reviewText;
        this.verifiedEarnings = verifiedEarnings;
        this.verifiedPeriod = verifiedPeriod;
        this.highlightOnMainPage = highlightOnMainPage;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserAvatar() { return userAvatar; }
    public void setUserAvatar(String userAvatar) { this.userAvatar = userAvatar; }

    public String getUserProfession() { return userProfession; }
    public void setUserProfession(String userProfession) { this.userProfession = userProfession; }

    public String getReviewType() { return reviewType; }
    public void setReviewType(String reviewType) { this.reviewType = reviewType; }

    public String getRelatedJobId() { return relatedJobId; }
    public void setRelatedJobId(String relatedJobId) { this.relatedJobId = relatedJobId; }

    public String getRelatedJobTitle() { return relatedJobTitle; }
    public void setRelatedJobTitle(String relatedJobTitle) { this.relatedJobTitle = relatedJobTitle; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getReviewText() { return reviewText; }
    public void setReviewText(String reviewText) { this.reviewText = reviewText; }

    public double getVerifiedEarnings() { return verifiedEarnings; }
    public void setVerifiedEarnings(double verifiedEarnings) { this.verifiedEarnings = verifiedEarnings; }

    public String getVerifiedPeriod() { return verifiedPeriod; }
    public void setVerifiedPeriod(String verifiedPeriod) { this.verifiedPeriod = verifiedPeriod; }

    public boolean isHighlightOnMainPage() { return highlightOnMainPage; }
    public void setHighlightOnMainPage(boolean highlightOnMainPage) { this.highlightOnMainPage = highlightOnMainPage; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
