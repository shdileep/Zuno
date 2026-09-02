/**
 * Zuno Dashboard - UI Components & Interactive Behaviors
 */

// Available master goals library for searchable dropdown
const MASTER_GOALS_LIST = [
  "Content Creator",
  "Educator & STEM Mentor",
  "Short-Form Video Editor",
  "Full Stack Developer",
  "Frontend Engineer (Vue/React)",
  "Backend Architect (Spring Boot/Java)",
  "UI/UX & Product Designer",
  "Growth Marketer",
  "Brand Copywriter",
  "AI & Machine Learning Researcher",
  "Cloud & DevOps Engineer",
  "Community Manager",
  "Freelance Consultant",
  "Motion Graphics Specialist",
  "Technical Writer"
];

const UIComponents = {
  selectedGoals: [],
  selectedSkills: [],

  initSearchableGoalSelector(initialGoals = [], onChangeCallback) {
    this.selectedGoals = [...initialGoals];
    const container = document.getElementById('goals-picker-container');
    if (!container) return;

    const render = () => {
      container.innerHTML = `
        <div class="selected-tags-box" id="goals-tags-box">
          ${this.selectedGoals.map(goal => `
            <span class="goal-tag">
              ${goal}
              <span class="goal-tag-remove" data-goal="${goal}">&times;</span>
            </span>
          `).join('')}
          <input type="text" class="goal-input-inline" id="goal-search-input" placeholder="Type to search or add goals (e.g. Educator, Creator)..." autocomplete="off" />
        </div>
        <div class="goals-dropdown-menu" id="goals-dropdown-menu"></div>
      `;

      const input = document.getElementById('goal-search-input');
      const dropdown = document.getElementById('goals-dropdown-menu');

      // Tag removal
      container.querySelectorAll('.goal-tag-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const goalToRemove = btn.getAttribute('data-goal');
          this.selectedGoals = this.selectedGoals.filter(g => g !== goalToRemove);
          render();
          if (onChangeCallback) onChangeCallback(this.selectedGoals);
        });
      });

      // Filter as typing
      input.addEventListener('input', (e) => {
        const val = e.target.value.trim().toLowerCase();
        if (!val) {
          dropdown.classList.remove('open');
          return;
        }

        const matches = MASTER_GOALS_LIST.filter(g =>
          g.toLowerCase().includes(val) && !this.selectedGoals.includes(g)
        );

        if (matches.length > 0 || val.length > 1) {
          let html = matches.map(g => `<div class="goal-option-item" data-val="${g}">+ ${g}</div>`).join('');
          if (!MASTER_GOALS_LIST.some(g => g.toLowerCase() === val) && !this.selectedGoals.includes(e.target.value.trim())) {
            html += `<div class="goal-option-item custom" data-val="${e.target.value.trim()}">+ Add custom: "<strong>${e.target.value.trim()}</strong>"</div>`;
          }
          dropdown.innerHTML = html;
          dropdown.classList.add('open');

          dropdown.querySelectorAll('.goal-option-item').forEach(item => {
            item.addEventListener('click', () => {
              const selected = item.getAttribute('data-val');
              if (selected && !this.selectedGoals.includes(selected)) {
                this.selectedGoals.push(selected);
                render();
                if (onChangeCallback) onChangeCallback(this.selectedGoals);
              }
            });
          });
        } else {
          dropdown.classList.remove('open');
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    };

    render();
  },

  initSkillsTagger(initialSkills = [], onChangeCallback) {
    this.selectedSkills = [...initialSkills];
    const container = document.getElementById('skills-tags-container');
    if (!container) return;

    const render = () => {
      container.innerHTML = `
        <div class="selected-tags-box" style="background: var(--paper-soft);">
          ${this.selectedSkills.map(skill => `
            <span class="goal-tag" style="background: var(--paper-line); color: var(--ink);">
              ${skill}
              <span class="skill-remove-btn" data-skill="${skill}" style="cursor:pointer; margin-left:4px;">&times;</span>
            </span>
          `).join('')}
          <input type="text" class="goal-input-inline" id="skill-input-inline" placeholder="Add skill & press Enter..." />
        </div>
      `;

      container.querySelectorAll('.skill-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const s = btn.getAttribute('data-skill');
          this.selectedSkills = this.selectedSkills.filter(x => x !== s);
          render();
          if (onChangeCallback) onChangeCallback(this.selectedSkills);
        });
      });

      const input = document.getElementById('skill-input-inline');
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = input.value.trim();
          if (val && !this.selectedSkills.includes(val)) {
            this.selectedSkills.push(val);
            render();
            if (onChangeCallback) onChangeCallback(this.selectedSkills);
          }
        }
      });
    };

    render();
  },

  showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  },

  openJobModal(job, onApplyCallback) {
    const modal = document.getElementById('job-details-modal');
    if (!modal) return;

    document.getElementById('modal-job-company-logo').src = job.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120';
    document.getElementById('modal-job-company-name').textContent = job.companyName;
    const webLink = document.getElementById('modal-job-website-url');
    webLink.href = job.websiteUrl || '#';
    webLink.textContent = job.websiteUrl ? job.websiteUrl.replace('https://', '') : 'Visit Website';

    document.getElementById('modal-job-title').textContent = job.title;
    document.getElementById('modal-job-duration').textContent = job.duration || 'Flexible';
    document.getElementById('modal-job-deadline').textContent = job.deadline || 'Open';
    document.getElementById('modal-job-stipend').textContent = job.stipendDisplay || `₹${job.stipend.toLocaleString()} / month`;
    document.getElementById('modal-job-location').textContent = job.location || 'Remote';

    // Responsibilities
    const respList = document.getElementById('modal-job-responsibilities');
    respList.innerHTML = (job.responsibilities || []).map(r => `<li>${r}</li>`).join('');

    // Obligations
    const oblList = document.getElementById('modal-job-obligations');
    oblList.innerHTML = (job.obligations || []).map(o => `<li>${o}</li>`).join('');

    // Apply button behavior (Google form vs direct)
    const applyBtn = document.getElementById('modal-job-apply-btn');
    applyBtn.onclick = () => {
      if (job.googleFormUrl) {
        window.open(job.googleFormUrl, '_blank');
        UIComponents.showToast('Opened partner Google Form application!');
      } else {
        if (onApplyCallback) onApplyCallback(job.id);
      }
      modal.classList.remove('open');
    };

    if (job.googleFormUrl) {
      applyBtn.innerHTML = `Apply via Google Form <span style="margin-left:4px">↗</span>`;
    } else {
      applyBtn.innerHTML = `Apply Directly on Zuno 🚀`;
    }

    modal.classList.add('open');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }
};
