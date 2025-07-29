  
        // Blog posts data
        const blogPosts = [
            {
                id: 1,
                title: "Getting Started with React Hooks",
                excerpt: "Learn how to use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.",
                author: "Sarah Johnson",
                date: "2024-01-15",
                category: "web-dev",
                image: "./1.jpg?height=200&width=400"
            },
            {
                id: 2,
                title: "10 Tips for Landing Your First Developer Job",
                excerpt: "Essential advice for new developers entering the job market. From building a portfolio to acing technical interviews, here's what you need to know.",
                author: "Mike Chen",
                date: "2024-01-12",
                category: "career",
                image: "/2.jpg?height=200&width=400"
            },
            {
                id: 3,
                title: "CSS Grid vs Flexbox: When to Use Which",
                excerpt: "A detailed comparison of CSS Grid and Flexbox layout systems. Understand the strengths of each and learn when to apply them in your projects.",
                author: "Emily Rodriguez",
                date: "2024-01-10",
                category: "web-dev",
                image: "/3.png?height=200&width=400"
            },
            {
                id: 4,
                title: "The Future of Web Development in 2024",
                excerpt: "Explore the latest trends and technologies shaping web development. From AI integration to new frameworks, discover what's coming next.",
                author: "David Kim",
                date: "2024-01-08",
                category: "news",
                image: "/4.jpg?height=200&width=400"
            },
            {
                id: 5,
                title: "Building Responsive Websites with Tailwind CSS",
                excerpt: "Master responsive design with Tailwind CSS. Learn utility-first CSS principles and create beautiful, mobile-friendly websites efficiently.",
                author: "Lisa Wang",
                date: "2024-01-05",
                category: "web-dev",
                image: "/5.jpg?height=200&width=400"
            },
            {
                id: 6,
                title: "Remote Work Best Practices for Developers",
                excerpt: "Maximize your productivity while working from home. Tips for communication, time management, and maintaining work-life balance as a remote developer.",
                author: "Alex Thompson",
                date: "2024-01-03",
                category: "career",
                image: "/6.png?height=200&width=400"
            },
            {
                id: 7,
                title: "JavaScript ES2024: New Features Overview",
                excerpt: "Discover the latest JavaScript features and improvements. From new array methods to enhanced async capabilities, stay current with ES2024.",
                author: "Rachel Green",
                date: "2024-01-01",
                category: "web-dev",
                image: "/7.jpg?height=200&width=400"
            },
            {
                id: 8,
                title: "Tech Industry Salary Trends 2024",
                excerpt: "Comprehensive analysis of developer salaries across different technologies and locations. Make informed decisions about your career path.",
                author: "James Wilson",
                date: "2023-12-28",
                category: "career",
                image: "/8.jpg?height=200&width=400"
            },
            {
                id: 9,
                title: "Node.js Performance Optimization Tips",
                excerpt: "Boost your Node.js application performance with these proven techniques. From memory management to async optimization strategies.",
                author: "Maria Garcia",
                date: "2023-12-25",
                category: "web-dev",
                image: "/9.png?height=200&width=400"
            },
            {
                id: 10,
                title: "AI Tools for Developers: A Complete Guide",
                excerpt: "Explore how AI is transforming software development. From code generation to debugging assistance, discover tools that boost productivity.",
                author: "Tom Anderson",
                date: "2023-12-22",
                category: "news",
                image: "/10.png?height=200&width=400"
            },
            {
                id: 11,
                title: "Building Your Developer Portfolio",
                excerpt: "Create a standout portfolio that showcases your skills effectively. Learn what projects to include and how to present them professionally.",
                author: "Sophie Brown",
                date: "2023-12-20",
                category: "career",
                image: "/11.jpg?height=200&width=400"
            },
            {
                id: 12,
                title: "Web Accessibility: A Developer's Guide",
                excerpt: "Make your websites accessible to everyone. Learn WCAG guidelines, semantic HTML, and testing tools for inclusive web development.",
                author: "Chris Lee",
                date: "2023-12-18",
                category: "web-dev",
                image: "/12.png?height=200&width=400"
            }
        ];

           // Pagination variables
        let currentPage = 1;
        const postsPerPage = 6;
        let filteredPosts = [...blogPosts];
        let currentCategory = 'all';

        // DOM elements
        const blogGrid = document.getElementById('blogGrid');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const pageNumbers = document.getElementById('pageNumbers');
        const themeToggle = document.getElementById('themeToggle');
        const scrollTop = document.getElementById('scrollTop');
        const filterBtns = document.querySelectorAll('.filter-btn');

        // Initialize the page
        function init() {
            renderPosts();
            renderPagination();
            setupEventListeners();
        }

        // Enhanced render posts with smooth transitions
        function renderPosts() {
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const postsToShow = filteredPosts.slice(startIndex, endIndex);

            // Add transition effect
            blogGrid.classList.add('transitioning');
            
            setTimeout(() => {
                blogGrid.innerHTML = '';

                postsToShow.forEach((post, index) => {
                    const postElement = createPostElement(post);
                    postElement.style.animationDelay = `${index * 0.1}s`;
                    blogGrid.appendChild(postElement);
                });
                
                // Remove transition effect
                setTimeout(() => {
                    blogGrid.classList.remove('transitioning');
                }, 100);
            }, 150);
        }

        // Create post element
        function createPostElement(post) {
            const postDiv = document.createElement('article');
            postDiv.className = 'blog-card';
            
            postDiv.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="card-image" loading="lazy">
                <div class="card-content">
                    <span class="card-category">${getCategoryName(post.category)}</span>
                    <h2 class="card-title">
                        <a href="#" onclick="readPost(${post.id})">${post.title}</a>
                    </h2>
                    <p class="card-excerpt">${post.excerpt}</p>
                    <div class="card-meta">
                        <div class="card-author">
                            <i class="fas fa-user"></i>
                            <span>${post.author}</span>
                        </div>
                        <div class="card-date">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(post.date)}</span>
                        </div>
                    </div>
                    <a href="#" class="read-more" onclick="readPost(${post.id})">
                        Read More
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;

            return postDiv;
        }

        // Enhanced pagination with page info
        function renderPagination() {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            const pageInfo = document.getElementById('pageInfo');
            
            // Update page info
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
            
            // Update prev/next buttons
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;

            // Render page numbers with better mobile handling
            pageNumbers.innerHTML = '';
            
            if (totalPages <= 1) return;
            
            // Show fewer page numbers on mobile
            const isMobile = window.innerWidth <= 480;
            const maxVisiblePages = isMobile ? 3 : 5;
            
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            // Adjust start page if we're near the end
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // Add first page and ellipsis if needed
            if (startPage > 1) {
                const firstPage = createPageButton(1);
                pageNumbers.appendChild(firstPage);
                
                if (startPage > 2) {
                    const ellipsis = document.createElement('span');
                    ellipsis.textContent = '...';
                    ellipsis.className = 'page-ellipsis';
                    ellipsis.style.padding = '0 0.5rem';
                    ellipsis.style.color = 'var(--text-secondary)';
                    pageNumbers.appendChild(ellipsis);
                }
            }
            
            // Add visible page numbers
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = createPageButton(i);
                pageNumbers.appendChild(pageBtn);
            }
            
            // Add ellipsis and last page if needed
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.textContent = '...';
                    ellipsis.className = 'page-ellipsis';
                    ellipsis.style.padding = '0 0.5rem';
                    ellipsis.style.color = 'var(--text-secondary)';
                    pageNumbers.appendChild(ellipsis);
                }
                
                const lastPage = createPageButton(totalPages);
                pageNumbers.appendChild(lastPage);
            }
        }

        // Helper function to create page buttons
        function createPageButton(pageNum) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${pageNum === currentPage ? 'active' : ''}`;
            pageBtn.textContent = pageNum;
            pageBtn.onclick = () => goToPage(pageNum);
            pageBtn.setAttribute('aria-label', `Go to page ${pageNum}`);
            return pageBtn;
        }

        // Enhanced go to page with smooth scrolling
        function goToPage(page) {
            if (page === currentPage) return;
            
            currentPage = page;
            renderPosts();
            renderPagination();
            
            // Smooth scroll to top of blog grid
            const blogGridTop = blogGrid.offsetTop - 100;
            window.scrollTo({
                top: blogGridTop,
                behavior: 'smooth'
            });
        }

        // Filter posts by category
        function filterPosts(category) {
            currentCategory = category;
            currentPage = 1;
            
            if (category === 'all') {
                filteredPosts = [...blogPosts];
            } else {
                filteredPosts = blogPosts.filter(post => post.category === category);
            }
            
            renderPosts();
            renderPagination();
            
            // Update active filter button
            filterBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
        }

        // Setup event listeners
        function setupEventListeners() {
            // Pagination buttons
            prevBtn.onclick = () => {
                if (currentPage > 1) {
                    goToPage(currentPage - 1);
                }
            };

            nextBtn.onclick = () => {
                const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
                if (currentPage < totalPages) {
                    goToPage(currentPage + 1);
                }
            };

            // Filter buttons
            filterBtns.forEach(btn => {
                btn.onclick = () => filterPosts(btn.dataset.category);
            });

            // Theme toggle
            themeToggle.onclick = toggleTheme;

            // Scroll to top button
            scrollTop.onclick = scrollToTop;

            // Show/hide scroll to top button
            window.onscroll = () => {
                if (window.pageYOffset > 300) {
                    scrollTop.classList.add('visible');
                } else {
                    scrollTop.classList.remove('visible');
                }
            };

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' && currentPage > 1) {
                    goToPage(currentPage - 1);
                } else if (e.key === 'ArrowRight') {
                    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
                    if (currentPage < totalPages) {
                        goToPage(currentPage + 1);
                    }
                }
            });
        }

        // Toggle theme
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Utility functions
        function getCategoryName(category) {
            const categoryNames = {
                'web-dev': 'Web Dev',
                'career': 'Career Tips',
                'news': 'News'
            };
            return categoryNames[category] || category;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        function readPost(postId) {
            // Simulate reading a post
            alert(`Opening post ${postId}. In a real application, this would navigate to the full post.`);
        }

        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            loadTheme();
            init();
        });
