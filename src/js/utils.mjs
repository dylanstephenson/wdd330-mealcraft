// Render header/footer with template
export function renderWithTemplate(templateFn, parentElement) {
    if (parentElement) {
      parentElement.innerHTML = templateFn;
    } else {
      console.warn(`Element not found for template insertion.`);
    }
  }

export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.text();
  } catch (error) {
    console.error("Error loading template:", error);
    return "";
  }
}

export async function loadHeaderFooter() {
  // Detect if we're in `src/` (index.html) or a subdirectory (cart/index.html)
  const basePath = window.location.pathname.split("/").length > 2 ? ".." : ".";


  // Grab header/footer elements
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");

  // Grab the template data using the correct basePath
  const headerTemplate = await loadTemplate(`${basePath}/partials/header.html`);
  const footerTemplate = await loadTemplate(`${basePath}/partials/footer.html`);

  // Insert templates into the DOM
  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  header.addEventListener('DOMContentLoaded', updateAuthStatus());
}

// Assuming you're storing the login state in the session (or a similar flag)
function updateAuthStatus() {
  const authStatusDiv = document.getElementById("auth-status");

  // Check if the user is logged in (this could be a session variable or a flag)
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Or use a cookie, localStorage, or session variable

  if (isLoggedIn === 'true') {
    authStatusDiv.innerHTML = `
      <a href="/account/account.html">Account</a> | 
      <a href="#" id="logout-link">Log Out</a>
    `;

    // Now attach the logout event handler
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", function(event) {
        event.preventDefault();
        logout();
      });
    }
  } else {
    authStatusDiv.innerHTML = `<a href="/login/login.html">Log In</a>`;
  }
}

// Logout function (this could be a form submission or a redirect, depending on your setup)
function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  updateAuthStatus();

  // Optionally redirect after logout
  window.location.href = "/login/login.html";
}

