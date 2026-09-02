/**
 * Zuno Candidate Dashboard - Main Controller & View Handlers
 */

// Mock Datastore for Standalone / Client-side Resilience
window.__MOCK_DATA__ = {
  currentUser: {
    id: "usr_001",
    name: "Dileep Sai",
    username: "dileepsai",
    email: "forchatgptpurpose70@gmail.com",
    password: "••••••••",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    profession: "Student / Campus Learner",
    city: "Bengaluru",
    about: "",
    goals: [],
    education: "",
    resumeUrl: "",
    skills: [],
    interests: [],
    hobbies: [],
    totalEarnings: 0.0,
    thisWeekEarnings: 0.0,
    thisMonthEarnings: 0.0,
    currentRank: 0
  },
  opportunities: [
    {
      id: "opp_101",
      companyName: "HyperGrowth Media",
      companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://hypergrowthmedia.io",
      title: "Short-Form Video Editor & Reels Specialist",
      category: "video",
      location: "Bengaluru",
      duration: "3 Months",
      deadline: "2026-09-25",
      stipend: 28000,
      stipendDisplay: "₹28,000 / month",
      roles: "Edit high-retention short form videos (Reels/TikTok/Shorts) for top tier venture-backed founders.",
      responsibilities: [
        "Edit 12-15 high energy reels per week with motion graphics & sound design",
        "Optimize hooks and retention metrics using A/B thumbnail analysis",
        "Collaborate with the scripting team to align pacing with voiceovers"
      ],
      obligations: [
        "Must deliver first cut within 24 hours of raw footage handoff",
        "Maintain strict confidentiality of unreleased founder interviews",
        "Attend weekly Monday creative alignment syncs at 10 AM IST"
      ],
      tags: ["After Effects", "Premiere Pro", "CapCut", "Sound Design"],
      googleFormUrl: "https://forms.gle/sampleVideoEditorZunoForm",
      isDirectApply: false
    },
    {
      id: "opp_102",
      companyName: "NeuraScale AI",
      companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://neurascale.ai",
      title: "Full Stack Developer (Spring Boot & Vue.js)",
      category: "software",
      location: "Bengaluru",
      duration: "6 Months",
      deadline: "2026-09-30",
      stipend: 35000,
      stipendDisplay: "₹35,000 / month",
      roles: "Build scalable REST microservices and dashboard components for our enterprise AI copilot platform.",
      responsibilities: [
        "Develop backend APIs using Spring Boot, Hibernate, and PostgreSQL",
        "Implement reactive frontend widgets and live analytics charts",
        "Write automated unit and integration tests with JUnit and Mockito"
      ],
      obligations: [
        "20 hours per week minimum commitment with documented pull requests",
        "Adhere to clean architecture and code linting guidelines"
      ],
      tags: ["Java", "Spring Boot", "REST API", "PostgreSQL", "Docker"],
      googleFormUrl: null,
      isDirectApply: true
    },
    {
      id: "opp_103",
      companyName: "EduSpark Labs",
      companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://edusparklabs.com",
      title: "STEM Educator & Technical Content Writer",
      category: "educator",
      location: "Mumbai",
      duration: "4 Months",
      deadline: "2026-10-05",
      stipend: 25000,
      stipendDisplay: "₹25,000 / month",
      roles: "Design engaging STEM interactive tutorials, video scripts, and quizzes for high school & college students.",
      responsibilities: [
        "Draft 4 conceptual guides per week on Computer Science and Data Concepts",
        "Record explanatory walkthrough screencasts with crisp annotations",
        "Review student community problem submissions and provide mentorship"
      ],
      obligations: [
        "Ensure 100% original, plagiarism-free instructional material",
        "Available for student Q&A chat sessions 2 hours on weekend mornings"
      ],
      tags: ["Education", "Curriculum Design", "Python", "Technical Writing"],
      googleFormUrl: "https://forms.gle/sampleEduSparkZunoForm",
      isDirectApply: false
    },
    {
      id: "opp_104",
      companyName: "Zuno Creative Studio",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://zuno.app/studio",
      title: "Brand Storyteller & LinkedIn Ghostwriter",
      category: "content",
      location: "Remote",
      duration: "3 Months",
      deadline: "2026-09-20",
      stipend: 30000,
      stipendDisplay: "₹30,000 / month",
      roles: "Write compelling thought leadership posts, case studies, and newsletter issues for tech leaders.",
      responsibilities: [
        "Conduct weekly 30-min interview downloads with leadership clients",
        "Produce 15 viral LinkedIn posts and 2 in-depth substack articles monthly",
        "Track engagement analytics, impressions, and follower conversion metrics"
      ],
      obligations: [
        "Deliver high authenticity matching the client's distinct executive voice",
        "Zero AI hallucinations - thorough fact checking of claims and stats"
      ],
      tags: ["Copywriting", "Brand Strategy", "LinkedIn", "Ghostwriting"],
      googleFormUrl: null,
      isDirectApply: true
    },
    {
      id: "opp_105",
      companyName: "CloudVanguard Systems",
      companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://cloudvanguard.net",
      title: "Cloud & IT Support Associate",
      category: "it",
      location: "Mumbai",
      duration: "6 Months",
      deadline: "2026-10-15",
      stipend: 22000,
      stipendDisplay: "₹22,000 / month",
      roles: "Support cloud provisioning, identity management, and automated monitoring for internal client clusters.",
      responsibilities: [
        "Manage user access credentials and IAM policies across AWS/Azure",
        "Troubleshoot network VPN and developer workspace issues",
        "Maintain IT incident documentation and SLA compliance logs"
      ],
      obligations: [
        "Follow standard security protocols and 2FA credential management",
        "Rotating on-call weekend coverage once a month"
      ],
      tags: ["AWS", "Linux", "IT Support", "Networking", "IAM"],
      googleFormUrl: null,
      isDirectApply: true
    },
    {
      id: "opp_106",
      companyName: "Apex Growth Partners",
      companyLogo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://apexgrowth.co",
      title: "Talent Operations & Community Manager",
      category: "non-it",
      location: "Bengaluru",
      duration: "3 Months",
      deadline: "2026-09-28",
      stipend: 24000,
      stipendDisplay: "₹24,000 / month",
      roles: "Orchestrate student campus ambassador initiatives, onboarding workshops, and partner communications.",
      responsibilities: [
        "Coordinate campus outreach across 20+ university tech clubs",
        "Host weekly onboarding webinars and community Discord AMA sessions",
        "Prepare weekly talent engagement reports for partner companies"
      ],
      obligations: [
        "High empathy and prompt response time on community channels",
        "Maintain clean records in CRM and Notion databases"
      ],
      tags: ["Community Ops", "Operations", "Event Coordination", "CRM"],
      googleFormUrl: null,
      isDirectApply: true
    },
    {
      id: "opp_107",
      companyName: "Veloce Design Lab",
      companyLogo: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80",
      websiteUrl: "https://velocedesign.com",
      title: "Freelance UI/UX & Micro-Interaction Designer",
      category: "freelancing",
      location: "Remote",
      duration: "Flexible",
      deadline: "2026-10-10",
      stipend: 40000,
      stipendDisplay: "₹40,000 / milestone",
      roles: "Craft bespoke web applications, design systems, and fluid prototype animations for SaaS products.",
      responsibilities: [
        "Deliver complete Figma design systems with interactive component variants",
        "Prototype micro-interactions with Lottie and Rive",
        "Conduct user usability tests and incorporate feedback into iterations"
      ],
      obligations: [
        "Provide clean developer handoffs with annotated specs",
        "Available for milestone review calls across IST timezone"
      ],
      tags: ["Figma", "Design Systems", "UI/UX", "Rive", "Prototyping"],
      googleFormUrl: null,
      isDirectApply: true
    }
  ],
  applications: [],
  payments: [],
  leaderboards: {
    content: [
      { rank: 1, name: "Priya Verma", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", profession: "Content Creator", weeklyEarnings: 14000, monthlyEarnings: 56000, totalEarnings: 142000, completedGigs: 18, rating: 4.95, isCurrentUser: false },
      { rank: 2, name: "Devendra K.", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", profession: "Content Creator", weeklyEarnings: 11500, monthlyEarnings: 42000, totalEarnings: 98000, completedGigs: 12, rating: 4.88, isCurrentUser: false },
      { rank: 3, name: "Kavya Patel", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", profession: "Content Creator", weeklyEarnings: 9200, monthlyEarnings: 36000, totalEarnings: 82000, completedGigs: 11, rating: 4.85, isCurrentUser: false },
      { rank: 4, name: "Manish Rao", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100", profession: "Content Creator", weeklyEarnings: 6200, monthlyEarnings: 26000, totalEarnings: 68000, completedGigs: 9, rating: 4.79, isCurrentUser: false },
      { rank: 5, name: "Shreya Sen", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", profession: "Content Creator", weeklyEarnings: 5000, monthlyEarnings: 21000, totalEarnings: 45000, completedGigs: 6, rating: 4.70, isCurrentUser: false }
    ],
    software: [
      { rank: 1, name: "Ananya Iyer", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", profession: "Software Engineer", weeklyEarnings: 18000, monthlyEarnings: 72000, totalEarnings: 195000, completedGigs: 15, rating: 4.98, isCurrentUser: false },
      { rank: 2, name: "Vikramaditya S.", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", profession: "Software Engineer", weeklyEarnings: 15000, monthlyEarnings: 60000, totalEarnings: 150000, completedGigs: 11, rating: 4.92, isCurrentUser: false },
      { rank: 3, name: "Siddharth Jain", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100", profession: "Software Engineer", weeklyEarnings: 12000, monthlyEarnings: 48000, totalEarnings: 110000, completedGigs: 8, rating: 4.85, isCurrentUser: false },
      { rank: 4, name: "Tanvi Aggarwal", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", profession: "Software Engineer", weeklyEarnings: 9500, monthlyEarnings: 38000, totalEarnings: 92000, completedGigs: 7, rating: 4.80, isCurrentUser: false },
      { rank: 5, name: "Rahul Mehra", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100", profession: "Software Engineer", weeklyEarnings: 7000, monthlyEarnings: 28000, totalEarnings: 64000, completedGigs: 5, rating: 4.72, isCurrentUser: false }
    ],
    video: [
      { rank: 1, name: "Rohan Deshmukh", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", profession: "Video Editor", weeklyEarnings: 16000, monthlyEarnings: 62000, totalEarnings: 160000, completedGigs: 22, rating: 4.96, isCurrentUser: false },
      { rank: 2, name: "Simran Gill", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", profession: "Video Editor", weeklyEarnings: 12500, monthlyEarnings: 48000, totalEarnings: 112000, completedGigs: 14, rating: 4.90, isCurrentUser: false },
      { rank: 3, name: "Aditya Chopra", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", profession: "Video Editor", weeklyEarnings: 8500, monthlyEarnings: 34000, totalEarnings: 85000, completedGigs: 10, rating: 4.84, isCurrentUser: false },
      { rank: 4, name: "Neha Sharma", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", profession: "Video Editor", weeklyEarnings: 6500, monthlyEarnings: 26000, totalEarnings: 72000, completedGigs: 8, rating: 4.78, isCurrentUser: false }
    ],
    educator: [
      { rank: 1, name: "Dr. Meera Nambiar", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", profession: "Educator", weeklyEarnings: 13000, monthlyEarnings: 52000, totalEarnings: 130000, completedGigs: 16, rating: 4.97, isCurrentUser: false },
      { rank: 2, name: "Harshvardhan Sen", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100", profession: "Educator", weeklyEarnings: 9000, monthlyEarnings: 36000, totalEarnings: 84000, completedGigs: 9, rating: 4.86, isCurrentUser: false },
      { rank: 3, name: "Preeti Das", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", profession: "Educator", weeklyEarnings: 7500, monthlyEarnings: 30000, totalEarnings: 65000, completedGigs: 7, rating: 4.80, isCurrentUser: false },
      { rank: 4, name: "Amit Trivedi", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", profession: "Educator", weeklyEarnings: 5500, monthlyEarnings: 22000, totalEarnings: 48000, completedGigs: 5, rating: 4.74, isCurrentUser: false }
    ],
    freelancing: [
      { rank: 1, name: "Tanmay Joshi", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", profession: "Freelancer", weeklyEarnings: 20000, monthlyEarnings: 80000, totalEarnings: 220000, completedGigs: 25, rating: 4.99, isCurrentUser: false },
      { rank: 2, name: "Sneha Kapoor", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", profession: "Freelancer", weeklyEarnings: 15000, monthlyEarnings: 60000, totalEarnings: 160000, completedGigs: 18, rating: 4.93, isCurrentUser: false },
      { rank: 3, name: "Varun Nair", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", profession: "Freelancer", weeklyEarnings: 11000, monthlyEarnings: 44000, totalEarnings: 98000, completedGigs: 12, rating: 4.86, isCurrentUser: false },
      { rank: 4, name: "Pooja Hegde", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", profession: "Freelancer", weeklyEarnings: 8000, monthlyEarnings: 32000, totalEarnings: 75000, completedGigs: 9, rating: 4.81, isCurrentUser: false }
    ]
  },
  reviews: [
    {
      id: "rev_401",
      userId: "usr_001",
      userName: "Priya Verma",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      userProfession: "Content Creator & Video Strategist",
      reviewType: "ZUNO_APP_REVIEW",
      relatedJobTitle: "Brand Storyteller & LinkedIn Ghostwriter",
      rating: 5,
      reviewText: "Zuno completely transformed how I land premium freelance contracts. Direct employer disbursements with zero middleman cuts!",
      verifiedEarnings: 56000.0,
      verifiedPeriod: "August 2026",
      highlightOnMainPage: true,
      createdAt: "2026-08-31 16:45:22"
    }
  ]
};

// Main Controller
document.addEventListener('DOMContentLoaded', async () => {
  let activeTab = 'overview';
  let activeCategory = 'all';
  let activeCity = 'all';
  let activeProfession = 'content';
  let selectedReviewRating = 5;

  // 1. Initial Data Load & Header Sync
  async function refreshUserData() {
    // Check if user just signed up from landing page
    try {
      const storedName = localStorage.getItem('zuno_user_name');
      const storedEmail = localStorage.getItem('zuno_user_email');
      const storedPass = localStorage.getItem('zuno_user_password');
      const storedSkill = localStorage.getItem('zuno_user_skill');
      if (storedName && window.__MOCK_DATA__.currentUser) {
        window.__MOCK_DATA__.currentUser.name = storedName;
        window.__MOCK_DATA__.currentUser.email = storedEmail || window.__MOCK_DATA__.currentUser.email;
        if (storedPass) window.__MOCK_DATA__.currentUser.password = storedPass;
        if (storedSkill) window.__MOCK_DATA__.currentUser.profession = storedSkill;
      }
    } catch (e) {
      console.warn('localStorage read error:', e);
    }

    const user = await ZunoAPI.getProfile();
    if (!user) return;

    // Sidebar & Top Bar elements
    document.querySelectorAll('.user-name-display').forEach(el => el.textContent = user.name);
    document.querySelectorAll('.user-role-display').forEach(el => el.textContent = user.profession);
    document.querySelectorAll('.user-avatar-img').forEach(el => el.src = user.avatarUrl);
    document.querySelectorAll('.weekly-earnings-display').forEach(el => el.textContent = `₹${user.thisWeekEarnings.toLocaleString()}`);
    document.querySelectorAll('.monthly-earnings-display').forEach(el => el.textContent = `₹${user.thisMonthEarnings.toLocaleString()}`);
    document.querySelectorAll('.total-earnings-display').forEach(el => el.textContent = `₹${user.totalEarnings.toLocaleString()}`);
    document.querySelectorAll('.current-rank-display').forEach(el => el.textContent = `#${user.currentRank}`);
  }

  // 2. Tab Navigation
  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `section-${tabId}`);
    });

    // Refresh specific tab contents
    if (tabId === 'overview') renderLeaderboard();
    if (tabId === 'explore') renderOpportunities();
    if (tabId === 'profile') renderProfileForm();
    if (tabId === 'applied') renderAppliedJobs();
    if (tabId === 'payments') renderPayments();
    if (tabId === 'reviews') renderReviews();
  }

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });

  // 3. Section 1: Overview & Leaderboard Renderer
  async function renderLeaderboard() {
    const user = await ZunoAPI.getProfile();
    const entries = await ZunoAPI.getLeaderboard(activeProfession);
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    tbody.innerHTML = entries.map(item => {
      const displayName = item.isCurrentUser ? `${user.name} (You)` : item.name;
      const displayAvatar = item.isCurrentUser ? user.avatarUrl : item.avatarUrl;
      const displayProfession = item.isCurrentUser ? (user.profession || 'Tech / Engineering') : (item.profession || 'Domain Talent');
      const displayMonthly = item.isCurrentUser ? (user.thisMonthEarnings || item.monthlyEarnings) : item.monthlyEarnings;
      const displayTotal = item.isCurrentUser ? (user.totalEarnings || item.totalEarnings) : item.totalEarnings;

      return `
        <tr class="leaderboard-row ${item.isCurrentUser ? 'current-user-row' : ''}">
          <td>
            <span class="rank-badge ${item.rank === 1 ? 'rank-1' : item.rank === 2 ? 'rank-2' : item.rank === 3 ? 'rank-3' : 'rank-other'}">
              ${item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : item.rank}
            </span>
          </td>
          <td>
            <div class="user-cell">
              <img src="${displayAvatar}" alt="${displayName}" />
              <div>
                <div style="font-weight: 700; color: var(--ink);">${displayName}</div>
                <div style="font-size: 11.5px; color: var(--ink-faint);">${displayProfession}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="tag-chip" style="font-size: 11.5px; font-weight: 700; background: var(--paper-soft); color: var(--ink); border: 1px solid var(--paper-line);">
              ${displayProfession}
            </span>
          </td>
          <td style="font-weight: 800; color: var(--coral);">₹${displayMonthly.toLocaleString()}</td>
          <td style="font-weight: 900; color: var(--green);">₹${displayTotal.toLocaleString()}</td>
          <td><span style="font-weight: 700;">★ ${item.rating}</span> (${item.completedGigs} gigs)</td>
        </tr>
      `;
    }).join('');
  }

  // Leaderboard Domain Switcher
  document.querySelectorAll('.domain-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.domain-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeProfession = tab.getAttribute('data-profession');
      renderLeaderboard();
    });
  });

  // 4. Section 2: Explore Opportunities Renderer
  async function renderOpportunities() {
    const searchVal = document.getElementById('opp-search-input')?.value || '';
    const opps = await ZunoAPI.getOpportunities(searchVal, activeCategory, activeCity);
    const apps = await ZunoAPI.getApplications();
    const container = document.getElementById('opportunities-container');
    if (!container) return;

    if (opps.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: var(--paper); border-radius: var(--radius-l);">
          <div style="font-size: 32px; margin-bottom: 12px;">🔍</div>
          <h3>No matching opportunities found</h3>
          <p style="color: var(--ink-soft); margin-top: 6px;">Try adjusting your search query, city, or category filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = opps.map(opp => {
      const isApplied = apps.some(a => a.id === opp.id || a.jobTitle === opp.title || a.opportunityId === opp.id);
      const isClosed = !!opp.isClosed;

      let badgeHtml = '';
      if (isApplied) {
        badgeHtml = '<span class="card-applied-badge">Applied ✓</span>';
      } else if (isClosed) {
        badgeHtml = '<span class="card-applied-badge" style="background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5;">🔒 Closed</span>';
      }

      return `
        <div class="opportunity-card ${isClosed ? 'card-closed' : ''}" data-id="${opp.id}">
          ${badgeHtml}
          <div>
            <div class="card-company-row">
              <img src="${opp.companyLogo}" alt="${opp.companyName}" class="company-logo-img" />
              <div class="company-meta">
                <h4>${opp.companyName}</h4>
                <a href="${opp.websiteUrl || '#'}" target="_blank">${opp.location} • Visit site ↗</a>
              </div>
            </div>
            <h3 class="job-title-h3">${opp.title}</h3>
            <p class="job-desc-snippet">${opp.roles}</p>
            <div class="tags-list">
              ${(opp.tags || []).map(t => `<span class="tag-chip">${t}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer-row">
            <div>
              <div class="stipend-amount">${opp.stipendDisplay || `₹${opp.stipend.toLocaleString()}`}</div>
              <span class="stipend-duration">Duration: ${opp.duration}</span>
            </div>
            ${isApplied ? `
              <button class="btn-primary btn-applied-status" disabled>
                Applied ✓
              </button>
            ` : isClosed ? `
              <button class="btn-primary" disabled style="background: #E5E7EB; color: #6B7280; border: 1px solid #D1D5DB; cursor: not-allowed; font-weight: 700;">
                🔒 Applications Closed
              </button>
            ` : `
              <button class="btn-primary btn-view-job" data-id="${opp.id}">
                ${opp.googleFormUrl ? 'Apply Form ↗' : 'View & Apply'}
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Bind Click to View / Apply
    container.querySelectorAll('.opportunity-card, .btn-view-job').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id');
        const opp = opps.find(o => o.id === id);
        if (!opp) return;

        if (opp.isClosed) {
          UIComponents.showToast('ℹ️ This opportunity has been marked as CLOSED by the hiring partner.');
          return;
        }

        const isApplied = apps.some(a => a.id === id || a.opportunityId === id);
        if (isApplied) {
          UIComponents.showToast('ℹ️ You have already applied for this role. Track progress in Applied Jobs tab.');
          return;
        }

        UIComponents.openJobModal(opp, async (oppId) => {
          await ZunoAPI.applyForJob(oppId, "Applied via candidate dashboard");
          UIComponents.showToast('🎉 Application successfully submitted!');
          renderOpportunities();
          renderAppliedJobs();
          refreshUserData();
        });
      });
    });
  }

  // Category & City Filter Listeners
  document.querySelectorAll('.category-pill-card').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill-card').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      renderOpportunities();
    });
  });

  // City Filter Input with A-Z Datalist Listener
  const citySearchInput = document.getElementById('city-search-input');
  if (citySearchInput) {
    citySearchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (!val || val.toLowerCase().includes('all cities')) {
        activeCity = 'all';
      } else {
        activeCity = val;
      }
      renderOpportunities();
    });
  }

  const searchInput = document.getElementById('opp-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderOpportunities();
    });
  }

  // 5. Section 3: Profile Form Renderer
  async function renderProfileForm() {
    const user = await ZunoAPI.getProfile();
    if (!user) return;

    // Populate profile inputs
    const nameInput = document.getElementById('profile-name-input');
    const usernameInput = document.getElementById('profile-username-input');
    const emailInput = document.getElementById('profile-email-input');
    const passwordInput = document.getElementById('profile-password-input');
    const phoneInput = document.getElementById('profile-phone-input');
    const professionInput = document.getElementById('profile-profession-input');
    const cityInput = document.getElementById('profile-city-input');
    const aboutInput = document.getElementById('profile-about-input');
    const dobInput = document.getElementById('profile-dob-input');
    const collegeInput = document.getElementById('profile-college-input');
    const degreeInput = document.getElementById('profile-degree-input');
    const degreeOtherInput = document.getElementById('profile-degree-other');
    const branchInput = document.getElementById('profile-branch-input');
    const branchOtherInput = document.getElementById('profile-branch-other');
    const specInput = document.getElementById('profile-specialization-input');
    const fromMonth = document.getElementById('profile-from-month');
    const fromYear = document.getElementById('profile-from-year');
    const toMonth = document.getElementById('profile-to-month');
    const toYear = document.getElementById('profile-to-year');
    const roleInput = document.getElementById('profile-role-input');
    const designationInput = document.getElementById('profile-designation-input');
    const salaryInput = document.getElementById('profile-salary-input');
    const locationPrefInput = document.getElementById('profile-location-pref-input');
    const portfolioInput = document.getElementById('profile-portfolio-input');
    const linkedinInput = document.getElementById('profile-linkedin-input');
    const githubInput = document.getElementById('profile-github-input');
    const leetcodeInput = document.getElementById('profile-leetcode-input');
    const codechefInput = document.getElementById('profile-codechef-input');
    const hackerrankInput = document.getElementById('profile-hackerrank-input');
    const hackerearthInput = document.getElementById('profile-hackerearth-input');

    const avatarPreview = document.getElementById('profile-avatar-preview');
    const bioCounter = document.getElementById('bio-char-count');

    // Populate Fields
    let displayName = user.name || "Dileep Sai";
    let displayEmail = user.email || "dileepsai@gmail.com";
    let displayPass = user.password || "••••••••";
    let displayProf = user.profession || "Student / Campus Learner";
    let displayPhone = user.phone || "+91 98765 43210";

    try {
      const sName = localStorage.getItem('zuno_user_name');
      const sEmail = localStorage.getItem('zuno_user_email');
      const sPass = localStorage.getItem('zuno_user_password');
      const sSkill = localStorage.getItem('zuno_user_skill');
      const sPhone = localStorage.getItem('zuno_user_phone');
      if (sName) displayName = sName;
      if (sEmail) displayEmail = sEmail;
      if (sPass) displayPass = sPass;
      if (sSkill) displayProf = sSkill;
      if (sPhone) displayPhone = sPhone;
    } catch (e) {}

    if (nameInput) nameInput.value = displayName;
    if (usernameInput) usernameInput.value = user.username || (displayEmail.includes('@') ? displayEmail.split('@')[0] : 'dileepsai');
    if (emailInput) emailInput.value = displayEmail;
    if (passwordInput) passwordInput.value = displayPass;
    if (phoneInput) phoneInput.value = displayPhone;
    if (professionInput) professionInput.value = displayProf;
    if (cityInput) cityInput.value = user.city || 'Bengaluru';
    
    // Bio & Character Count
    if (aboutInput) {
      aboutInput.value = user.about || '';
      if (bioCounter) bioCounter.textContent = `${aboutInput.value.length} / 300 characters`;
      aboutInput.oninput = () => {
        if (bioCounter) bioCounter.textContent = `${aboutInput.value.length} / 300 characters`;
      };
    }

    if (dobInput && user.dob) dobInput.value = user.dob;
    if (collegeInput) collegeInput.value = user.college || '';
    if (degreeInput) {
      degreeInput.value = user.degree || '';
      const degWrap = document.getElementById('specify-degree-wrapper');
      if (degWrap) {
        degWrap.style.display = (degreeInput.value.toLowerCase().includes('other')) ? 'block' : 'none';
        degreeInput.oninput = () => {
          degWrap.style.display = (degreeInput.value.toLowerCase().includes('other')) ? 'block' : 'none';
        };
      }
    }
    if (degreeOtherInput && user.degreeOther) degreeOtherInput.value = user.degreeOther;

    if (branchInput) {
      branchInput.value = user.branch || '';
      const branchWrap = document.getElementById('specify-branch-wrapper');
      if (branchWrap) {
        branchWrap.style.display = (branchInput.value.toLowerCase().includes('other')) ? 'block' : 'none';
        branchInput.oninput = () => {
          branchWrap.style.display = (branchInput.value.toLowerCase().includes('other')) ? 'block' : 'none';
        };
      }
    }
    if (branchOtherInput && user.branchOther) branchOtherInput.value = user.branchOther;

    if (specInput) specInput.value = user.specialization || '';
    if (fromMonth && user.fromMonth) fromMonth.value = user.fromMonth;
    if (fromYear && user.fromYear) fromYear.value = user.fromYear;
    if (toMonth && user.toMonth) toMonth.value = user.toMonth;
    if (toYear && user.toYear) toYear.value = user.toYear;

    if (roleInput) roleInput.value = user.preferredRole || '';
    if (designationInput) designationInput.value = user.desiredDesignation || '';
    if (salaryInput) salaryInput.value = user.expectedSalary || '';
    if (locationPrefInput) locationPrefInput.value = user.locationPref || '';
    if (portfolioInput) portfolioInput.value = user.portfolioUrl || '';
    if (linkedinInput) linkedinInput.value = user.linkedinUrl || '';
    if (githubInput) githubInput.value = user.githubUrl || '';
    if (leetcodeInput) leetcodeInput.value = user.leetcodeUrl || '';
    if (codechefInput) codechefInput.value = user.codechefUrl || '';
    if (hackerrankInput) hackerrankInput.value = user.hackerrankUrl || '';
    if (hackerearthInput) hackerearthInput.value = user.hackerearthUrl || '';

    if (avatarPreview) {
      avatarPreview.src = user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
    }

    // Password Toggle Eye
    const pwdToggleBtn = document.getElementById('toggle-password-btn');
    if (pwdToggleBtn && passwordInput) {
      pwdToggleBtn.onclick = () => {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          pwdToggleBtn.textContent = '🙈';
        } else {
          passwordInput.type = 'password';
          pwdToggleBtn.textContent = '👁️';
        }
      };
    }

    // Accordion Chevron Collapse Handlers
    document.querySelectorAll('.accordion-chevron-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const card = document.getElementById(targetId);
        if (card) card.classList.toggle('collapsed');
      };
    });

    document.querySelectorAll('.profile-accordion-header').forEach(header => {
      header.onclick = (e) => {
        if (e.target.closest('.btn-section-edit') || e.target.closest('.accordion-chevron-btn')) return;
        const card = header.closest('.profile-accordion-card');
        if (card) card.classList.toggle('collapsed');
      };
    });

    // Section Edit & Save Toggle Logic
    document.querySelectorAll('.btn-section-edit').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation();
        const section = btn.getAttribute('data-section');
        const card = btn.closest('.profile-accordion-card');
        if (!card) return;

        const isReadOnly = card.classList.contains('readonly-mode');
        if (isReadOnly) {
          // Switch to Edit Mode
          card.classList.remove('readonly-mode');
          card.classList.remove('collapsed');
          btn.classList.add('editing');
          btn.innerHTML = `<span class="edit-icon">💾</span> <span class="edit-text">Save & Lock</span>`;
          UIComponents.showToast(`✏️ Editing ${section.charAt(0).toUpperCase() + section.slice(1)} Details. Click Save when finished.`);
        } else {
          // Save and Lock Mode
          const updatedData = {
            name: nameInput?.value.trim() || displayName,
            username: usernameInput?.value.trim() || '',
            email: emailInput?.value.trim() || displayEmail,
            password: passwordInput?.value.trim() || displayPass,
            phone: phoneInput?.value.trim() || displayPhone,
            profession: professionInput?.value.trim() || displayProf,
            city: cityInput?.value.trim() || 'Bengaluru',
            about: aboutInput?.value.trim() || '',
            dob: dobInput?.value || '',
            college: collegeInput?.value.trim() || '',
            degree: degreeInput?.value.trim() || '',
            degreeOther: degreeOtherInput?.value.trim() || '',
            branch: branchInput?.value.trim() || '',
            branchOther: branchOtherInput?.value.trim() || '',
            specialization: specInput?.value.trim() || '',
            fromMonth: fromMonth?.value || '',
            fromYear: fromYear?.value || '',
            toMonth: toMonth?.value || '',
            toYear: toYear?.value || '',
            preferredRole: roleInput?.value.trim() || '',
            desiredDesignation: designationInput?.value.trim() || '',
            expectedSalary: salaryInput?.value.trim() || '',
            locationPref: locationPrefInput?.value.trim() || '',
            portfolioUrl: portfolioInput?.value.trim() || '',
            linkedinUrl: linkedinInput?.value.trim() || '',
            githubUrl: githubInput?.value.trim() || '',
            leetcodeUrl: leetcodeInput?.value.trim() || '',
            codechefUrl: codechefInput?.value.trim() || '',
            hackerrankUrl: hackerrankInput?.value.trim() || '',
            hackerearthUrl: hackerearthInput?.value.trim() || '',
            skills: user.skills || []
          };

          await ZunoAPI.updateProfile(updatedData);
          try {
            localStorage.setItem('zuno_user_name', updatedData.name);
            localStorage.setItem('zuno_user_email', updatedData.email);
            localStorage.setItem('zuno_user_password', updatedData.password);
            localStorage.setItem('zuno_user_phone', updatedData.phone);
            localStorage.setItem('zuno_user_skill', updatedData.profession);
          } catch (err) {}

          card.classList.add('readonly-mode');
          btn.classList.remove('editing');
          const label = section === 'personal' ? 'Edit Details' : section === 'education' ? 'Edit Education' : 'Edit Preferences';
          btn.innerHTML = `<span class="edit-icon">✏️</span> <span class="edit-text">${label}</span>`;
          UIComponents.showToast('✅ Saved & Locked successfully!');
          await refreshUserData();
          await renderLeaderboard();
        }
      };
    });

    // Interactive Skills Tags
    const skillsContainer = document.getElementById('skills-tags-container');
    if (skillsContainer) {
      if (!user.skills || user.skills.length === 0) {
        const storedSkill = localStorage.getItem('zuno_user_skill');
        user.skills = storedSkill ? [storedSkill] : ['Web Development', 'Creative Design'];
      }
      const skills = user.skills;
      skillsContainer.className = 'skills-tags-editor';
      skillsContainer.innerHTML = skills.map((s, idx) => `
        <span class="skill-tag-pill">
          ${s}
          <span class="skill-del-btn" data-idx="${idx}" title="Remove skill">&times;</span>
        </span>
      `).join('') + `
        <div class="add-skill-inline">
          <input type="text" id="new-skill-input" placeholder="+ Add custom skill" />
          <button type="button" id="btn-add-skill">Add</button>
        </div>
      `;

      // Remove skill event
      skillsContainer.querySelectorAll('.skill-del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          skills.splice(idx, 1);
          user.skills = skills;
          renderProfileForm();
        });
      });

      // Add skill event
      const addSkillBtn = document.getElementById('btn-add-skill');
      const newSkillInput = document.getElementById('new-skill-input');
      if (addSkillBtn && newSkillInput) {
        addSkillBtn.addEventListener('click', () => {
          const val = newSkillInput.value.trim();
          if (val && !skills.includes(val)) {
            skills.push(val);
            user.skills = skills;
            renderProfileForm();
          }
        });
        newSkillInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addSkillBtn.click();
          }
        });
      }
    }

    // Avatar Upload Listener
    const avatarInput = document.getElementById('avatar-file-input');
    if (avatarInput) {
      avatarInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (avatarPreview) avatarPreview.src = ev.target.result;
            user.avatarUrl = ev.target.result;
            UIComponents.showToast('📷 Photo updated successfully!');
          };
          reader.readAsDataURL(file);
        }
      };
    }
  }

  // Delete Profile Button
  const deleteProfileBtn = document.getElementById('btn-delete-profile');
  if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener('click', async () => {
      if (confirm('Are you absolutely sure you want to delete your candidate profile? This cannot be undone.')) {
        await ZunoAPI.deleteProfile();
        try {
          localStorage.clear();
        } catch (e) {}
        UIComponents.showToast('Candidate account deleted.');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }
    });
  }

  // Real-time Relative Date Comparison Helper
  function formatRelativeTime(dateStr) {
    if (!dateStr) return 'Today';
    const now = new Date();
    const d = new Date(dateStr);
    const diffMs = now.setHours(0,0,0,0) - d.setHours(0,0,0,0);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return '1d ago';
    if (diffDays === 2) return '2d ago';
    return `${diffDays}d ago`;
  }

  // Open Detailed Application Status Modal
  function openApplicationStatusModal(app) {
    const modal = document.getElementById('application-status-modal');
    if (!modal) return;

    document.getElementById('app-modal-company-logo').src = app.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80';
    document.getElementById('app-modal-job-title').textContent = app.jobTitle || app.title || 'Selected Opportunity';
    document.getElementById('app-modal-company-meta').textContent = `${app.companyName || 'Partner Employer'} • ${app.location || 'Bengaluru'}`;
    
    // Dates calculation
    const appliedRel = formatRelativeTime(app.appliedDate);
    const postedRel = formatRelativeTime(app.postedDate || '2026-08-29');
    
    document.getElementById('app-modal-posted-date').textContent = `${app.postedDate || '2026-08-29'} (${postedRel})`;
    document.getElementById('app-modal-applied-date').textContent = `${app.appliedDate || 'Today'} (${appliedRel})`;
    document.getElementById('app-modal-stipend').textContent = app.stipendDisplay || `₹${(app.stipend || 0).toLocaleString()} / month`;

    // Recruiter Profile Viewed Status
    const viewedEl = document.getElementById('app-modal-viewed-status');
    const isViewed = app.profileViewed === true || app.status !== 'APPLIED';
    if (isViewed) {
      viewedEl.innerHTML = `<span style="color: #1B5E20; font-weight: 800;">👁️ Profile Viewed by Recruiter</span>`;
    } else {
      viewedEl.innerHTML = `<span style="color: var(--ink-faint); font-weight: 700;">⏳ In FIFO Review Queue</span>`;
    }

    // Dynamic Status Banner Message & Colors
    const bannerEl = document.getElementById('app-modal-status-banner');
    const status = (app.status || 'APPLIED').toUpperCase();

    if (status === 'SHORTLISTED') {
      bannerEl.style.background = '#E8F5E9';
      bannerEl.style.border = '1.5px solid #81C784';
      bannerEl.style.color = '#1B5E20';
      
      let recruiterCardHtml = '';
      if (app.sharedRecruiterInfo) {
        const rec = app.sharedRecruiterInfo;
        recruiterCardHtml = `
          <div style="background: #FFFFFF; border: 1.5px dashed #00A862; border-radius: 12px; padding: 14px; margin-top: 12px; color: #0E1114;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #00A862; letter-spacing: 0.05em; margin-bottom: 4px;">
              ✓ Recruiter Direct Contact Shared:
            </div>
            <div style="font-size: 14px; font-weight: 800;">${rec.recruiterName}</div>
            <div style="font-size: 12px; color: var(--ink-soft);">${rec.recruiterTitle || 'Talent Acquisition'} • ${rec.recruiterCompany || app.companyName}</div>
            <div style="display: flex; gap: 14px; margin-top: 8px; flex-wrap: wrap;">
              <a href="mailto:${rec.recruiterEmail}" style="color: #2B59FF; font-weight: 700; font-size: 12.5px; text-decoration: none;">✉️ ${rec.recruiterEmail}</a>
              <a href="tel:${rec.recruiterPhone}" style="color: #00874F; font-weight: 700; font-size: 12.5px; text-decoration: none;">📞 ${rec.recruiterPhone}</a>
            </div>
          </div>
        `;
      }

      bannerEl.innerHTML = `
        <div style="font-weight: 900; font-size: 15px; margin-bottom: 4px;">🎉 Congratulations! You are SHORTLISTED!</div>
        <div style="font-size: 13px; line-height: 1.4;">The hiring team reviewed your resume profile and advanced your candidacy for the final evaluation round.</div>
        ${recruiterCardHtml}
      `;
    } else if (status === 'HIRED' || status === 'SELECTED') {
      bannerEl.style.background = '#F0FFF4';
      bannerEl.style.border = '2px solid #00C875';
      bannerEl.style.color = '#0E1114';
      bannerEl.innerHTML = `
        <div style="font-weight: 900; font-size: 16px; margin-bottom: 4px; color: #00874F;">🏆 You Have Been HIRED / SELECTED! ⚡</div>
        <div style="font-size: 13px; line-height: 1.4;">The partner employer confirmed your selection. Check your email/phone for onboarding details.</div>
      `;
    } else if (status.startsWith('REJECTED')) {
      const stageText = app.rejectionStage || (status === 'REJECTED_SHORTLIST' ? 'Shortlist Interview Stage' : 'Initial Screening');
      bannerEl.style.background = '#FFEBEE';
      bannerEl.style.border = '1.5px solid #EF9A9A';
      bannerEl.style.color = '#C62828';
      bannerEl.innerHTML = `
        <div style="font-weight: 900; font-size: 15px; margin-bottom: 4px;">Application Declined at ${stageText}</div>
        <div style="font-size: 13px; line-height: 1.4;">
          The hiring team has completed reviews for this batch. Keep your profile updated and apply to other active opportunities!
        </div>
      `;
    } else {
      // Default: APPLIED / UNDER_REVIEW
      bannerEl.style.background = '#FFF9C4';
      bannerEl.style.border = '1.5px solid #FFF176';
      bannerEl.style.color = '#F57F17';
      bannerEl.innerHTML = `
        <div style="font-weight: 900; font-size: 15px; margin-bottom: 4px;">⏳ Application Submitted & Under Review</div>
        <div style="font-size: 13px; line-height: 1.4;">Your profile is in the recruiter's FIFO candidate review pipeline. Status updates will sync in real time.</div>
      `;
    }

    // Modal Stepper with checkmarks
    const stepperWrap = document.getElementById('app-modal-stepper-wrap');
    const isStep2Active = status === 'UNDER_REVIEW' || status === 'SHORTLISTED';
    const isStep2Done = status === 'HIRED' || status === 'SELECTED' || status === 'SHORTLISTED';
    const isStep3Active = status === 'HIRED' || status === 'SELECTED';

    stepperWrap.innerHTML = `
      <div class="app-status-tracker" style="padding: 14px 18px;">
        <div class="tracker-step done">
          <div class="tracker-dot">✓</div>
          <span>Application Submitted</span>
        </div>
        <div class="tracker-line ${isStep2Done ? 'done' : ''}"></div>
        <div class="tracker-step ${isStep2Active ? 'active' : (isStep2Done ? 'done' : '')}">
          <div class="tracker-dot">${isStep2Done ? '✓' : '2'}</div>
          <span>${status === 'SHORTLISTED' ? 'Shortlisted ✓' : 'Employer Review'}</span>
        </div>
        <div class="tracker-line ${isStep3Active ? 'done' : ''}"></div>
        <div class="tracker-step ${isStep3Active ? 'active' : ''}">
          <div class="tracker-dot">${isStep3Active ? '🎉' : '3'}</div>
          <span>Hired / Selected</span>
        </div>
      </div>
    `;

    modal.classList.add('open');
  }

  // 6. Section 4: Applied Jobs Renderer
  async function renderAppliedJobs() {
    const apps = await ZunoAPI.getApplications();
    const container = document.getElementById('applied-jobs-container');
    if (!container) return;

    if (apps.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 56px 24px; background: var(--paper); border: 1.5px dashed var(--paper-line); border-radius: var(--radius-l); margin-top: 12px;">
          <div style="font-size: 40px; margin-bottom: 12px;">📂</div>
          <h3 style="font-size: 19px; font-weight: 800; margin-bottom: 6px; color: var(--ink);">No Active Applications Yet</h3>
          <p style="color: var(--ink-soft); font-size: 13.5px; max-width: 440px; margin: 0 auto 24px; line-height: 1.5;">
            You haven't applied to any opportunities yet. Browse verified roles matching your skills and track submissions right here.
          </p>
          <button class="btn-primary" onclick="document.querySelector('[data-tab=explore]').click()" style="padding: 12px 28px;">
            Browse & Apply for Opportunities 🚀
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="section-header-flex" style="margin-bottom: 24px;">
        <div>
          <h2>Your Applied Opportunities (${apps.length})</h2>
          <p style="font-size: 13.5px; color: var(--ink-soft); margin-top: 4px;">
            Track real-time candidate pipeline stages, shortlisting decisions, and employer interview invitations.
          </p>
        </div>
      </div>
      <div class="opportunities-grid">
        ${apps.map(app => {
          const status = (app.status || 'APPLIED').toUpperCase();
          const isShortlisted = status === 'SHORTLISTED';
          const isHired = status === 'HIRED' || status === 'SELECTED';
          const isRejected = status.startsWith('REJECTED');

          let badgeColor = 'var(--partner-accent)';
          let badgeText = 'Applied (FIFO)';
          if (isShortlisted) {
            badgeColor = 'var(--partner-green)';
            badgeText = 'Shortlisted ✨';
          } else if (isHired) {
            badgeColor = '#0E1114';
            badgeText = 'Hired / Selected 🏆';
          } else if (isRejected) {
            badgeColor = 'var(--partner-red)';
            badgeText = `Declined (${app.rejectionStage || 'Screening'})`;
          }

          return `
            <div class="opportunity-card" data-id="${app.id}" style="${isShortlisted ? 'border-color: rgba(0, 200, 117, 0.4); box-shadow: 0 4px 20px rgba(0, 200, 117, 0.1);' : (isRejected ? 'border-color: rgba(229, 57, 53, 0.3); opacity: 0.85;' : '')}">
              <span class="card-applied-badge" style="background: ${badgeColor}; color: #FFFFFF;">${badgeText}</span>
              
              <div>
                <div class="card-company-row">
                  <img src="${app.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'}" alt="${app.companyName}" class="company-logo-img" />
                  <div class="company-meta">
                    <h4>${app.companyName}</h4>
                    <a href="${app.websiteUrl || '#'}" target="_blank">${app.location || 'Bengaluru'} • Applied ${formatRelativeTime(app.appliedDate)} ↗</a>
                  </div>
                </div>
                <h3 class="job-title-h3">${app.jobTitle}</h3>
                <p class="job-desc-snippet">${app.roles || 'Application submitted for verified candidate review.'}</p>
                <div class="tags-list">
                  ${(app.tags || ['Verified Role', 'Candidate Match']).map(t => `<span class="tag-chip">${t}</span>`).join('')}
                </div>

                ${(isShortlisted && app.sharedRecruiterInfo) ? `
                  <div style="background: #F0F5FF; border: 1px solid #B8D0FF; border-radius: 10px; padding: 10px 12px; margin-top: 12px; font-size: 12px;">
                    <div style="font-weight: 800; color: #2B59FF;">📞 Recruiter Contact:</div>
                    <div style="color: #0E1114; font-weight: 700;">${app.sharedRecruiterInfo.recruiterName} (${app.sharedRecruiterInfo.recruiterEmail})</div>
                  </div>
                ` : ''}
              </div>

              <div>
                <div class="card-footer-row" style="margin-bottom: 0; align-items: center;">
                  <div>
                    <div class="stipend-amount">${app.stipendDisplay || `₹${(app.stipend || 0).toLocaleString()}`}</div>
                    <span class="stipend-duration">Duration: ${app.duration || '3 Months'}</span>
                  </div>
                  <button type="button" class="btn-app-detail" data-id="${app.id}" title="Click to view full application details & real-time status">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> Status Details
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Bind Click on Status Details Button & Card
    container.querySelectorAll('.btn-app-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.opportunity-card');
        const id = card ? card.getAttribute('data-id') : btn.getAttribute('data-id');
        const app = apps.find(a => a.id === id);
        if (app) {
          openApplicationStatusModal(app);
        }
      });
    });
  }

  // 7. Section 5: Payments & Wallet Renderer
  async function renderPayments() {
    const summary = await ZunoAPI.getPaymentsSummary();
    const balanceDisplay = document.getElementById('wallet-balance-display');
    const pendingDisplay = document.getElementById('pending-verification-display');
    const tbody = document.getElementById('payments-tbody');

    if (balanceDisplay) {
      balanceDisplay.textContent = `₹${(summary.walletBalance || 0).toLocaleString()}`;
    }
    if (pendingDisplay) {
      pendingDisplay.textContent = `₹${(summary.pendingVerification || 0).toLocaleString()}`;
    }

    if (tbody) {
      if (!summary.history || summary.history.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="5" style="text-align: center; padding: 36px; color: var(--ink-soft);">
              No completed payouts yet. Once an employer disburses your monthly stipend, transaction proofs appear here.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = summary.history.map(tx => `
          <tr>
            <td style="font-weight: 700;">${tx.companyName} - ${tx.role}</td>
            <td style="color: var(--ink-soft);">${tx.period}</td>
            <td style="font-weight: 800; color: var(--green);">₹${tx.amount.toLocaleString()}</td>
            <td><span class="status-pill status-paid">${tx.status}</span></td>
            <td style="font-family: monospace; font-size: 12px; color: var(--ink-faint);">${tx.refId}</td>
          </tr>
        `).join('');
      }
    }
  }

  // 8. Section 6: Reviews & Spotlight Renderer
  async function renderReviews() {
    const reviews = await ZunoAPI.getReviews();
    const highlightBox = document.getElementById('featured-highlight-box');
    const userReviewsList = document.getElementById('user-reviews-list');
    const userReviewCount = document.getElementById('user-review-count');

    if (userReviewCount) userReviewCount.textContent = reviews.length;

    if (highlightBox && reviews.length > 0) {
      const topRev = reviews[0];
      highlightBox.innerHTML = `
        <div class="verified-highlight-card">
          <div class="verified-badge-row">
            <span class="verified-chip">★ Zuno Verified Candidate</span>
            <span class="earnings-proof-pill">Exact Timestamp: ${topRev.createdAt || new Date().toISOString().replace('T', ' ').slice(0, 19)}</span>
          </div>
          <div style="color: var(--gold); font-size: 16px; margin-bottom: 8px;">
            ${'★'.repeat(topRev.rating || 5)}${'☆'.repeat(5 - (topRev.rating || 5))}
          </div>
          <p class="highlight-text-quote">"${topRev.reviewText}"</p>
          <div class="highlight-author-row">
            <img src="${topRev.userAvatar}" alt="${topRev.userName}" />
            <div>
              <div style="font-weight: 800; font-size: 14.5px;">${topRev.userName}</div>
              <div style="font-size: 12px; color: var(--lime);">${topRev.userProfession}</div>
            </div>
          </div>
        </div>
      `;
    }

    if (userReviewsList) {
      if (reviews.length === 0) {
        userReviewsList.innerHTML = `<p style="font-size: 12.5px; color: var(--ink-faint);">No published reviews yet. Submit your first review above!</p>`;
      } else {
        userReviewsList.innerHTML = reviews.map(rev => `
          <div class="review-item-card" data-id="${rev.id}">
            <div class="review-item-header">
              <span class="review-timestamp-badge">🕒 ${rev.createdAt}</span>
              <div class="review-action-btns">
                <button type="button" class="btn-review-act btn-review-edit" data-id="${rev.id}">✏️ Edit</button>
                <button type="button" class="btn-review-act btn-review-delete" data-id="${rev.id}">🗑️ Delete</button>
              </div>
            </div>
            <div style="color: var(--gold); font-size: 13px; margin-bottom: 6px;">
              ${'★'.repeat(rev.rating || 5)}${'☆'.repeat(5 - (rev.rating || 5))}
            </div>
            <p style="font-size: 13.5px; color: var(--ink); line-height: 1.45;">${rev.reviewText}</p>
          </div>
        `).join('');

        // Bind Edit & Delete Handlers
        userReviewsList.querySelectorAll('.btn-review-edit').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const rev = reviews.find(r => r.id === id);
            if (rev) {
              document.getElementById('editing-review-id').value = rev.id;
              document.getElementById('review-text-input').value = rev.reviewText;
              selectedReviewRating = rev.rating || 5;
              document.querySelectorAll('.star-pick-btn').forEach((b, i) => {
                b.textContent = (i < selectedReviewRating) ? '★' : '☆';
              });
              document.getElementById('review-form-heading').textContent = 'Edit Your Verified Review';
              document.getElementById('btn-submit-review').textContent = 'Update Review';
              document.getElementById('btn-cancel-review-edit').style.display = 'inline-flex';
              document.getElementById('review-text-input').focus();
            }
          });
        });

        userReviewsList.querySelectorAll('.btn-review-delete').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this review?')) {
              await ZunoAPI.deleteReview(id);
              UIComponents.showToast('🗑️ Review deleted successfully');
              renderReviews();
            }
          });
        });
      }
    }
  }

  // Cancel Review Edit
  const cancelReviewEditBtn = document.getElementById('btn-cancel-review-edit');
  if (cancelReviewEditBtn) {
    cancelReviewEditBtn.addEventListener('click', () => {
      document.getElementById('editing-review-id').value = '';
      document.getElementById('review-text-input').value = '';
      document.getElementById('review-form-heading').textContent = 'Leave a Verified Review';
      document.getElementById('btn-submit-review').textContent = 'Publish Verified Review';
      cancelReviewEditBtn.style.display = 'none';
    });
  }

  // Star Rating Picker
  document.querySelectorAll('.star-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const r = parseInt(btn.getAttribute('data-rating'));
      selectedReviewRating = r;
      document.querySelectorAll('.star-pick-btn').forEach((b, i) => {
        b.textContent = (i < r) ? '★' : '☆';
      });
    });
  });

  // Review Form Submit (Handles both Create and Edit with exact seconds timestamp)
  const reviewForm = document.getElementById('zuno-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = document.getElementById('review-text-input').value.trim();
      const highlight = document.getElementById('highlight-toggle-input').checked;
      const editId = document.getElementById('editing-review-id').value;

      await ZunoAPI.postReview({
        id: editId || undefined,
        reviewType: "ZUNO_APP_REVIEW",
        rating: selectedReviewRating,
        reviewText: text,
        verifiedEarnings: window.__MOCK_DATA__.currentUser.totalEarnings,
        verifiedPeriod: "Verified",
        highlightOnMainPage: highlight
      });

      UIComponents.showToast(editId ? '✅ Review updated with exact timestamp!' : '🌟 Review published with exact timestamp!');
      document.getElementById('editing-review-id').value = '';
      document.getElementById('review-text-input').value = '';
      document.getElementById('review-form-heading').textContent = 'Leave a Verified Review';
      document.getElementById('btn-submit-review').textContent = 'Publish Verified Review';
      if (cancelReviewEditBtn) cancelReviewEditBtn.style.display = 'none';
      renderReviews();
    });
  }

  // 9. Top-Bar Action Dock (Bell, Settings, Profile Dropdown & Logout)
  const profileDockBtn = document.getElementById('dock-profile-btn');
  const profileDropdown = document.getElementById('dock-profile-dropdown');
  const settingsDockBtn = document.getElementById('dock-settings-btn');
  const bellDockBtn = document.getElementById('dock-bell-btn');
  const logoutBtn = document.getElementById('dock-logout-btn');

  if (profileDockBtn && profileDropdown) {
    profileDockBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!profileDropdown.contains(e.target) && e.target !== profileDockBtn) {
        profileDropdown.classList.remove('open');
      }
    });
  }

  if (settingsDockBtn) {
    settingsDockBtn.addEventListener('click', () => {
      const modal = document.getElementById('settings-modal');
      if (modal) modal.classList.add('open');
    });
  }

  if (bellDockBtn) {
    bellDockBtn.addEventListener('click', () => {
      const modal = document.getElementById('notifications-modal');
      if (modal) modal.classList.add('open');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      try {
        localStorage.removeItem('zuno_user_name');
        localStorage.removeItem('zuno_user_email');
        localStorage.removeItem('zuno_user_skill');
      } catch (e) {}
      UIComponents.showToast('👋 Logging out...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }

  // Export Stats Feature
  const exportBtn = document.getElementById('btn-open-export-modal');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const modal = document.getElementById('export-stats-modal');
      if (modal) modal.classList.add('open');
    });
  }

  const confirmExportBtn = document.getElementById('btn-confirm-export');
  if (confirmExportBtn) {
    confirmExportBtn.addEventListener('click', async () => {
      const format = document.getElementById('export-format-select').value;
      const type = document.getElementById('export-type-select').value;
      const dateRange = document.getElementById('export-range-select').value;

      await ZunoAPI.exportStats({
        exportType: type,
        format: format,
        dateRange: dateRange,
        profession: activeProfession
      });

      UIComponents.showToast(`📊 Stats exported as ${format}!`);
      UIComponents.closeModal('export-stats-modal');
    });
  }

  // Close modals on backdrop click or close button
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  // Listen for Partner Platform cross-tab updates
  window.addEventListener('storage', async () => {
    await refreshUserData();
    if (activeTab === 'explore') renderOpportunities();
    if (activeTab === 'applied') renderAppliedJobs();
  });

  window.addEventListener('zuno_data_updated', async () => {
    await refreshUserData();
    if (activeTab === 'explore') renderOpportunities();
    if (activeTab === 'applied') renderAppliedJobs();
  });

  // Initial Boot
  await refreshUserData();
  switchTab('overview');
});
