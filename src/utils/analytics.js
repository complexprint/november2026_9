// analytics.js — цели Яндекс.Метрики с очередью до загрузки счётчика

const YM_ID = 105245584;

// Очередь вызовов до загрузки счётчика
const queue = [];

const flushQueue = () => {
  while (queue.length > 0 && typeof window.ym === 'function') {
    const args = queue.shift();
    try {
      window.ym(...args);
    } catch (e) {
      queue.unshift(args);
      break;
    }
  }
};

// Проверяем каждые 200 мс, появился ли счётчик
const intervalId = setInterval(() => {
  if (typeof window.ym === 'function') {
    flushQueue();
    if (queue.length === 0) clearInterval(intervalId);
  }
}, 200);

// Гарантия: при уходе со страницы всё равно попытаться отправить
window.addEventListener('pagehide', flushQueue, { once: true });

export const trackGoal = (goalName, params = {}) => {
  const args = [YM_ID, 'reachGoal', goalName, params];
  try {
    if (typeof window.ym === 'function') {
      window.ym(...args);
      return;
    }
  } catch (e) { /* noop */ }
  queue.push(args);
};

// Для отладки: сколько целей висит в очереди
export const getPendingGoals = () => queue.length;
