package com.zuno.dashboard.model;

import java.util.ArrayList;
import java.util.List;

public class UserProfile {
    private String id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String avatarUrl;
    private String profession;
    private String phone;
    private String city;
    private String about;
    private List<String> goals;
    private String education;
    private String resumeUrl;
    private List<String> skills;
    private List<String> interests;
    private List<String> hobbies;
    private double totalEarnings;
    private double thisWeekEarnings;
    private double thisMonthEarnings;
    private int currentRank;

    public UserProfile() {
        this.goals = new ArrayList<>();
        this.skills = new ArrayList<>();
        this.interests = new ArrayList<>();
        this.hobbies = new ArrayList<>();
    }

    public UserProfile(String id, String name, String username, String email, String password,
                       String avatarUrl, String profession, String city, String about,
                       List<String> goals, String education, String resumeUrl,
                       List<String> skills, List<String> interests, List<String> hobbies,
                       double totalEarnings, double thisWeekEarnings, double thisMonthEarnings, int currentRank) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
        this.profession = profession;
        this.city = city;
        this.about = about;
        this.goals = goals != null ? goals : new ArrayList<>();
        this.education = education;
        this.resumeUrl = resumeUrl;
        this.skills = skills != null ? skills : new ArrayList<>();
        this.interests = interests != null ? interests : new ArrayList<>();
        this.hobbies = hobbies != null ? hobbies : new ArrayList<>();
        this.totalEarnings = totalEarnings;
        this.thisWeekEarnings = thisWeekEarnings;
        this.thisMonthEarnings = thisMonthEarnings;
        this.currentRank = currentRank;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }

    public List<String> getGoals() { return goals; }
    public void setGoals(List<String> goals) { this.goals = goals; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    public List<String> getHobbies() { return hobbies; }
    public void setHobbies(List<String> hobbies) { this.hobbies = hobbies; }

    private String dob;
    private String college;
    private String branch;
    private String specialization;
    private String fromMonth;
    private String fromYear;
    private String toMonth;
    private String toYear;

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getFromMonth() { return fromMonth; }
    public void setFromMonth(String fromMonth) { this.fromMonth = fromMonth; }

    public String getFromYear() { return fromYear; }
    public void setFromYear(String fromYear) { this.fromYear = fromYear; }

    public String getToMonth() { return toMonth; }
    public void setToMonth(String toMonth) { this.toMonth = toMonth; }

    public String getToYear() { return toYear; }
    public void setToYear(String toYear) { this.toYear = toYear; }

    public double getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(double totalEarnings) { this.totalEarnings = totalEarnings; }

    public double getThisWeekEarnings() { return thisWeekEarnings; }
    public void setThisWeekEarnings(double thisWeekEarnings) { this.thisWeekEarnings = thisWeekEarnings; }

    public double getThisMonthEarnings() { return thisMonthEarnings; }
    public void setThisMonthEarnings(double thisMonthEarnings) { this.thisMonthEarnings = thisMonthEarnings; }

    public int getCurrentRank() { return currentRank; }
    public void setCurrentRank(int currentRank) { this.currentRank = currentRank; }
}
