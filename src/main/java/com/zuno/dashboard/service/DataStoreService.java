package com.zuno.dashboard.service;

import com.zuno.dashboard.model.*;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class DataStoreService {

    private UserProfile currentUser;
    private final Map<String, Opportunity> opportunities = new ConcurrentHashMap<>();
    private final Map<String, JobApplication> applications = new ConcurrentHashMap<>();
    private final Map<String, PaymentRecord> payments = new ConcurrentHashMap<>();
    private final List<Review> reviews = new ArrayList<>();
    private final Map<String, List<LeaderboardEntry>> leaderboardsByProfession = new ConcurrentHashMap<>();

    @PostConstruct
    public void initData() {
        // 1. Initialize Current User Profile (Clean state for actual candidate)
        currentUser = new UserProfile(
                "usr_001",
                "Dileep Sai",
                "dileepsai",
                "forchatgptpurpose70@gmail.com",
                "pass1234",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                "Student / Campus Learner",
                "Bengaluru",
                "",
                new ArrayList<>(),
                "",
                "",
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                0.0,
                0.0,
                0.0,
                0
        );

        // 2. Initialize Opportunities across Categories
        addOpportunity(new Opportunity(
                "opp_101",
                "HyperGrowth Media",
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
                "https://hypergrowthmedia.io",
                "Short-Form Video Editor & Reels Specialist",
                "video",
                "Bengaluru",
                "3 Months",
                "2026-09-25",
                28000.0,
                "₹28,000 / month",
                "Edit high-retention short form videos (Reels/TikTok/Shorts) for top tier venture-backed founders.",
                Arrays.asList(
                        "Edit 12-15 high energy reels per week with motion graphics & sound design",
                        "Optimize hooks and retention metrics using A/B thumbnail analysis",
                        "Collaborate with the scripting team to align pacing with voiceovers"
                ),
                Arrays.asList(
                        "Must deliver first cut within 24 hours of raw footage handoff",
                        "Maintain strict confidentiality of unreleased founder interviews",
                        "Attend weekly Monday creative alignment syncs at 10 AM IST"
                ),
                Arrays.asList("After Effects", "Premiere Pro", "CapCut", "Sound Design", "Fast Paced"),
                "https://forms.gle/sampleVideoEditorZunoForm",
                false
        ));

        addOpportunity(new Opportunity(
                "opp_102",
                "NeuraScale AI",
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
                "https://neurascale.ai",
                "Full Stack Developer (Spring Boot & Vue.js)",
                "software",
                "Bengaluru",
                "6 Months",
                "2026-09-30",
                35000.0,
                "₹35,000 / month",
                "Build scalable REST microservices and dashboard components for our enterprise AI copilot platform.",
                Arrays.asList(
                        "Develop backend APIs using Spring Boot, Hibernate, and PostgreSQL",
                        "Implement reactive frontend widgets and live analytics charts",
                        "Write automated unit and integration tests with JUnit and Mockito"
                ),
                Arrays.asList(
                        "20 hours per week minimum commitment with documented pull requests",
                        "Adhere to clean architecture and code linting guidelines",
                        "Participate in sprint demo retrospectives every fortnight"
                ),
                Arrays.asList("Java", "Spring Boot", "REST API", "PostgreSQL", "Docker", "Git"),
                null,
                true
        ));

        addOpportunity(new Opportunity(
                "opp_103",
                "EduSpark Labs",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
                "https://edusparklabs.com",
                "STEM Educator & Technical Content Writer",
                "educator",
                "Mumbai",
                "4 Months",
                "2026-10-05",
                25000.0,
                "₹25,000 / month",
                "Design engaging STEM interactive tutorials, video scripts, and quizzes for high school & college students.",
                Arrays.asList(
                        "Draft 4 conceptual guides per week on Computer Science and Data Concepts",
                        "Record explanatory walkthrough screencasts with crisp annotations",
                        "Review student community problem submissions and provide mentorship"
                ),
                Arrays.asList(
                        "Ensure 100% original, plagiarism-free instructional material",
                        "Available for student Q&A chat sessions 2 hours on weekend mornings"
                ),
                Arrays.asList("Education", "Curriculum Design", "Python", "Technical Writing", "Mentorship"),
                "https://forms.gle/sampleEduSparkZunoForm",
                false
        ));

        addOpportunity(new Opportunity(
                "opp_104",
                "Zuno Creative Studio",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
                "https://zuno.app/studio",
                "Brand Storyteller & LinkedIn Ghostwriter",
                "content",
                "Remote",
                "3 Months",
                "2026-09-20",
                30000.0,
                "₹30,000 / month",
                "Write compelling thought leadership posts, case studies, and newsletter issues for tech leaders.",
                Arrays.asList(
                        "Conduct weekly 30-min interview downloads with leadership clients",
                        "Produce 15 viral LinkedIn posts and 2 in-depth substack articles monthly",
                        "Track engagement analytics, impressions, and follower conversion metrics"
                ),
                Arrays.asList(
                        "Deliver high authenticity matching the client's distinct executive voice",
                        "Zero AI hallucinations - thorough fact checking of claims and stats"
                ),
                Arrays.asList("Copywriting", "Brand Strategy", "LinkedIn", "Ghostwriting", "Storytelling"),
                null,
                true
        ));

        addOpportunity(new Opportunity(
                "opp_105",
                "CloudVanguard Systems",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80",
                "https://cloudvanguard.net",
                "Cloud & IT Support Associate",
                "it",
                "Mumbai",
                "6 Months",
                "2026-10-15",
                22000.0,
                "₹22,000 / month",
                "Support cloud provisioning, identity management, and automated monitoring for internal client clusters.",
                Arrays.asList(
                        "Manage user access credentials and IAM policies across AWS/Azure",
                        "Troubleshoot network VPN and developer workspace issues",
                        "Maintain IT incident documentation and SLA compliance logs"
                ),
                Arrays.asList(
                        "Follow standard security protocols and 2FA credential management",
                        "Rotating on-call weekend coverage once a month"
                ),
                Arrays.asList("AWS", "Linux", "IT Support", "Networking", "IAM", "Troubleshooting"),
                null,
                true
        ));

        addOpportunity(new Opportunity(
                "opp_106",
                "Apex Growth Partners",
                "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=120&auto=format&fit=crop&q=80",
                "https://apexgrowth.co",
                "Talent Operations & Community Manager",
                "non-it",
                "Bengaluru",
                "3 Months",
                "2026-09-28",
                24000.0,
                "₹24,000 / month",
                "Orchestrate student campus ambassador initiatives, onboarding workshops, and partner communications.",
                Arrays.asList(
                        "Coordinate campus outreach across 20+ university tech clubs",
                        "Host weekly onboarding webinars and community Discord AMA sessions",
                        "Prepare weekly talent engagement reports for partner companies"
                ),
                Arrays.asList(
                        "High empathy and prompt response time on community channels",
                        "Maintain clean records in CRM and Notion databases"
                ),
                Arrays.asList("Community Ops", "Operations", "Event Coordination", "Public Speaking", "CRM"),
                null,
                true
        ));

        addOpportunity(new Opportunity(
                "opp_107",
                "Veloce Design Lab",
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80",
                "https://velocedesign.com",
                "Freelance UI/UX & Micro-Interaction Designer",
                "freelancing",
                "Remote",
                "Flexible / Project Basis",
                "2026-10-10",
                40000.0,
                "₹40,000 / milestone",
                "Craft bespoke web applications, design systems, and fluid prototype animations for SaaS products.",
                Arrays.asList(
                        "Deliver complete Figma design systems with interactive component variants",
                        "Prototype micro-interactions with Lottie and Rive",
                        "Conduct user usability tests and incorporate feedback into iterations"
                ),
                Arrays.asList(
                        "Provide clean developer handoffs with annotated specs",
                        "Available for milestone review calls across IST timezone"
                ),
                Arrays.asList("Figma", "Design Systems", "UI/UX", "Rive", "Prototyping", "Freelance"),
                null,
                true
        ));

        // 3. Applications and Payments start empty for candidate
        // (Populated dynamically when candidate applies to opportunities)

        // 4. Initialize Leaderboard Entries across Domains
        initLeaderboards();

        // 6. Initialize Reviews & Testimonials
        reviews.add(new Review(
                "rev_401",
                "usr_001",
                "Aarav Sharma",
                currentUser.getAvatarUrl(),
                "Content Creator & Video Strategist",
                "ZUNO_APP_REVIEW",
                "opp_104",
                "Brand Storyteller & LinkedIn Ghostwriter",
                5,
                "Zuno completely transformed how I land premium freelance contracts. The payout verification gives total peace of mind - zero chasing clients for payments!",
                30000.0,
                "Last 3 months",
                true,
                "2026-08-31"
        ));

        reviews.add(new Review(
                "rev_402",
                "usr_002",
                "Ananya Iyer",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
                "Full Stack Developer",
                "ZUNO_APP_REVIEW",
                "opp_102",
                "Full Stack Developer (Spring Boot & Vue.js)",
                5,
                "Super clean platform! Got matched with an AI startup in Bengaluru within 48 hours of setting up my profile.",
                45000.0,
                "Last 2 months",
                true,
                "2026-08-25"
        ));

        reviews.add(new Review(
                "rev_403",
                "usr_003",
                "Rohan Deshmukh",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                "Short-Form Video Editor",
                "ZUNO_APP_REVIEW",
                "opp_101",
                "Short-Form Video Editor",
                5,
                "The leaderboard and domain ranking kept me motivated. Earned over ₹50,000 while balancing my college degree!",
                52000.0,
                "Last 3 months",
                true,
                "2026-08-20"
        ));
    }

    private void initLeaderboards() {
        // Content Creators
        List<LeaderboardEntry> contentCreators = new ArrayList<>();
        contentCreators.add(new LeaderboardEntry(1, "usr_101", "Priya Verma", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", "Content Creator", 14000.0, 56000.0, 142000.0, 18, 4.95, false));
        contentCreators.add(new LeaderboardEntry(2, "usr_102", "Devendra K.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", "Content Creator", 11500.0, 42000.0, 98000.0, 12, 4.88, false));
        contentCreators.add(new LeaderboardEntry(3, "usr_001", "Aarav Sharma (You)", currentUser.getAvatarUrl(), "Content Creator", 7500.0, 30000.0, 30000.0, 4, 5.0, true));
        contentCreators.add(new LeaderboardEntry(4, "usr_103", "Kavya Patel", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80", "Content Creator", 6200.0, 26000.0, 68000.0, 9, 4.79, false));
        contentCreators.add(new LeaderboardEntry(5, "usr_104", "Manish Rao", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80", "Content Creator", 5000.0, 21000.0, 45000.0, 6, 4.70, false));
        leaderboardsByProfession.put("content", contentCreators);

        // Software Developers
        List<LeaderboardEntry> devs = new ArrayList<>();
        devs.add(new LeaderboardEntry(1, "usr_201", "Ananya Iyer", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", "Software Engineer", 18000.0, 72000.0, 195000.0, 15, 4.98, false));
        devs.add(new LeaderboardEntry(2, "usr_202", "Vikramaditya S.", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", "Software Engineer", 15000.0, 60000.0, 150000.0, 11, 4.92, false));
        devs.add(new LeaderboardEntry(3, "usr_203", "Siddharth Jain", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80", "Software Engineer", 12000.0, 48000.0, 110000.0, 8, 4.85, false));
        devs.add(new LeaderboardEntry(4, "usr_001", "Aarav Sharma (You)", currentUser.getAvatarUrl(), "Software Engineer", 7500.0, 30000.0, 30000.0, 4, 5.0, true));
        leaderboardsByProfession.put("software", devs);

        // Video Editors
        List<LeaderboardEntry> videoEditors = new ArrayList<>();
        videoEditors.add(new LeaderboardEntry(1, "usr_301", "Rohan Deshmukh", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", "Video Editor", 16000.0, 62000.0, 160000.0, 22, 4.96, false));
        videoEditors.add(new LeaderboardEntry(2, "usr_001", "Aarav Sharma (You)", currentUser.getAvatarUrl(), "Video Editor", 7500.0, 30000.0, 30000.0, 4, 5.0, true));
        videoEditors.add(new LeaderboardEntry(3, "usr_302", "Simran Gill", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", "Video Editor", 6500.0, 26000.0, 72000.0, 10, 4.82, false));
        leaderboardsByProfession.put("video", videoEditors);

        // Educator / STEM
        List<LeaderboardEntry> educators = new ArrayList<>();
        educators.add(new LeaderboardEntry(1, "usr_401", "Dr. Meera Nambiar", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80", "Educator", 13000.0, 52000.0, 130000.0, 16, 4.97, false));
        educators.add(new LeaderboardEntry(2, "usr_402", "Harshvardhan Sen", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80", "Educator", 9000.0, 36000.0, 84000.0, 9, 4.86, false));
        educators.add(new LeaderboardEntry(3, "usr_001", "Aarav Sharma (You)", currentUser.getAvatarUrl(), "Educator", 7500.0, 30000.0, 30000.0, 4, 5.0, true));
        leaderboardsByProfession.put("educator", educators);

        // Freelancing / General
        List<LeaderboardEntry> freelancers = new ArrayList<>();
        freelancers.add(new LeaderboardEntry(1, "usr_501", "Tanmay Joshi", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", "Freelancer", 20000.0, 80000.0, 220000.0, 25, 4.99, false));
        freelancers.add(new LeaderboardEntry(2, "usr_001", "Aarav Sharma (You)", currentUser.getAvatarUrl(), "Freelancer", 7500.0, 30000.0, 30000.0, 4, 5.0, true));
        leaderboardsByProfession.put("freelancing", freelancers);
    }

    // Opportunity Operations
    public void addOpportunity(Opportunity opp) {
        opportunities.put(opp.getId(), opp);
    }

    public List<Opportunity> getAllOpportunities() {
        return new ArrayList<>(opportunities.values());
    }

    public Opportunity getOpportunityById(String id) {
        return opportunities.get(id);
    }

    public List<Opportunity> searchOpportunities(String query, String category, String city) {
        return opportunities.values().stream()
                .filter(opp -> {
                    boolean matchesQuery = query == null || query.isBlank()
                            || opp.getTitle().toLowerCase().contains(query.toLowerCase())
                            || opp.getCompanyName().toLowerCase().contains(query.toLowerCase())
                            || opp.getTags().stream().anyMatch(t -> t.toLowerCase().contains(query.toLowerCase()));

                    boolean matchesCategory = category == null || category.isBlank() || "all".equalsIgnoreCase(category)
                            || opp.getCategory().equalsIgnoreCase(category);

                    boolean matchesCity = city == null || city.isBlank() || "all".equalsIgnoreCase(city)
                            || opp.getLocation().equalsIgnoreCase(city);

                    return matchesQuery && matchesCategory && matchesCity;
                })
                .sorted(Comparator.comparing(Opportunity::getDeadline))
                .collect(Collectors.toList());
    }

    // Application Operations
    public void addApplication(JobApplication app) {
        applications.put(app.getId(), app);
    }

    public List<JobApplication> getAllApplications() {
        return new ArrayList<>(applications.values());
    }

    public JobApplication getApplicationById(String id) {
        return applications.get(id);
    }

    public JobApplication createApplication(String opportunityId, String note) {
        Opportunity opp = opportunities.get(opportunityId);
        if (opp == null) return null;

        String appId = "app_" + System.currentTimeMillis();
        JobApplication app = new JobApplication(
                appId,
                opp.getId(),
                opp,
                currentUser.getId(),
                currentUser.getName(),
                java.time.LocalDate.now().toString(),
                "Applied",
                opp.getStipend(),
                false,
                "Pending Verification",
                note != null ? note : "Applied directly via Zuno Opportunity Dashboard",
                new ArrayList<>(Collections.singletonList("Application submitted successfully. Candidate profile shared with " + opp.getCompanyName() + "."))
        );
        applications.put(appId, app);
        return app;
    }

    public JobApplication updateApplicationStatus(String appId, String newStatus, boolean offerConfirmed) {
        JobApplication app = applications.get(appId);
        if (app != null) {
            app.setStatus(newStatus);
            app.setOfferConfirmed(offerConfirmed);
            if (offerConfirmed) {
                app.setPaymentStatus("Employer Verified & Paid");
                // Credit to wallet & update earnings
                currentUser.setTotalEarnings(currentUser.getTotalEarnings() + app.getStipend());
                currentUser.setThisMonthEarnings(currentUser.getThisMonthEarnings() + app.getStipend());

                // Add to payments ledger
                PaymentRecord pay = new PaymentRecord(
                        "pay_" + System.currentTimeMillis(),
                        app.getId(),
                        app.getOpportunity().getCompanyName(),
                        app.getOpportunity().getCompanyLogo(),
                        app.getOpportunity().getTitle(),
                        app.getStipend(),
                        "Current Month",
                        "Credited",
                        java.time.LocalDate.now().toString(),
                        "TXN_ZUNO_" + System.currentTimeMillis() % 10000000,
                        true
                );
                payments.put(pay.getId(), pay);
            }
        }
        return app;
    }

    public void addCommentToApplication(String appId, String comment) {
        JobApplication app = applications.get(appId);
        if (app != null && comment != null && !comment.isBlank()) {
            app.getComments().add(comment);
        }
    }

    // Payments Operations
    public void addPayment(PaymentRecord pay) {
        payments.put(pay.getId(), pay);
    }

    public List<PaymentRecord> getAllPayments() {
        return new ArrayList<>(payments.values());
    }

    // Reviews Operations
    public void addReview(Review review) {
        review.setId("rev_" + System.currentTimeMillis());
        review.setCreatedAt(java.time.LocalDate.now().toString());
        reviews.add(0, review);
    }

    public List<Review> getAllReviews() {
        return reviews;
    }

    public List<Review> getHighlightedReviews() {
        return reviews.stream().filter(Review::isHighlightOnMainPage).collect(Collectors.toList());
    }

    // Profile Operations
    public UserProfile getCurrentUser() {
        return currentUser;
    }

    public void updateCurrentUser(UserProfile updated) {
        if (updated == null) return;
        if (updated.getName() != null) currentUser.setName(updated.getName());
        if (updated.getUsername() != null) currentUser.setUsername(updated.getUsername());
        if (updated.getPassword() != null) currentUser.setPassword(updated.getPassword());
        if (updated.getAvatarUrl() != null) currentUser.setAvatarUrl(updated.getAvatarUrl());
        if (updated.getProfession() != null) currentUser.setProfession(updated.getProfession());
        if (updated.getCity() != null) currentUser.setCity(updated.getCity());
        if (updated.getAbout() != null) currentUser.setAbout(updated.getAbout());
        if (updated.getGoals() != null) currentUser.setGoals(updated.getGoals());
        if (updated.getEducation() != null) currentUser.setEducation(updated.getEducation());
        if (updated.getResumeUrl() != null) currentUser.setResumeUrl(updated.getResumeUrl());
        if (updated.getSkills() != null) currentUser.setSkills(updated.getSkills());
        if (updated.getInterests() != null) currentUser.setInterests(updated.getInterests());
        if (updated.getHobbies() != null) currentUser.setHobbies(updated.getHobbies());
    }

    public void deleteCurrentUser() {
        currentUser = new UserProfile();
        applications.clear();
        payments.clear();
    }

    // Leaderboard Operations
    public List<LeaderboardEntry> getLeaderboard(String profession) {
        if (profession == null || profession.isBlank()) {
            profession = "content";
        }
        List<LeaderboardEntry> list = leaderboardsByProfession.getOrDefault(profession.toLowerCase(),
                leaderboardsByProfession.get("content"));

        // Dynamically update the current user's entry with live candidate data
        for (LeaderboardEntry entry : list) {
            if (entry.isCurrentUser()) {
                entry.setName(currentUser.getName() + " (You)");
                entry.setAvatarUrl(currentUser.getAvatarUrl());
                entry.setProfession(currentUser.getProfession());
                entry.setWeeklyEarnings(currentUser.getThisWeekEarnings());
                entry.setMonthlyEarnings(currentUser.getThisMonthEarnings());
                entry.setTotalEarnings(currentUser.getTotalEarnings());
            }
        }
        return list;
    }
}
