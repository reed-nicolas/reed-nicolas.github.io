---
permalink: /admin
title: "Admin Dashboard"
---

# Website Analytics Dashboard

<div id="stats-container">
    <h2>Tracking Statistics</h2>
    <div id="stats-display">
        <p><strong>Website Visits:</strong> <span id="website-visits">Loading...</span></p>
        <p><strong>Resume Downloads/Views:</strong> <span id="resume-downloads">Loading...</span></p>
        <p><strong>First Visit:</strong> <span id="first-visit">Loading...</span></p>
        <p><strong>Last Visit:</strong> <span id="last-visit">Loading...</span></p>
    </div>
    
    <div style="margin-top: 20px;">
        <button onclick="refreshStats()" style="background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Refresh Stats</button>
        <button onclick="resetStats()" style="background: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Reset Stats</button>
    </div>
    
    <div style="margin-top: 20px;">
        <h3>Raw Data</h3>
        <pre id="raw-data" style="background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto;"></pre>
    </div>
</div>

<script src="/assets/js/tracking.js"></script>
<script>
function displayStats() {
    if (typeof window.trackingSystem !== 'undefined') {
        const stats = window.trackingSystem.getStats();
        
        document.getElementById('website-visits').textContent = stats.websiteVisits;
        document.getElementById('resume-downloads').textContent = stats.resumeDownloads;
        document.getElementById('first-visit').textContent = new Date(stats.firstVisit).toLocaleString();
        document.getElementById('last-visit').textContent = stats.lastVisit ? new Date(stats.lastVisit).toLocaleString() : 'Never';
        
        document.getElementById('raw-data').textContent = JSON.stringify(stats, null, 2);
    } else {
        document.getElementById('stats-display').innerHTML = '<p style="color: red;">Tracking system not loaded. Please refresh the page.</p>';
    }
}

function refreshStats() {
    displayStats();
}

function resetStats() {
    if (confirm('Are you sure you want to reset all tracking statistics?')) {
        window.trackingSystem.resetStats();
        displayStats();
    }
}

// Load stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayStats();
});
</script>

<style>
#stats-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

#stats-display p {
    font-size: 16px;
    margin: 10px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
}

button:hover {
    opacity: 0.8;
}

pre {
    font-size: 12px;
    line-height: 1.4;
}
</style> 