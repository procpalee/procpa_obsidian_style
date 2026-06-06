// Inline script that runs before hydration to prevent flash of wrong theme.
// Reads localStorage('theme') and applies `dark` class to <html> if needed.
export const themeScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('theme');var d=t==='dark';if(d)r.classList.add('dark');else r.classList.remove('dark');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`
