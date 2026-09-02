/**
 * Zuno Partner (Recruiter) Platform - Main Controller & View Handlers
 */

const PartnerApp = {
  activeTab: 'overview',
  activeJobIdForPipeline: null,
  currentViewingApplication: null,
  recruiterProfile: null,

  getCandidateRealName(app) {
    if (!app) return 'Dileep Sai';
    const snap = app.candidateSnapshot || {};
    if (snap.name && snap.name.trim() !== '' && snap.name !== 'Candidate' && snap.name !== 'Candidate Name') {
      return snap.name;
    }
    if (app.candidateName && app.candidateName.trim() !== '' && app.candidateName !== 'Candidate' && app.candidateName !== 'Candidate Name') {
      return app.candidateName;
    }
    try {
      const storedName = localStorage.getItem('zuno_user_name');
      if (storedName && storedName.trim() !== '' && storedName !== 'Candidate') return storedName;
    } catch (e) {}
    return 'Dileep Sai';
  },

  getCandidateRealProfession(app) {
    if (!app) return 'Applicant';
    const snap = app.candidateSnapshot || {};
    return snap.desiredDesignation || snap.preferredRole || snap.profession || 'Student / Campus Learner';
  },

  async init() {
    console.log('⚡ Initializing Zuno Partner Platform...');
    this.recruiterProfile = ZunoAPI.getRecruiterProfile();
    
    this.bindEvents();
    this.bindNavigation();
    this.bindJobPostForm();
    this.bindRecruiterProfileForm();
    
    await this.refreshAllData();

    // Listen for cross-tab or storage updates
    window.addEventListener('storage', () => this.refreshAllData());
    window.addEventListener('zuno_data_updated', () => this.refreshAllData());
  },

  bindNavigation() {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.getAttribute('data-tab');
        if (tab) {
          this.switchTab(tab);
        }
      });
    });
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('.tab-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${tabName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    const titles = {
      'overview': { title: 'Partner Overview & Hiring Analytics', sub: 'Monitor live job postings, candidate submissions, and active hiring pipelines.' },
      'jobs': { title: 'Manage Opportunities & Pipelines', sub: 'View posted roles and inspect applicants in chronological FIFO order.' },
      'post': { title: 'Post a New Opportunity', sub: 'Create high-impact internships and project roles for vetted candidates.' },
      'shortlisted': { title: 'Shortlisted Candidates Hub', sub: 'Review shortlisted talent, make final hiring offers, or decline candidates.' },
      'rejected': { title: 'Rejected Candidates Hub', sub: 'Historical records of candidate applications declined during screening or shortlisting.' },
      'hired': { title: 'Hired & Selected Candidates', sub: 'Talent who have received and confirmed official offers through Zuno.' },
      'company': { title: 'Recruiter & Company Profile', sub: 'Manage recruiter contact information shared with shortlisted talent.' }
    };

    if (titles[tabName]) {
      const topTitle = document.getElementById('topbar-title');
      const topSub = document.getElementById('topbar-subtitle');
      if (topTitle) topTitle.innerText = titles[tabName].title;
      if (topSub) topSub.innerText = titles[tabName].sub;
    }

    if (tabName === 'overview') this.renderOverview();
    if (tabName === 'jobs') this.renderJobs();
    if (tabName === 'shortlisted') this.renderShortlisted();
    if (tabName === 'rejected') this.renderRejected();
    if (tabName === 'hired') this.renderHired();
    if (tabName === 'company') this.renderRecruiterProfile();
  },

  bindEvents() {
    // Modal Backdrop close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
        }
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('open');
      });
    });

    // Resume Modal Actions: Shortlist, Reject, Hire
    const btnModalShortlist = document.getElementById('resume-modal-shortlist-btn');
    if (btnModalShortlist) {
      btnModalShortlist.addEventListener('click', () => this.handleShortlistCandidate());
    }

    const btnModalReject = document.getElementById('resume-modal-reject-btn');
    if (btnModalReject) {
      btnModalReject.addEventListener('click', () => this.handleRejectCandidate());
    }

    const btnModalHire = document.getElementById('resume-modal-hire-btn');
    if (btnModalHire) {
      btnModalHire.addEventListener('click', () => this.handleHireCandidateFromModal());
    }

    // Toggle recruiter details share in resume footer
    const shareToggle = document.getElementById('share-recruiter-details-toggle');
    if (shareToggle) {
      shareToggle.addEventListener('change', (e) => {
        const previewSpan = document.getElementById('shared-recruiter-summary-preview');
        if (previewSpan) {
          previewSpan.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    }
  },

  async refreshAllData() {
    this.recruiterProfile = ZunoAPI.getRecruiterProfile();
    await this.renderOverview();
    if (this.activeTab === 'jobs') await this.renderJobs();
    if (this.activeTab === 'shortlisted') await this.renderShortlisted();
    if (this.activeTab === 'rejected') await this.renderRejected();
    if (this.activeTab === 'hired') await this.renderHired();
    if (this.activeTab === 'company') this.renderRecruiterProfile();
  },

  // ==========================================
  // SECTION 1: OVERVIEW & REAL-TIME ANALYTICS
  // ==========================================
  async renderOverview() {
    const opportunities = await ZunoAPI.getOpportunities();
    const applications = await ZunoAPI.getApplications();

    // 1. Calculate Real-Time Metrics Dynamically from Database
    const activeJobs = opportunities.filter(o => !o.isClosed).length;
    const closedJobs = opportunities.filter(o => !!o.isClosed).length;
    const hiredTotal = applications.filter(a => a.status === 'HIRED' || a.status === 'SELECTED').length;
    const shortlistedCount = applications.filter(a => a.status === 'SHORTLISTED').length;
    const hiredCount = hiredTotal;
    const rejectedCount = applications.filter(a => (a.status || '').startsWith('REJECTED')).length;

    const elActive = document.getElementById('metric-active-jobs');
    const elClosed = document.getElementById('metric-closed-jobs');
    const elHiredTotal = document.getElementById('metric-hired-total');
    const elShortlisted = document.getElementById('metric-shortlisted');
    const elHired = document.getElementById('metric-hired');
    const elRejected = document.getElementById('metric-rejected');

    if (elActive) elActive.innerText = activeJobs;
    if (elClosed) elClosed.innerText = closedJobs;
    if (elHiredTotal) elHiredTotal.innerText = hiredTotal;
    if (elShortlisted) elShortlisted.innerText = shortlistedCount;
    if (elHired) elHired.innerText = hiredCount;
    if (elRejected) elRejected.innerText = rejectedCount;

    // 2. Section 2: Render Job Postings Table directly below Analytics on Overview
    const overviewJobsContainer = document.getElementById('overview-jobs-table-container');
    if (overviewJobsContainer) {
      overviewJobsContainer.innerHTML = this.generateJobTableHtml(opportunities, applications);
    }
  },

  // ==========================================
  // SECTION 2: JOB POSTINGS TABLE
  // ==========================================
  async renderJobs() {
    const opportunities = await ZunoAPI.getOpportunities();
    const applications = await ZunoAPI.getApplications();
    const container = document.getElementById('partner-jobs-container');
    if (!container) return;

    if (opportunities.length === 0) {
      container.innerHTML = `
        <div class="pipeline-empty">
          <div class="pipeline-empty-icon">💼</div>
          <h3>No Active Opportunities</h3>
          <p>Click "Post Opportunity" to publish your first role to thousands of candidates.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.generateJobTableHtml(opportunities, applications);
  },

  generateJobTableHtml(opportunities, applications) {
    if (!opportunities || opportunities.length === 0) {
      return `
        <div style="padding: 24px; text-align: center; color: var(--ink-soft);">
          No job postings found. Click "+ Post Opportunity" to create a role.
        </div>
      `;
    }

    return `
      <div class="partner-jobs-table-wrap">
        <table class="partner-jobs-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">S.No</th>
              <th>Post Name</th>
              <th>Posted Date</th>
              <th style="text-align: center;">Applications</th>
              <th style="text-align: right; min-width: 140px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${opportunities.map((opp, index) => {
              const jobApps = applications.filter(a => a.opportunityId === opp.id || a.jobId === opp.id || a.jobTitle === opp.title);
              const applicantCount = jobApps.length;
              const isClosed = !!opp.isClosed;
              const isCustomPartnerJob = opp.recruiterId || opp.id.startsWith('opp_');

              return `
                <tr id="job-row-${opp.id}" class="${isClosed ? 'job-row-closed' : ''}">
                  <td style="text-align: center; font-weight: 800; color: var(--ink-faint);">${index + 1}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${opp.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100'}" style="width: 38px; height: 38px; border-radius: var(--radius-s); object-fit: cover; border: 1px solid var(--paper-line);" alt="Logo" />
                      <div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <strong style="font-size: 14px; color: var(--ink);">${opp.title}</strong>
                          <span class="status-pill ${isClosed ? 'closed' : 'open'}" style="padding: 1px 7px; font-size: 11px;">
                            ${isClosed ? 'Closed' : 'Active'}
                          </span>
                        </div>
                        <div style="font-size: 11.5px; color: var(--ink-soft); margin-top: 2px;">
                          ${opp.companyName} • 📍 ${opp.location} • 💰 ${opp.stipendDisplay || '₹30,000 / month'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight: 700; color: var(--ink); font-size: 13px;">${opp.postedDate || '02 Sep 2026'}</div>
                  </td>
                  <td style="text-align: center;">
                    <!-- Clickable Applications Number: Opens Floating Candidates List -->
                    <button type="button" class="applicant-count-pill ${applicantCount > 0 ? 'has-applicants' : ''}" onclick="PartnerApp.openApplicantsModal('${opp.id}')" title="Click to open candidate applications for this specific job">
                      <span>👥</span>
                      <span>${applicantCount}</span>
                    </button>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; align-items: center; gap: 8px;">
                      ${isClosed ? `
                        <button type="button" class="btn-reopen-job" onclick="PartnerApp.toggleJobClose('${opp.id}', false)" title="Reopen this job for candidate applications">
                          Reopen
                        </button>
                      ` : `
                        <button type="button" class="btn-close-job" onclick="PartnerApp.toggleJobClose('${opp.id}', true)" title="Close this job posting (synchronizes across system)">
                          Close
                        </button>
                      `}
                      ${isCustomPartnerJob ? `
                        <button type="button" class="btn-outline" style="padding: 6px 10px; font-size: 11px; border-color: #FFA3A3; color: var(--partner-red);" onclick="PartnerApp.deleteJob('${opp.id}')" title="Delete role">
                          🗑️
                        </button>
                      ` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ==========================================
  // SECTION 3: APPLICANTS TABLE (FLOATING MODAL)
  // ==========================================
  async openApplicantsModal(jobId) {
    this.activeJobIdForPipeline = jobId;
    const opportunities = await ZunoAPI.getOpportunities();
    const opp = opportunities.find(o => o.id === jobId);
    const applications = await ZunoAPI.getApplications();
    
    // Strict Filter: Only applicants who actually applied to this particular job
    const jobApps = applications.filter(a => a.opportunityId === jobId || a.jobId === jobId || (opp && a.jobTitle === opp.title));

    if (opp) {
      const catEl = document.getElementById('floating-job-category');
      const statusEl = document.getElementById('floating-job-status');
      const titleEl = document.getElementById('floating-job-title');
      const subEl = document.getElementById('floating-job-subtitle');

      if (catEl) catEl.innerText = opp.category || 'Role';
      if (statusEl) {
        statusEl.className = `status-pill ${opp.isClosed ? 'closed' : 'open'}`;
        statusEl.innerText = opp.isClosed ? 'Closed' : 'Active';
      }
      if (titleEl) titleEl.innerText = `${opp.title} — (${opp.companyName})`;
      if (subEl) subEl.innerHTML = `Showing ${jobApps.length} actual candidate application records for this role. Click <strong>👁 View</strong> to inspect full profile.`;
    }

    const tableContainer = document.getElementById('floating-pipeline-table-container');
    if (tableContainer) {
      tableContainer.innerHTML = this.generateApplicantsTableHtml(jobApps);

      // Explicitly wire click events on every eye button in the table
      tableContainer.querySelectorAll('.action-eye-btn').forEach(btn => {
        btn.onclick = (e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          const appId = btn.getAttribute('data-app-id');
          console.log('Action Eye button clicked for App ID:', appId);
          this.openCandidateResume(appId);
        };
      });
    }

    const modal = document.getElementById('job-applicants-floating-modal');
    if (modal) {
      modal.classList.add('open');
      modal.style.display = 'flex';
      modal.style.zIndex = '1000';
    }
  },

  generateApplicantsTableHtml(jobApps) {
    if (!jobApps || jobApps.length === 0) {
      return `
        <div style="background: var(--paper-soft); padding: 36px 20px; border-radius: var(--radius-m); text-align: center; color: var(--ink-soft); font-size: 13.5px; border: 1.5px dashed var(--paper-line); margin-top: 10px;">
          <div style="font-size: 32px; margin-bottom: 8px;">📭</div>
          <strong style="color: var(--ink);">No candidate applications for this specific job yet.</strong>
          <p style="margin-top: 4px; font-size: 12.5px;">Candidate applications will stream here dynamically as they apply on the Candidate Portal.</p>
        </div>
      `;
    }

    // Strict FIFO order (First-Come, First-Applied)
    const sortedApps = [...jobApps].sort((a, b) => (a.appliedTimestamp || 0) - (b.appliedTimestamp || 0));

    return `
      <div class="applicant-table-wrap" style="margin-top: 12px;">
        <table class="fifo-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">S.No</th>
              <th>Applicant Name</th>
              <th>Applied Date</th>
              <th style="text-align: center; width: 100px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${sortedApps.map((app, index) => {
              const snap = app.candidateSnapshot || {};
              const isRejected = app.status && app.status.startsWith('REJECTED');
              const isShortlisted = app.status === 'SHORTLISTED';
              const isHired = app.status === 'HIRED' || app.status === 'SELECTED';
              
              let rowClass = '';
              if (isRejected) rowClass = 'row-rejected';
              else if (isShortlisted) rowClass = 'row-shortlisted';
              else if (isHired) rowClass = 'row-hired';

              return `
                <tr class="${rowClass}" id="fifo-app-row-${app.id}">
                  <td style="font-weight: 800; text-align: center; color: ${isRejected ? '#D32F2F' : 'var(--ink-faint)'};">${index + 1}</td>
                  <td class="${isRejected ? 'candidate-name-cell rejected' : ''}">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${snap.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid ${isRejected ? '#EF5350' : 'var(--paper-line)'};" alt="Avatar" />
                      <div>
                        <div style="font-weight: 800; font-size: 14px; color: ${isRejected ? '#C62828' : 'var(--ink)'};" class="${isRejected ? 'candidate-name-cell rejected' : ''}">
                          ${this.getCandidateRealName(app)}
                        </div>
                        <div style="font-size: 11.5px; color: ${isRejected ? '#E53935' : 'var(--ink-soft)'};">
                          ${this.getCandidateRealProfession(app)} • 📍 ${snap.city || 'Bengaluru'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight: 700; color: ${isRejected ? '#C62828' : 'var(--ink)'}; font-size: 13px;">${app.appliedDate || '02 Sep 2026'}</div>
                  </td>
                  <td style="text-align: center;">
                    <button type="button" class="action-eye-btn" data-app-id="${app.id}" title="View Candidate Profile & Resume" onclick="event.preventDefault(); event.stopPropagation(); PartnerApp.openCandidateResume('${app.id}')">
                      👁 View
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ==========================================
  // SECTIONS 4 & 5: REAL-TIME CANDIDATE PROFILE & PDF RESUME
  // ==========================================
  async openCandidateResume(appOrId) {
    console.log('👁 Opening candidate resume for:', appOrId);
    try {
      const applications = await ZunoAPI.getApplications();
      let app = null;

      if (typeof appOrId === 'object' && appOrId !== null) {
        app = appOrId;
      } else if (appOrId) {
        app = applications.find(a => String(a.id) === String(appOrId) || String(a.candidateId) === String(appOrId) || String(a.opportunityId) === String(appOrId));
      }

      if (!app && applications.length > 0) {
        app = applications[0];
      }

      if (!app) {
        const userProfile = await ZunoAPI.getProfile();
        app = {
          id: 'app_live_default',
          jobTitle: 'Candidate Application',
          candidateName: userProfile.name || 'Dileep Sai',
          candidateEmail: userProfile.email || 'dileepsai@gmail.com',
          candidateSnapshot: userProfile,
          appliedDate: '02 Sep 2026',
          status: 'APPLIED'
        };
      }

      this.currentViewingApplication = app;

      // Real-Time Fetch: Fetch candidate's absolute latest profile in real time
      let candidateProfile = null;
      try {
        candidateProfile = await ZunoAPI.getLatestCandidateProfile(app.candidateEmail || app.candidateId || (app.candidateSnapshot && app.candidateSnapshot.email));
      } catch (e) {
        console.warn('Real-time profile fetch note:', e);
      }

      const snap = Object.assign({}, app.candidateSnapshot || {}, candidateProfile || {});

      // 1. Header (Centered Candidate Name at Top Center)
      const avatarEl = document.getElementById('resume-avatar-img');
      if (avatarEl) avatarEl.src = snap.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
      
      const candidateRealName = this.getCandidateRealName({ candidateSnapshot: snap, candidateName: app.candidateName });
      const nameEl = document.getElementById('resume-candidate-name');
      if (nameEl) nameEl.innerText = candidateRealName.toUpperCase();
      
      const titleEl = document.getElementById('resume-candidate-title');
      if (titleEl) titleEl.innerText = this.getCandidateRealProfession({ candidateSnapshot: snap });
      
      const locEl = document.getElementById('resume-candidate-location');
      if (locEl) locEl.innerText = `📍 ${snap.city || 'Bengaluru, India'} • Applied for: ${app.jobTitle || 'Opportunity'}`;

      // 2. Directly Below: Contact Information Bar (Email, Phone, LinkedIn, etc.)
      const email = snap.email || app.candidateEmail || 'dileepsai@gmail.com';
      const phone = snap.phone || app.candidatePhone || '+91 98765 43210';
      const contactBar = document.getElementById('resume-contact-bar');
      
      if (contactBar) {
        let contactHtml = '';
        if (email) {
          contactHtml += `<a href="mailto:${email}" class="pdf-contact-link" title="Email Candidate">✉️ ${email}</a>`;
        }
        if (phone) {
          contactHtml += `<a href="tel:${phone}" class="pdf-contact-link" title="Call Candidate">📞 ${phone}</a>`;
        }
        if (snap.linkedinUrl) {
          contactHtml += `<a href="${snap.linkedinUrl}" target="_blank" rel="noopener" class="pdf-contact-link linkedin" title="Open LinkedIn Profile">💼 LinkedIn Profile ↗</a>`;
        } else {
          contactHtml += `<a href="https://linkedin.com" target="_blank" rel="noopener" class="pdf-contact-link linkedin" title="LinkedIn">💼 LinkedIn</a>`;
        }
        if (snap.githubUrl) {
          contactHtml += `<a href="${snap.githubUrl}" target="_blank" rel="noopener" class="pdf-contact-link github" title="Open GitHub">🐙 GitHub ↗</a>`;
        }
        if (snap.portfolioUrl) {
          contactHtml += `<a href="${snap.portfolioUrl}" target="_blank" rel="noopener" class="pdf-contact-link portfolio" title="Open Portfolio">🌐 Portfolio ↗</a>`;
        }
        if (snap.leetcodeUrl) {
          contactHtml += `<a href="${snap.leetcodeUrl}" target="_blank" rel="noopener" class="pdf-contact-link" style="color: #FFA116;">⚡ LeetCode ↗</a>`;
        }
        contactBar.innerHTML = contactHtml;
      }

      // 3. Section 1: Professional Summary
      const summarySec = document.getElementById('resume-section-summary');
      if (summarySec) summarySec.style.display = 'block';
      const bioEl = document.getElementById('resume-bio-text');
      if (bioEl) {
        bioEl.innerText = snap.about && snap.about.trim().length > 0
          ? snap.about
          : 'Passionate and verified talent on Zuno Network actively seeking growth opportunities and impact-driven challenges.';
      }

      // 4. Section 2: Education Details
      const degreeText = snap.degree === 'Other' ? (snap.degreeOther || 'Bachelor Degree') : (snap.degree || 'Bachelor of Technology');
      const branchText = snap.branch === 'Other' ? (snap.branchOther || '') : (snap.branch || 'Computer Science & Engineering');
      
      const eduDegreeEl = document.getElementById('resume-edu-degree');
      if (eduDegreeEl) eduDegreeEl.innerText = `${degreeText} ${branchText ? '• ' + branchText : ''}`;
      
      const eduCollegeEl = document.getElementById('resume-edu-college');
      if (eduCollegeEl) eduCollegeEl.innerText = snap.college ? `🏛️ ${snap.college}` : '🏛️ National Institute of Technology';
      
      const timeline = (snap.fromYear && snap.toYear) ? `${snap.fromMonth || 'Aug'} ${snap.fromYear} – ${snap.toMonth || 'May'} ${snap.toYear}` : '2022 – 2026';
      const eduTimelineEl = document.getElementById('resume-edu-timeline');
      if (eduTimelineEl) eduTimelineEl.innerText = `Timeline: ${timeline} ${snap.specialization ? '• Track: ' + snap.specialization : ''}`;

      // 5. Section 3: Experience / Career Track
      const expContent = document.getElementById('resume-experience-content');
      if (expContent) {
        expContent.innerHTML = `
          <div class="pdf-edu-card">
            <div class="pdf-edu-degree">Target Role: ${snap.preferredRole || snap.profession || 'Domain Specialist'}</div>
            <div class="pdf-edu-college">🏢 Expected CTC / Stipend: ${snap.expectedSalary || 'Standard Benchmark'} • Location: ${snap.locationPref || 'Flexible'}</div>
            <div class="pdf-edu-timeline">Status: Immediate Joiner • Ready for Technical Evaluation</div>
          </div>
        `;
      }

      // 6. Section 4: Skills
      const skillsList = (snap.skills && snap.skills.length > 0) ? snap.skills : ['Problem Solving', 'Data Structures', 'Communication', 'Full Stack Development', 'Git'];
      const tagsCloud = document.getElementById('resume-tags-cloud');
      if (tagsCloud) {
        let tagsHtml = '';
        skillsList.forEach(s => {
          tagsHtml += `<span class="pdf-tag">${s}</span>`;
        });
        tagsCloud.innerHTML = tagsHtml;
      }

      // 7. Section 5: Projects & Portfolios
      const projContent = document.getElementById('resume-projects-content');
      if (projContent) {
        projContent.innerHTML = `
          <div class="pdf-edu-card">
            <div class="pdf-edu-degree">Verified Portfolio & Coding Credentials</div>
            <div class="pdf-edu-college">${snap.portfolioUrl ? `🌐 <a href="${snap.portfolioUrl}" target="_blank">${snap.portfolioUrl}</a>` : '⚡ GitHub & Coding Profiles linked in contact header above.'}</div>
            <div class="pdf-edu-timeline">All projects reviewed for quality and repository standards.</div>
          </div>
        `;
      }

      // 8. Section 6: Certifications & Additional Details
      const certContent = document.getElementById('resume-certifications-content');
      if (certContent) {
        certContent.innerHTML = `
          <div class="pdf-edu-card">
            <div class="pdf-edu-degree">Zuno Verified Candidate Identity</div>
            <div class="pdf-edu-college">Verified Email: ${email} • Mobile: ${phone}</div>
            <div class="pdf-edu-timeline">Identity, education, and credentials verified on Zuno Talent Network.</div>
          </div>
        `;
      }

      // 9. Recruiter Details Share Box Preview
      const recruiter = this.recruiterProfile || DEFAULT_RECRUITER;
      const recruiterPreview = document.getElementById('shared-recruiter-summary-preview');
      if (recruiterPreview) {
        recruiterPreview.innerHTML = `
          <strong>${recruiter.name}</strong> (${recruiter.title}) • ✉️ ${recruiter.email} • 📞 ${recruiter.phone}
        `;
      }

      // 10. Status Indicator in Footer
      const statusNote = document.getElementById('resume-modal-current-status');
      if (statusNote) {
        statusNote.innerHTML = `Application Status: <span class="status-pill ${(app.status || 'applied').toLowerCase().replace('_', '-')}">${this.formatStatusDisplay(app.status)}</span>`;
      }

      // Close applicants list modal smoothly so resume modal takes full focus
      const applicantsModal = document.getElementById('job-applicants-floating-modal');
      if (applicantsModal) {
        applicantsModal.classList.remove('open');
      }

      // Open Modal with high z-index
      const modal = document.getElementById('candidate-resume-modal');
      if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        modal.style.zIndex = '999999';
      }
    } catch (err) {
      console.error('Error opening candidate resume modal:', err);
    }
  },

  closeCandidateResume() {
    const modal = document.getElementById('candidate-resume-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }
    // Re-open job applicants modal if we came from inspecting a job's pipeline
    if (this.activeJobIdForPipeline) {
      this.openApplicantsModal(this.activeJobIdForPipeline);
    }
  },

  // ==========================================
  // SECTION 6: CANDIDATE ACTIONS (SHORTLIST, REJECT, HIRE)
  // ==========================================
  async handleShortlistCandidate() {
    if (!this.currentViewingApplication) return;
    const app = this.currentViewingApplication;
    const shareChecked = document.getElementById('share-recruiter-details-toggle').checked;
    
    let sharedInfo = null;
    if (shareChecked) {
      const rec = this.recruiterProfile || DEFAULT_RECRUITER;
      sharedInfo = {
        recruiterName: rec.name,
        recruiterTitle: rec.title,
        recruiterCompany: rec.companyName,
        recruiterEmail: rec.email,
        recruiterPhone: rec.phone
      };
    }

    await ZunoAPI.updateApplicationStatus(app.id, 'SHORTLISTED', {
      sharedRecruiterInfo: sharedInfo,
      note: 'Candidate shortlisted after profile evaluation.'
    });

    const realName = this.getCandidateRealName(app);
    UIComponents.showToast(`✨ ${realName} has been SHORTLISTED! Status updated with green highlight.`);
    document.getElementById('candidate-resume-modal').classList.remove('open');
    await this.refreshAllData();

    if (this.activeJobIdForPipeline) {
      this.openApplicantsModal(this.activeJobIdForPipeline);
    }
  },

  async handleRejectCandidate() {
    if (!this.currentViewingApplication) return;
    const app = this.currentViewingApplication;
    
    const rejectionStage = app.status === 'SHORTLISTED' ? 'Shortlist Stage' : 'Initial Screening';
    
    await ZunoAPI.updateApplicationStatus(app.id, app.status === 'SHORTLISTED' ? 'REJECTED_SHORTLIST' : 'REJECTED_SCREENING', {
      rejectionStage: rejectionStage,
      rejectionReason: 'Candidate qualifications do not match current hiring criteria.',
      note: `Application declined at ${rejectionStage}.`
    });

    UIComponents.showToast(`Candidate application REJECTED. Status updated with RED highlight.`);
    document.getElementById('candidate-resume-modal').classList.remove('open');
    await this.refreshAllData();

    if (this.activeJobIdForPipeline) {
      this.openApplicantsModal(this.activeJobIdForPipeline);
    }
  },

  async handleHireCandidateFromModal() {
    if (!this.currentViewingApplication) return;
    const app = this.currentViewingApplication;
    await this.hireCandidate(app.id);
    document.getElementById('candidate-resume-modal').classList.remove('open');
  },

  // ==========================================
  // SECTION 7: SHORTLISTED CANDIDATES TAB
  // ==========================================
  async renderShortlisted() {
    const applications = await ZunoAPI.getApplications();
    const shortlistedApps = applications.filter(a => a.status === 'SHORTLISTED');
    const container = document.getElementById('shortlisted-container');
    if (!container) return;

    if (shortlistedApps.length === 0) {
      container.innerHTML = `
        <div class="pipeline-empty">
          <div class="pipeline-empty-icon">🎯</div>
          <h3>No Shortlisted Candidates Currently</h3>
          <p>Inspect applicants from your posted jobs and click "✓ Shortlist Candidate" to advance them here for final hiring.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="applicant-table-wrap">
        <table class="fifo-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">S.No</th>
              <th>Candidate</th>
              <th>Job Post</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th style="text-align: right; width: 240px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${shortlistedApps.map((app, index) => {
              const snap = app.candidateSnapshot || {};
              const realName = this.getCandidateRealName(app);

              return `
                <tr class="row-shortlisted" id="shortlist-row-${app.id}">
                  <td style="text-align: center; font-weight: 800; color: var(--partner-green);">${index + 1}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${snap.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--partner-green);" alt="Avatar" />
                      <div>
                        <div style="font-weight: 800; color: var(--ink);">${realName}</div>
                        <div style="font-size: 11.5px; color: var(--ink-soft);">${snap.email || app.candidateEmail || 'candidate@zuno.app'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style="font-size: 13.5px; color: var(--ink);">${app.jobTitle}</strong>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 13px;">${app.appliedDate || '02 Sep 2026'}</div>
                  </td>
                  <td>
                    <!-- Completely Green Visual Treatment for Shortlisted -->
                    <span class="status-pill" style="background: #DCFCE7; color: #15803D; font-weight: 800; border: 1.5px solid #86EFAC; display: inline-flex; align-items: center; gap: 4px;">
                      ✓ Shortlisted
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                      <button type="button" class="action-eye-btn" title="View Full Candidate Profile & Resume" onclick="PartnerApp.openCandidateResume('${app.id}')">
                        👁 View
                      </button>
                      <button type="button" class="btn-hire" onclick="PartnerApp.hireCandidate('${app.id}')" title="Confirm hiring offer">
                        Hire ⚡
                      </button>
                      <button type="button" class="btn-reject" style="padding: 6px 10px; font-size: 11px;" onclick="PartnerApp.rejectFromShortlist('${app.id}')" title="Reject from Shortlist">
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ==========================================
  // SECTION 8: REJECTED CANDIDATES TAB
  // ==========================================
  async renderRejected() {
    const applications = await ZunoAPI.getApplications();
    const rejectedApps = applications.filter(a => (a.status || '').startsWith('REJECTED'));
    const container = document.getElementById('rejected-container');
    if (!container) return;

    if (rejectedApps.length === 0) {
      container.innerHTML = `
        <div class="pipeline-empty">
          <div class="pipeline-empty-icon">📁</div>
          <h3>No Rejected Candidates</h3>
          <p>Candidates declined during applicant review or shortlisting will be cataloged here per job application.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="applicant-table-wrap">
        <table class="fifo-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">S.No</th>
              <th>Candidate</th>
              <th>Job Post</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th style="text-align: center; width: 100px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${rejectedApps.map((app, index) => {
              const snap = app.candidateSnapshot || {};
              const realName = this.getCandidateRealName(app);

              return `
                <tr class="row-rejected" id="rejected-row-${app.id}">
                  <td style="text-align: center; font-weight: 800; color: #D32F2F;">${index + 1}</td>
                  <td class="candidate-name-cell rejected">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${snap.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid #EF5350;" alt="Avatar" />
                      <div>
                        <div style="font-weight: 800; color: #C62828;">${realName}</div>
                        <div style="font-size: 11.5px; color: #E53935;">${snap.email || app.candidateEmail || 'candidate@zuno.app'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style="font-size: 13.5px; color: #C62828;">${app.jobTitle}</strong>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 13px; color: #C62828;">${app.appliedDate || '02 Sep 2026'}</div>
                  </td>
                  <td class="col-rejected">
                    <!-- Completely Red Visual Treatment for Rejected -->
                    <span class="status-pill" style="background: #FEE2E2; color: #B91C1C; font-weight: 800; border: 1.5px solid #FCA5A5; display: inline-flex; align-items: center; gap: 4px;">
                      ✕ Rejected
                    </span>
                    ${app.rejectionStage ? `<div style="font-size: 10.5px; color: #DC2626; font-weight: 700; margin-top: 2px;">(${app.rejectionStage})</div>` : ''}
                  </td>
                  <td style="text-align: center;">
                    <button type="button" class="action-eye-btn" title="View Candidate Profile & Resume" onclick="PartnerApp.openCandidateResume('${app.id}')">
                      👁 View
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ==========================================
  // SECTION 9: HIRED CANDIDATES TAB
  // ==========================================
  async renderHired() {
    const applications = await ZunoAPI.getApplications();
    const hiredApps = applications.filter(a => a.status === 'HIRED' || a.status === 'SELECTED');
    const container = document.getElementById('hired-container');
    if (!container) return;

    if (hiredApps.length === 0) {
      container.innerHTML = `
        <div class="pipeline-empty">
          <div class="pipeline-empty-icon">🏆</div>
          <h3>No Hired Candidates Yet</h3>
          <p>Extend offers to shortlisted candidates. Confirmed hires will appear here and update your hired analytics.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="applicant-table-wrap">
        <table class="fifo-table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">S.No</th>
              <th>Candidate</th>
              <th>Job Post</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th style="text-align: center; width: 100px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${hiredApps.map((app, index) => {
              const snap = app.candidateSnapshot || {};
              const realName = this.getCandidateRealName(app);

              return `
                <tr class="row-hired" id="hired-row-${app.id}">
                  <td style="text-align: center; font-weight: 800; color: #15803D;">${index + 1}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${snap.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid #22C55E;" alt="Avatar" />
                      <div>
                        <div style="font-weight: 800; color: var(--ink);">${realName}</div>
                        <div style="font-size: 11.5px; color: var(--ink-soft);">${snap.email || app.candidateEmail || 'candidate@zuno.app'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style="font-size: 13.5px; color: var(--ink);">${app.jobTitle}</strong>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 13px;">${app.appliedDate || '02 Sep 2026'}</div>
                  </td>
                  <td>
                    <span class="status-pill" style="background: #FEF9C3; color: #854D0E; font-weight: 800; border: 1.5px solid #FDE047; display: inline-flex; align-items: center; gap: 4px;">
                      ⚡ Hired / Selected
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <button type="button" class="action-eye-btn" title="View Candidate Profile & Resume" onclick="PartnerApp.openCandidateResume('${app.id}')">
                      👁 View
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  // ==========================================
  // TAB: POST A NEW OPPORTUNITY
  // ==========================================
  bindJobPostForm() {
    const form = document.getElementById('partner-post-job-form');
    if (!form) return;

    const inputs = ['post-job-title', 'post-job-company', 'post-job-category', 'post-job-location', 'post-job-stipend', 'post-job-duration'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateJobLivePreview());
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('post-job-title').value.trim();
      const companyName = document.getElementById('post-job-company').value.trim() || (this.recruiterProfile ? this.recruiterProfile.companyName : "HyperGrowth Media");
      const category = document.getElementById('post-job-category').value;
      const location = document.getElementById('post-job-location').value.trim() || "Bengaluru";
      const duration = document.getElementById('post-job-duration').value.trim() || "3 Months";
      const stipendNum = parseFloat(document.getElementById('post-job-stipend').value) || 35000;
      const deadline = document.getElementById('post-job-deadline').value || "2026-10-31";
      const roles = document.getElementById('post-job-roles').value.trim() || "Work on high priority initiatives with experienced engineering leaders.";
      
      const respRaw = document.getElementById('post-job-responsibilities').value.trim();
      const responsibilities = respRaw ? respRaw.split('\n').filter(r => r.trim().length > 0) : ["Execute deliverables according to project specifications."];
      
      const obligRaw = document.getElementById('post-job-obligations').value.trim();
      const obligations = obligRaw ? obligRaw.split('\n').filter(o => o.trim().length > 0) : ["Maintain confidentiality and adhere to sprint schedules."];
      
      const tagsRaw = document.getElementById('post-job-tags').value.trim();
      const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(t => t.length > 0) : ["Python", "Engineering", category];

      const googleFormUrl = document.getElementById('post-job-form-url').value.trim() || null;

      const oppPayload = {
        title,
        companyName,
        companyLogo: this.recruiterProfile ? this.recruiterProfile.companyLogo : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120",
        websiteUrl: this.recruiterProfile ? this.recruiterProfile.websiteUrl : "https://zuno.app",
        category,
        location,
        duration,
        deadline,
        stipend: stipendNum,
        stipendDisplay: `₹${stipendNum.toLocaleString('en-IN')} / month`,
        roles,
        responsibilities,
        obligations,
        tags,
        googleFormUrl
      };

      await ZunoAPI.postOpportunity(oppPayload);
      UIComponents.showToast('🚀 Opportunity published! It is now live on the Candidate Portal.');
      
      form.reset();
      this.switchTab('overview');
    });
  },

  updateJobLivePreview() {
    const title = document.getElementById('post-job-title').value.trim() || "AI/ML Engineer";
    const company = document.getElementById('post-job-company').value.trim() || (this.recruiterProfile ? this.recruiterProfile.companyName : "HyperGrowth Media");
    const category = document.getElementById('post-job-category').value;
    const location = document.getElementById('post-job-location').value.trim() || "Bengaluru";
    const duration = document.getElementById('post-job-duration').value.trim() || "3 Months";
    const stipend = parseFloat(document.getElementById('post-job-stipend').value) || 35000;

    const prevTitle = document.getElementById('prev-job-title');
    const prevCompany = document.getElementById('prev-job-company');
    const prevMeta = document.getElementById('prev-job-meta');
    const prevCat = document.getElementById('prev-job-category');

    if (prevTitle) prevTitle.innerText = title;
    if (prevCompany) prevCompany.innerText = company;
    if (prevMeta) prevMeta.innerText = `📍 ${location} • ⏳ ${duration} • 💰 ₹${stipend.toLocaleString('en-IN')} / month`;
    if (prevCat) prevCat.innerText = category;
  },

  // ==========================================
  // TAB: RECRUITER & COMPANY PROFILE
  // ==========================================
  bindRecruiterProfileForm() {
    const form = document.getElementById('partner-profile-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        name: document.getElementById('recruiter-name-input').value.trim(),
        title: document.getElementById('recruiter-title-input').value.trim(),
        companyName: document.getElementById('recruiter-company-input').value.trim(),
        companyLogo: document.getElementById('recruiter-logo-input').value.trim(),
        email: document.getElementById('recruiter-email-input').value.trim(),
        phone: document.getElementById('recruiter-phone-input').value.trim(),
        websiteUrl: document.getElementById('recruiter-website-input').value.trim(),
        location: document.getElementById('recruiter-location-input').value.trim()
      };

      this.recruiterProfile = ZunoAPI.saveRecruiterProfile(updated);
      UIComponents.showToast('✅ Recruiter & Company Profile saved!');
    });
  },

  renderRecruiterProfile() {
    const rec = this.recruiterProfile || DEFAULT_RECRUITER;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('recruiter-name-input', rec.name);
    setVal('recruiter-title-input', rec.title);
    setVal('recruiter-company-input', rec.companyName);
    setVal('recruiter-logo-input', rec.companyLogo);
    setVal('recruiter-email-input', rec.email);
    setVal('recruiter-phone-input', rec.phone);
    setVal('recruiter-website-input', rec.websiteUrl);
    setVal('recruiter-location-input', rec.location);

    const prevName = document.getElementById('recruiter-display-name');
    if (prevName) prevName.innerText = rec.name;
    const prevComp = document.getElementById('recruiter-display-company');
    if (prevComp) prevComp.innerText = `${rec.title} at ${rec.companyName}`;
  },

  formatStatusDisplay(status) {
    if (!status) return 'Applied';
    switch (status.toUpperCase()) {
      case 'APPLIED': return 'Applied';
      case 'UNDER_REVIEW': return 'Under Review';
      case 'SHORTLISTED': return 'Shortlisted';
      case 'HIRED':
      case 'SELECTED': return 'Hired ⚡';
      case 'REJECTED':
      case 'REJECTED_SCREENING': return 'Rejected (Screening)';
      case 'REJECTED_SHORTLIST': return 'Rejected (Shortlist)';
      default: return status;
    }
  }
};

// Export to global window scope for inline onclick triggers
window.PartnerApp = PartnerApp;

// Bootstrap safely
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PartnerApp.init());
} else {
  PartnerApp.init();
}
