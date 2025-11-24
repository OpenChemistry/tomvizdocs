// Create "On this page" navigation sidebar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var article = document.querySelector('.rst-content section') || document.querySelector('.rst-content');
        if (!article) return;
        
        var headings = article.querySelectorAll('h2, h3');
        var operator_headings = article.querySelectorAll('dl.class dt')

        if (headings.length === 0 && operator_headings.length === 0) return;
        
        // Create sidebar
        var sidebar = document.createElement('div');
        sidebar.className = 'right-sidebar';
        
        var title = document.createElement('h3');
        title.textContent = 'ON THIS PAGE';
        sidebar.appendChild(title);
        
        var nav = document.createElement('ul');
        
        // Add headings to sidebar
        headings.forEach(function(heading) {
            // Create ID if missing
            if (!heading.id) {
                var text = (heading.textContent || '').replace(/[¶§#]/g, '').trim();
                heading.id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            }
            
            // Get clean text
            var clone = heading.cloneNode(true);
            clone.querySelectorAll('.headerlink, a').forEach(function(el) { el.remove(); });
            var text = clone.textContent.trim();
            
            // Create link
            var li = document.createElement('li');
            if (heading.tagName === 'H3') li.style.paddingLeft = '1rem';
            
            var a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = text;
            
            li.appendChild(a);
            nav.appendChild(li);
        });

        operator_headings.forEach(function(heading) {
            // Get clean text
            var text = heading.id;

            // Create link
            var li = document.createElement('li');

            var a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = text;

            li.appendChild(a);
            nav.appendChild(li);
        });
        
        sidebar.appendChild(nav);
        document.body.appendChild(sidebar);
        
        // Highlight current section on scroll
        function highlight() {
            var scrollPos = window.scrollY + 100;
            var current = null;
            [...headings, ...operator_headings].forEach(function(h) { if (h.offsetTop <= scrollPos) current = h; });
            
            sidebar.querySelectorAll('a').forEach(function(a) { a.classList.remove('current'); });
            if (current) {
                var link = sidebar.querySelector('a[href="#' + current.id + '"]');
                if (link) link.classList.add('current');
            }
        }
        
        window.addEventListener('scroll', highlight);
        highlight();
    }, 100);
});
