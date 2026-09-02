/**
 * Zuno Dashboard & Partner Platform - Unified API & Data Synchronization Layer
 */
const SUPABASE_PROJECT_URL = 'https://ljedommugttmgbkboevi.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_NiBAR3NzDOUqq_EwfJOENg_YJdNgJvC';
let supabaseClient = null;

if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_PROJECT_URL, SUPABASE_PUBLISHABLE_KEY);
    console.log('⚡ Supabase Cloud Database Connected: ljedommugttmgbkboevi');
  } catch (err) {
    console.warn('Supabase initialization warning:', err);
  }
}

// Default Recruiter Profile
const DEFAULT_RECRUITER = {
  id: "rec_001",
  name: "Sarah Jenkins",
  title: "Head of Talent Acquisition & Partnerships",
  companyName: "HyperGrowth Talent Network",
  companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
  email: "sarah.jenkins@hypergrowth.io",
  phone: "+91 98450 12345",
  websiteUrl: "https://hypergrowthmedia.io",
  location: "Bengaluru, India"
};

// Shared Mock Datastore for Standalone / Client-side Resilience
if (typeof window !== 'undefined') {
  if (!window.__MOCK_DATA__) {
    window.__MOCK_DATA__ = {
      currentUser: {
        id: "usr_001",
        name: "Dileep Sai",
        username: "dileepsai",
        email: "dileepsai@gmail.com",
        password: "••••••••",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        profession: "Student / Campus Learner",
        city: "Bengaluru",
        about: "Passionate engineer and campus developer ready for high impact projects.",
        goals: [],
        education: "B.Tech in Computer Science & Engineering",
        resumeUrl: "https://zuno.app/resumes/dileep_sai_resume.pdf",
        skills: ["Java", "Spring Boot", "React", "Python", "SQL"],
        interests: ["AI/ML", "Backend Engineering"],
        hobbies: ["Coding", "Tech Blogging"],
        totalEarnings: 45000.0,
        thisWeekEarnings: 0.0,
        thisMonthEarnings: 0.0,
        currentRank: 1
      },
      opportunities: [
        {
          id: "opp_101",
          companyName: "HyperGrowth Media",
          companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          websiteUrl: "https://hypergrowthmedia.io",
          title: "AI/ML Engineer & LLM Pipeline Developer",
          category: "software",
          location: "Bengaluru",
          duration: "3 Months",
          deadline: "2026-10-15",
          stipend: 45000,
          stipendDisplay: "₹45,000 / month",
          roles: "Build automated LLM pipelines, prompt evaluation benchmarks, and vector retrieval layers.",
          responsibilities: [
            "Develop RAG microservices using Python, FastAPI, and Pinecone",
            "Fine-tune lightweight embedding models for contextual search",
            "Deploy high-throughput inference endpoints with streaming response support"
          ],
          obligations: [
            "Maintain test coverage above 85% for all core pipeline logic",
            "Participate in weekly sprint architecture reviews"
          ],
          tags: ["Python", "FastAPI", "LangChain", "Vector DB", "PyTorch"],
          googleFormUrl: null,
          isDirectApply: true,
          postedDate: "2026-09-02"
        },
        {
          id: "opp_102",
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
          roles: "Edit high-retention short form videos (Reels/TikTok/Shorts) for venture-backed founders.",
          responsibilities: [
            "Edit 12-15 high energy reels per week with motion graphics & sound design",
            "Optimize hooks and retention metrics using A/B thumbnail analysis",
            "Collaborate with the scripting team to align pacing with voiceovers"
          ],
          obligations: [
            "Must deliver first cut within 24 hours of raw footage handoff",
            "Maintain strict confidentiality of unreleased founder interviews"
          ],
          tags: ["After Effects", "Premiere Pro", "CapCut", "Sound Design"],
          googleFormUrl: null,
          isDirectApply: true,
          postedDate: "2026-09-01"
        },
        {
          id: "opp_103",
          companyName: "NeuraScale AI",
          companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          websiteUrl: "https://neurascale.ai",
          title: "Full Stack Engineer (Spring Boot & React)",
          category: "software",
          location: "Remote / Hybrid",
          duration: "6 Months",
          deadline: "2026-10-31",
          stipend: 38000,
          stipendDisplay: "₹38,000 / month",
          roles: "Build enterprise dashboard components, REST APIs, and event-driven data streaming layers.",
          responsibilities: [
            "Build reactive stateful UI components in React and TypeScript",
            "Develop secured Spring Boot microservices with JWT authentication",
            "Write database migrations and optimize PostgreSQL query indexes"
          ],
          obligations: [
            "Participate in daily 15-minute async standups",
            "Deliver clean code with unit and integration tests"
          ],
          tags: ["Spring Boot", "React", "PostgreSQL", "TypeScript", "REST API"],
          googleFormUrl: null,
          isDirectApply: true,
          postedDate: "2026-08-30"
        },
        {
          id: "opp_104",
          companyName: "Veloce Design Lab",
          companyLogo: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=120&auto=format&fit=crop&q=80",
          websiteUrl: "https://velocedesign.com",
          title: "UI/UX & Design Systems Specialist",
          category: "freelancing",
          location: "Remote",
          duration: "Flexible",
          deadline: "2026-10-10",
          stipend: 35000,
          stipendDisplay: "₹35,000 / milestone",
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
          isDirectApply: true,
          postedDate: "2026-08-28"
        },
        {
          id: "opp_105",
          companyName: "CloudVanguard Systems",
          companyLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80",
          websiteUrl: "https://cloudvanguard.net",
          title: "Cloud & DevOps Infrastructure Associate",
          category: "it",
          location: "Mumbai",
          duration: "6 Months",
          deadline: "2026-10-15",
          stipend: 32000,
          stipendDisplay: "₹32,000 / month",
          roles: "Support cloud provisioning, Docker deployments, and automated CI/CD pipelines.",
          responsibilities: [
            "Manage user access credentials and IAM policies across AWS",
            "Troubleshoot Docker container networking and service discovery",
            "Maintain IT incident documentation and SLA compliance logs"
          ],
          obligations: [
            "Follow standard security protocols and 2FA credential management"
          ],
          tags: ["AWS", "Docker", "Linux", "CI/CD", "IAM"],
          googleFormUrl: null,
          isDirectApply: true,
          postedDate: "2026-08-26"
        }
      ],
      applications: [
        {
          id: "app_live_001",
          opportunityId: "opp_101",
          jobTitle: "AI/ML Engineer & LLM Pipeline Developer",
          companyName: "HyperGrowth Media",
          companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          location: "Bengaluru",
          duration: "3 Months",
          candidateId: "usr_001",
          candidateName: "Dileep Sai",
          candidateEmail: "dileepsai@gmail.com",
          candidatePhone: "+91 98765 43210",
          candidateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          candidateProfession: "Student / Campus Learner",
          candidateCity: "Bengaluru",
          candidateSnapshot: {
            id: "usr_001",
            name: "Dileep Sai",
            email: "dileepsai@gmail.com",
            phone: "+91 98765 43210",
            profession: "Student / Campus Learner",
            city: "Bengaluru",
            degree: "Bachelor of Technology",
            branch: "Computer Science & Engineering",
            college: "National Institute of Technology",
            fromYear: "2022",
            toYear: "2026",
            preferredRole: "AI/ML Engineer",
            desiredDesignation: "Full Stack AI Developer",
            expectedSalary: "₹45,000 / month",
            locationPref: "Bengaluru / Hybrid",
            about: "Passionate AI engineer building high throughput LLM pipelines, vector search indexes, and enterprise full-stack apps.",
            skills: ["Python", "FastAPI", "PyTorch", "LangChain", "Spring Boot", "React", "PostgreSQL", "Pinecone"],
            githubUrl: "https://github.com/dileepsai",
            linkedinUrl: "https://linkedin.com/in/dileepsai",
            portfolioUrl: "https://dileepsai.dev",
            leetcodeUrl: "https://leetcode.com/dileepsai"
          },
          appliedDate: "2026-09-02",
          appliedTime: "10:30 AM",
          appliedTimestamp: 1788350000000,
          stipend: 45000,
          stipendDisplay: "₹45,000 / month",
          status: "APPLIED",
          profileViewed: false,
          sharedRecruiterInfo: null,
          rejectionStage: null
        },
        {
          id: "app_live_002",
          opportunityId: "opp_103",
          jobTitle: "Full Stack Engineer (Spring Boot & React)",
          companyName: "NeuraScale AI",
          companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          location: "Remote / Hybrid",
          duration: "6 Months",
          candidateId: "usr_001",
          candidateName: "Dileep Sai",
          candidateEmail: "dileepsai@gmail.com",
          candidatePhone: "+91 98765 43210",
          candidateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          candidateProfession: "Student / Campus Learner",
          candidateCity: "Bengaluru",
          candidateSnapshot: {
            id: "usr_001",
            name: "Dileep Sai",
            email: "dileepsai@gmail.com",
            phone: "+91 98765 43210",
            profession: "Full Stack Engineer",
            city: "Bengaluru",
            degree: "Bachelor of Technology",
            branch: "Computer Science & Engineering",
            college: "National Institute of Technology",
            fromYear: "2022",
            toYear: "2026",
            preferredRole: "Full Stack Developer",
            desiredDesignation: "Full Stack Engineer (Java/Spring)",
            expectedSalary: "₹38,000 / month",
            locationPref: "Bengaluru",
            about: "Experienced in building scalable microservices and reactive interfaces with robust state management.",
            skills: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker", "Git"],
            githubUrl: "https://github.com/dileepsai",
            linkedinUrl: "https://linkedin.com/in/dileepsai",
            portfolioUrl: "https://dileepsai.dev"
          },
          appliedDate: "2026-09-02",
          appliedTime: "11:15 AM",
          appliedTimestamp: 1788353000000,
          stipend: 38000,
          stipendDisplay: "₹38,000 / month",
          status: "SHORTLISTED",
          profileViewed: true,
          sharedRecruiterInfo: {
            recruiterName: "Sarah Jenkins",
            recruiterTitle: "Head of Talent Acquisition",
            recruiterCompany: "HyperGrowth",
            recruiterEmail: "sarah.jenkins@hypergrowth.io",
            recruiterPhone: "+91 98450 12345"
          },
          rejectionStage: null
        },
        {
          id: "app_live_003",
          opportunityId: "opp_102",
          jobTitle: "Short-Form Video Editor & Reels Specialist",
          companyName: "HyperGrowth Media",
          companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
          location: "Bengaluru",
          duration: "3 Months",
          candidateId: "usr_001",
          candidateName: "Dileep Sai",
          candidateEmail: "dileepsai@gmail.com",
          candidatePhone: "+91 98765 43210",
          candidateAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          candidateProfession: "Student / Campus Learner",
          candidateCity: "Bengaluru",
          candidateSnapshot: {
            id: "usr_001",
            name: "Dileep Sai",
            email: "dileepsai@gmail.com",
            phone: "+91 98765 43210",
            profession: "Creator / Video Editor",
            city: "Bengaluru",
            degree: "Bachelor of Technology",
            branch: "Computer Science & Engineering",
            college: "National Institute of Technology",
            fromYear: "2022",
            toYear: "2026",
            preferredRole: "Video Editor",
            desiredDesignation: "Motion Designer",
            expectedSalary: "₹28,000 / month",
            locationPref: "Bengaluru",
            about: "Creator with proven track record in high-retention reels, hooks, and motion graphics.",
            skills: ["Premiere Pro", "After Effects", "CapCut", "Sound Design", "Storyboarding"],
            githubUrl: "https://github.com/dileepsai",
            portfolioUrl: "https://dileepsai.dev"
          },
          appliedDate: "2026-09-01",
          appliedTime: "04:45 PM",
          appliedTimestamp: 1788310000000,
          stipend: 28000,
          stipendDisplay: "₹28,000 / month",
          status: "HIRED",
          profileViewed: true,
          sharedRecruiterInfo: null,
          rejectionStage: null
        }
      ],
      payments: [
        { id: "tx_001", title: "AI/ML Benchmark Implementation", amount: 45000, date: "2026-08-30", status: "COMPLETED", type: "Stipend" }
      ],
      reviews: []
    };
  }
}

const ZunoAPI = {
  baseUrl: '/api',
  supabase: supabaseClient,

  // ==========================================
  // CANDIDATE PROFILE MANAGEMENT
  // ==========================================
  async getProfile() {
    let name = "Dileep Sai";
    let email = "dileepsai@gmail.com";
    let password = "••••••••";
    let profession = "Student / Campus Learner";
    let phone = "+91 98765 43210";

    try {
      const storedName = localStorage.getItem('zuno_user_name');
      const storedEmail = localStorage.getItem('zuno_user_email');
      const storedPass = localStorage.getItem('zuno_user_password');
      const storedSkill = localStorage.getItem('zuno_user_skill');
      const storedPhone = localStorage.getItem('zuno_user_phone');
      if (storedName) name = storedName;
      if (storedEmail) email = storedEmail;
      if (storedPass) password = storedPass;
      if (storedSkill) profession = storedSkill;
      if (storedPhone) phone = storedPhone;
    } catch (e) {}

    // 1. Try Supabase Cloud Database Query
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (data && !error) {
          const profile = {
            id: data.id || 'usr_001',
            name: data.name || name,
            username: data.username || (email.includes('@') ? email.split('@')[0] : 'dileepsai'),
            email: data.email || email,
            password: data.password || password,
            phone: data.phone || phone,
            profession: data.profession || profession,
            city: data.city || 'Bengaluru',
            avatarUrl: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            dob: data.dob || '',
            college: data.college || '',
            degree: data.degree || '',
            degreeOther: data.degree_other || '',
            branch: data.branch || '',
            branchOther: data.branch_other || '',
            specialization: data.specialization || '',
            fromMonth: data.from_month || '',
            fromYear: data.from_year || '',
            toMonth: data.to_month || '',
            toYear: data.to_year || '',
            preferredRole: data.preferred_role || '',
            desiredDesignation: data.desired_designation || '',
            expectedSalary: data.expected_salary || '',
            locationPref: data.location_pref || '',
            portfolioUrl: data.portfolio_url || '',
            linkedinUrl: data.linkedin_url || '',
            githubUrl: data.github_url || '',
            leetcodeUrl: data.leetcode_url || '',
            codechefUrl: data.codechef_url || '',
            hackerrankUrl: data.hackerrank_url || '',
            hackerearthUrl: data.hackerearth_url || '',
            about: data.about || '',
            resumeUrl: data.resume_url || '',
            goals: data.goals || [],
            skills: data.skills || [],
            totalEarnings: parseFloat(data.total_earnings || 0),
            thisWeekEarnings: 0.0,
            thisMonthEarnings: 0.0,
            currentRank: 0
          };
          if (window.__MOCK_DATA__) window.__MOCK_DATA__.currentUser = profile;
          return profile;
        }
      } catch (sbErr) {
        console.warn('Supabase profile fetch fallback:', sbErr.message);
      }
    }

    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.currentUser) {
      window.__MOCK_DATA__.currentUser.name = name;
      window.__MOCK_DATA__.currentUser.email = email;
      window.__MOCK_DATA__.currentUser.username = email.includes('@') ? email.split('@')[0] : name.toLowerCase().replace(/\s+/g, '');
      window.__MOCK_DATA__.currentUser.password = password;
      window.__MOCK_DATA__.currentUser.profession = profession;
      window.__MOCK_DATA__.currentUser.phone = phone;
    }

    try {
      const res = await fetch(`${this.baseUrl}/profile`);
      if (res.ok) {
        const user = await res.json();
        return Object.assign({}, window.__MOCK_DATA__.currentUser, user);
      }
    } catch (e) {}

    // Check LocalStorage saved snapshot
    try {
      const localProfileJson = localStorage.getItem('zuno_saved_profile');
      if (localProfileJson) {
        const parsed = JSON.parse(localProfileJson);
        if (window.__MOCK_DATA__) Object.assign(window.__MOCK_DATA__.currentUser, parsed);
        return window.__MOCK_DATA__.currentUser;
      }
    } catch (e) {}

    return window.__MOCK_DATA__.currentUser;
  },

  async getLatestCandidateProfile(identifier) {
    if (!identifier) return await this.getProfile();

    // 1. Try Supabase Cloud Database Query
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .or(`email.eq.${identifier},id.eq.${identifier}`)
          .maybeSingle();

        if (data && !error) {
          return {
            id: data.id || 'usr_001',
            name: data.name || 'Candidate',
            username: data.username || (identifier.includes('@') ? identifier.split('@')[0] : 'candidate'),
            email: data.email || identifier,
            phone: data.phone || '+91 98765 43210',
            profession: data.profession || 'Applicant',
            city: data.city || 'Bengaluru',
            avatarUrl: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            dob: data.dob || '',
            college: data.college || '',
            degree: data.degree || '',
            degreeOther: data.degree_other || '',
            branch: data.branch || '',
            branchOther: data.branch_other || '',
            specialization: data.specialization || '',
            fromMonth: data.from_month || '',
            fromYear: data.from_year || '',
            toMonth: data.to_month || '',
            toYear: data.to_year || '',
            preferredRole: data.preferred_role || '',
            desiredDesignation: data.desired_designation || '',
            expectedSalary: data.expected_salary || '',
            locationPref: data.location_pref || '',
            portfolioUrl: data.portfolio_url || '',
            linkedinUrl: data.linkedin_url || '',
            githubUrl: data.github_url || '',
            leetcodeUrl: data.leetcode_url || '',
            codechefUrl: data.codechef_url || '',
            hackerrankUrl: data.hackerrank_url || '',
            hackerearthUrl: data.hackerearth_url || '',
            about: data.about || '',
            resumeUrl: data.resume_url || '',
            goals: data.goals || [],
            skills: data.skills || []
          };
        }
      } catch (sbErr) {
        console.warn('Supabase candidate fetch fallback:', sbErr);
      }
    }

    // 2. Try LocalStorage saved profile
    try {
      const localProfileJson = localStorage.getItem('zuno_saved_profile');
      if (localProfileJson) {
        const p = JSON.parse(localProfileJson);
        if (p.email === identifier || p.id === identifier || !identifier.includes('@')) {
          return p;
        }
      }
    } catch (e) {}

    // 3. Fallback to active candidate profile
    return await this.getProfile();
  },

  async updateProfile(profileData) {
    if (profileData) {
      try {
        if (profileData.phone) localStorage.setItem('zuno_user_phone', profileData.phone);
        if (profileData.name) localStorage.setItem('zuno_user_name', profileData.name);
        if (profileData.email) localStorage.setItem('zuno_user_email', profileData.email);
        localStorage.setItem('zuno_saved_profile', JSON.stringify(profileData));
      } catch (e) {}
    }

    // 1. Sync directly with Supabase Cloud
    if (supabaseClient) {
      try {
        const payload = {
          name: profileData.name,
          username: profileData.username,
          email: profileData.email || localStorage.getItem('zuno_user_email') || 'dileepsai@gmail.com',
          password: profileData.password,
          phone: profileData.phone,
          profession: profileData.profession,
          city: profileData.city,
          dob: profileData.dob || null,
          college: profileData.college,
          degree: profileData.degree,
          degree_other: profileData.degreeOther,
          branch: profileData.branch,
          branch_other: profileData.branchOther,
          specialization: profileData.specialization,
          from_month: profileData.fromMonth,
          from_year: profileData.fromYear,
          to_month: profileData.toMonth,
          to_year: profileData.toYear,
          preferred_role: profileData.preferredRole,
          desired_designation: profileData.desiredDesignation,
          expected_salary: profileData.expectedSalary,
          location_pref: profileData.locationPref,
          portfolio_url: profileData.portfolioUrl,
          linkedin_url: profileData.linkedinUrl,
          github_url: profileData.githubUrl,
          leetcode_url: profileData.leetcodeUrl,
          codechef_url: profileData.codechefUrl,
          hackerrank_url: profileData.hackerrankUrl,
          hackerearth_url: profileData.hackerearthUrl,
          about: profileData.about,
          resume_url: profileData.resumeUrl,
          goals: profileData.goals || [],
          skills: profileData.skills || [],
          avatar_url: profileData.avatarUrl
        };

        await supabaseClient.from('profiles').upsert(payload, { onConflict: 'email' });
      } catch (sbErr) {
        console.warn('Supabase upsert warning:', sbErr.message);
      }
    }

    try {
      const res = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return await res.json();
    } catch (e) {
      if (window.__MOCK_DATA__) Object.assign(window.__MOCK_DATA__.currentUser, profileData);
      return window.__MOCK_DATA__.currentUser;
    }
  },

  // ==========================================
  // RECRUITER / PARTNER PROFILE
  // ==========================================
  getRecruiterProfile() {
    try {
      const saved = localStorage.getItem('zuno_recruiter_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_RECRUITER;
  },

  saveRecruiterProfile(recruiterData) {
    try {
      localStorage.setItem('zuno_recruiter_profile', JSON.stringify(recruiterData));
      window.dispatchEvent(new Event('zuno_data_updated'));
    } catch (e) {}
    return recruiterData;
  },

  // ==========================================
  // OPPORTUNITIES (POSTED & CURATED)
  // ==========================================
  async getOpportunities(query = '', category = 'all', city = 'all') {
    // 1. Gather default / mock opportunities
    let allOpps = (window.__MOCK_DATA__ && window.__MOCK_DATA__.opportunities) ? [...window.__MOCK_DATA__.opportunities] : [];

    // 2. Add custom partner posted opportunities from localStorage
    try {
      const partnerOppsJson = localStorage.getItem('zuno_partner_opportunities');
      if (partnerOppsJson) {
        const partnerOpps = JSON.parse(partnerOppsJson);
        if (Array.isArray(partnerOpps)) {
          // Prepend partner-created opportunities so they appear on top
          allOpps = [...partnerOpps, ...allOpps.filter(o => !partnerOpps.some(p => p.id === o.id))];
        }
      }
    } catch (e) {}

    // 3. Supabase merge if available
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.from('opportunities').select('*');
        if (data && data.length > 0 && !error) {
          const mappedSb = data.map(o => ({
            id: o.id,
            companyName: o.company_name,
            companyLogo: o.company_logo,
            websiteUrl: o.website_url,
            title: o.title,
            category: o.category,
            location: o.location,
            duration: o.duration,
            deadline: o.deadline,
            stipend: parseFloat(o.stipend || 0),
            stipendDisplay: o.stipend_display,
            roles: o.roles,
            responsibilities: Array.isArray(o.responsibilities) ? o.responsibilities : [o.responsibilities],
            obligations: Array.isArray(o.obligations) ? o.obligations : [o.obligations],
            tags: Array.isArray(o.tags) ? o.tags : (o.tags ? [o.tags] : []),
            postedDate: o.posted_date || new Date().toISOString().split('T')[0],
            isDirectApply: true
          }));
          // Merge unique by ID
          allOpps = [...mappedSb, ...allOpps.filter(o => !mappedSb.some(sb => sb.id === o.id))];
        }
      } catch (sbErr) {}
    }

    // 4. Attach persisted Closed state
    let closedOppIds = [];
    try {
      const closedJson = localStorage.getItem('zuno_closed_opp_ids');
      if (closedJson) closedOppIds = JSON.parse(closedJson);
    } catch (e) {}

    allOpps = allOpps.map(opp => {
      const isClosed = closedOppIds.includes(opp.id) || opp.isClosed === true || opp.status === 'CLOSED';
      return {
        ...opp,
        isClosed: isClosed,
        status: isClosed ? 'CLOSED' : 'OPEN'
      };
    });

    // Apply filters
    return allOpps.filter(opp => {
      const matchesQuery = !query ||
        opp.title.toLowerCase().includes(query.toLowerCase()) ||
        opp.companyName.toLowerCase().includes(query.toLowerCase()) ||
        (opp.tags && opp.tags.some(t => t.toLowerCase().includes(query.toLowerCase())));

      const matchesCat = !category || category === 'all' || opp.category.toLowerCase() === category.toLowerCase();
      const matchesCity = !city || city === 'all' || city === 'All Cities / Remote' || 
        opp.location.toLowerCase().includes(city.toLowerCase()) || 
        (city.toLowerCase().includes('remote') && opp.location.toLowerCase().includes('remote'));

      return matchesQuery && matchesCat && matchesCity;
    });
  },

  async postOpportunity(oppData) {
    const newOpp = {
      id: oppData.id || ('opp_' + Date.now()),
      companyName: oppData.companyName || "Zuno Partner Employer",
      companyLogo: oppData.companyLogo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      websiteUrl: oppData.websiteUrl || "https://zuno.app",
      title: oppData.title,
      category: oppData.category || "software",
      location: oppData.location || "Bengaluru",
      duration: oppData.duration || "3 Months",
      deadline: oppData.deadline || "2026-10-31",
      stipend: parseFloat(oppData.stipend || 25000),
      stipendDisplay: oppData.stipendDisplay || `₹${Number(oppData.stipend || 25000).toLocaleString('en-IN')} / month`,
      roles: oppData.roles || "Opportunity curated via Zuno Partner Platform.",
      responsibilities: Array.isArray(oppData.responsibilities) ? oppData.responsibilities : [oppData.responsibilities || "Deliver high quality milestones"],
      obligations: Array.isArray(oppData.obligations) ? oppData.obligations : [oppData.obligations || "Maintain professional communication and confidentiality"],
      tags: Array.isArray(oppData.tags) ? oppData.tags : (typeof oppData.tags === 'string' ? oppData.tags.split(',').map(t => t.trim()) : ['Verified']),
      googleFormUrl: oppData.googleFormUrl || null,
      isDirectApply: !oppData.googleFormUrl,
      postedDate: new Date().toISOString().split('T')[0],
      recruiterId: oppData.recruiterId || "rec_001",
      isClosed: false,
      status: 'OPEN'
    };

    // Save to localStorage partner opps
    try {
      const existingJson = localStorage.getItem('zuno_partner_opportunities');
      let partnerOpps = existingJson ? JSON.parse(existingJson) : [];
      partnerOpps.unshift(newOpp);
      localStorage.setItem('zuno_partner_opportunities', JSON.stringify(partnerOpps));
      window.dispatchEvent(new Event('zuno_data_updated'));
    } catch (e) {}

    // Sync to Supabase if available
    if (supabaseClient) {
      try {
        await supabaseClient.from('opportunities').insert({
          id: newOpp.id,
          company_name: newOpp.companyName,
          company_logo: newOpp.companyLogo,
          website_url: newOpp.websiteUrl,
          title: newOpp.title,
          category: newOpp.category,
          location: newOpp.location,
          duration: newOpp.duration,
          deadline: newOpp.deadline,
          stipend: newOpp.stipend,
          stipend_display: newOpp.stipendDisplay,
          roles: newOpp.roles,
          responsibilities: newOpp.responsibilities,
          obligations: newOpp.obligations,
          tags: newOpp.tags,
          posted_date: newOpp.postedDate
        });
      } catch (err) {}
    }

    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.opportunities) {
      window.__MOCK_DATA__.opportunities.unshift(newOpp);
    }

    return newOpp;
  },

  async closeOpportunity(oppId, isClosed = true) {
    try {
      let closedOppIds = [];
      const closedJson = localStorage.getItem('zuno_closed_opp_ids');
      if (closedJson) closedOppIds = JSON.parse(closedJson);
      
      if (isClosed) {
        if (!closedOppIds.includes(oppId)) closedOppIds.push(oppId);
      } else {
        closedOppIds = closedOppIds.filter(id => id !== oppId);
      }
      localStorage.setItem('zuno_closed_opp_ids', JSON.stringify(closedOppIds));

      // Also update partner opportunities if present in storage
      const partnerOppsJson = localStorage.getItem('zuno_partner_opportunities');
      if (partnerOppsJson) {
        let partnerOpps = JSON.parse(partnerOppsJson);
        partnerOpps = partnerOpps.map(o => o.id === oppId ? { ...o, isClosed: isClosed, status: isClosed ? 'CLOSED' : 'OPEN' } : o);
        localStorage.setItem('zuno_partner_opportunities', JSON.stringify(partnerOpps));
      }

      // Update in-memory mock if present
      if (window.__MOCK_DATA__ && window.__MOCK_DATA__.opportunities) {
        window.__MOCK_DATA__.opportunities = window.__MOCK_DATA__.opportunities.map(o => 
          o.id === oppId ? { ...o, isClosed: isClosed, status: isClosed ? 'CLOSED' : 'OPEN' } : o
        );
      }

      window.dispatchEvent(new Event('zuno_data_updated'));
      return { success: true, isClosed };
    } catch (e) {
      console.error('Failed to close/reopen opportunity:', e);
      return { success: false };
    }
  },

  async deleteOpportunity(oppId) {
    try {
      const existingJson = localStorage.getItem('zuno_partner_opportunities');
      if (existingJson) {
        let partnerOpps = JSON.parse(existingJson);
        partnerOpps = partnerOpps.filter(o => o.id !== oppId);
        localStorage.setItem('zuno_partner_opportunities', JSON.stringify(partnerOpps));
        window.dispatchEvent(new Event('zuno_data_updated'));
      }
    } catch (e) {}

    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.opportunities) {
      window.__MOCK_DATA__.opportunities = window.__MOCK_DATA__.opportunities.filter(o => o.id !== oppId);
    }
    return { success: true };
  },

  // ==========================================
  // APPLICATIONS & FIFO PIPELINE TRACKING
  // ==========================================
  async getApplications() {
    let allApps = [];

    // 1. Get from localStorage
    try {
      const storedJson = localStorage.getItem('zuno_applications_list');
      if (storedJson) {
        allApps = JSON.parse(storedJson);
      }
    } catch (e) {}

    // Fallback to in-memory if empty
    if (allApps.length === 0 && window.__MOCK_DATA__ && window.__MOCK_DATA__.applications) {
      allApps = [...window.__MOCK_DATA__.applications];
    }

    // Supabase cloud query if connected
    if (supabaseClient) {
      try {
        const email = localStorage.getItem('zuno_user_email') || 'dileepsai@gmail.com';
        const { data, error } = await supabaseClient
          .from('applications')
          .select('*')
          .eq('candidate_email', email);

        if (data && data.length > 0 && !error) {
          const sbApps = data.map(a => ({
            id: a.id,
            opportunityId: a.opportunity_id,
            jobTitle: a.job_title,
            companyName: a.company_name,
            companyLogo: a.company_logo,
            location: a.location,
            duration: a.duration,
            status: a.status,
            profileViewed: a.profile_viewed,
            appliedDate: a.applied_date,
            appliedTime: a.applied_time || '10:30 AM',
            stipend: parseFloat(a.stipend || 0),
            stipendDisplay: a.stipend_display,
            candidateSnapshot: a.candidate_snapshot,
            sharedRecruiterInfo: a.shared_recruiter_info,
            rejectionStage: a.rejection_stage
          }));
          allApps = [...sbApps, ...allApps.filter(app => !sbApps.some(s => s.id === app.id))];
        }
      } catch (err) {}
    }

    // Real Candidate Name Auto-Resolution
    const realCandidateProfile = await this.getProfile();
    allApps = allApps.map(app => {
      const snap = app.candidateSnapshot || {};
      const candidateName = (snap.name && snap.name !== 'Candidate' && snap.name !== 'Candidate Name')
        ? snap.name
        : (app.candidateName && app.candidateName !== 'Candidate' && app.candidateName !== 'Candidate Name'
          ? app.candidateName
          : realCandidateProfile.name || 'Dileep Sai');

      return {
        ...app,
        candidateName: candidateName,
        candidateEmail: snap.email || app.candidateEmail || realCandidateProfile.email || 'dileepsai@gmail.com',
        candidatePhone: snap.phone || app.candidatePhone || realCandidateProfile.phone || '+91 98765 43210',
        candidateSnapshot: {
          ...realCandidateProfile,
          ...snap,
          name: candidateName
        }
      };
    });

    return allApps;
  },

  async applyForJob(opportunityId, note) {
    const opportunities = await this.getOpportunities();
    const opp = opportunities.find(o => o.id === opportunityId);
    const candidateProfile = await this.getProfile();

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newApp = {
      id: 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      opportunityId: opp ? opp.id : opportunityId,
      jobTitle: opp ? opp.title : 'Selected Opportunity',
      companyName: opp ? opp.companyName : 'Partner Employer',
      companyLogo: opp ? opp.companyLogo : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      websiteUrl: opp ? opp.websiteUrl : '#',
      location: opp ? opp.location : 'Bengaluru',
      duration: opp ? opp.duration : '3 Months',
      roles: opp ? opp.roles : 'Verified Candidate Role',
      tags: opp ? opp.tags : ['Verified', 'Candidate Match'],
      
      // Candidate Detailed Snapshot for Recruiter Resume View
      candidateId: candidateProfile.id || 'usr_001',
      candidateName: candidateProfile.name || 'Candidate',
      candidateEmail: candidateProfile.email || 'candidate@gmail.com',
      candidatePhone: candidateProfile.phone || '+91 98765 43210',
      candidateAvatar: candidateProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      candidateProfession: candidateProfile.profession || 'Applicant',
      candidateCity: candidateProfile.city || 'Bengaluru',
      candidateSnapshot: { ...candidateProfile },
      
      appliedDate: formattedDate,
      appliedTime: formattedTime,
      appliedTimestamp: now.getTime(), // FIFO Ordering
      postedDate: opp ? (opp.postedDate || '2026-08-29') : '2026-08-29',
      
      // Granular Stages: 'APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'HIRED', 'REJECTED_SCREENING', 'REJECTED_SHORTLIST'
      status: 'APPLIED',
      rejectionStage: null,
      rejectionReason: null,
      sharedRecruiterInfo: null,
      profileViewed: false,
      
      stipend: opp ? opp.stipend : 25000,
      stipendDisplay: opp ? opp.stipendDisplay : '₹25,000 / month',
      candidateNote: note || 'Applied directly via Zuno candidate portal',
      statusHistory: [
        { stage: 'APPLIED', timestamp: now.toISOString(), note: 'Application submitted by candidate in FIFO queue.' }
      ]
    };

    // Save to localStorage applications list
    try {
      let apps = [];
      const stored = localStorage.getItem('zuno_applications_list');
      if (stored) apps = JSON.parse(stored);
      // Avoid duplicate application for same job by same candidate
      const existingIdx = apps.findIndex(a => a.opportunityId === opportunityId && a.candidateEmail === newApp.candidateEmail);
      if (existingIdx >= 0) {
        apps[existingIdx] = newApp;
      } else {
        apps.push(newApp); // Keep FIFO array order
      }
      localStorage.setItem('zuno_applications_list', JSON.stringify(apps));
      window.dispatchEvent(new Event('zuno_data_updated'));
    } catch (e) {}

    // Cloud insert
    if (supabaseClient) {
      try {
        await supabaseClient.from('applications').insert({
          id: newApp.id,
          opportunity_id: opportunityId,
          candidate_email: newApp.candidateEmail,
          candidate_name: newApp.candidateName,
          candidate_phone: newApp.candidatePhone,
          job_title: newApp.jobTitle,
          company_name: newApp.companyName,
          company_logo: newApp.companyLogo,
          location: newApp.location,
          stipend: newApp.stipend,
          stipend_display: newApp.stipendDisplay,
          duration: newApp.duration,
          status: 'APPLIED',
          profile_viewed: false,
          candidate_note: note
        });
      } catch (err) {}
    }

    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.applications) {
      window.__MOCK_DATA__.applications.unshift(newApp);
    }

    return newApp;
  },

  // Get applicants for a specific opportunity in strict FIFO order (first applied first)
  async getApplicantsForOpportunity(opportunityId) {
    const allApps = await this.getApplications();
    return allApps
      .filter(a => a.opportunityId === opportunityId)
      .sort((a, b) => (a.appliedTimestamp || 0) - (b.appliedTimestamp || 0)); // FIFO sort ascending
  },

  // Update status (Shortlist, Hire, Reject with stage tracking)
  async updateApplicationStatus(applicationId, newStatus, extraData = {}) {
    let updatedApp = null;

    try {
      const stored = localStorage.getItem('zuno_applications_list');
      if (stored) {
        let apps = JSON.parse(stored);
        const idx = apps.findIndex(a => a.id === applicationId);
        if (idx >= 0) {
          apps[idx].status = newStatus;
          if (extraData.sharedRecruiterInfo !== undefined) {
            apps[idx].sharedRecruiterInfo = extraData.sharedRecruiterInfo;
          }
          if (extraData.rejectionStage !== undefined) {
            apps[idx].rejectionStage = extraData.rejectionStage;
          }
          if (extraData.rejectionReason !== undefined) {
            apps[idx].rejectionReason = extraData.rejectionReason;
          }
          if (extraData.profileViewed !== undefined) {
            apps[idx].profileViewed = extraData.profileViewed;
          }
          apps[idx].updatedAt = new Date().toISOString();
          
          if (!apps[idx].statusHistory) apps[idx].statusHistory = [];
          apps[idx].statusHistory.push({
            stage: newStatus,
            timestamp: new Date().toISOString(),
            note: extraData.note || `Stage transitioned to ${newStatus}`
          });

          updatedApp = apps[idx];
          localStorage.setItem('zuno_applications_list', JSON.stringify(apps));
          window.dispatchEvent(new Event('zuno_data_updated'));
        }
      }
    } catch (e) {}

    // Cloud update
    if (supabaseClient) {
      try {
        await supabaseClient.from('applications').update({
          status: newStatus,
          profile_viewed: true
        }).eq('id', applicationId);
      } catch (err) {}
    }

    return updatedApp;
  },

  // ==========================================
  // PAYMENTS, LEADERBOARD, REVIEWS & EXPORT
  // ==========================================
  async getPayments() {
    try {
      const res = await fetch(`${this.baseUrl}/payments`);
      if (res.ok) return await res.json();
    } catch (e) {}

    const totalEarned = (window.__MOCK_DATA__ && window.__MOCK_DATA__.currentUser && window.__MOCK_DATA__.currentUser.totalEarnings) || 0.0;
    return {
      totalEarned,
      thisWeekEarnings: 0.0,
      thisMonthEarnings: 0.0,
      walletBalance: totalEarned,
      pendingVerification: 0.0,
      records: (window.__MOCK_DATA__ && window.__MOCK_DATA__.payments) || []
    };
  },

  async getPaymentsSummary() {
    return await this.getPayments();
  },

  async getLeaderboard(profession = 'content') {
    try {
      const res = await fetch(`${this.baseUrl}/leaderboard?profession=${encodeURIComponent(profession)}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return (window.__MOCK_DATA__ && window.__MOCK_DATA__.leaderboards[profession.toLowerCase()]) || (window.__MOCK_DATA__ && window.__MOCK_DATA__.leaderboards['content']);
  },

  async getReviews(highlightedOnly = false) {
    try {
      const res = await fetch(`${this.baseUrl}/reviews?highlightedOnly=${highlightedOnly}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    if (highlightedOnly && window.__MOCK_DATA__) {
      return window.__MOCK_DATA__.reviews.filter(r => r.highlightOnMainPage);
    }
    return (window.__MOCK_DATA__ && window.__MOCK_DATA__.reviews) || [];
  },

  async postReview(review) {
    const formatTimestamp = () => {
      const now = new Date();
      return now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');
    };

    const newRev = {
      ...review,
      id: review.id || 'rev_' + Date.now(),
      createdAt: formatTimestamp(),
      userName: (window.__MOCK_DATA__ && window.__MOCK_DATA__.currentUser.name) || 'Candidate',
      userAvatar: (window.__MOCK_DATA__ && window.__MOCK_DATA__.currentUser.avatarUrl) || '',
      userProfession: (window.__MOCK_DATA__ && window.__MOCK_DATA__.currentUser.profession) || ''
    };

    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.reviews) {
      const existingIdx = window.__MOCK_DATA__.reviews.findIndex(r => r.id === newRev.id);
      if (existingIdx >= 0) {
        window.__MOCK_DATA__.reviews[existingIdx] = newRev;
      } else {
        window.__MOCK_DATA__.reviews.unshift(newRev);
      }
    }
    return newRev;
  },

  async deleteReview(id) {
    if (window.__MOCK_DATA__ && window.__MOCK_DATA__.reviews) {
      window.__MOCK_DATA__.reviews = window.__MOCK_DATA__.reviews.filter(r => r.id !== id);
    }
    return { success: true };
  },

  async exportStats(exportReq) {
    const csvContent = "data:text/csv;charset=utf-8,Category," + exportReq.type + "\nRange," + exportReq.range + "\nGenerated," + new Date().toISOString();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zuno_report_${Date.now()}.${exportReq.format.toLowerCase()}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
  }
};
