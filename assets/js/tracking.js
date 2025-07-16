// Simple tracking system for reed-nicolas.github.io
(function() {
    'use strict';
    
    // Initialize tracking data
    function initTracking() {
        if (!localStorage.getItem('siteStats')) {
            localStorage.setItem('siteStats', JSON.stringify({
                websiteVisits: 0,
                resumeDownloads: 0,
                lastVisit: null,
                firstVisit: new Date().toISOString()
            }));
        }
    }
    
    // Track website visit
    function trackWebsiteVisit() {
        const stats = JSON.parse(localStorage.getItem('siteStats'));
        stats.websiteVisits++;
        stats.lastVisit = new Date().toISOString();
        localStorage.setItem('siteStats', JSON.stringify(stats));
        
        // Send to console for debugging
        console.log('Website visit tracked:', stats.websiteVisits);
    }
    
    // Track resume download/view
    function trackResumeAccess() {
        const stats = JSON.parse(localStorage.getItem('siteStats'));
        stats.resumeDownloads++;
        localStorage.setItem('siteStats', JSON.stringify(stats));
        
        // Send to console for debugging
        console.log('Resume access tracked:', stats.resumeDownloads);
    }
    
    // Initialize tracking
    initTracking();
    
    // Track current page visit
    trackWebsiteVisit();
    
    // Track resume clicks
    document.addEventListener('DOMContentLoaded', function() {
        const resumeLinks = document.querySelectorAll('a[href*="resume.pdf"], a[href*="/resume"]');
        resumeLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                trackResumeAccess();
            });
        });
    });
    
    // Make functions globally available for admin page
    window.trackingSystem = {
        getStats: function() {
            return JSON.parse(localStorage.getItem('siteStats'));
        },
        resetStats: function() {
            localStorage.removeItem('siteStats');
            initTracking();
        },
        trackResumeAccess: trackResumeAccess
    };
})(); 