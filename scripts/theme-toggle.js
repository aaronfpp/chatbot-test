(function(){
  const storageKey = 'site-theme';
  function applyTheme(theme, btn){
    const body = document.body;
    if(theme === 'dark'){
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      if(btn) btn.textContent = 'Switch to light mode';
      if(btn) btn.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      if(btn) btn.textContent = 'Switch to dark mode';
      if(btn) btn.setAttribute('aria-pressed', 'false');
    }
  }

  function toggle(btn){
    const current = localStorage.getItem(storageKey) || (document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(storageKey, next);
    applyTheme(next, btn);
  }

  document.addEventListener('DOMContentLoaded', function(){
    const btn = document.getElementById('theme-toggle');
    if(!btn) return; // button missing — nothing to do

    const saved = localStorage.getItem(storageKey) || 'light';
    applyTheme(saved, btn);

    btn.addEventListener('click', function(){ toggle(btn); });
  });
})();
