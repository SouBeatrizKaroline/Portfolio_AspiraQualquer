(() => {
  const config = window.AQ_ADS;
  const region = document.querySelector('#portfolio-ad');
  if (!region || !config?.enabled || !config.privacyReviewed || !/^ca-pub-\d{16}$/.test(config.publisherId) || !/^\d+$/.test(config.slotId)) return;
  let requested = false;
  function requestAd() {
    if (requested || window.AQ_ADS_CAN_REQUEST !== true) return;
    requested = true;
    const unit = document.createElement('ins');
    unit.className = 'adsbygoogle';
    unit.style.display = 'block';
    unit.setAttribute('data-ad-client', config.publisherId);
    unit.setAttribute('data-ad-slot', config.slotId);
    unit.setAttribute('data-ad-format', 'horizontal');
    unit.setAttribute('data-full-width-responsive', 'true');
    document.querySelector('#portfolio-ad-unit').append(unit);
    region.hidden = false;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(config.publisherId);
    script.onload = () => { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { region.hidden = true; } };
    script.onerror = () => { region.hidden = true; };
    document.head.append(script);
  }
  // O adaptador da plataforma de consentimento libera a solicitação quando permitido.
  // Este evento é uma integração técnica, não um substituto para uma CMP certificada.
  window.addEventListener('aq:ads-consent', event => {
    window.AQ_ADS_CAN_REQUEST = event.detail?.canRequestAds === true;
    if (window.AQ_ADS_CAN_REQUEST) requestAd();
    else { region.hidden = true; if (requested) window.location.reload(); }
  });
  requestAd();
})();
