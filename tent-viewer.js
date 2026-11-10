const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    background: #24251c;
    color: #f7efd9;
    font: 1rem system-ui, sans-serif;
  }
  main { max-width: 1200px; margin: auto; padding: 12px; }
  a { color: #ffe2a2; }
  h1 { margin: 8px 0 4px; font-size: clamp(1.3rem, 3vw, 2rem); }
  p { margin: 0 0 12px; }
  .scene { position: relative; }
  .scene img { display: block; width: 100%; height: auto; }
  .marker {
    position: absolute;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    width: clamp(26px, 3.5vw, 36px);
    aspect-ratio: 1;
    box-sizing: border-box;
    border: 2px solid #fff4d6;
    border-radius: 50%;
    background: #24251c;
    color: #fff4d6;
    font: bold 0.9rem system-ui, sans-serif;
    text-decoration: none;
    cursor: pointer;
  }
  .marker:hover, .marker:focus-visible {
    background: #fff4d6;
    color: #24251c;
    outline: 2px solid #24251c;
  }
  ol { padding-left: 28px; }
  li { margin-bottom: 6px; }
  #selection { min-height: 1.5em; margin: 8px 0; }
`;
document.head.append(style);

const scene = document.querySelector('.scene');
const chapters = document.getElementById('chapters');
const selection = document.getElementById('selection');

exhibits.forEach(([object, chapter, x, y, url], index) => {
  const number = index + 1;
  const hasLink = /^https?:\/\//i.test(url);
  const marker = document.createElement(hasLink ? 'a' : 'button');

  marker.className = 'marker';
  marker.textContent = number;
  marker.style.left = `${x}%`;
  marker.style.top = `${y}%`;
  marker.title = `${object} — ${chapter}`;
  marker.setAttribute('aria-label', marker.title);

  const item = document.createElement('li');

  if (hasLink) {
    marker.href = url;
    marker.target = '_blank';
    marker.rel = 'noopener';

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = chapter;
    item.append(link);
  } else {
    marker.type = 'button';
    marker.addEventListener('click', () => {
      selection.textContent = `${number}. ${chapter} — chapter link coming soon.`;
    });
    item.textContent = chapter;
  }

  scene.append(marker);
  chapters.append(item);
});
