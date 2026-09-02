package com.zuno.dashboard.model;

public class LeaderboardEntry {
    private int rank;
    private String userId;
    private String name;
    private String avatarUrl;
    private String profession;
    private double weeklyEarnings;
    private double monthlyEarnings;
    private double totalEarnings;
    private int completedGigs;
    private double rating;
    private boolean isCurrentUser;

    public LeaderboardEntry() {}

    public LeaderboardEntry(int rank, String userId, String name, String avatarUrl, String profession,
                            double weeklyEarnings, double monthlyEarnings, double totalEarnings,
                            int completedGigs, double rating, boolean isCurrentUser) {
        this.rank = rank;
        this.userId = userId;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.profession = profession;
        this.weeklyEarnings = weeklyEarnings;
        this.monthlyEarnings = monthlyEarnings;
        this.totalEarnings = totalEarnings;
        this.completedGigs = completedGigs;
        this.rating = rating;
        this.isCurrentUser = isCurrentUser;
    }

    // Getters and Setters
    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }

    public double getWeeklyEarnings() { return weeklyEarnings; }
    public void setWeeklyEarnings(double weeklyEarnings) { this.weeklyEarnings = weeklyEarnings; }

    public double getMonthlyEarnings() { return monthlyEarnings; }
    public void setMonthlyEarnings(double monthlyEarnings) { this.monthlyEarnings = monthlyEarnings; }

    public double getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(double totalEarnings) { this.totalEarnings = totalEarnings; }

    public int getCompletedGigs() { return completedGigs; }
    public void setCompletedGigs(int completedGigs) { this.completedGigs = completedGigs; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public boolean isCurrentUser() { return isCurrentUser; }
    public void setCurrentUser(boolean currentUser) { isCurrentUser = currentUser; }
}
