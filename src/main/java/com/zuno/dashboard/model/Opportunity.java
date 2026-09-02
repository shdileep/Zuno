package com.zuno.dashboard.model;

import java.util.List;

public class Opportunity {
    private String id;
    private String companyName;
    private String companyLogo;
    private String websiteUrl;
    private String title;
    private String category; // content, video, software, it, non-it, freelancing, educator, other
    private String location; // Bengaluru, Mumbai, Remote, Delhi, Pune, Hyderabad
    private String duration; // e.g. "3 Months", "6 Months", "Ongoing"
    private String deadline; // e.g. "2026-09-30"
    private double stipend; // e.g. 25000
    private String stipendDisplay; // e.g. "₹25,000 / month"
    private String roles;
    private List<String> responsibilities;
    private List<String> obligations;
    private List<String> tags;
    private String googleFormUrl; // if partner added google form
    private boolean isDirectApply; // true if applied within Zuno

    public Opportunity() {}

    public Opportunity(String id, String companyName, String companyLogo, String websiteUrl,
                       String title, String category, String location, String duration,
                       String deadline, double stipend, String stipendDisplay, String roles,
                       List<String> responsibilities, List<String> obligations, List<String> tags,
                       String googleFormUrl, boolean isDirectApply) {
        this.id = id;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.websiteUrl = websiteUrl;
        this.title = title;
        this.category = category;
        this.location = location;
        this.duration = duration;
        this.deadline = deadline;
        this.stipend = stipend;
        this.stipendDisplay = stipendDisplay;
        this.roles = roles;
        this.responsibilities = responsibilities;
        this.obligations = obligations;
        this.tags = tags;
        this.googleFormUrl = googleFormUrl;
        this.isDirectApply = isDirectApply;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyLogo() { return companyLogo; }
    public void setCompanyLogo(String companyLogo) { this.companyLogo = companyLogo; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public double getStipend() { return stipend; }
    public void setStipend(double stipend) { this.stipend = stipend; }

    public String getStipendDisplay() { return stipendDisplay; }
    public void setStipendDisplay(String stipendDisplay) { this.stipendDisplay = stipendDisplay; }

    public String getRoles() { return roles; }
    public void setRoles(String roles) { this.roles = roles; }

    public List<String> getResponsibilities() { return responsibilities; }
    public void setResponsibilities(List<String> responsibilities) { this.responsibilities = responsibilities; }

    public List<String> getObligations() { return obligations; }
    public void setObligations(List<String> obligations) { this.obligations = obligations; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getGoogleFormUrl() { return googleFormUrl; }
    public void setGoogleFormUrl(String googleFormUrl) { this.googleFormUrl = googleFormUrl; }

    public boolean isDirectApply() { return isDirectApply; }
    public void setDirectApply(boolean directApply) { isDirectApply = directApply; }
}
