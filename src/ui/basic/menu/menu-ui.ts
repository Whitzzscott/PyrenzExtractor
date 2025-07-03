import { throttle } from 'lodash';
import { pyrenzMenu } from '~/ui';

export function renderMenuUI() {
  const menu = document.createElement('div');
  menu.id = 'pyrenz-menu-ui';
  menu.className = pyrenzMenu();

  menu.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0;">Pyrenz Menu</h3>
      <button id="close-menu" style="background: none; border: none; font-size: 16px; cursor: pointer;">X</button>
    </div>
    <p>Drag this glassy UI ✨</p>
  `;

  document.body.appendChild(menu);

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  menu.addEventListener('mousedown', (e: MouseEvent) => {
    isDragging = true;
    offsetX = e.clientX - menu.offsetLeft;
    offsetY = e.clientY - menu.offsetTop;
    menu.style.cursor = 'grabbing';
  });

  const handleMouseMove = throttle((e: MouseEvent) => {
    if (!isDragging) return;
    menu.style.left = `${e.clientX - offsetX}px`;
    menu.style.top = `${e.clientY - offsetY}px`;
    menu.style.transform = 'none';
  }, 16);

  document.addEventListener('mousemove', (e) => handleMouseMove(e));
  document.addEventListener('mouseup', () => {
    isDragging = false;
    menu.style.cursor = 'grab';
  });

  const closeButton = menu.querySelector('#close-menu');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      menu.remove();
    });
  }
}
