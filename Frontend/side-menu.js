document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;

    // Toggle sidebar collapse/expand via button
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from immediately re-closing it
        sidebar.classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');
    });

    // Handle active class switching when clicking any menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // e.preventDefault() has been removed so the pages can connect!
            
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Automatically hide/collapse the sidebar when a menu item is clicked
            sidebar.classList.add('collapsed');
            body.classList.add('sidebar-collapsed');
        });
    });

    // Collapse sidebar when clicking anywhere else on the page outside the sidebar/toggle button
    document.addEventListener('click', (e) => {
        const isClickInsideSidebar = sidebar.contains(e.target);
        const isClickOnToggle = toggleBtn.contains(e.target);

        // If the sidebar is currently open and the click is outside, collapse it
        if (!body.classList.contains('sidebar-collapsed') && !isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.add('collapsed');
            body.classList.add('sidebar-collapsed');
        }
    });
});