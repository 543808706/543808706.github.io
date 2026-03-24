/**
 * CV Page JavaScript
 * Handles skill visualization, project modals, and scroll animations.
 */

$(document).ready(function () {

    const skills = [
        { name: "JavaScript / TypeScript", level: 85 },
        { name: "React / HTML / CSS",      level: 88 },
        { name: "Python",                  level: 82 },
        { name: "SQL / Databases",         level: 80 },
        { name: "Java",                    level: 78 },
        { name: "C# / .NET",              level: 68 }
    ];

    const projectDetails = {
        news: {
            title: "Full-Stack News Management Web System",
            description: "A production-grade multi-page CMS built with React, TypeScript, Node.js, and MySQL — covering full-stack development from database design to responsive UI.",
            responsibilities: [
                "Designed a normalised MySQL relational database schema and implemented a Node.js REST API backend",
                "Built a React/TypeScript front-end with a reusable typed component library, client-side state management, and async API integration with error and loading-state handling",
                "Engineered accessible, responsive layouts using semantic HTML5 and CSS3 — WCAG-compliant colour contrast and keyboard navigability throughout",
                "Optimised asset loading and rendering pipeline, reducing page load time by 20%",
                "Maintained full codebase in Git with feature-branching workflow"
            ],
            technologies: ["React", "TypeScript", "Node.js", "MySQL", "REST API", "HTML5", "CSS3", "Git"],
            challenges: "Balancing a clean MVC-style separation of concerns across data access, business logic, and UI layers while keeping TypeScript types consistent end-to-end.",
            achievements: "Delivered a fully functional CMS with a 20% page load improvement, cross-browser compatibility, and a reusable typed component library."
        },
        uno: {
            title: "UNO Card Game Engine",
            description: "A 1,500+ line Java OO engine implementing the full UNO ruleset, built with strict TDD and industry-standard design patterns.",
            responsibilities: [
                "Architected core game logic using SOLID principles and Strategy, Observer, and Factory design patterns",
                "Kept core game logic fully decoupled from I/O and UI concerns — analogous to hexagonal (ports and adapters) architecture",
                "Applied strict Test-Driven Development (TDD) with JUnit — wrote failing tests first, implemented to pass, then refactored",
                "Achieved comprehensive branch coverage across all game-state transitions, special cards, and multi-player edge cases",
                "Produced full developer-facing documentation including class diagrams and API references"
            ],
            technologies: ["Java", "OOP", "SOLID Principles", "Design Patterns", "TDD", "JUnit", "Maven"],
            challenges: "Implementing complex UNO special-card interactions while maintaining clean architecture and 100% testable business logic.",
            achievements: "Delivered a maintainable, well-tested engine with high branch coverage and complete technical documentation."
        },
        plant: {
            title: "Plant Identification Android App",
            description: "An intelligent Android application using ML image recognition to identify plant species, with a focus on API integration and agile team delivery.",
            responsibilities: [
                "Served as Product Manager — led requirements workshops, produced a full PRD, and performed feasibility analysis for 10+ core features",
                "Designed and built the ML REST API integration layer: structured JSON request/response schemas, implemented async callbacks, error handling, and retry logic",
                "Optimised ML pre-processing pipeline to achieve 85% plant identification accuracy",
                "Coordinated a 4-person agile team through sprint planning, code reviews, and release management across the full SDLC"
            ],
            technologies: ["Android Studio", "Java", "REST API", "ML Integration", "Agile / Scrum", "JSON"],
            challenges: "Achieving the 85% accuracy target required careful optimisation of image pre-processing and confidence thresholds in the ML pipeline.",
            achievements: "Delivered a fully functional app with 85% identification accuracy on time, through effective product management and technical coordination."
        },
        maze: {
            title: "3D Maze Game",
            description: "A 3D Unity game featuring a modular item system, physics-based interactions, and Blender-created assets — iterated through agile playtesting sprints.",
            responsibilities: [
                "Developed a modular item system in C# with 5 item types (pick-ups, traps, power-ups, keys, consumables) using Unity's component architecture and ScriptableObjects",
                "Decoupled game logic from rendering and physics using Unity's event system — mirroring dependency injection patterns",
                "Created and rigged 3D models and skeletal animations in Blender; integrated physics-based interactions maintaining stable 60fps",
                "Led 2 iterative development sprints incorporating playtesting feedback to refine game balance and UX"
            ],
            technologies: ["Unity", "C#", "Blender", "Physics Engine", "Component Architecture", "Agile Sprints"],
            challenges: "Maintaining clean decoupled architecture in C# while integrating complex Unity physics and animation systems.",
            achievements: "Increased player retention by 40% through iterative UX and game-balance improvements driven by playtesting data."
        }
    };

    function initialize() {
        loadSkillBars();
        setupProfileImage();
        setupProjectModals();
        setupScrollAnimations();
    }

    function loadSkillBars() {
        const $skillBars = $('#skillBars');
        skills.forEach(skill => {
            const colorClass = getSkillColorClass(skill.level);
            $skillBars.append(`
                <div class="skill-bar">
                    <div class="skill-bar-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}%</span>
                    </div>
                    <div class="skill-progress">
                        <div class="skill-progress-bar ${colorClass}" style="width: 0%"></div>
                    </div>
                </div>
            `);
        });
        setTimeout(() => {
            $('.skill-progress-bar').each(function (i) {
                $(this).css('width', `${skills[i].level}%`);
            });
        }, 500);
    }

    function getSkillColorClass(level) {
        if (level >= 85) return 'bg-success';
        if (level >= 70) return 'bg-info';
        if (level >= 50) return 'bg-warning';
        return 'bg-danger';
    }

    function setupProfileImage() {
        const $img = $('#profileImage');
        $img.on('error', function () {
            $(this).attr('src', 'https://ui-avatars.com/api/?name=Tianyu+Li&size=200&background=4a6baf&color=fff&bold=true');
        });
        if (!$img.attr('src') || $img.attr('src') === '') {
            $img.trigger('error');
        }
        $img.parent().hover(
            function () { $img.addClass('pulse'); },
            function () { $img.removeClass('pulse'); }
        );
    }

    function setupProjectModals() {
        $('.project-details-btn').on('click', function () {
            const projectId = $(this).closest('[data-project]').data('project');
            const d = projectDetails[projectId];
            if (!d) return;

            $('#projectModalLabel').text(d.title);
            $('#projectModalBody').html(`
                <div class="project-modal-content">
                    <p><strong>${d.description}</strong></p>
                    <h4>Key Responsibilities</h4>
                    <ul>${d.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                    <h4>Technologies Used</h4>
                    <div class="mb-3">${d.technologies.map(t => `<span class="skill-tag me-1 mb-1 d-inline-block">${t}</span>`).join('')}</div>
                    <h4>Challenge</h4>
                    <p>${d.challenges}</p>
                    <h4>Key Achievement</h4>
                    <p>${d.achievements}</p>
                </div>
            `);
            new bootstrap.Modal(document.getElementById('projectModal')).show();
        });
    }

    function setupScrollAnimations() {
        $(window).on('scroll', function () {
            $('.cv-section').each(function () {
                if ($(window).scrollTop() + $(window).height() * 0.85 > $(this).offset().top) {
                    $(this).addClass('fade-in');
                }
            });
        });
        $(window).trigger('scroll');
    }

    initialize();
});
