/**
 * 中文简历页面 JavaScript
 */

$(document).ready(function () {

    const skills = [
        { name: "JavaScript / TypeScript", level: 85 },
        { name: "React / HTML / CSS",      level: 88 },
        { name: "Python",                  level: 82 },
        { name: "SQL / 数据库",            level: 80 },
        { name: "Java",                    level: 78 },
        { name: "C# / .NET",              level: 68 }
    ];

    const projectDetails = {
        news: {
            title: "全栈新闻管理Web系统",
            description: "基于 React、TypeScript、Node.js 和 MySQL 构建的生产级多页面CMS，覆盖从数据库设计到响应式UI的全栈开发。",
            responsibilities: [
                "设计规范化MySQL关系数据库结构，实现Node.js REST API后端",
                "构建含可复用类型化组件库、客户端状态管理及异步API集成（含错误与加载状态处理）的React/TypeScript前端",
                "采用语义化HTML5和CSS3实现无障碍响应式布局，符合WCAG 2.1色彩对比度及键盘导航标准",
                "优化资源加载与渲染流程，页面加载速度提升20%",
                "使用Git特性分支工作流管理完整代码库"
            ],
            technologies: ["React", "TypeScript", "Node.js", "MySQL", "REST API", "HTML5", "CSS3", "Git"],
            challenges: "在数据访问、业务逻辑和UI层之间保持清晰的MVC分层架构，同时确保TypeScript类型一致贯穿前后端。",
            achievements: "交付完整CMS，页面加载速度提升20%，实现跨浏览器兼容性，并建立可复用的类型化组件库。"
        },
        uno: {
            title: "UNO卡牌游戏引擎",
            description: "采用严格TDD和行业标准设计模式构建的1500+行Java OO引擎，完整实现UNO规则集。",
            responsibilities: [
                "使用SOLID原则及策略、观察者、工厂等设计模式架构核心游戏逻辑",
                "将核心逻辑与I/O及UI层完全解耦——类比六边形（端口与适配器）架构",
                "以严格TDD方式编写JUnit测试集：先写失败测试，实现后再重构",
                "实现对所有游戏状态转换、特殊牌和多人游戏边界情况的全面分支覆盖",
                "产出完整的开发者文档，包含类图和API参考"
            ],
            technologies: ["Java", "OOP", "SOLID原则", "设计模式", "TDD", "JUnit", "Maven"],
            challenges: "在实现复杂UNO特殊牌交互的同时，保持清晰的架构和100%可测试的业务逻辑。",
            achievements: "交付了高覆盖率、高可维护性、附完整技术文档的游戏引擎。"
        },
        plant: {
            title: "植物识别Android应用",
            description: "基于ML图像识别的智能Android应用，专注于API集成与敏捷团队交付。",
            responsibilities: [
                "担任产品经理——主导需求研讨会、输出完整PRD、对10+个核心功能进行可行性分析",
                "设计并构建ML REST API集成层：结构化JSON请求/响应结构，实现异步回调、错误处理和重试逻辑",
                "优化ML预处理流程，植物识别准确率达85%",
                "协调4人敏捷团队完成迭代计划、代码审查及全SDLC发布管理"
            ],
            technologies: ["Android Studio", "Java", "REST API", "ML集成", "Agile / Scrum", "JSON"],
            challenges: "达成85%准确率目标需要对图像预处理和ML模型置信度阈值进行精细调优。",
            achievements: "通过有效产品管理和技术协调，按期交付了识别准确率85%的完整应用。"
        },
        maze: {
            title: "3D迷宫游戏",
            description: "含模块化道具系统、物理交互及Blender自制资产的Unity 3D游戏，通过敏捷迭代优化用户体验。",
            responsibilities: [
                "用C#实现含5种道具类型的模块化道具系统，基于Unity组件架构和ScriptableObjects进行数据驱动配置",
                "通过Unity事件系统将游戏逻辑与渲染/物理解耦——类比依赖注入模式",
                "在Blender中创建并绑定3D模型和骨骼动画，集成物理交互并保持稳定60fps",
                "主导2轮迭代开发冲刺，基于游戏测试反馈优化游戏平衡性与用户体验"
            ],
            technologies: ["Unity", "C#", "Blender", "物理引擎", "组件化架构", "敏捷冲刺"],
            challenges: "在集成复杂Unity物理和动画系统的同时，保持C#代码的解耦清晰架构。",
            achievements: "通过基于游戏测试数据的迭代UX优化，用户留存率提升40%。"
        }
    };

    function initialize() {
        loadSkillBars();
        setupProfileImage();
        setupProjectModals();
        setupScrollAnimations();
    }

    function loadSkillBars() {
        const $skillBars = $('#skillBarsCn');
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
        const $img = $('#profileImageCn');
        $img.on('error', function () {
            $(this).attr('src', 'https://ui-avatars.com/api/?name=李天宇&size=200&background=4a6baf&color=fff&bold=true');
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

            $('#projectModalLabelCn').text(d.title);
            $('#projectModalBodyCn').html(`
                <div class="project-modal-content">
                    <p><strong>${d.description}</strong></p>
                    <h4>主要职责</h4>
                    <ul>${d.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                    <h4>使用技术</h4>
                    <div class="mb-3">${d.technologies.map(t => `<span class="skill-tag me-1 mb-1 d-inline-block">${t}</span>`).join('')}</div>
                    <h4>挑战与解决方案</h4>
                    <p>${d.challenges}</p>
                    <h4>关键成就</h4>
                    <p>${d.achievements}</p>
                </div>
            `);
            new bootstrap.Modal(document.getElementById('projectModalCn')).show();
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
