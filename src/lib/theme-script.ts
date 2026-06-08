// Inline script that runs before hydration to prevent flash of wrong theme.
// Dark is the default; light only applies when the user explicitly chose it.
export const themeScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('theme');var d=t!=='light';if(d)r.classList.add('dark');else r.classList.remove('dark');r.style.colorScheme=d?'dark':'light';}catch(e){}})();`
