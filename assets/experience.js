/* Works out tenure and total experience from the dates below, so the site updates itself every month.
   To add a new job later, add its start (and end) month here and a matching data-start on the page. */
(function(){
  // UAE HR / site administration roles counted in total experience: [start, end] as 'YYYY-MM'; null = present
  var ROLES = [['2008-07','2010-12'], ['2014-03','2017-10'], ['2017-11', null]];

  function ym(s){ var p = s.split('-'); return { y: +p[0], m: +p[1] }; }
  function now(){ var d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1 }; }
  function months(a, b){ return Math.max(0, (b.y - a.y) * 12 + (b.m - a.m)); }
  function fmt(n){
    var y = Math.floor(n / 12), m = n % 12, out = [];
    if (y) out.push(y + (y === 1 ? ' Year' : ' Years'));
    if (m) out.push(m + (m === 1 ? ' Month' : ' Months'));
    return out.join(' ') || 'Less than a month';
  }

  var total = ROLES.reduce(function(t, r){ return t + months(ym(r[0]), r[1] ? ym(r[1]) : now()); }, 0);
  var years = Math.floor(total / 12);

  document.querySelectorAll('[data-exp]').forEach(function(el){
    var k = el.getAttribute('data-exp');
    el.textContent = k === 'plus' ? years + '+' : k === 'full' ? fmt(total) : String(years);
  });
  document.querySelectorAll('[data-start]').forEach(function(el){
    var end = el.getAttribute('data-end');
    el.textContent = fmt(months(ym(el.getAttribute('data-start')), end ? ym(end) : now()));
  });
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', meta.getAttribute('content').replace(/\b\d+\+? years\b/, years + '+ years'));
})();
