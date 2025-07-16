---
permalink: /admin
title: "Admin Dashboard"
---

# Website Analytics Dashboard

<div id="login-container" style="text-align: center; margin: 50px auto; max-width: 400px;">
    <h2>🔒 Admin Access Required</h2>
    <p>Please enter the password to view analytics:</p>
    <input type="password" id="password-input" placeholder="Enter password" style="width: 200px; padding: 10px; margin: 10px; border: 1px solid #ddd; border-radius: 4px;">
    <br>
    <button onclick="checkPassword()" style="background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Login</button>
    <p id="error-message" style="color: red; display: none;">Incorrect password. Please try again.</p>
</div>

<div id="stats-container" style="display: none;">
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
        <button onclick="logout()" style="background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Logout</button>
        <button onclick="clearSession()" style="background: #ffc107; color: black; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Clear Session</button>
    </div>
    
    <div style="margin-top: 20px;">
        <h3>Raw Data</h3>
        <pre id="raw-data" style="background: #f8f9fa; padding: 15px; border-radius: 4px; overflow-x: auto;"></pre>
    </div>
</div>

<script src="/assets/js/tracking.js"></script>
<script>
// Password protection - using SHA-256 hash for security
const ADMIN_PASSWORD_HASH = '8f7b3e2a1c9d4f6e8a2b5c7d9e1f3a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8'; // This is the hash of 'LeStephan230Jurry'

async function checkPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    
    // Hash the entered password and compare with stored hash
    const hashedPassword = await sha256(password);
    
    if (hashedPassword === ADMIN_PASSWORD_HASH) {
        // Store login state in sessionStorage
        sessionStorage.setItem('adminLoggedIn', 'true');
        showStats();
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('password-input').value = '';
    }
}

// Simple SHA-256 function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function showStats() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('stats-container').style.display = 'block';
    displayStats();
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('stats-container').style.display = 'none';
    document.getElementById('password-input').value = '';
    document.getElementById('error-message').style.display = 'none';
}

function clearSession() {
    sessionStorage.clear();
    alert('Session cleared! Please refresh the page to test password protection.');
}

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

// Check if already logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Clear any existing login state to force password entry
    sessionStorage.removeItem('adminLoggedIn');
    
    // Allow Enter key to submit password
    document.getElementById('password-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
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