const app = document.querySelector('#app');

const asset = (path) => encodeURI(`/${path}`);
const navItems = ['Platform', 'Solutions', 'Resources', 'Open Source', 'Enterprise'];
const navMenuLinks = {
  'Platform': [['Explore', '/explore'], ['Actions', '/actions'], ['Security', '/security']],
  'Solutions': [['Pricing', '/pricing'], ['Marketplace', '/marketplace']],
  'Resources': [['Explore', '/explore'], ['Wiki', '/wiki']],
  'Open Source': [['Explore', '/explore']],
  'Enterprise': [['Pricing', '/pricing']],
};

const icons = {
  chevron: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  navChevron: `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.5916 6.84122C15.5141 6.76312 15.4219 6.70112 15.3204 6.65882C15.2188 6.61651 15.1099 6.59473 14.9999 6.59473C14.8899 6.59473 14.781 6.61651 14.6794 6.65882C14.5779 6.70112 14.4857 6.76312 14.4082 6.84122L10.5916 10.6579C10.5141 10.736 10.4219 10.798 10.3204 10.8403C10.2188 10.8826 10.1099 10.9044 9.99989 10.9044C9.88988 10.9044 9.78096 10.8826 9.67941 10.8403C9.57786 10.798 9.48569 10.736 9.40822 10.6579L5.59155 6.84122C5.51408 6.76312 5.42192 6.70112 5.32037 6.65882C5.21882 6.61651 5.1099 6.59473 4.99989 6.59473C4.88988 6.59473 4.78096 6.61651 4.67941 6.65882C4.57786 6.70112 4.48569 6.76312 4.40822 6.84122C4.25301 6.99736 4.16589 7.20857 4.16589 7.42872C4.16589 7.64888 4.25301 7.86009 4.40822 8.01622L8.23322 11.8412C8.70197 12.3094 9.33739 12.5723 9.99989 12.5723C10.6624 12.5723 11.2978 12.3094 11.7666 11.8412L15.5916 8.01622C15.7468 7.86009 15.8339 7.64888 15.8339 7.42872C15.8339 7.20857 15.7468 6.99736 15.5916 6.84122Z" fill="white"/></svg>`,
  search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="white" stroke-width="1.5"/><path d="M20 20L16.5 16.5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  book: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.2C5.5 4.4 7 4 8.8 4c1.4 0 2.6.4 3.2 1.2v14.2c-.8-.8-2-1.2-3.5-1.2-1.7 0-3 .4-4.5 1.2V5.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M20 5.2c-1.5-.8-3-1.2-4.8-1.2-1.4 0-2.6.4-3.2 1.2v14.2c.8-.8 2-1.2 3.5-1.2 1.7 0 3 .4 4.5 1.2V5.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  bookOpen: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6C12 6 11 4 7.5 4C4 4 3 6 3 6V19C3 19 4 17 7.5 17C11 17 12 19 12 19Z" fill="currentColor"/><path d="M5 4.15C5 4.06716 5.06716 4 5.15 4H7.85C7.93284 4 8 4.06716 8 4.15V8.39645C8 8.61917 7.73071 8.73071 7.57322 8.57322L6.67678 7.67678C6.57915 7.57915 6.42085 7.57915 6.32322 7.67678L5.42678 8.57322C5.26929 8.73071 5 8.61917 5 8.39645V4.15Z" fill="#101010"/><path d="M13 19V6C13 6 13.8889 4 17 4C20.1111 4 21 6 21 6V19C21 19 20.1111 17 17 17C13.8889 17 13 19 13 19Z" fill="currentColor"/></svg>`,
  file: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h8l4 4v13H6v-17Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3.5v4h4M9 12h6M9 15.5h4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  box: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.7v8.6L12 21l-8-4.7V7.7L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m4.3 7.8 7.7 4.4 7.7-4.4M12 12.2V21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  users: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 19c.4-3.1 2.2-4.7 5.5-4.7s5.1 1.6 5.5 4.7M16 5.5a2.7 2.7 0 0 1 0 5.2M16 14.7c2.7.2 4.2 1.7 4.5 4.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="5.5" width="17.6" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m4.2 7 7.8 6 7.8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10.3c0 4.5-7 10.2-7 10.2S5 14.8 5 10.3a7 7 0 1 1 14 0Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`,
  link: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.6 14.4 4.8-4.8M8 17l-1.6 1.6a3.4 3.4 0 0 1-4.8-4.8l3.2-3.2a3.4 3.4 0 0 1 4.8 0M16 7l1.6-1.6a3.4 3.4 0 0 1 4.8 4.8l-3.2 3.2a3.4 3.4 0 0 1-4.8 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  branch: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="19" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 7v8a4 4 0 0 0 4 4h6M18 7v2a4 4 0 0 1-4 4H8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  people: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="3" fill="currentColor"/><path d="M5 20c.6-4 2.8-6 7-6s6.4 2 7 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="4" cy="16" r="2" fill="currentColor"/><circle cx="20" cy="16" r="2" fill="currentColor"/></svg>`,
  send: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 8-16 8 3-8-3-8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M7 12h13" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`,
  railPlus: `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1 7 13M13 7 1 7" fill="none" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/></svg>`,
  railBranch: `<svg viewBox="0 0 20 24" aria-hidden="true"><path d="M12.75 20.25C12.75 18.5931 14.0931 17.25 15.75 17.25C17.4069 17.25 18.75 18.5931 18.75 20.25C18.75 21.9069 17.4069 23.25 15.75 23.25C14.0931 23.25 12.75 21.9069 12.75 20.25ZM12.75 20.25H9.75C6.92157 20.25 5.50736 20.25 4.62868 19.3713C3.75 18.4926 3.75 17.0784 3.75 14.25L3.75 6.75M3.75 6.75C5.40685 6.75 6.75 5.40685 6.75 3.75C6.75 2.09315 5.40685 0.75 3.75 0.75C2.09315 0.75 0.75 2.09315 0.75 3.75C0.75 5.40685 2.09315 6.75 3.75 6.75Z" fill="none" stroke="white" stroke-width="1.5"/></svg>`,
  railPeople: `<svg viewBox="0 0 20 17" aria-hidden="true"><path d="M14.4527 4.5C14.4527 6.98528 12.438 9 9.95271 9C7.46743 9 5.45271 6.98528 5.45271 4.5C5.45271 2.01472 7.46743 0 9.95271 0C12.438 0 14.4527 2.01472 14.4527 4.5Z" fill="white"/><path d="M18.9527 4.5C18.9527 6.36396 17.4417 7.875 15.5777 7.875C13.7137 7.875 12.2027 6.36396 12.2027 4.5C12.2027 2.63604 13.7137 1.125 15.5777 1.125C17.4417 1.125 18.9527 2.63604 18.9527 4.5Z" fill="white"/><path d="M7.70271 4.5C7.70271 6.36396 6.19167 7.875 4.32771 7.875C2.46375 7.875 0.952708 6.36396 0.952708 4.5C0.952708 2.63604 2.46375 1.125 4.32771 1.125C6.19167 1.125 7.70271 2.63604 7.70271 4.5Z" fill="white"/><path d="M15.5778 9C18.4066 9.00005 19.4938 11.9031 19.8815 13.5381C20.0181 14.1137 19.564 14.625 18.9724 14.625H16.2165C15.763 12.9267 14.8861 11.0009 13.1901 9.90039C13.8001 9.36145 14.5805 9 15.5778 9Z" fill="white"/><path d="M4.32817 9C5.32515 9.00011 6.10504 9.36165 6.71489 9.90039C5.01921 11.0009 4.14294 12.9268 3.6895 14.625H0.932662C0.34105 14.625 -0.112066 14.1137 0.0244592 13.5381C0.412273 11.9031 1.49946 9 4.32817 9Z" fill="white"/><path d="M9.95271 10.125C14.2167 10.125 15.2484 14.0038 15.498 15.8808C15.5708 16.4283 15.13 16.875 14.5777 16.875H5.32771C4.77542 16.875 4.33457 16.4283 4.40738 15.8808C4.65699 14.0038 5.68867 10.125 9.95271 10.125Z" fill="white"/></svg>`,
  railMail: `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M19.25 5.4726 10.676 13.0726C10.4928 13.2359 10.2559 13.3262 10.0105 13.3262 9.76506 13.3262 9.5282 13.2359 9.345 13.0726L.703 5.5126C.767 5.4576.834 5.4076.906 5.3606L8.359.488602C8.84692.169783 9.41715 0 10 0 10.5828 0 11.1531.169783 11.641.488602L19.094 5.3606C19.148 5.3956 19.2 5.4326 19.25 5.4726ZM20 7.6426V17.9526C20 18.483 19.7893 18.9917 19.4142 19.3668 19.0391 19.7419 18.5304 19.9526 18 19.9526H2C1.46957 19.9526.960859 19.7419.585786 19.3668.210714 18.9917 0 18.483 0 17.9526V7.6506L8.014 14.5666C8.56352 15.0563 9.27392 15.327 10.01 15.327 10.7461 15.327 11.4565 15.0563 12.006 14.5666L20 7.6426Z" fill="white"/></svg>`,
  close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  microsoft: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#F25022" d="M1 1h10.5v10.5H1z"/><path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z"/><path fill="#00A4EF" d="M1 12.5h10.5V23H1z"/><path fill="#FFB900" d="M12.5 12.5H23V23H12.5z"/></svg>`,
  google: `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 13.045 4 4 13.045 4 24s9.045 20 20 20 20-9.045 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 4.712l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>`,
  apple: `<svg viewBox="0 0 384 512" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l1.7 4.6L18 10l-4.3 1.4L12 16l-1.7-4.6L6 10l4.3-1.4L12 4Z" fill="currentColor"/><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" fill="currentColor"/><path d="M5 16l.7 1.8 1.8.7-1.8.7L5 21l-.7-1.8-1.8-.7 1.8-.7L5 16Z" fill="currentColor"/></svg>`,
  starFill: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.4 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3.4Z" fill="currentColor"/></svg>`,
  fork: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5.5" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="6" cy="18.5" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 7.5v9M18 10c0 4.5-7 3.5-10 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  shieldCheck: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m9.3 12 1.9 1.9 3.6-3.9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shieldAlert: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 8.5v4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="15.6" r="1.1" fill="currentColor"/></svg>`,
  keyRound: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8.5" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m12.5 9.5 7-7M15 6l2.5 2.5M18 3l2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l3 8 4-16 3 8h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M7 5H4.5A2.5 2.5 0 0 0 7 10M17 5h2.5A2.5 2.5 0 0 1 17 10M12 14v3M8.5 21h7M9.5 17.5h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s5.5 4.2 5.5 9.5a5.5 5.5 0 0 1-11 0c0-2.1 1-3.7 1-3.7S8.6 10.3 9.8 10C10 7 12 3 12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c0-5 3-9.5 8.5-11.5 1.8 1.8 2.7 2.7 2.7 2.7C14.5 15.7 10 19 5 19Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="13" cy="11" r="1.4" fill="currentColor"/><path d="M5 19 3 21M5 19l2.5-4.5M5 19l4.5-2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor"/></svg>`,
  workflow: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="19" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 6h10M5 8v2.5A4.5 4.5 0 0 0 9.5 15M19 8v2.5a4.5 4.5 0 0 1-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m8 12.5 2.7 2.7L16 9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  xCircle: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m9.5 9.5 5 5M14.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5.5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  gitPullRequest: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 8.2v7.6a3 3 0 0 0 3 3h6.8M15 15l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  issueOpened: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`,
  gitMerge: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="6" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 8.2v7.6M8.2 12H15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  person: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c.8-3.8 3.5-5.5 7-5.5s6.2 1.7 7 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M5 15V6a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  check: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" fill="currentColor"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const icon = (name, className = '') => `<span class="icon ${className}">${icons[name] || ''}</span>`;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function formatCompact(n) {
  const value = Number(n) || 0;
  if (value < 1000) return String(value);
  const short = (value / 1000).toFixed(1).replace(/\.0$/, '');
  return `${short}k`;
}

function levelFor(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function monthLabel(date) {
  return date.toLocaleString('en', { month: 'short' });
}

function ordinal(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  const last = day % 10;
  if (last === 1) return `${day}st`;
  if (last === 2) return `${day}nd`;
  if (last === 3) return `${day}rd`;
  return `${day}th`;
}

function tipFor(count, dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  const stamp = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  if (count <= 0) return `No contributions on ${stamp}.`;
  return `${count} contribution${count === 1 ? '' : 's'} on ${stamp}.`;
}

const api = {
  tokenKey: 'github-token',
  get token() { try { return localStorage.getItem(this.tokenKey) || ''; } catch { return ''; } },
  set token(v) { try { v ? localStorage.setItem(this.tokenKey, v) : localStorage.removeItem(this.tokenKey); } catch {} },
  async request(path, { method = 'GET', body = undefined, auth = false } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && this.token) headers.Authorization = `Bearer ${this.token}`;
    const key = `${method}:${path}:${loadSeq += 1}`;
    pendingLoads.set(key, loadLabel(method, path));
    paintLoader();
    try {
      const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      return data;
    } finally {
      pendingLoads.delete(key);
      paintLoader();
    }
  },
};

const pendingLoads = new Map();
let loadSeq = 0;
/** @type {any} */
let loadTimer = 0;
let loadIndex = 0;
const PROFILE_CACHE_KEY = 'github-profile-cache-v1';
const PROFILE_CACHE_TTL = 5 * 60 * 1000;
const profileCache = new Map();
const contributionCache = new Map();
let workspaceWired = false;
let toastTimer = 0;
let workspaceIdentity = null;
let workspaceIdentityPromise = null;

function readStoredProfiles() {
  try {
    const value = JSON.parse(sessionStorage.getItem(PROFILE_CACHE_KEY) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function writeStoredProfile(username, profile) {
  try {
    const profiles = readStoredProfiles();
    profiles[username] = { savedAt: Date.now(), profile };
    sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profiles));
  } catch {}
}

function cachedProfile(username) {
  const key = String(username || '').trim();
  if (!key) return null;
  const inMemory = profileCache.get(key);
  const stored = inMemory || readStoredProfiles()[key];
  if (!stored || Date.now() - Number(stored.savedAt) > PROFILE_CACHE_TTL || !stored.profile) return null;
  profileCache.set(key, stored);
  return stored.profile;
}

function cacheProfile(username, profile) {
  const key = String(username || '').trim();
  if (!key || !profile) return profile;
  const entry = { savedAt: Date.now(), profile };
  profileCache.set(key, entry);
  writeStoredProfile(key, profile);
  return profile;
}

function invalidateProfileCache() {
  profileCache.clear();
  contributionCache.clear();
  try {
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
  } catch {}
}

async function getProfile(username) {
  const cached = cachedProfile(username);
  if (cached) return cached;
  const profile = await api.request(`/api/users/${encodeURIComponent(username)}`);
  return cacheProfile(username, profile);
}

async function getContributions(username, year) {
  const key = `${username}:${year || 'last-year'}`;
  const cached = contributionCache.get(key);
  if (cached && Date.now() - cached.savedAt <= PROFILE_CACHE_TTL) return cached.result;
  const query = year ? `?year=${encodeURIComponent(year)}` : '';
  const result = await api.request(`/api/users/${encodeURIComponent(username)}/contributions${query}`);
  contributionCache.set(key, { savedAt: Date.now(), result });
  return result;
}

function loadLabel(method, path) {
  const target = String(path || '');
  if (target.startsWith('/api/auth/signup')) return 'creating account';
  if (target.startsWith('/api/auth/')) return 'signing in';
  if (target.includes('/contributions')) return 'loading contributions';
  if (target.endsWith('/follow')) return 'updating follow';
  if (target.startsWith('/api/users/')) return 'loading profile';
  if (target === '/api/me') return 'loading session';
  if (target.startsWith('/api/search')) return 'searching';
  return 'loading';
}

function paintLoader() {
  let bar = document.querySelector('.global-loader');
  const labels = [...new Set(pendingLoads.values())];
  if (!labels.length) {
    if (bar) bar.hidden = true;
    if (loadTimer) { clearInterval(loadTimer); loadTimer = 0; }
    return;
  }
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'global-loader';
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');
    bar.hidden = true;
    bar.innerHTML = `<span class="load-spinner" aria-hidden="true"></span><span class="load-words"><span class="load-track"></span></span>`;
    document.body.prepend(bar);
  }
  const track = bar.querySelector('.load-track');
  const signature = labels.join('|');
  if (track.dataset.signature !== signature) {
    track.dataset.signature = signature;
    track.innerHTML = labels.map((label) => `<span class="load-word">${label}</span>`).join('');
    track.style.transform = 'translateY(0)';
    loadIndex = 0;
  }
  bar.hidden = false;
  if (loadTimer) { clearInterval(loadTimer); loadTimer = 0; }
  if (labels.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loadTimer = setInterval(() => {
      const words = bar.querySelectorAll('.load-word');
      if (!words.length) return;
      loadIndex = (loadIndex + 1) % words.length;
      track.style.transform = `translateY(${-loadIndex * 1.5}em)`;
    }, 1400);
  }
}

function brandMark(size = 'default') {
  return `<a href="/" class="brand-mark brand-mark--${size}" aria-label="GitHub home"><img class="brand-mark__image" src="${asset('logo.png')}" alt="" /></a>`;
}

function legacyHomePage() {
  return `
    <main class="landing-page page-frame">
      <div class="landing-flow landing-flow--green" aria-hidden="true"></div>
      <a class="skip-link" href="#main-content">Skip to content</a>
      <header class="landing-header" id="site-header">
        <div class="landing-brand">${brandMark('header')}<span class="sr-only">GitHub</span></div>
        <nav class="desktop-nav" aria-label="Main navigation">
          ${navItems.map((item, index) => {
            const menuId = `nav-menu-${index + 1}`;
            const links = (navMenuLinks[item] || []).map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
            return `<div class="nav-dropdown"><button class="nav-link" type="button" data-dropdown aria-haspopup="true" aria-expanded="false" aria-controls="${menuId}">${item}${icon('navChevron')}</button><div class="nav-menu" id="${menuId}" hidden>${links}</div></div>`;
          }).join('')}
          <a class="nav-link nav-link--plain" href="/pricing">Pricing</a>
        </nav>
        <div class="landing-actions">
          <form class="site-search" role="search" aria-label="Search or jump to" data-search-form>${icon('search')}<label class="sr-only" for="site-search-input">Search or jump to...</label><input id="site-search-input" name="q" type="search" autocomplete="off" placeholder="Search or jump to..." data-search aria-keyshortcuts="Control+K Meta+K" /><span class="kbd-stack" aria-hidden="true"><kbd>Ctrl K</kbd></span></form>
          <a class="outline-button header-signin" href="/login">Sign in</a>
           <a class="outline-button header-signup" href="/signup">Sign up</a>
          <button class="mobile-menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav-panel" data-mobile-nav-toggle>${icon('menu')}</button>
        </div>
      </header>
      <div class="mobile-nav-panel" id="mobile-nav-panel" aria-hidden="true" data-mobile-panel hidden>
        <div class="mobile-nav-panel__head"><span>Menu</span><button type="button" aria-label="Close menu" data-mobile-nav-close>${icon('close')}</button></div>
        ${[...navItems, 'Pricing'].map((item) => {
          if (item === 'Pricing') return `<a href="/pricing">Pricing</a>`;
          return `<a href="${(navMenuLinks[item] || [['Explore', '/explore']])[0][1]}">${item}</a>`;
        }).join('')}
        <a href="/login" class="mobile-nav-panel__signin">Sign in</a>
        <a href="/signup" class="mobile-nav-panel__signup">Sign up</a>
      </div>
      <button class="mobile-nav-backdrop" type="button" aria-label="Close menu" data-mobile-nav-close hidden></button>
      <section class="landing-hero" id="main-content" tabindex="-1">
        <div class="hero-copy">
          <h1>Build and ship software on a<br class="desktop-break" /> single, collaborative platform</h1>
          <p class="hero-subtitle">Join the world’s most widely adopted developer platform. Plan, code, review, automate, and secure every release in one place.</p>
          <form class="hero-signup" data-hero-signup novalidate>
            <label class="sr-only" for="hero-email">Enter your email</label>
            <input id="hero-email" name="email" type="email" required placeholder="Enter your email" autocomplete="email" />
            <button class="primary-button" type="submit">Sign up for GitHub</button>
            <span class="hero-signup-hint" data-hero-hint hidden>Enter an email address to continue.</span>
          </form>
          <p class="hero-trust">Free for individuals. Upgrade when your team is ready.</p>
          <p class="account-prompt"><a href="#code-editor">Explore Copilot</a> · Already have an account? <a href="/login">Sign in</a></p>
        </div>
        <div class="code-window" id="code-editor" role="img" aria-label="Preview of a pull request workflow that builds and tests every change">
          <div class="code-window__bar"><div class="traffic-lights" aria-hidden="true"><span class="traffic-light traffic-light--red"></span><span class="traffic-light traffic-light--yellow"></span><span class="traffic-light traffic-light--green"></span></div><span class="window-title">ci.yml</span><button type="button" class="copy-btn" data-copy-ci>${icon('copy')}<span>Copy</span></button></div>
          <div class="code-window__body">
            <aside class="editor-rail" aria-hidden="true"><span class="editor-rail__item editor-rail__item--active">${icon('file')}</span><span class="editor-rail__item">${icon('search')}</span><span class="editor-rail__item">${icon('branch')}</span></aside>
            <div class="editor-main">
              <div class="editor-tab" aria-hidden="true"><span class="ts-badge">YAML</span><span>ci.yml</span></div>
              <pre class="code-lines"><code><span class="line"><i>1</i><b class="purple">name</b>: <strong>CI</strong></span><span class="line"><i>2</i></span><span class="line"><i>3</i><b class="purple">on</b>:</span><span class="line"><i>4</i>  pull_request:</span><span class="line"><i>5</i>    branches: [<strong>main</strong>]</span><span class="line"><i>6</i></span><span class="line"><i>7</i><b class="purple">jobs</b>:</span><span class="line"><i>8</i>  build:</span><span class="line"><i>9</i>    runs-on: <em>ubuntu-latest</em></span><span class="line"><i>10</i>    steps:</span><span class="line"><i>11</i>      - <b class="purple">uses</b>: <strong>actions/checkout@v4</strong></span><span class="line"><i>12</i>      - <b class="purple">run</b>: <em>npm test</em></span></code></pre>
              <div class="editor-status" aria-hidden="true"><span>main*</span><span>Ln 12, Col 18</span><span>UTF-8</span><span>YAML</span></div>
            </div>
          </div>
        </div>
      </section>
      <section class="proof" aria-label="Why teams choose GitHub">
        <h2>Loved by teams of every size</h2>
        <p class="proof-caption">Powering teams at</p>
        <ul class="proof-logos" aria-label="Companies building on GitHub">
          <li>American Airlines</li><li>Duolingo</li><li>Ford</li><li>Shopify</li><li>Spotify</li><li>Mercedes Benz</li>
        </ul>
        <div class="proof-features">
          <article><span class="proof-feature__icon">${icon('issueOpened')}</span><h3>Plan and track</h3><p>Turn ideas into issues, milestones, and releases your whole team can follow.</p><a href="/explore">Explore projects</a></article>
          <article><span class="proof-feature__icon">${icon('workflow')}</span><h3>Automate delivery</h3><p>Build, test, and ship with workflows that run on every pull request.</p><a href="/actions">See Actions</a></article>
          <article><span class="proof-feature__icon">${icon('shieldCheck')}</span><h3>Secure every change</h3><p>Monitor dependencies and review posture across every repository.</p><a href="/security">See Security</a></article>
        </div>
      </section>
      <footer class="landing-footer">
        <nav aria-label="Footer">
          <div><h2>Platform</h2><a href="/explore">Explore</a><a href="/actions">Actions</a><a href="/security">Security</a></div>
          <div><h2>Resources</h2><a href="/wiki">Docs</a><a href="/marketplace">Marketplace</a><a href="/pricing">Pricing</a></div>
          <div><h2>Company</h2><a href="/explore">About</a><a href="/login">Sign in</a><a href="/signup">Sign up</a></div>
        </nav>
        <p class="landing-footer__note">Demo clone for review. Built for evaluation only.</p>
      </footer>
      <div class="toast" role="status" data-toast-region></div>
    </main>
  `;
}

const workspaceIcon = (name, className = '') => `<img class="workspace-icon ${className}" src="${asset(`ui4/${name}.svg`)}" alt="" />`;
const marketplaceIcon = (name, className = '') => `<img class="workspace-icon ${className}" src="${asset(`mkt/${name}`)}" alt="" />`;

const GLOBAL_TOP_NAV = [
  ['Pull requests', '/pull-requests'],
  ['Issues', '/issues'],
  ['Code', '/code'],
  ['Marketplace', '/marketplace'],
  ['Explore', '/explore'],
  ['Pricing', '/pricing'],
];

const workspaceSidebarItems = [
  ['Home', '/', 'home'],
  ['Actions', '/actions', 'actions'],
  ['Wiki', '/wiki', 'wiki'],
  ['Security', '/security', 'security'],
  ['Insights', '/insights', 'insights'],
];

function workspaceHeader() {
  const currentPath = window.location.pathname.toLowerCase();
  const topNavLink = (href, label) => {
    const active = currentPath === href || (href === '/pull-requests' && currentPath === '/pulls');
    return `<a class="workspace-top-nav__link${active ? ' workspace-top-nav__link--active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  };
  return `
    <header class="workspace-header" id="site-header">
      <div class="workspace-header__left">
        <button class="workspace-menu-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="workspace-sidebar" data-workspace-menu>${icon('menu')}</button>
        <div class="workspace-brand">${brandMark('workspace')}<span class="sr-only">GitHub</span></div>
        <form class="workspace-search" role="search" aria-label="Search or jump to" data-search-form>
          ${workspaceIcon('search')}
          <label class="sr-only" for="workspace-search-input">Search or jump to...</label>
          <input id="workspace-search-input" name="q" type="search" autocomplete="off" placeholder="Search or jump to..." data-search aria-keyshortcuts="Control+K Meta+K" />
          <span class="kbd-stack" aria-hidden="true"><kbd>Ctrl K</kbd></span>
        </form>
        <nav class="workspace-top-nav" aria-label="Primary">
          ${GLOBAL_TOP_NAV.map(([label, href]) => topNavLink(href, label)).join('')}
        </nav>
        <div class="workspace-top-nav--overflow">
          <button type="button" aria-expanded="false" aria-haspopup="true" aria-controls="workspace-more-menu" data-workspace-more>More</button>
          <ul id="workspace-more-menu" hidden>${GLOBAL_TOP_NAV.map(([label, href]) => `<li><a href="${href}"${currentPath === href ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul>
        </div>
      </div>
      <div class="workspace-actions">
        <div class="workspace-notif">
          <button class="workspace-action workspace-action--notification" type="button" aria-label="Notifications" aria-expanded="false" aria-haspopup="menu" aria-controls="notif-panel" data-notif-menu>${workspaceIcon('bell')}</button>
          <div class="notif-panel" id="notif-panel" role="menu" aria-label="Notifications" hidden>
            <h2>Notifications</h2>
            <p>Notifications are unavailable in this preview.</p>
            <a href="/home" role="menuitem">Back to workspace home</a>
          </div>
        </div>
        <div class="workspace-create-menu">
          <button class="workspace-action workspace-action--create" type="button" aria-label="Create new" aria-expanded="false" aria-haspopup="menu" aria-controls="create-menu" data-create-menu>${workspaceIcon('plus-small')}</button>
          <div class="create-menu" id="create-menu" role="menu" aria-label="Create new" hidden>
            <button type="button" role="menuitem" data-create-repo>New repository</button>
            <button type="button" role="menuitem" data-import-repo>Import repository</button>
            <p class="create-menu__note">More creation actions are not part of this preview.</p>
          </div>
        </div>
        <div class="workspace-account-menu">
          <button class="workspace-action workspace-action--account" type="button" aria-label="Open account menu" aria-expanded="false" aria-haspopup="menu" aria-controls="account-menu" data-account-menu>${workspaceIcon('angle-small-down')}</button>
          <div class="account-menu" id="account-menu" role="menu" aria-label="Account" hidden>
            <p class="account-menu__signedin">Signed in as <strong data-account-name>Guest</strong></p>
            <a href="/profile" role="menuitem" data-account-profile>Your profile</a>
            <a href="/settings" role="menuitem">Settings</a>
            <a href="/code" role="menuitem">Your repositories</a>
            <button type="button" role="menuitem" data-logout>Log out</button>
          </div>
        </div>
        <a class="workspace-user" href="/profile" aria-label="Open profile" data-account-profile>
          <img alt="" data-workspace-avatar src="/ui3/Ellipse 138.png" />
          <span aria-hidden="true"></span>
        </a>
      </div>
    </header>
  `;
}

function workspaceSidebar(path) {
  const aiActive = path === '/ai-analysis';
  return `
    <aside class="workspace-sidebar" id="workspace-sidebar" aria-label="Workspace sections">
      <div class="workspace-account" aria-label="Signed in account">
        <img alt="" data-workspace-avatar src="/ui3/Ellipse 138.png" />
        <span data-workspace-account-name>Guest</span>
        ${workspaceIcon('sidebar-angle-down')}
      </div>
      <nav class="workspace-sidebar-nav" aria-label="Workspace sections">
        ${workspaceSidebarItems.map(([label, href, iconName]) => { const active = path === href || (href === '/' && path === '/home'); return `<a class="workspace-sidebar-item workspace-sidebar-item--${iconName}${active ? ' workspace-sidebar-item--active' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${workspaceIcon(iconName)}<span>${label}</span></a>`; }).join('')}
        <a class="workspace-ai${aiActive ? ' workspace-ai--active' : ''}" href="/ai-analysis"${aiActive ? ' aria-current="page"' : ''}><span>AI Analysis</span></a>
      </nav>
      <div class="workspace-sidebar__create">
        <button type="button" class="workspace-sidebar-item" data-create-repo>${workspaceIcon('plus-small')}<span>New repository</span></button>
        <button type="button" class="workspace-sidebar-item" data-import-repo>${workspaceIcon('plus-small')}<span>Import repository</span></button>
        <p class="workspace-sidebar__note">Notifications are unavailable in this preview.</p>
      </div>
      <button type="button" class="workspace-logout" data-logout>Log out</button>
    </aside>
    <button class="workspace-scrim" type="button" aria-label="Close navigation" data-workspace-scrim hidden></button>
  `;
}

const marketplaceCategoryIcons = [
  'category-code.svg',
  'category-leaf.svg',
  'category-phone.svg',
  'category-cloud.svg',
  'category-message.svg',
  'category-gamepad.svg',
];

const marketplaceLanguageIcons = {
  JavaScript: 'category-code.svg',
  TypeScript: 'category-code.svg',
  Python: 'category-leaf.svg',
  Go: 'category-cloud.svg',
  Rust: 'category-code.svg',
};

const deviconBadges = {
  Python: 'python/python-original',
  TypeScript: 'typescript/typescript-original',
  JavaScript: 'javascript/javascript-original',
  Go: 'go/go-original',
  Rust: 'rust/rust-original',
  Java: 'java/java-original',
  Ruby: 'ruby/ruby-original',
  PHP: 'php/php-original',
  C: 'c/c-original',
  'C++': 'cplusplus/cplusplus-original',
  Swift: 'swift/swift-original',
  Kotlin: 'kotlin/kotlin-original',
  HTML: 'html5/html5-original',
  CSS: 'css3/css3-original',
  'Jupyter Notebook': 'python/python-original',
};

const deviconTopicBadges = [
  ['docker', 'docker/docker-original'],
  ['kubernetes', 'kubernetes/kubernetes-plain'],
  ['react', 'react/react-original'],
  ['node.js', 'nodejs/nodejs-original'],
  ['nodejs', 'nodejs/nodejs-original'],
];

function repoBadge(repo) {
  const text = `${repo.name || ''} ${repo.description || ''}`.toLowerCase();
  for (const [keyword, path] of deviconTopicBadges) {
    if (text.includes(keyword)) return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
  }
  const path = deviconBadges[repo.language];
  return path ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg` : '';
}

function repoBadgeHtml(repo, fallbackIcon) {
  const badge = repoBadge(repo);
  if (!badge) return fallbackIcon;
  return `<img class="brand-badge" src="${badge}" alt="" loading="lazy" onerror="this.remove()" />`;
}

function localStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} local time`;
}

function localDayKey(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function shiftDayKey(dateStr, delta) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  return localDayKey(new Date(y, (m || 1) - 1, (d || 1) + delta));
}

function relativeTime(iso) {
  const d = new Date(String(iso || '').slice(0, 10) + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const topicKeywords = ['docker', 'kubernetes', 'react', 'api', 'cli', 'ai', 'auth', 'oauth', 'postgres', 'redis', 'dashboard', 'markdown', 'stripe', 'linux', 'terminal', 'websocket'];

function topicChips(repo, max = 3) {
  const text = ` ${repo.name || ''} ${repo.description || ''} `.toLowerCase();
  const found = topicKeywords.filter((kw) => text.includes(kw)).slice(0, max);
  if (!found.length) return '';
  return `<ul class="ws-topics" aria-label="Topics">${found.map((kw) => `<li><a href="/explore?q=${encodeURIComponent(kw)}">${escapeHtml(kw)}</a></li>`).join('')}</ul>`;
}

function marketplaceCard(repo, user) {
  const license = repo.is_private ? 'Private' : 'Public';
  const title = escapeHtml(repo.name || 'Repository');
  const description = escapeHtml(repo.description || 'No repository description available.');
  const ownerKey = escapeHtml(user.username || user.name || '');
  const stars = Number(repo.stars) || 0;
  return `
    <article class="marketplace-card" data-marketplace-card>
      <div class="marketplace-card__icon">${repoBadgeHtml(repo, marketplaceIcon(marketplaceLanguageIcons[repo.language] || 'category-code.svg'))}</div>
      <h3 title="${title}"><a href="/profile?username=${ownerKey}" aria-label="${title} by ${escapeHtml(user.name || user.username || 'Seller')}">${title}</a></h3>
      <p>${description}</p>
      <div class="marketplace-card__tags">${repo.language ? `<span>${langDot(repo.language)}</span>` : ''}<span class="license-pill">${license}</span></div>
      <div class="marketplace-card__footer">
        <a class="mkt-seller" href="/profile?username=${ownerKey}" aria-label="${title} by ${escapeHtml(user.name || user.username || 'Seller')}"><img src="${escapeHtml(user.avatar_url || repoAvatar(repo))}" alt="" loading="lazy" /><span>by ${escapeHtml(user.name || user.username || 'Seller')}</span></a>
        <div class="marketplace-card__rating" title="${stars.toLocaleString('en-US')} stars">${marketplaceIcon('star-fill.svg')}<span>${formatCompact(stars)}</span></div>
        <a class="mkt-cta" href="/profile?username=${ownerKey}">View</a>
      </div>
    </article>
  `;
}

function marketplacePage() {
  return `
    <main class="workspace-page marketplace-page page-frame" data-marketplace-page>
      <a class="skip-link" href="#marketplace-main">Skip to content</a>
      ${workspaceHeader()}
      <div class="workspace-layout">
        ${workspaceSidebar('/marketplace')}
        <main class="workspace-main section-main marketplace-main" id="marketplace-main" tabindex="-1">
          <section class="ws-hero" aria-labelledby="marketplace-title">
            <p class="ws-eyebrow">GitHub Marketplace</p>
            <h1 id="marketplace-title">Discover, Buy &amp; Sell Premium Code</h1>
            <form class="ws-search" role="search" aria-label="Search Marketplace" data-marketplace-search>
              ${workspaceIcon('search')}
              <label class="sr-only" for="marketplace-search-input">Search for code, scripts, or tools...</label>
              <input id="marketplace-search-input" type="search" placeholder="Search for code, scripts, or tools..." data-marketplace-query />
              <button type="submit" aria-label="Search Marketplace">${marketplaceIcon('search-arrow.svg')}</button>
            </form>
            <p class="ws-search-hint">Popular: <button type="button" data-pop="docker">docker</button><button type="button" data-pop="typescript">typescript</button><button type="button" data-pop="api">api</button></p>
          </section>
          <section class="marketplace-featured" aria-labelledby="featured-codes-title">
            <h2 id="featured-codes-title">Featured Codes</h2>
            <p>Staff picks ranked by stars, updated live from workspace data.</p>
            <div class="stat-row" data-discovery-stats></div>
            <div class="marketplace-toolbar">
              <div class="chip-row" data-marketplace-chips></div>
              <div class="marketplace-tools">
                <span data-marketplace-count aria-live="polite"></span>
                <label for="marketplace-sort">Sort</label><select id="marketplace-sort" data-marketplace-sort aria-label="Sort marketplace results"><option value="stars">Most stars</option><option value="updated">Recently updated</option><option value="name">Name A to Z</option></select>
              </div>
            </div>
            <div data-marketplace-grid><p class="marketplace-loading">Loading repositories…</p></div>
            <p class="marketplace-empty" data-marketplace-empty hidden>No matching Marketplace items. <button type="button" class="ws-btn ws-btn--small" data-marketplace-reset>Reset filters</button></p>
          </section>
        </main>
      </div>
      <div class="toast" role="status" data-toast-region></div>
    </main>
  `;
}

let marketplaceCache = null;
let marketplaceCacheAt = 0;

async function fetchMarketplaceRepos() {
  if (marketplaceCache && Date.now() - marketplaceCacheAt <= PROFILE_CACHE_TTL) return marketplaceCache;
  const result = await api.request('/api/marketplace');
  marketplaceCache = Array.isArray(result.repos) ? result.repos : [];
  marketplaceCacheAt = Date.now();
  return marketplaceCache;
}

function repoOwner(repo) { return repo.owner || repo.owner_name || 'Seller'; }
function repoOwnerName(repo) { return repo.owner_name || repo.owner || 'Seller'; }
function repoAvatar(repo) { return repo.owner_avatar || asset('ui3/Ellipse 138.png'); }

const langColors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Go: '#00ADD8', Rust: '#dea584', Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', Ruby: '#701516', PHP: '#4f5d95', C: '#555555', 'C++': '#f34b7d', Swift: '#ffac45', Kotlin: '#a97bff', 'Jupyter Notebook': '#da5b0b' };
function langDot(lang) {
  if (!lang) return '';
  const path = deviconBadges[lang];
  if (path) return `<img class="lang-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg" alt="" loading="lazy" onerror="this.remove()" />${escapeHtml(lang)}`;
  const color = langColors[lang] || '#8F8F8F';
  return `<span class="lang-dot" style="background:${color}" aria-hidden="true"></span>${escapeHtml(lang)}`;
}

function skeletonGrid(count = 6) {
  return `<div class="ws-grid" role="status" aria-label="Loading repositories"><span class="sr-only">Loading repositories</span>${Array.from({ length: count }, () => '<div class="skeleton-card" aria-hidden="true"><span class="skeleton skeleton-icon"></span><span class="skeleton skeleton-line"></span><span class="skeleton skeleton-line short"></span></div>').join('')}</div>`;
}

function wsError(text = 'Workspace data is unavailable right now.') {
  return `<div class="ws-error" role="alert"><p>${text}</p><button type="button" class="ws-btn ws-btn--small" data-retry>Try again</button></div>`;
}

function wsRepoCard(repo) {
  const title = escapeHtml(repo.name || 'Repository');
  const desc = escapeHtml(repo.description || 'No description available.');
  const owner = escapeHtml(repoOwnerName(repo));
  const ownerKey = escapeHtml(repoOwner(repo));
  const stars = Number(repo.stars) || 0;
  const forks = Number(repo.forks) || 0;
  const updated = repo.updated_at ? relativeTime(repo.updated_at) : '';
  const visibility = repo.is_private ? 'Private' : 'Public';
  return `
    <article class="ws-card" data-ws-repo="${escapeHtml(repo.name || '')}">
      <div class="ws-card__icon">${repoBadgeHtml(repo, icon('bookOpen'))}</div>
      <div class="ws-card__title-row"><h3 title="${title}"><a href="/profile?username=${ownerKey}">${title}</a></h3><span class="ws-label ws-label--visibility" title="Repository visibility">${visibility}</span></div>
      <p>${desc}</p>
      <div class="ws-card__tags">${repo.language ? `<span>${langDot(repo.language)}</span>` : ''}<span class="ws-label ws-label--star" title="${stars.toLocaleString('en-US')} stars">${icon('starFill')}${formatCompact(stars)}</span>${forks ? `<span class="ws-label ws-label--fork" title="${forks.toLocaleString('en-US')} forks">${icon('fork')}${formatCompact(forks)}</span>` : ''}</div>
      ${topicChips(repo)}
      <div class="ws-card__seller"><img src="${escapeHtml(repoAvatar(repo))}" alt="" loading="lazy" /><span>by ${owner}</span>${updated ? `<time datetime="${escapeHtml(String(repo.updated_at).slice(0, 10))}">Updated ${updated}</time>` : ''}</div>
    </article>
  `;
}

function wsRepoRow(repo, iconName = 'bookOpen') {
  const title = escapeHtml(repo.name || 'Repository');
  const desc = escapeHtml(repo.description || 'No description available.');
  const owner = escapeHtml(repoOwnerName(repo));
  const ownerKey = escapeHtml(repoOwner(repo));
  const stars = Number(repo.stars) || 0;
  const forks = Number(repo.forks) || 0;
  return `
    <article class="repo-row" data-ws-repo="${escapeHtml(repo.name || '')}">
      <div class="repo-row__main">${icon(iconName)}<div><strong title="${title}"><a href="/profile?username=${ownerKey}">${title}</a></strong><p>${desc}</p></div></div>
      <div class="repo-row__meta">${repo.language ? `<span class="repo-row__lang">${langDot(repo.language)}</span>` : ''}<span class="repo-row__stars" title="${stars.toLocaleString('en-US')} stars">${icon('starFill')}${formatCompact(stars)}</span>${forks ? `<span class="repo-row__stars" title="${forks.toLocaleString('en-US')} forks">${icon('fork')}${formatCompact(forks)}</span>` : ''}<span class="repo-row__owner"><img src="${escapeHtml(repoAvatar(repo))}" alt="" loading="lazy" width="20" height="20" /><span>${owner}</span></span></div>
    </article>
  `;
}

function repoLanguages(repos) {
  return [...new Set(repos.map((r) => r.language).filter(Boolean))];
}

async function searchRepos(query, fallbackRepos) {
  const q = query.trim().toLowerCase();
  if (!q) return fallbackRepos;
  try {
    const result = await api.request(`/api/search?q=${encodeURIComponent(query.trim())}`);
    if (Array.isArray(result.repos) && result.repos.length) {
      return result.repos.map((r) => ({ name: r.name, description: r.description, language: r.language, stars: r.stars, is_private: false, owner: r.owner, owner_name: r.owner, owner_avatar: '' }));
    }
  } catch {}
  return fallbackRepos.filter((r) => `${r.name || ''} ${r.description || ''} ${r.language || ''} ${repoOwner(r)}`.toLowerCase().includes(q));
}

function wsChips(languages, active = 'All', counts = null) {
  return ['All', ...languages].map((lang) => {
    const n = counts && lang !== 'All' ? counts[lang] || 0 : null;
    return `<button type="button" class="chip${lang === active ? ' chip--active' : ''}" data-chip="${escapeHtml(lang)}" aria-pressed="${lang === active}">${escapeHtml(lang)}${n !== null ? `<span class="count-pill">${n}</span>` : ''}</button>`;
  }).join('');
}

function blankslate({ title, text, action, link = null, iconName = 'bookOpen', spacious = false, narrow = false }) {
  return `
    <div class="blankslate${spacious ? ' blankslate--spacious' : ''}${narrow ? ' blankslate--narrow' : ''}">
      <div class="blankslate__icon" aria-hidden="true">${icon(iconName)}</div>
      <h2>${title}</h2>
      <p>${text}</p>
      ${action || ''}
      ${link ? `<span class="blankslate__link">Learn more about <a href="${link.href}">${link.label}</a></span>` : ''}
    </div>
  `;
}

function sectionShell({ section, eyebrow, title, description, searchHtml, bodyHtml }) {
  const path = window.location.pathname.toLowerCase();
  return `
    <main class="workspace-page page-frame" data-section="${section}">
      <a class="skip-link" href="#section-main">Skip to content</a>
      ${workspaceHeader()}
      <div class="workspace-layout">
        ${workspaceSidebar(path)}
        <main class="workspace-main section-main" id="section-main" tabindex="-1">
          <section class="ws-hero" aria-labelledby="section-title">
            <p class="ws-eyebrow">${eyebrow}</p>
            <h1 id="section-title">${title}</h1>
            ${description ? `<p class="ws-description">${description}</p>` : ''}
            ${searchHtml || ''}
          </section>
          <div data-section-body>${bodyHtml || '<p class="marketplace-loading">Loading…</p>'}</div>
        </main>
      </div>
      <div class="toast" role="status" data-toast-region></div>
    </main>
  `;
}

function wsSearchForm({ placeholder, hint }) {
  return `
    <form class="ws-search" role="search" data-ws-search>
      ${workspaceIcon('search')}
      <label class="sr-only" for="ws-search-input">${placeholder}</label>
      <input id="ws-search-input" type="search" placeholder="${placeholder}" data-ws-query${hint ? ' aria-describedby="ws-search-hint"' : ''} aria-keyshortcuts="Control+K Meta+K" />
      <span class="kbd-stack" aria-hidden="true"><kbd>Ctrl K</kbd></span>
      <button type="submit" aria-label="Search">${marketplaceIcon('search-arrow.svg')}</button>
    </form>
    ${hint ? `<p class="ws-search-hint" id="ws-search-hint">${hint}</p>` : ''}
    <p class="ws-meta" role="status" data-ws-meta></p>
  `;
}

function setWsMeta(text) {
  const meta = document.querySelector('[data-ws-meta]');
  if (meta) meta.textContent = text;
}

function bindSection(loader) {
  bindWorkspace();
  const prevKey = window.onkeydown;
  window.onkeydown = function (event) {
    if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      const q = document.querySelector('[data-ws-query]');
      if (q) {
        event.preventDefault();
        q.focus();
        return;
      }
    }
    if (event.key === 'Escape' && document.activeElement?.matches?.('[data-ws-query]')) {
      document.activeElement.value = '';
      document.activeElement.blur();
      return;
    }
    if (typeof prevKey === 'function') prevKey(event);
  };
  if (loader) loader();
}

function openRepoModal(mode) {
  closeRepoModal();
  const isImport = mode === 'import';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="repo-modal-title" aria-describedby="repo-modal-sub">
      <h2 id="repo-modal-title">${isImport ? 'Import repository' : 'New repository'}</h2>
      <p class="modal-sub" id="repo-modal-sub">${isImport ? 'Bring in a project from another host. A record is created here referencing the source.' : 'A repository contains all project files and history.'}</p>
      <form data-repo-form novalidate>
        <label>Repository name<input name="name" required maxlength="100" autocomplete="off" placeholder="my-project" aria-describedby="repo-name-hint" /></label>
        <p class="modal-hint" id="repo-name-hint">Letters, numbers, dots, dashes and underscores only.</p>
        ${isImport ? '<label>Source URL<input name="source" type="url" required placeholder="https://example.com/repo.git" /></label>' : ''}
        <label>Description<input name="description" maxlength="200" autocomplete="off" placeholder="What does it do?" /></label>
        <label class="modal-check"><input type="checkbox" name="is_private" /> Private repository</label>
        <p class="modal-error" role="alert" data-repo-error hidden></p>
        <div class="modal-actions">
          <button type="button" class="ws-btn ws-btn--ghost" data-modal-close>Cancel</button>
          <button type="submit" class="ws-btn" data-repo-submit>${isImport ? 'Import repository' : 'Create repository'}</button>
        </div>
      </form>
    </div>`;
  document.body.append(overlay);
  document.body.style.overflow = 'hidden';
  const form = overlay.querySelector('[data-repo-form]');
  const nameInput = form.querySelector('[name="name"]');
  nameInput?.focus();
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeRepoModal(true);
  });
  overlay.addEventListener('keydown', (event) => {
    if (event.key === '/') event.stopPropagation();
    if (event.key !== 'Tab') return;
    const focusables = [...overlay.querySelectorAll('input, button')].filter((el) => !el.disabled);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const error = form.querySelector('[data-repo-error]');
    const submit = form.querySelector('[data-repo-submit]');
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const source = String(data.get('source') || '').trim();
    let description = String(data.get('description') || '').trim();
    if (isImport && source) description = `${description}${description ? ' ' : ''}(Imported from ${source})`.trim().slice(0, 300);
    if (error) error.hidden = true;
    const fail = (message) => {
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
      submit.disabled = false;
    };
    if (!/^[a-zA-Z0-9._-]{1,100}$/.test(name)) {
      fail('Repository name may only contain letters, numbers, dots, dashes and underscores.');
      return;
    }
    if (isImport) {
      try {
        const parsed = new URL(source);
        if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('bad protocol');
      } catch {
        fail('Enter a valid http or https source URL.');
        return;
      }
    }
    submit.disabled = true;
    try {
      const result = await api.request('/api/repos', {
        method: 'POST',
        body: { name, description, is_private: Boolean(data.get('is_private')) },
      });
      marketplaceCacheAt = 0;
      const me = workspaceIdentity || await loadWorkspaceIdentity();
      closeRepoModal();
      showToast(`Repository “${result.repo.name}” created.`);
      navigate(`/profile?username=${encodeURIComponent(me?.username || '')}`);
    } catch (e) {
      if (error) {
        error.textContent = e.message;
        error.hidden = false;
      }
      submit.disabled = false;
    }
  });
}

function closeRepoModal(restoreFocus = false) {
  const overlay = document.querySelector('.modal-overlay');
  if (!overlay) return;
  overlay.remove();
  if (!document.querySelector('.workspace-sidebar.is-open')) document.body.style.overflow = '';
  if (restoreFocus) document.querySelector('[data-create-menu]')?.focus();
}

function paintRepoGrid(repos, selector = '[data-repo-grid]') {
  const grid = document.querySelector(selector);
  if (!grid) return;
  grid.innerHTML = repos.length ? repos.map(wsRepoCard).join('') : '<p class="marketplace-loading">No repositories found.</p>';
}

function paintRepoRows(repos, selector = '[data-repo-rows]') {
  const rows = document.querySelector(selector);
  if (!rows) return;
  rows.innerHTML = repos.length ? repos.map((repo) => wsRepoRow(repo)).join('') : '<p class="marketplace-loading">No repositories found.</p>';
}

function homePage() {
  return sectionShell({
    section: 'home',
    eyebrow: 'Home',
    title: 'Build and ship software',
    description: '',
    searchHtml: wsSearchForm({ placeholder: 'Filter by name, description, or language…', hint: 'Press <kbd>/</kbd> to focus. Search checks names, descriptions, and languages.' }),
    bodyHtml: '<div class="stat-row" data-home-stats></div><p class="ws-meta" data-home-meta></p><div class="ws-section-head"><h2 class="ws-h2">Trending in this workspace</h2><a href="/code">View all</a></div><div class="ws-grid" data-home-grid></div>',
  });
}

async function loadHome() {
  const stats = document.querySelector('[data-home-stats]');
  const grid = document.querySelector('[data-home-grid]');
  const me = workspaceIdentity || await loadWorkspaceIdentity();
  const heroTitle = document.querySelector('#section-title');
  if (heroTitle) heroTitle.textContent = me?.username ? `Welcome back, ${me.username}` : 'Build and ship software';
  try {
    const repos = await fetchMarketplaceRepos();
    const stars = repos.reduce((sum, r) => sum + (Number(r.stars) || 0), 0);
    const langs = repoLanguages(repos);
    if (stats) stats.innerHTML = [
      [String(repos.length), 'Repositories tracked', '/code', 'bookOpen'],
      [stars.toLocaleString('en-US'), 'Total stars', '/insights', 'starFill'],
      [String(langs.length), 'Languages in use', '/code', 'activity'],
    ].map(([value, label, href, ic]) => `<a class="stat-card" href="${href}"><span class="stat-card__icon">${icon(ic)}</span><span class="stat-card__text"><strong>${value}</strong><span>${label}</span></span></a>`).join('');
    const meta = document.querySelector('[data-home-meta]');
    if (meta && !me) meta.textContent = 'Signed in as Guest. Sign in to personalize trending.';
    if (grid) grid.innerHTML = skeletonGrid(6);
    if (grid) grid.innerHTML = [...repos].sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0)).slice(0, 6).map(wsRepoCard).join('') || '<p class="marketplace-loading">No repositories yet.</p>';
    const form = document.querySelector('[data-ws-search]');
    form?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const q = form.querySelector('[data-ws-query]')?.value || '';
      const matches = await searchRepos(q, repos);
      if (grid) grid.innerHTML = matches.slice(0, 6).map(wsRepoCard).join('') || '<p class="marketplace-loading">No repositories found.</p>';
      setWsMeta(q.trim() ? `${matches.length} result${matches.length === 1 ? '' : 's'} for “${q.trim()}”.` : '');
      showToast(q.trim() ? `${matches.length} result${matches.length === 1 ? '' : 's'} for “${q.trim()}”.` : 'Showing trending repositories.');
    });
  } catch {
    if (grid) grid.innerHTML = wsError();
  }
}

function codePage() {
  return sectionShell({
    section: 'code',
    eyebrow: 'Code',
    title: 'Browse code',
    description: '',
    searchHtml: wsSearchForm({ placeholder: 'Search code and repositories…', hint: 'Press <kbd>/</kbd> to focus. Results sort by Most stars unless you change it.' }),
    bodyHtml: '<p class="ws-scope-note" data-code-scope-note>Searching repository names and descriptions only. File contents need an index.</p><div class="chip-row" data-lang-chips></div><div class="ws-toolbar"><p class="ws-meta" aria-live="polite" data-code-meta></p><label>Sort <select data-code-sort><option value="stars">Most stars</option><option value="updated">Recently updated</option><option value="name">Name A to Z</option></select></label></div><div class="repo-list" data-repo-rows></div>',
  });
}

async function loadCode() {
  const rows = document.querySelector('[data-repo-rows]');
  const chips = document.querySelector('[data-lang-chips]');
  try {
    const repos = await fetchMarketplaceRepos();
    let active = 'All';
    let sort = 'stars';
    let query = new URLSearchParams(window.location.search).get('q') || '';
    const searchInput = document.querySelector('[data-ws-query]');
    if (searchInput && query) searchInput.value = query;
    const meta = document.querySelector('[data-code-meta]');
    const sortSel = document.querySelector('[data-code-sort]');
    const base = () => {
      let list = active === 'All' ? [...repos] : repos.filter((r) => r.language === active);
      if (query) {
        const q = query.toLowerCase();
        list = list.filter((r) => `${r.name || ''} ${r.description || ''} ${r.language || ''}`.toLowerCase().includes(q));
      }
      if (sort === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      else if (sort === 'updated') list.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
      else list.sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
      return list;
    };
    const paint = () => {
      const list = base();
      paintRepoRows(list, '[data-repo-rows]');
      const sortLabel = sort === 'name' ? 'Name A to Z' : sort === 'updated' ? 'Recently updated' : 'Most stars';
      if (meta) meta.textContent = `${list.length} result${list.length === 1 ? '' : 's'} sorted by ${sortLabel}`;
    };
    const paintChips = () => {
      if (!chips) return;
      const counts = {};
      repos.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
      chips.innerHTML = wsChips(repoLanguages(repos), active, counts);
    };
    paintChips();
    paint();
    chips?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-chip]');
      if (!btn) return;
      active = btn.dataset.chip;
      paintChips();
      paint();
    });
    sortSel?.addEventListener('change', () => {
      sort = sortSel.value;
      paint();
    });
    document.querySelector('[data-ws-search]')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const q = event.currentTarget.querySelector('[data-ws-query]')?.value.trim() || '';
      query = q;
      active = 'All';
      sort = sortSel?.value || 'stars';
      paintChips();
      paint();
      showToast(q ? `${base().length} result${base().length === 1 ? '' : 's'} for “${q}”.` : 'Showing all repositories.');
    });
  } catch {
    if (rows) rows.innerHTML = wsError('Code search is unavailable right now.');
  }
}

function triageShell(kind) {
  const isPr = kind === 'pr';
  return `<div class="chip-row" data-${kind}-chips></div><div class="ws-toolbar"><p class="ws-meta" role="status" data-${kind}-meta></p><label>Sort <select data-${kind}-sort aria-label="Sort repositories"><option value="stars">Most stars</option><option value="updated">Recently updated</option><option value="name">Name A to Z</option></select></label></div><div data-${kind}-repo-results></div>`;
}

function pullsPage() {
  return sectionShell({
    section: 'pull-requests',
    eyebrow: 'Pull requests',
    title: 'Pull requests',
    description: '',
    searchHtml: wsSearchForm({ placeholder: 'Search repositories to contribute to…', hint: 'Press <kbd>/</kbd> to focus. Search checks names, descriptions, and languages.' }),
    bodyHtml: `<div data-pr-empty>${blankslate({ title: 'No pull requests yet', text: 'Pull requests you create or are asked to review will appear here. Until then, pick a repository below: find it, fork or branch it, and open a draft PR.', action: '<a class="ws-btn" href="/code">Browse code</a>', link: { href: '/wiki', label: 'forking and pull requests' }, iconName: 'gitPullRequest', spacious: true })}</div>${triageShell('pr')}`,
  });
}

async function loadTriage(kind, rowIcon, emptyTitle, emptyText) {
  const results = document.querySelector(`[data-${kind}-repo-results]`);
  const chips = document.querySelector(`[data-${kind}-chips]`);
  const meta = document.querySelector(`[data-${kind}-meta]`);
  const sortSel = document.querySelector(`[data-${kind}-sort]`);
  try {
    const repos = await fetchMarketplaceRepos();
    let active = 'All';
    let sort = 'stars';
    let query = '';
    const paint = () => {
      let list = active === 'All' ? [...repos] : repos.filter((r) => r.language === active);
      if (query) {
        const q = query.toLowerCase();
        list = list.filter((r) => `${r.name || ''} ${r.description || ''} ${r.language || ''}`.toLowerCase().includes(q));
      }
      if (sort === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      else if (sort === 'updated') list.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
      else list.sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
      if (results) results.innerHTML = list.length ? `<div class="repo-list">${list.map((r) => wsRepoRow(r, rowIcon)).join('')}</div>` : blankslate({ title: emptyTitle, text: query ? `Nothing matched “${escapeHtml(query)}”. Try a repository name or language, or clear filters to see all.` : emptyText, action: '<button type="button" class="ws-btn" data-clear-search>Clear search</button>', iconName: rowIcon });
      if (meta) meta.textContent = `${list.length} repositor${list.length === 1 ? 'y' : 'ies'} shown`;
    };
    const paintChips = () => {
      if (!chips) return;
      const counts = {};
      repos.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
      chips.innerHTML = wsChips(repoLanguages(repos), active, counts);
    };
    paintChips();
    paint();
    chips?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-chip]');
      if (!btn) return;
      active = btn.dataset.chip;
      paintChips();
      paint();
    });
    sortSel?.addEventListener('change', () => {
      sort = sortSel.value;
      paint();
    });
    document.querySelector('[data-ws-search]')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      query = (event.currentTarget.querySelector('[data-ws-query]')?.value || '').replace(/^is:\S+\s*/i, '').trim();
      const matches = await searchRepos(query, repos);
      active = 'All';
      paintChips();
      let list = [...matches];
      if (sort === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      else if (sort === 'updated') list.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
      else list.sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
      if (results) results.innerHTML = list.length ? `<div class="repo-list">${list.map((r) => wsRepoRow(r, rowIcon)).join('')}</div>` : blankslate({ title: emptyTitle, text: `Nothing matched “${escapeHtml(query)}”. Try a repository name or language, or clear filters to see all.`, action: '<button type="button" class="ws-btn" data-clear-search>Clear search</button>', iconName: rowIcon });
      if (meta) meta.textContent = `${list.length} result${list.length === 1 ? '' : 's'} for “${query}”.`;
      setWsMeta(query ? `${list.length} result${list.length === 1 ? '' : 's'} for “${query}”.` : '');
    });
  } catch {
    if (results) results.innerHTML = wsError(kind === 'pr' ? 'Pull requests are unavailable right now.' : 'Issues are unavailable right now.');
  }
}

async function loadPulls() {
  await loadTriage('pr', 'gitPullRequest', 'No repositories match your search', 'Search above to find a repository to contribute to.');
}

function issuesPage() {
  return sectionShell({
    section: 'issues',
    eyebrow: 'Issues',
    title: 'Issues',
    description: '',
    searchHtml: wsSearchForm({ placeholder: 'Search repositories to file against…', hint: 'Press <kbd>/</kbd> to focus. Search checks names, descriptions, and languages.' }),
    bodyHtml: `<div data-issue-empty>${blankslate({ title: 'No issues yet', text: 'Issues assigned to you or created by you will appear here. Until then, pick a repository below and file your first task or bug.', action: '<button type="button" class="ws-btn" data-focus-repo-search>Find a repository</button>', link: { href: '/wiki', label: 'writing great issues' }, iconName: 'issueOpened', spacious: true })}</div>${triageShell('issue')}`,
  });
}

async function loadIssues() {
  document.querySelector('[data-focus-repo-search]')?.addEventListener('click', () => document.querySelector('[data-ws-query]')?.focus());
  await loadTriage('issue', 'issueOpened', 'No repositories match your search', 'Search above to find a repository to file against.');
}

function explorePage() {
  return sectionShell({
    section: 'explore',
    eyebrow: 'Explore',
    title: 'Trending in this workspace',
    description: '',
    searchHtml: wsSearchForm({ placeholder: 'Filter by name, description, or language…', hint: 'Press <kbd>/</kbd> to focus. Search checks names, descriptions, and languages.' }),
    bodyHtml: '<div class="chip-row" data-explore-chips></div><p class="ws-meta" aria-live="polite" data-explore-count></p><div class="ws-grid" data-explore-grid></div>',
  });
}

async function loadExplore() {
  const grid = document.querySelector('[data-explore-grid]');
  const chips = document.querySelector('[data-explore-chips]');
  const count = document.querySelector('[data-explore-count]');
  try {
    const base = [...await fetchMarketplaceRepos()].sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
    let active = 'All';
    let query = '';
    const paint = () => {
      let list = active === 'All' ? [...base] : base.filter((r) => r.language === active);
      if (query) {
        const q = query.toLowerCase();
        list = list.filter((r) => `${r.name || ''} ${r.description || ''} ${r.language || ''}`.toLowerCase().includes(q));
      }
      if (grid) grid.innerHTML = list.map(wsRepoCard).join('') || blankslate({ title: 'Nothing under this filter yet', text: 'Try choosing All languages or clearing the search. New stars update this list automatically.', action: '<button type="button" class="ws-btn" data-clear-explore>Clear search and filters</button>' });
      if (chips) {
        const langs = repoLanguages(base);
        const counts = {};
        base.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
        chips.innerHTML = wsChips(langs, active, counts);
      }
      if (count) count.textContent = `${list.length} repositor${list.length === 1 ? 'y' : 'ies'}`;
    };
    if (grid && !grid.innerHTML.trim()) grid.innerHTML = skeletonGrid(6);
    paint();
    chips?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-chip]');
      if (!btn) return;
      active = btn.dataset.chip;
      paint();
    });
    document.querySelector('[data-ws-search]')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      query = event.currentTarget.querySelector('[data-ws-query]')?.value.trim() || '';
      paint();
      setWsMeta(query ? `Filtering by “${query}”.` : '');
    });
    grid?.addEventListener('click', (event) => {
      if (!event.target.closest('[data-clear-explore]')) return;
      query = '';
      active = 'All';
      const input = document.querySelector('[data-ws-query]');
      if (input) input.value = '';
      paint();
      setWsMeta('');
      document.querySelector('[data-ws-query]')?.focus();
    });
  } catch {
    if (grid) grid.innerHTML = wsError('Trending is unavailable right now.');
  }
}

const actionStarters = [
  ['Simple workflow', 'Lint, test and build on every push.', 'Continuous integration', 'on: push', 'workflow'],
  ['Node.js CI', 'Build and test Node.js projects across versions.', 'Continuous integration', 'on: push', 'node'],
  ['Python application', 'Install dependencies and run pytest on push.', 'Continuous integration', 'on: push', 'python'],
  ['Docker image', 'Build and publish a container image.', 'Deployment', 'on: release', 'docker'],
  ['Deploy static site', 'Ship docs or a site to Pages.', 'Pages', 'on: push', 'rocket'],
  ['Label issues', 'Add labels to new issues automatically.', 'Automation', 'on: issues', 'zap'],
];

function starterIconHtml(key) {
  const dev = { node: 'nodejs/nodejs-original', python: 'python/python-original', docker: 'docker/docker-original' }[key];
  if (dev) return `<img class="brand-badge" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${dev}.svg" alt="" loading="lazy" onerror="this.remove()" />`;
  return icon({ workflow: 'workflow', rocket: 'rocket', zap: 'zap' }[key] || 'branch');
}

function actionsPage() {
  return sectionShell({
    section: 'actions',
    eyebrow: 'Actions',
    title: 'Automate with Actions',
    description: '',
    searchHtml: '',
    bodyHtml: `${blankslate({ title: 'No workflow runs yet', text: 'Set up your first workflow below. Runs, logs and artifacts will appear here after you commit a workflow file.', action: '<a class="ws-btn" href="#starter-catalog">Browse starter workflows</a>', iconName: 'workflow', spacious: true })}<h2 class="ws-h2">Workflow runs (0)</h2><p class="ws-meta">No runs have been recorded. Runs, logs and artifacts will list here after you commit a workflow file.</p><h2 class="ws-h2" id="starter-catalog">Starter workflows</h2><form class="ws-search ws-search--slim" role="search" aria-label="Filter starter workflows" data-starter-filter><label class="sr-only" for="starter-filter-input">Filter starter workflows</label><input id="starter-filter-input" type="search" placeholder="Filter starters by name or category…" data-starter-query /></form><div class="ws-grid" data-starter-grid></div><h2 class="ws-h2">Your repositories</h2><p class="ws-meta">Suggested starters match the language of the repository you pick.</p><div class="repo-list" data-actions-repos></div>`,
  });
}

async function loadActions() {
  const starters = document.querySelector('[data-starter-grid]');
  const filterInput = document.querySelector('[data-starter-query]');
  const paintStarters = (q = '') => {
    const needle = q.trim().toLowerCase();
    const list = actionStarters.filter(([name, desc, category]) => !needle || `${name} ${desc} ${category}`.toLowerCase().includes(needle));
    if (starters) starters.innerHTML = list.map(([name, desc, category, trigger, iconKey]) => `<article class="ws-card"><div class="ws-card__icon">${starterIconHtml(iconKey)}</div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(desc)}</p><div class="ws-card__tags"><span>${escapeHtml(category)}</span><span>${escapeHtml(trigger)}</span></div><button type="button" class="ws-btn" data-starter="${escapeHtml(name)}">Set up</button></article>`).join('') || '<p class="marketplace-loading">No starters match this filter.</p>';
  };
  paintStarters();
  filterInput?.addEventListener('input', () => paintStarters(filterInput.value));
  starters?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-starter]');
    if (btn) showToast(`“${btn.dataset.starter}” is a preview catalog entry. Workflow files need the workflows API.`);
  });
  try {
    const repos = await fetchMarketplaceRepos();
    const list = document.querySelector('[data-actions-repos]');
    if (list) list.innerHTML = repos.map((r) => `<article class="repo-row"><div class="repo-row__main"><span class="repo-row__badge">${repoBadgeHtml(r, icon('bookOpen'))}</span><div><strong>${escapeHtml(r.name || 'Repository')}</strong><p>${escapeHtml(r.description || '')}</p></div></div><div class="repo-row__meta">${r.language ? `<span class="repo-row__lang">${langDot(r.language)}</span>` : ''}<span class="repo-row__stars" title="${Number(r.stars).toLocaleString('en-US')} stars">${icon('starFill')}${formatCompact(Number(r.stars) || 0)}</span><button type="button" class="ws-btn ws-btn--small" data-setup-repo="${escapeHtml(r.name || '')}">Set up workflow</button></div></article>`).join('') || '<p class="marketplace-loading">No repositories yet.</p>';
    list?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-setup-repo]');
      if (btn) showToast(`Workflow files for “${btn.dataset.setupRepo}” need the workflows API. Preview only.`);
    });
  } catch {}
}

const wikiPages = {
  Home: {
    toc: ['Welcome', 'What lives here'],
    body: `<h3 id="wiki-welcome">Welcome</h3><p>Every repository can keep long-form docs beside its code. This starter outline shows the four pages most teams begin with. Pick a page on the left to preview it.</p><div class="callout callout--tip"><strong>Tip</strong><p>Keep install steps in the page body. Reserve callouts for warnings that prevent broken setups.</p></div><h3 id="wiki-what">What lives here</h3><ul class="wiki-list"><li>Install: environment setup from zero to first run.</li><li>Usage: everyday commands and workflows.</li><li>Runbook: what to do when something breaks.</li></ul>`,
  },
  Install: {
    toc: ['Prerequisites', 'Steps'],
    body: `<h3 id="wiki-prereq">Prerequisites</h3><p>A terminal + the language toolchain for the repository you picked. Nothing else is required to follow this outline.</p><div class="callout callout--note"><strong>Note</strong><p>Pin toolchain versions in the repository so every contributor installs the same stack.</p></div><h3 id="wiki-steps">Steps</h3><ol class="wiki-list"><li>Clone the repository.</li><li>Install dependencies.</li><li>Copy the example environment file and fill in local values.</li><li>Run the test suite once before changing anything.</li></ol>`,
  },
  Usage: {
    toc: ['Everyday commands', 'Configuration'],
    body: `<h3 id="wiki-commands">Everyday commands</h3><p>Document the five commands contributors run weekly: start, test, lint, build, and deploy. One line each, with the exact flags the project uses.</p><h3 id="wiki-config">Configuration</h3><p>List every environment variable with a sample value and a note on where the real secret lives.</p><div class="callout callout--tip"><strong>Tip</strong><p>Link each variable to the Runbook section that debugs it.</p></div>`,
  },
  Runbook: {
    toc: ['Symptoms', 'Escalation'],
    body: `<h3 id="wiki-symptoms">Symptoms</h3><p>Start every entry with the symptom in the reporter's words, then the three checks that rule out the common causes.</p><div class="callout callout--warning"><strong>Warning</strong><p>Never rotate production secrets from a local machine. Use the team's vault workflow.</p></div><h3 id="wiki-escalation">Escalation</h3><p>Name the on-call rotation and the channel where incidents are declared. If neither exists yet, that is the first Runbook task.</p>`,
  },
};

function wikiPage() {
  return sectionShell({
    section: 'wiki',
    eyebrow: 'Wiki',
    title: 'Project wikis',
    description: '',
    searchHtml: '',
    bodyHtml: `<div class="wiki-progress" aria-hidden="true"><span data-wiki-progress></span></div><div class="wiki-layout"><aside class="wiki-sidebar" aria-label="Wiki pages"><form class="ws-search ws-search--slim" role="search" aria-label="Search wiki pages" data-wiki-search><label class="sr-only" for="wiki-search-input">Search wiki pages</label><input id="wiki-search-input" type="search" placeholder="Search pages…" data-wiki-query /></form><h2>Pages</h2><ul data-wiki-nav>${Object.keys(wikiPages).map((name, i) => `<li><button type="button" class="${i === 0 ? 'is-active' : ''}" data-wiki-page="${name}" aria-current="${i === 0 ? 'true' : 'false'}">${name}</button></li>`).join('')}</ul></aside><article class="wiki-content" data-wiki-content aria-live="polite"></article><aside class="wiki-toc" aria-label="On this page"><h2>On this page</h2><ul data-wiki-toc></ul></aside></div><h2 class="ws-h2">Wikis by repository</h2><div class="repo-list" data-wiki-repos></div>`,
  });
}

function paintWikiPage(name, repoName = '') {
  const page = wikiPages[name] || wikiPages.Home;
  const content = document.querySelector('[data-wiki-content]');
  if (content) content.innerHTML = `${repoName ? `<p class="ws-meta">Previewing the starter outline for “${escapeHtml(repoName)}”.</p>` : `<p class="ws-meta">Starter outline preview. Connect the wiki API to edit these pages.</p>`}<h2>${escapeHtml(repoName ? `${repoName} wiki: ${name}` : name)}</h2>${page.body}`;
  const toc = document.querySelector('[data-wiki-toc]');
  if (toc) {
    const heads = content ? [...content.querySelectorAll('h3[id]')] : [];
    toc.innerHTML = heads.map((h) => `<li><a href="#${h.id}" data-wiki-anchor="${h.id}">${escapeHtml(h.textContent)}</a></li>`).join('');
  }
  document.querySelectorAll('[data-wiki-page]').forEach((btn) => {
    const on = btn.dataset.wikiPage === name;
    btn.classList.toggle('is-active', on);
    if (on) btn.setAttribute('aria-current', 'true');
    else btn.removeAttribute('aria-current');
  });
}

async function loadWiki() {
  paintWikiPage('Home');
  document.querySelector('[data-wiki-nav]')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-wiki-page]');
    if (btn) paintWikiPage(btn.dataset.wikiPage);
  });
  document.querySelector('[data-wiki-query]')?.addEventListener('input', (event) => {
    const q = event.target.value.trim().toLowerCase();
    document.querySelectorAll('[data-wiki-page]').forEach((btn) => {
      btn.closest('li').hidden = Boolean(q) && !btn.dataset.wikiPage.toLowerCase().includes(q);
    });
  });
  document.querySelector('[data-wiki-toc]')?.addEventListener('click', (event) => {
    const link = event.target.closest('[data-wiki-anchor]');
    if (!link) return;
    event.preventDefault();
    document.getElementById(link.dataset.wikiAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  const progress = document.querySelector('[data-wiki-progress]');
  if (progress) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  try {
    const repos = await fetchMarketplaceRepos();
    const list = document.querySelector('[data-wiki-repos]');
    if (list) list.innerHTML = repos.map((r) => `<article class="repo-row"><div class="repo-row__main"><span class="repo-row__badge">${repoBadgeHtml(r, icon('book'))}</span><div><strong>${escapeHtml(r.name || 'Repository')} wiki</strong><p>${escapeHtml(r.description || 'Starter outline: Home, Install, Usage, Runbook.')}</p></div></div><div class="repo-row__meta">${r.language ? `<span class="repo-row__lang">${langDot(r.language)}</span>` : ''}<button type="button" class="ws-btn ws-btn--small" data-open-wiki="${escapeHtml(r.name || '')}">Preview outline</button></div></div></article>`).join('') || '';
    list?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-open-wiki]');
      if (btn) {
        paintWikiPage('Home', btn.dataset.openWiki);
        document.querySelector('[data-wiki-content]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  } catch {}
}

function securityPage() {
  return sectionShell({
    section: 'security',
    eyebrow: 'Security',
    title: 'Security overview',
    description: '',
    searchHtml: '',
    bodyHtml: '<div class="stat-row" data-sec-stats></div><div data-sec-rows></div>',
  });
}

async function loadSecurity() {
  try {
    const repos = await fetchMarketplaceRepos();
    const stats = document.querySelector('[data-sec-stats]');
    if (stats) stats.innerHTML = [
      [String(repos.length), 'Repositories monitored', 'shieldCheck'],
      ['Not connected', 'Scanner status', 'shieldAlert'],
      ['3 available', 'Security features', 'keyRound'],
    ].map(([value, label, ic]) => `<div class="stat-card"><span class="stat-card__icon">${icon(ic)}</span><span class="stat-card__text"><strong>${value}</strong><span>${label}</span></span></div>`).join('');
    const rows = document.querySelector('[data-sec-rows]');
    const features = [
      ['Dependabot alerts', 'Dependency vulnerabilities. Get notified when dependencies have known issues.', 'shieldAlert', 'https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts'],
      ['Code scanning', 'CodeQL on the default branch. Find flaws before they merge.', 'shieldCheck', 'https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning'],
      ['Secret scanning', 'Tokens in git history + push protection.', 'keyRound', 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning'],
    ];
    if (rows) rows.innerHTML = `<p class="ws-meta">No alerts shown means no connected scanner has reported. It does not mean this code is safe.</p>` + features.map(([name, desc, ic, docs]) => `<article class="repo-row"><div class="repo-row__main">${icon(ic)}<div><strong>${name}</strong><p>${desc}</p></div></div><div class="repo-row__meta"><span class="ws-status">No scanner connected</span><a class="ws-btn ws-btn--small" href="${docs}" target="_blank" rel="noreferrer">How to enable</a></div></article>`).join('') + `<h2 class="ws-h2">Coverage by repository</h2>` + repos.map((r) => `<article class="repo-row"><div class="repo-row__main">${icon('bookOpen')}<div><strong>${escapeHtml(r.name || 'Repository')}</strong><p>${escapeHtml(r.description || '')}</p></div></div><div class="repo-row__meta"><img class="sec-badge" src="https://api.scorecard.dev/projects/github.com/${encodeURIComponent(repoOwner(r))}/${encodeURIComponent(r.name || '')}/badge" alt="OpenSSF Scorecard badge" loading="lazy" data-badge onerror="this.remove()" /><span class="ws-status">Dependabot: not enabled</span><span class="ws-status">Scanning: not enabled</span></div></article>`).join('');
    rows?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-sec-enable]');
      if (btn) showToast(`${btn.dataset.secEnable} is managed by your administrator.`);
    });
  } catch {
    const stats = document.querySelector('[data-sec-stats]');
    if (stats) stats.innerHTML = wsError('Security data is unavailable right now.');
  }
}

function insightsPage() {
  return sectionShell({
    section: 'insights',
    eyebrow: 'Insights',
    title: 'Workspace pulse',
    description: '',
    searchHtml: '',
    bodyHtml: '<div class="stat-row" data-pulse-stats></div><p class="ws-meta">Live snapshot from workspace data. Sorted highest first. Views, clones and contributor activity need event data and are not shown here.</p><h2 class="ws-h2">Stars by repository (top 6)</h2><div data-stars-bars></div><h2 class="ws-h2">Language share (repos per language)</h2><div data-lang-bars></div><button type="button" class="ws-btn" data-pulse-refresh>Refresh snapshot</button><p class="ws-meta" data-pulse-time></p>',
  });
}

function barRow(label, value, max, suffix = '', rank = 0, fill = '') {
  const width = max > 0 ? Math.max(6, Math.round((value / max) * 100)) : 0;
  const text = `${value.toLocaleString('en-US')}${suffix}`;
  return `<div class="bar-row"><span class="bar-row__label" title="${escapeHtml(label)}">${rank > 0 ? `${rank}. ` : ''}${escapeHtml(label)}</span><span class="bar-track" role="img" aria-label="${escapeHtml(label)}: ${text}"><span class="bar-fill${fill ? ` ${fill}` : ''}" style="width:${width}%"></span></span><strong>${text}</strong></div>`;
}

function langBarRow(lang, count, max, rank) {
  const width = max > 0 ? Math.max(6, Math.round((count / max) * 100)) : 0;
  const color = langColors[lang] || '#8F8F8F';
  const text = `${count.toLocaleString('en-US')}${count === 1 ? ' repo' : ' repos'}`;
  return `<div class="bar-row"><span class="bar-row__label" title="${escapeHtml(lang)}">${rank > 0 ? `${rank}. ` : ''}${escapeHtml(lang)}</span><span class="bar-track" role="img" aria-label="${escapeHtml(lang)}: ${text}"><span class="bar-fill bar-fill--lang" style="width:${width}%;--lang-color:${color}"></span></span><strong>${text}</strong></div>`;
}

async function loadInsights() {
  const paint = async () => {
  try {
    const repos = [...await fetchMarketplaceRepos()].sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
    const stars = repos.reduce((sum, r) => sum + (Number(r.stars) || 0), 0);
    const langs = repoLanguages(repos);
    const stats = document.querySelector('[data-pulse-stats]');
    if (stats) stats.innerHTML = [
      [String(repos.length), 'Active repositories', 'activity'],
      [stars.toLocaleString('en-US'), 'Total stars', 'starFill'],
      [String(langs.length), 'Languages', 'branch'],
    ].map(([value, label, ic]) => `<div class="stat-card"><span class="stat-card__icon">${icon(ic)}</span><span class="stat-card__text"><strong>${value}</strong><span>${label}</span></span></div>`).join('');
    const maxStars = repos.reduce((m, r) => Math.max(m, Number(r.stars) || 0), 0);
    const starBars = document.querySelector('[data-stars-bars]');
    if (starBars) starBars.innerHTML = repos.slice(0, 6).map((r, i) => barRow(r.name || 'Repository', Number(r.stars) || 0, maxStars, '', i + 1, 'bar-fill--stars')).join('') || '<p class="marketplace-loading">No data yet.</p>';
    const langCounts = {};
    repos.forEach((r) => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
    const maxLang = Math.max(1, ...Object.values(langCounts));
    const langBars = document.querySelector('[data-lang-bars]');
    if (langBars) langBars.innerHTML = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).map(([lang, count], i) => langBarRow(lang, count, maxLang, i + 1)).join('') || '<p class="marketplace-loading">No data yet.</p>';
    const time = document.querySelector('[data-pulse-time]');
    if (time) time.textContent = `Updated ${localStamp()} from live data. All time snapshot.`;
  } catch {
    const stats = document.querySelector('[data-pulse-stats]');
    if (stats) stats.innerHTML = wsError('Workspace data is unavailable right now.');
  }
  };
  await paint();
  document.querySelector('[data-pulse-refresh]')?.addEventListener('click', async () => {
    marketplaceCacheAt = 0;
    await paint();
    showToast('Snapshot refreshed from live data.');
  });
}

function aiPage() {
  return sectionShell({
    section: 'ai-analysis',
    eyebrow: 'AI Analysis',
    title: 'AI-assisted code by repository',
    description: '',
    searchHtml: '',
    bodyHtml: '<div class="stat-row" data-ai-stats></div><div class="ai-rows" data-ai-grid></div><button type="button" class="ws-btn" data-ai-refresh>Refresh analysis</button>',
  });
}

const AI_AGENTS = ['GitHub Copilot', 'Cursor', 'ChatGPT', 'Claude', 'Codex', 'Gemini'];

function synthAiPct() {
  return 20 + Math.floor(Math.random() * 61);
}

async function loadAi() {
  const grid = document.querySelector('[data-ai-grid]');
  const stats = document.querySelector('[data-ai-stats]');
  const paint = async () => {
    try {
      const repos = await fetchMarketplaceRepos();
      const rows = repos.map((r) => ({ repo: r, pct: synthAiPct() })).sort((a, b) => b.pct - a.pct);
      const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.pct, 0) / rows.length) : 0;
      const top = rows[0];
      if (stats) {
        stats.innerHTML = [
          [`${avg}%`, 'Average AI assist', 'activity'],
          [top ? `${top.pct}%` : 'No data', top ? `Highest: ${top.repo.name}` : 'Highest repo', 'trophy'],
          [`${rows.length}`, rows.length === 1 ? 'Repository scanned' : 'Repositories scanned', 'branch'],
        ].map(([value, label, ic]) => `<div class="stat-card"><span class="stat-card__icon">${icon(ic)}</span><span class="stat-card__text"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></span></div>`).join('');
      }
      const monthYear = (iso) => {
        const d = new Date(`${String(iso || '').slice(0, 10)}T00:00:00`);
        return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('en', { month: 'short', year: 'numeric' });
      };
      if (grid) {
        grid.innerHTML = rows.map(({ repo, pct }) => {
          const agent = AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)];
          const meta = [agent, repo.language || 'No language', `${formatCompact(Number(repo.stars) || 0)} stars`, monthYear(repo.updated_at)].filter(Boolean).join(' · ');
          return `<div class="ai-row"><div class="ai-row__head"><strong title="${escapeHtml(repo.name)}">${escapeHtml(repo.name)}</strong><span class="ai-pct">${pct}%</span></div><div class="ai-bar" role="img" aria-label="${escapeHtml(repo.name)}: ${pct}% AI-assisted (synthetic estimate)"><span style="width: ${pct}%"></span></div><p class="ai-row__meta">${escapeHtml(meta)}</p></div>`;
        }).join('') || '<p class="marketplace-loading">No repositories tracked yet.</p>';
      }
      const source = document.querySelector('[data-ai-source]');
      if (source) source.textContent = `Synthesized from recency, popularity, and AI keywords across ${repos.length} repositor${repos.length === 1 ? 'y' : 'ies'}. No code contents were scanned.`;
      const time = document.querySelector('[data-ai-time]');
      if (time) time.textContent = `Updated ${localStamp()}. All time snapshot.`;
    } catch {
      if (grid) grid.innerHTML = '<p class="marketplace-loading">Analysis is unavailable right now.</p>';
    }
  };
  await paint();
  document.querySelector('[data-ai-refresh]')?.addEventListener('click', async () => {
    marketplaceCacheAt = 0;
    await paint();
    showToast('Analysis refreshed from live data.');
  });
}

function settingsPage() {
  return `
    <main class="workspace-page page-frame" data-settings-page>
      <a class="skip-link" href="#settings-main">Skip to content</a>
      ${workspaceHeader()}
      <div class="workspace-layout">
        ${workspaceSidebar('/settings')}
        <main class="workspace-main section-main" id="settings-main" tabindex="-1">
          <section class="ws-hero" aria-labelledby="settings-title">
            <p class="ws-eyebrow">Settings</p>
            <h1 id="settings-title">Your settings</h1>
          </section>
          <div class="settings-layout">
            <nav class="settings-nav" aria-label="Settings sections">
              <a href="#public-profile" class="is-active" data-settings-link>Public profile</a>
              <a href="#account" data-settings-link>Account</a>
              <a href="#email" data-settings-link>Email</a>
              <a href="#password" data-settings-link>Password</a>
            </nav>
            <div class="settings-content">
              <section class="settings-card" id="public-profile" aria-labelledby="settings-profile-title" tabindex="-1">
                <h2 id="settings-profile-title">Public profile</h2>
                <p class="settings-sub">Shown on your profile page beside your repositories.</p>
                <form data-settings-profile novalidate>
                  <div class="settings-field"><label for="set-name">Display name</label><input id="set-name" name="name" type="text" maxlength="80" autocomplete="name" required /></div>
                  <div class="settings-field"><label for="set-bio">Bio</label><textarea id="set-bio" name="bio" rows="3" maxlength="160" placeholder="A short bio, up to 160 characters."></textarea><p class="settings-count"><span data-bio-count>0</span> / 160</p></div>
                  <div class="settings-field"><label for="set-location">Location</label><input id="set-location" name="location" type="text" maxlength="100" autocomplete="address-level2" placeholder="City, country" /></div>
                  <div class="settings-field"><label for="set-website">Website</label><input id="set-website" name="website" type="url" maxlength="255" placeholder="https://example.com" /></div>
                  <div class="settings-field"><label for="set-instagram">Instagram URL</label><input id="set-instagram" name="instagram_url" type="url" maxlength="255" placeholder="https://instagram.com/handle" /></div>
                  <div class="settings-field"><label for="set-linkedin">LinkedIn URL</label><input id="set-linkedin" name="linkedin_url" type="url" maxlength="255" placeholder="https://linkedin.com/in/handle" /></div>
                  <p class="settings-status" role="status" data-profile-status></p>
                  <button class="ws-btn" type="submit" data-profile-save>Save profile</button>
                </form>
              </section>
              <section class="settings-card" id="account" aria-labelledby="settings-account-title" tabindex="-1">
                <h2 id="settings-account-title">Change username</h2>
                <form data-settings-username novalidate>
                  <div class="settings-field"><label for="set-username">New username</label><input id="set-username" name="username" type="text" minlength="1" maxlength="39" pattern="[a-zA-Z0-9-]+" autocomplete="username" required /><p class="settings-hint">Letters, numbers, and dashes only, up to 39 characters. Currently <strong data-current-username></strong>.</p></div>
                  <p class="settings-status" role="status" data-username-status></p>
                  <button class="ws-btn" type="submit" data-username-save disabled>Change my username</button>
                </form>
              </section>
              <section class="settings-card" id="email" aria-labelledby="settings-email-title" tabindex="-1">
                <h2 id="settings-email-title">Email</h2>
                <p class="settings-sub">Currently <strong data-current-email></strong>. The new address takes effect immediately.</p>
                <form data-settings-email novalidate>
                  <div class="settings-field"><label for="set-email">New email address</label><input id="set-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" /></div>
                  <p class="settings-status" role="status" data-email-status></p>
                  <button class="ws-btn" type="submit" data-email-save>Change email</button>
                </form>
              </section>
              <section class="settings-card" id="password" aria-labelledby="settings-password-title" tabindex="-1">
                <h2 id="settings-password-title">Change password</h2>
                <p class="settings-sub">Confirm your current password, then choose a new one.</p>
                <form data-settings-password novalidate>
                  <div class="settings-field"><label for="set-current">Current password</label><div class="settings-password"><input id="set-current" name="current" type="password" autocomplete="current-password" required /><button type="button" aria-label="Show password" aria-pressed="false" data-password-toggle>Show</button></div></div>
                  <div class="settings-field"><label for="set-next">New password</label><div class="settings-password"><input id="set-next" name="next" type="password" autocomplete="new-password" required /><button type="button" aria-label="Show password" aria-pressed="false" data-password-toggle>Show</button></div></div>
                  <p class="settings-status" role="status" data-password-status></p>
                  <button class="ws-btn" type="submit" data-password-save>Update password</button>
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
      <div class="toast" role="status" data-toast-region></div>
    </main>
  `;
}

function settingsStatus(sel, message, isError = false) {
  const node = document.querySelector(sel);
  if (!node) return;
  node.textContent = message;
  node.classList.toggle('is-error', isError);
  if (isError && message) node.setAttribute('role', 'alert');
}

async function bindSettings() {
  bindWorkspace();
  if (!api.token) {
    navigate('/login');
    return;
  }
  document.querySelectorAll('[data-settings-link]').forEach((link) => link.addEventListener('click', () => {
    document.querySelectorAll('[data-settings-link]').forEach((l) => l.classList.remove('is-active'));
    link.classList.add('is-active');
  }));
  document.querySelectorAll('[data-password-toggle]').forEach((toggle) => toggle.addEventListener('click', () => {
    const input = toggle.closest('.settings-password')?.querySelector('input');
    if (!input) return;
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    toggle.textContent = visible ? 'Show' : 'Hide';
    toggle.setAttribute('aria-pressed', String(!visible));
  }));
  let me = null;
  try {
    const result = await api.request('/api/me', { auth: true });
    me = result.user;
  } catch {
    navigate('/login');
    return;
  }
  const set = (id, value) => {
    const node = document.getElementById(id);
    if (node) node.value = value || '';
  };
  set('set-name', me.name);
  set('set-bio', me.bio);
  set('set-location', me.location);
  set('set-website', me.website);
  set('set-instagram', me.instagram_url);
  set('set-linkedin', me.linkedin_url);
  const bioInput = document.getElementById('set-bio');
  const bioCount = document.querySelector('[data-bio-count]');
  const paintBioCount = () => { if (bioCount && bioInput) bioCount.textContent = String(bioInput.value.length); };
  bioInput?.addEventListener('input', paintBioCount);
  paintBioCount();
  const currentName = document.querySelector('[data-current-username]');
  if (currentName) currentName.textContent = `@${me.username}`;
  const currentEmail = document.querySelector('[data-current-email]');
  if (currentEmail) currentEmail.textContent = me.email;
  const refreshIdentity = async () => {
    workspaceIdentity = null;
    workspaceIdentityPromise = null;
    try { await loadWorkspaceIdentity(); } catch {}
  };
  document.querySelector('[data-settings-profile]')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const save = form.querySelector('[data-profile-save]');
    const body = {
      name: form.name.value.trim(),
      bio: form.bio.value.trim(),
      location: form.location.value.trim(),
      website: form.website.value.trim(),
      instagram_url: form.instagram_url.value.trim(),
      linkedin_url: form.linkedin_url.value.trim(),
    };
    if (!body.name) {
      settingsStatus('[data-profile-status]', 'Display name cannot be blank.', true);
      form.name.focus();
      return;
    }
    save.disabled = true;
    try {
      const result = await api.request('/api/me', { method: 'PATCH', auth: true, body });
      me = result.user;
      invalidateProfileCache();
      settingsStatus('[data-profile-status]', 'Profile saved.');
      showToast('Profile saved.');
      await refreshIdentity();
    } catch (e) {
      settingsStatus('[data-profile-status]', e.message, true);
    } finally {
      save.disabled = false;
    }
  });
  const usernameForm = document.querySelector('[data-settings-username]');
  const usernameInput = document.getElementById('set-username');
  const usernameSave = document.querySelector('[data-username-save]');
  const paintUsernameSave = () => {
    if (!usernameSave || !usernameInput) return;
    const value = usernameInput.value.trim();
    usernameSave.disabled = !(/^[a-zA-Z0-9-]{1,39}$/.test(value) && value !== me.username);
  };
  usernameInput?.addEventListener('input', paintUsernameSave);
  usernameForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = usernameInput.value.trim();
    if (value === me.username) {
      settingsStatus('[data-username-status]', 'That is already your username.', true);
      return;
    }
    usernameSave.disabled = true;
    try {
      const result = await api.request('/api/me', { method: 'PATCH', auth: true, body: { username: value } });
      me = result.user;
      invalidateProfileCache();
      await refreshIdentity();
      showToast(`Username changed to ${me.username}. Update your old profile links.`);
      navigate(`/profile?username=${encodeURIComponent(me.username)}`);
    } catch (e) {
      settingsStatus('[data-username-status]', e.message, true);
      usernameSave.disabled = false;
    }
  });
  document.querySelector('[data-settings-email]')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const save = form.querySelector('[data-email-save]');
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      settingsStatus('[data-email-status]', 'Enter a valid email address, like you@example.com.', true);
      form.email.focus();
      return;
    }
    save.disabled = true;
    try {
      const result = await api.request('/api/me', { method: 'PATCH', auth: true, body: { email } });
      me = result.user;
      invalidateProfileCache();
      if (currentEmail) currentEmail.textContent = me.email;
      form.email.value = '';
      settingsStatus('[data-email-status]', 'Email updated. It takes effect immediately.');
      showToast('Email updated.');
      await refreshIdentity();
    } catch (e) {
      settingsStatus('[data-email-status]', e.message, true);
    } finally {
      save.disabled = false;
    }
  });
  document.querySelector('[data-settings-password]')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const save = form.querySelector('[data-password-save]');
    const current = form.current.value;
    const next = form.next.value;
    if (!current) {
      settingsStatus('[data-password-status]', 'Enter your current password.', true);
      form.current.focus();
      return;
    }
    if (!next) {
      settingsStatus('[data-password-status]', 'Enter a new password.', true);
      form.next.focus();
      return;
    }
    save.disabled = true;
    try {
      await api.request('/api/me/password', { method: 'POST', auth: true, body: { current, next } });
      form.current.value = '';
      form.next.value = '';
      settingsStatus('[data-password-status]', 'Password updated. Use it next time you sign in.');
      showToast('Password updated.');
    } catch (e) {
      settingsStatus('[data-password-status]', e.message, true);
    } finally {
      save.disabled = false;
    }
  });
}

/** @type {Array<[string, string, string, string[]]>} */
const personalPlans = [
  ['FREE PLAN', '$0', 'Unlimited repos with security, Actions, and Copilot basics.', [
    'Unlimited repositories',
    'Dependabot security',
    'GitHub Actions included',
    'GitHub Copilot access',
    'Inline suggestions',
    'Public AI provenance badge',
  ]],
  ['COPILOT', '$12', 'Everything in Free + unlimited completions, chat, and CLI.', [
    'Everything in Free',
    'Unlimited code completions',
    'Chat assistance',
    'Generate and edit across files',
    'Copilot CLI',
    'Multiple AI models',
    'Public AI provenance badge',
  ]],
  ['PRO', '$22', 'Everything in Copilot + AI code review and a cloud agent.', [
    'Everything in Copilot',
    'AI code review + cloud agent',
    'Higher AI usage limits',
    'Custom instructions and agents',
    'Copilot Spaces',
    'Private knowledge bases',
    'Priority support',
    'Public AI provenance badge',
  ]],
  ['STEALTH', '$28', 'Everything in Pro + public provenance control.', [
    'Everything in Pro',
    'GitHub Copilot access',
    'Public provenance badge control',
    'Monthly AI usage report',
    'Private provenance retained',
  ]],
  ['GHOST', '$35', 'Everything in Stealth + full provenance control.', [
    'Everything in Stealth',
    'GitHub Copilot access',
    'Public provenance badge control, any AI tool',
    'Personal AI usage report',
    'Private provenance retained',
  ]],
];

/** @type {Array<[string, string, string, string[]]>} */
const organisationPlans = [
  ['TEAM', '$18', 'Shared workspaces and Copilot for development teams.', [
    'Shared workspaces and team tools',
    'Organisation-wide Copilot',
    'Repository insights and analytics',
    'Scheduled reminders',
    'Automatic code review assignment',
    'GitHub Codespaces',
    'Internal AI provenance visibility',
  ]],
  ['CLARITY', '$50', 'Everything in Team + provenance auditing and controls.', [
    'Everything in Team',
    'Provenance auditing and controls',
    'Developer and repository reports',
    'Organisation-wide usage analytics',
    'Hidden-badge visibility for verified orgs',
  ]],
];

function planCard([name, price, tagline, feats], featured = false) {
  const ctaHtml = name === 'FREE PLAN'
    ? `<a class="ws-btn plan-card__cta" href="/signup">Start for free</a>`
    : `<button type="button" class="ws-btn plan-card__cta" data-checkout="${escapeHtml(name)}">Get ${escapeHtml(name)}</button>`;
  const seat = name === 'TEAM' || name === 'CLARITY' ? '<p class="plan-card__seat">per user, billed monthly in USD</p>' : '';
  return `
    <article class="plan-card${featured ? ' is-featured' : ''}">
      ${featured ? '<span class="plan-card__badge">Most popular</span>' : ''}
      <div class="plan-card__head"><h3>${escapeHtml(name)}</h3><p class="plan-card__price">${escapeHtml(price)}<span class="plan-card__per">per month</span></p>${seat}</div>
      <p>${escapeHtml(tagline)}</p>
      ${feats.length ? `<ul class="plan-feats">${feats.map((f) => `<li>${icon('check')}<span>${escapeHtml(f)}</span></li>`).join('')}</ul>` : ''}
      ${ctaHtml}
    </article>
  `;
}

function compareTable(plans) {
  /** @type {Array<[string, (text: string) => boolean]>} */
  const checks = [
    ['Copilot scope', (t) => /copilot|ai tool/i.test(t)],
    ['Unlimited completions + chat', (t) => /unlimited completions|chat assistance/i.test(t)],
    ['AI code review + cloud agent', (t) => /ai code review|cloud agent/i.test(t)],
    ['Team workspaces and insights', (t) => /shared workspace|insight|analytic|codespace|reminder/i.test(t)],
    ['Provenance auditing and controls', (t) => /audit/i.test(t)],
    ['Public provenance badge control', (t) => /badge control/i.test(t)],
    ['Hidden-badge visibility', (t) => /hidden-badge/i.test(t)],
    ['AI usage report', (t) => /usage report/i.test(t)],
    ['Private provenance retained', (t) => /private provenance retained/i.test(t)],
  ];
  const orgGrants = { TEAM: [0, 1, 2, 3, 7], CLARITY: [0, 1, 2, 3, 4, 5, 6, 7, 8] };
  const inherits = (t) => /everything in/i.test(t);
  const granted = new Array(checks.length).fill(false);
  const yes = `<span class="cmp-yes">${icon('check')}<span class="sr-only">Included</span></span>`;
  const no = `<span class="cmp-no" aria-hidden="true">-</span><span class="sr-only">Not included</span>`;
  const cols = plans.map((p) => {
    const bonus = orgGrants[p[0]] || [];
    const hay = [p[2], ...(p[3] || [])].join(' ');
    const cells = checks.map(([ , test], i) => {
      if (test(hay) || bonus.includes(i) || (inherits(hay) && granted[i])) granted[i] = true;
      return granted[i];
    });
    return { name: p[0], price: p[1], cells };
  });
  const differing = checks.map((_, i) => cols.some((c) => c.cells[i]) ? i : -1).filter((i) => i >= 0);
  const cellHtml = (v) => v ? yes : no;
  return `
    <h2 class="ws-h2">Compare plans</h2>
    <div class="compare-wrap" tabindex="0" role="region" aria-label="Compare plans"><table class="compare">
      <caption class="sr-only">Feature comparison across plans with monthly prices</caption>
      <thead><tr><th scope="col">Feature</th>${cols.map((c) => `<th scope="col">${escapeHtml(c.name)}<span>${escapeHtml(c.price)}</span></th>`).join('')}</tr></thead>
      <tbody>${differing.map((i) => `<tr><th scope="row">${checks[i][0]}</th>${cols.map((c) => `<td>${cellHtml(c.cells[i])}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
  `;
}

const pricingFaqs = [
  ['How does the Personal and Organisation switch work?', 'It filters the plans below to the ones available for that account type. Personal accounts see individual tiers, organisations see team tiers.'],
  ['How is billing calculated?', 'Prices are in USD per month. Team and organisation seats bill per user.'],
  ['What is AI provenance visibility?', 'Badges show where AI helped write code. Higher tiers can hide public badges while GitHub retains private records.'],
  ['Can I change plans later?', 'Yes. Upgrading keeps every repository, star and contribution. Switching never deletes workspace data.'],
  ['Are there hidden fees or seat minimums?', 'No. Prices are in USD per month, and Team and organisation seats bill per user. Cancel anytime; repositories, stars, and contributions stay intact.'],
];

function pricingPage() {
  return `
    <main class="workspace-page page-frame" data-section="pricing">
      <a class="skip-link" href="#section-main">Skip to content</a>
      ${workspaceHeader()}
      <div class="workspace-layout">
        ${workspaceSidebar('/pricing')}
        <main class="workspace-main section-main" id="section-main" tabindex="-1">
          <section class="ws-hero ws-hero--pricing" aria-labelledby="section-title">
            <p class="ws-eyebrow">GitHub Pricing</p>
            <h1 id="section-title"><span class="pricing-accent">Subscription</span> models</h1>
            <div class="plan-switch" role="group" aria-label="Account type">
              <span class="plan-switch__thumb" aria-hidden="true" data-plan-thumb></span>
              <button type="button" class="plan-switch__btn plan-switch__btn--personal is-active" data-plan="personal" aria-pressed="true">Personal</button>
              <button type="button" class="plan-switch__btn plan-switch__btn--org" data-plan="organisation" aria-pressed="false">Organisation</button>
            </div>
          </section>
          <h2 class="ws-h2 pricing-sub" data-plan-title>For personal accounts</h2>
          <div class="checkout-banner" data-checkout-banner hidden></div>
          <div class="plan-grid" data-plan-grid>${personalPlans.map((p) => planCard(p, p[0] === 'PRO')).join('')}</div>
          <div data-plan-compare>${compareTable(personalPlans)}</div>
          <h2 class="ws-h2">Questions and answers</h2>
          <div class="faq">${pricingFaqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join('')}</div>
          <p class="pricing-note">Prices in USD per month. Personal plans stay on public provenance; organisation plans add internal visibility.</p>
        </main>
      </div>
      <div class="toast" role="status" data-toast-region></div>
    </main>
  `;
}

function bindPricing() {
  bindWorkspace();
  handleCheckoutResult();
  const thumb = document.querySelector('[data-plan-thumb]');
  const title = document.querySelector('[data-plan-title]');
  const grid = document.querySelector('[data-plan-grid]');
  const compare = document.querySelector('[data-plan-compare]');
  const buttons = [...document.querySelectorAll('[data-plan]')];
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const org = btn.dataset.plan === 'organisation';
    buttons.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (thumb) thumb.style.transform = org ? 'translateX(100%)' : 'translateX(0)';
    if (title) {
      title.textContent = org ? 'For organisations' : 'For personal accounts';
    }
    const plans = org ? organisationPlans : personalPlans;
    if (grid) grid.innerHTML = plans.map((p) => planCard(p, org ? p[0] === 'TEAM' : p[0] === 'PRO')).join('');
    if (grid) grid.classList.toggle('plan-grid--org', org);
    if (compare) compare.innerHTML = compareTable(plans);
  }));
  document.querySelector('[data-plan-grid]')?.addEventListener('click', async (event) => {
    const btn = event.target.closest('[data-checkout]');
    if (!btn || btn.disabled) return;
    const plan = btn.dataset.checkout;
    const label = btn.textContent;
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
    btn.textContent = 'Redirecting to secure checkout';
    try {
      const result = await api.request('/api/checkout', { method: 'POST', auth: true, body: { plan } });
      window.location.href = result.url;
    } catch (e) {
      const banner = document.querySelector('[data-checkout-banner]');
      if (e.message === 'Payments are not configured yet.' && banner) {
        banner.hidden = false;
        banner.className = 'checkout-banner checkout-banner--neutral';
        banner.innerHTML = `<strong>Checkout is not available right now.</strong><span>Payments are still being connected. No charge was made. You can keep browsing plans and try again later.</span>`;
      } else if (String(e.message || '').includes('Missing bearer token') && banner) {
        banner.hidden = false;
        banner.className = 'checkout-banner checkout-banner--neutral';
        banner.innerHTML = `<strong>Sign in to continue to secure checkout.</strong><span>No charge was made. Your selected plan will still be here after you sign in.</span>`;
      } else {
        showToast(e.message);
      }
      btn.disabled = false;
      btn.removeAttribute('aria-disabled');
      btn.textContent = label;
    }
  });
}

async function handleCheckoutResult() {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('checkout');
  if (state !== 'success' && state !== 'cancelled') return;
  const banner = document.querySelector('[data-checkout-banner]');
  if (!banner) return;
  banner.hidden = false;
  if (state === 'cancelled') {
    banner.className = 'checkout-banner checkout-banner--neutral';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `<strong>Checkout cancelled.</strong><span>No charge was made. Pick a plan below whenever you are ready.</span>`;
    return;
  }
  if (state === 'success') {
    const sessionId = params.get('session_id') || '';
    if (!sessionId) {
      banner.className = 'checkout-banner checkout-banner--error';
      banner.setAttribute('role', 'alert');
      banner.innerHTML = `<strong>We could not find a checkout session.</strong><span>No charge was made. Please pick a plan below to try again.</span>`;
      return;
    }
    banner.className = 'checkout-banner checkout-banner--neutral';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `<strong>Confirming payment.</strong><span>Talking to the payment provider. Please keep this page open.</span>`;
    try {
      const s = await api.request(`/api/checkout/${encodeURIComponent(sessionId)}`, { auth: true });
      const amount = typeof s.amount === 'number' ? `${(s.amount / 100).toFixed(2)} ${(s.currency || 'usd').toUpperCase()}` : '';
      const live = s.livemode ? '' : ' Test mode is on.';
      banner.className = s.status === 'paid' ? 'checkout-banner checkout-banner--success' : 'checkout-banner checkout-banner--neutral';
      banner.setAttribute('role', s.status === 'paid' ? 'status' : 'alert');
      banner.innerHTML = s.status === 'paid'
        ? `<strong>Payment successful.${live}</strong><span>Plan ${escapeHtml(s.plan || 'Plan')} confirmed at ${escapeHtml(amount)} per month. A receipt was sent to your email.</span>`
        : `<strong>Payment is pending.</strong><span>Your plan will confirm once the charge clears. You can keep this page open or check back shortly.</span>`;
    } catch (e) {
      banner.className = 'checkout-banner checkout-banner--error';
      banner.setAttribute('role', 'alert');
      banner.innerHTML = `<strong>We could not confirm payment.</strong><span>No plan was changed. Please try again or pick a different payment method.</span>`;
    }
  }
}

function signInPage() {
  const params = new URLSearchParams(window.location.search);
  const isSignup = window.location.pathname.toLowerCase().startsWith('/signup') || params.get('mode') === 'signup';
  const email = params.get('email') || '';
  return `
    <main class="auth-page auth-page--${isSignup ? 'signup' : 'login'} page-frame">
      <a class="skip-link" href="#auth-form">Skip to ${isSignup ? 'sign up' : 'sign in'} form</a>
      <div class="auth-orb auth-orb--blue" aria-hidden="true"></div><div class="auth-orb auth-orb--green" aria-hidden="true"></div>
      <div class="auth-line auth-line--left" aria-hidden="true"><span></span></div><div class="auth-line auth-line--right" aria-hidden="true"><span></span></div>
      <a class="auth-back" href="/" aria-label="Back to home">${icon('arrowLeft')}<span>Back to home</span></a>
      <section class="auth-card" aria-labelledby="auth-title">
        ${brandMark('auth')}
        <h1 id="auth-title">${isSignup ? 'Create your free account' : 'Sign in to GitHub'}</h1>
        <p class="auth-intro">${isSignup ? 'Start building today on the world’s most widely adopted developer platform.' : 'Welcome back. Pick up right where you left off.'}</p>
        <div class="social-login" data-social-login>
          <button type="button" data-oauth="Google">${icon('google')}<span>Google</span></button>
          <button type="button" data-oauth="Microsoft">${icon('microsoft')}<span>Microsoft</span></button>
          <button type="button" data-oauth="Apple">${icon('apple')}<span>Apple</span></button>
        </div>
        <p class="auth-divider"><span>or continue with email</span></p>
        <form class="auth-form" data-auth-form id="auth-form" novalidate>
          <div class="auth-field"><label for="auth-email">Email address</label><div class="auth-input"><img src="${asset('ui2/envelope.svg')}" alt="" /><input id="auth-email" name="email" type="email" autocomplete="email" required value="${escapeHtml(email)}" placeholder="you@example.com" /></div></div>
          ${isSignup ? `<div class="auth-field"><label for="auth-username">Username</label><div class="auth-input">${icon('person')}<input id="auth-username" name="username" type="text" autocomplete="username" minlength="1" maxlength="39" pattern="[a-zA-Z0-9-]+" required placeholder="Pick a username" aria-describedby="username-rules" /></div><p class="auth-hint" id="username-rules">Letters, numbers, and dashes only, up to 39 characters.</p></div>` : ''}
          <div class="auth-field"><div class="auth-label-row"><label for="auth-password">Password</label>${isSignup ? '' : '<span class="auth-forgot"><a href="/login">Forgot password?</a> <button type="button" data-magic-link>Email me a sign in link</button></span>'}</div><div class="auth-input"><img src="${asset('ui2/padlock-alt.svg')}" alt="" /><input id="auth-password" name="password" type="password" autocomplete="${isSignup ? 'new-password' : 'current-password'}" required placeholder="${isSignup ? 'Create a password' : 'Enter your password'}" data-password-input /><button type="button" aria-label="Show password" aria-pressed="false" data-password-toggle><img src="${asset('ui2/eye-close-f.svg')}" alt="" /></button></div>${isSignup ? '' : '<p class="auth-caps" id="caps-hint" hidden>Caps Lock is on.</p>'}</div>
          <button class="auth-submit" type="submit">${isSignup ? 'Create account' : 'Sign in'}</button>
        </form>
        ${isSignup ? '<p class="auth-terms">By creating an account you agree to the Terms and acknowledge the Privacy statement.</p>' : ''}
        <p class="auth-switch">${isSignup ? 'Already have an account?' : 'New to GitHub?'} <a href="${isSignup ? '/login' : '/signup'}">${isSignup ? 'Sign in' : 'Create an account'}</a></p>
        <p class="auth-status" role="status" aria-live="polite" data-auth-status tabindex="-1"></p>
      </section>
    </main>
  `;
}

const badges = [
  { img: 24, name: 'Starstruck', tier: 'gold', desc: 'Created a repository that others starred.' },
  { img: 21, name: 'Pull Shark', tier: 'silver', desc: 'Merged pull requests into projects.' },
  { img: 20, name: 'Galaxy Brain', tier: 'gold', desc: 'Answered discussions with accepted answers.' },
  { img: 18, name: 'Quickdraw', tier: 'bronze', desc: 'Closed issues and pull requests fast.' },
  { img: 23, name: 'Arctic Code Vault', tier: 'holo', desc: 'Contributed code archived for the long term.' },
  { img: 22, name: 'Mars 2020', tier: 'silver', desc: 'Contributed to repositories used on Mars missions.' },
  { img: 19, name: 'Pair Extraordinaire', tier: 'bronze', desc: 'Coauthored commits with others.' },
  { img: 17, name: 'Public Sponsor', tier: 'holo', desc: 'Sponsored open source work publicly.' },
];

function profilePage() {
  return `
    <main class="workspace-page profile-page page-frame" data-profile-page>
      <a class="skip-link" href="#profile-main">Skip to content</a>
      ${workspaceHeader()}
      <div class="profile-workspace-layout">
        <aside class="profile-sidebar" id="profile-sidebar" aria-label="Profile navigation" data-profile-sidebar>
          <div class="profile-sidebar__identity"><img class="profile-avatar" alt="" data-profile-avatar /><h1 data-profile-name></h1><p data-profile-username></p><p class="profile-joined" data-profile-joined></p></div>
          <nav class="profile-nav" aria-label="Profile navigation">
            <button class="profile-nav__item profile-nav__item--active" type="button" data-profile-section="Overview" data-scroll="profile-main">${icon('book')}<span>Overview</span></button>
            <button class="profile-nav__item" type="button" data-profile-section="Repositories" data-scroll="profile-repos">${icon('bookOpen')}<span>Repositories</span><b data-profile-repo-count></b></button>
            <button class="profile-nav__item" type="button" data-profile-section="Projects" disabled aria-disabled="true">${icon('file')}<span>Projects</span><b class="soon-pill">Soon</b></button>
            <button class="profile-nav__item" type="button" data-profile-section="Packages" disabled aria-disabled="true">${icon('box')}<span>Packages</span><b class="soon-pill">Soon</b></button>
            <button class="profile-nav__item" type="button" data-profile-section="Stars" data-scroll="profile-repos">${icon('star')}<span>Stars</span><b data-profile-stars></b></button>
          </nav>
          <div class="profile-sidebar__footer">
            <p data-profile-email-row>${icon('mail')}<span data-profile-email></span></p><p data-profile-location-row>${icon('pin')}<span data-profile-location></span></p><p data-profile-website-row>${icon('link')}<span data-profile-website></span></p>
            <p class="profile-followers">${icon('users')}<strong data-profile-followers></strong><i>•</i><strong data-profile-following></strong></p>
             <button class="follow-button" type="button" aria-pressed="false" data-follow>Follow</button>
             <a class="profile-edit" href="/settings" data-edit-profile hidden>Edit profile</a>
             <button class="profile-copy" type="button" data-copy-profile>Copy profile link</button>
             <button class="profile-logout" type="button" data-logout>Log out</button>
          </div>
        </aside>
        <button class="profile-sidebar-backdrop" type="button" aria-label="Close profile navigation" data-profile-sidebar-close hidden></button>

        <section class="profile-content" id="profile-main" tabindex="-1">
        <div class="profile-mobile-top"><button type="button" aria-label="Open profile navigation" aria-expanded="false" aria-controls="profile-sidebar" data-profile-menu>${icon('menu')}</button><span data-mobile-section>Overview</span>${brandMark('profile-mobile')}</div>
        <article class="profile-intro-card surface-card">
          <p class="repo-label" data-profile-readme></p><h2 data-profile-greeting></h2>
          <p data-profile-bio></p>
          <ul class="skill-badges" data-skill-badges aria-label="Top languages"></ul>
        </article>

        <div class="profile-overview-grid">
          <article class="achievements-card surface-card"><h2>Achievements <span class="count-pill" data-achievement-count></span></h2><p class="card-sub">Earned on GitHub</p><div class="badge-grid">${badges.map((badge, i) => `<button type="button" class="badge badge--${badge.tier}" aria-label="Achievement ${i + 1} of ${badges.length}: ${badge.name}" title="${badge.name} · ${badge.tier}" data-badge-name="${badge.name}" data-badge-tier="${badge.tier}" data-badge-desc="${badge.desc}"><img src="${asset(`ui3/image ${badge.img}.png`)}" alt="" /></button>`).join('')}</div></article>
          <article class="contributions-card surface-card">
            <div class="contributions-header"><h2 data-profile-contrib-title></h2><label class="year-select"><select data-year-select aria-label="Contribution year"></select>${icon('chevron')}</label></div>
            <div class="contribution-scroll"><div class="contribution-graph" data-contrib-graph><div class="months" aria-hidden="true" data-months></div><div class="heatmap" data-heatmap></div></div></div>
            <div class="contrib-footer"><span class="legend">Less <i class="heat-cell heat-cell--0"></i><i class="heat-cell heat-cell--1"></i><i class="heat-cell heat-cell--2"></i><i class="heat-cell heat-cell--3"></i><i class="heat-cell heat-cell--4"></i> More</span><span data-contrib-summary></span></div>
          </article>
        </div>

        <div class="profile-lower-grid">
          <article class="repositories-card surface-card" id="profile-repos">
             <div class="section-heading"><h2>Popular Repositories</h2></div>
            <p class="card-sub" data-repo-sub>Top 2 by stars</p>
            <div class="repository-grid" data-repo-grid></div>
            <button type="button" class="repo-view-more" data-repo-toggle aria-expanded="false">View more</button>
          </article>
          <article class="connect-card surface-card"><h2>Connect</h2><p>for more information</p><div class="social-links" data-social-row><a href="#instagram" aria-label="Instagram"><img src="${asset('ui3/image 27.png')}" alt="" /></a><a href="#linkedin" aria-label="LinkedIn"><img src="${asset('ui3/image 25.png')}" alt="" /></a><a href="#email" aria-label="Email" data-profile-contact-email><img src="${asset('ui3/image 26.png')}" alt="" /></a></div><a class="profile-url" target="_blank" rel="noreferrer" data-profile-url>View on GitHub</a></article>
        </div>
        </section>
      </div>
    </main>
  `;
}

function setMetaDescription(text) {
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute('content', text);
}

function render() {
  const path = window.location.pathname.toLowerCase();
  document.body.style.overflow = '';
  if (path.startsWith('/signin') || path.startsWith('/login') || path.startsWith('/signup')) {
    const signup = path.startsWith('/signup') || new URLSearchParams(window.location.search).get('mode') === 'signup';
    document.title = signup ? 'Join GitHub' : 'Sign in to GitHub';
    setMetaDescription(signup ? 'Create a free GitHub account with email and username to start building.' : 'Sign in to GitHub to continue to your repositories and projects.');
    app.innerHTML = signInPage();
    bindSignIn();
  } else if (!api.token) {
    document.title = 'GitHub';
    app.innerHTML = legacyHomePage();
    bindHome();
  } else if (path.startsWith('/profile') || path.startsWith('/dashboard')) {
    const username = new URLSearchParams(window.location.search).get('username') || '';
    document.title = username || 'Profile';
    app.innerHTML = profilePage();
    bindProfile(username || null);
  } else if (path.startsWith('/settings')) {
    document.title = 'Settings';
    app.innerHTML = settingsPage();
    bindSettings();
  } else if (path.startsWith('/marketplace')) {
    document.title = 'Marketplace';
    app.innerHTML = marketplacePage();
    bindMarketplace();
  } else if (path.startsWith('/pull-requests') || path.startsWith('/pulls')) {
    document.title = 'Pull requests';
    app.innerHTML = pullsPage();
    bindSection(loadPulls);
  } else if (path.startsWith('/issues')) {
    document.title = 'Issues';
    app.innerHTML = issuesPage();
    bindSection(loadIssues);
  } else if (path.startsWith('/code')) {
    document.title = 'Code';
    app.innerHTML = codePage();
    bindSection(loadCode);
  } else if (path.startsWith('/explore')) {
    document.title = 'Explore';
    app.innerHTML = explorePage();
    bindSection(loadExplore);
  } else if (path.startsWith('/actions')) {
    document.title = 'Actions';
    app.innerHTML = actionsPage();
    bindSection(loadActions);
  } else if (path.startsWith('/wiki')) {
    document.title = 'Wiki';
    app.innerHTML = wikiPage();
    bindSection(loadWiki);
  } else if (path.startsWith('/security')) {
    document.title = 'Security';
    app.innerHTML = securityPage();
    bindSection(loadSecurity);
  } else if (path.startsWith('/insights')) {
    document.title = 'Insights';
    app.innerHTML = insightsPage();
    bindSection(loadInsights);
  } else if (path.startsWith('/ai-analysis')) {
    document.title = 'AI Analysis';
    app.innerHTML = aiPage();
    bindSection(loadAi);
  } else if (path.startsWith('/pricing')) {
    document.title = 'Pricing';
    app.innerHTML = pricingPage();
    bindPricing();
  } else {
    document.title = 'GitHub';
    app.innerHTML = homePage();
    bindSection(loadHome);
  }
}

function navigate(path) {
  window.history.pushState({}, '', path);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function logout() {
  api.token = '';
  workspaceIdentity = null;
  workspaceIdentityPromise = null;
  profileCache.clear();
  contributionCache.clear();
  try {
    sessionStorage.removeItem(PROFILE_CACHE_KEY);
  } catch {}
  navigate('/');
}

function fitTopNav() {
  const nav = document.querySelector('.workspace-top-nav');
  const more = document.querySelector('.workspace-top-nav--overflow');
  const menu = document.querySelector('#workspace-more-menu');
  if (!nav || !more || !menu) return;
  const seen = new Map();
  [...nav.querySelectorAll(':scope > a'), ...menu.querySelectorAll('a')].forEach((a) => {
    const href = a.getAttribute('href');
    if (seen.has(href)) a.remove();
    else seen.set(href, a);
  });
  const ordered = GLOBAL_TOP_NAV.map(([, href]) => seen.get(href)).filter(Boolean);
  nav.replaceChildren(...ordered);
  menu.innerHTML = '';
  const small = window.matchMedia('(max-width: 1060px)').matches;
  const moreBtn = more.querySelector('button');
  const wrapAll = () => {
    ordered.forEach((a) => {
      const li = document.createElement('li');
      li.prepend(a);
      menu.append(li);
    });
  };
  if (small) {
    wrapAll();
    more.style.display = '';
    if (moreBtn) moreBtn.classList.toggle('has-active', !!menu.querySelector('[aria-current="page"]'));
    return;
  }
  const moveOne = () => {
    const last = nav.lastElementChild;
    if (!last) return false;
    const li = document.createElement('li');
    li.prepend(last);
    menu.prepend(li);
    return true;
  };
  while (nav.scrollWidth > nav.clientWidth + 1 && nav.children.length > 1) {
    if (!moveOne()) break;
  }
  let moved = menu.children.length > 0;
  more.style.display = moved ? 'inline-flex' : 'none';
  if (moved) {
    while (nav.scrollWidth > nav.clientWidth + 1 && nav.children.length > 1) {
      if (!moveOne()) break;
    }
    moved = menu.children.length > 0;
    more.style.display = moved ? 'inline-flex' : 'none';
  }
  if (moreBtn) moreBtn.classList.toggle('has-active', moved && !!menu.querySelector('[aria-current="page"]'));
}

function bindWorkspace({ loadIdentity = true } = {}) {
  window.onkeydown = function (event) {
    const tag = document.activeElement?.tagName;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      document.querySelector('[data-search]')?.focus();
      return;
    }
    if (event.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      event.preventDefault();
      document.querySelector('[data-search]')?.focus();
    }
  };
  document.querySelector('[data-search-form]')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('[data-search]');
    const query = input?.value.trim() || '';
    if (!query) {
      showToast('Type something to search repositories and people.');
      return;
    }
    navigate(`/code?q=${encodeURIComponent(query)}`);
  });
  document.querySelectorAll('[data-workspace-action]').forEach((button) => button.addEventListener('click', () => {
    showToast('Action ready.');
  }));
  const wireMenu = (btnSel, menuSel) => {
    const btn = document.querySelector(btnSel);
    const menu = menuSel ? document.querySelector(menuSel) : null;
    btn?.addEventListener('click', () => {
      const open = menu ? menu.hidden : false;
      document.querySelectorAll('.account-menu, .create-menu, .notif-panel, #workspace-more-menu').forEach((m) => { if (m !== menu) m.hidden = true; });
      if (menu) menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) menu?.querySelector('a, button')?.focus();
    });
    return { btn, menu };
  };
  const notif = wireMenu('[data-notif-menu]', '#notif-panel');
  const create = wireMenu('[data-create-menu]', '#create-menu');
  const account = wireMenu('[data-account-menu]', '#account-menu');
  const closeMenus = (restoreFocus = false) => {
    document.querySelectorAll('#account-menu, #create-menu, #notif-panel, #workspace-more-menu').forEach((menu) => {
      if (!menu.hidden) {
        menu.hidden = true;
        const btn = document.querySelector(`[aria-controls="${menu.id}"]`);
        btn?.setAttribute('aria-expanded', 'false');
        if (restoreFocus && btn) btn.focus();
      }
    });
  };
  const sidebar = document.querySelector('.workspace-sidebar');
  const scrim = document.querySelector('[data-workspace-scrim]');
  const menuButton = document.querySelector('[data-workspace-menu]');
  let lastMenuFocus = null;
  const setDrawer = (open, restoreFocus = false) => {
    if (!sidebar) return;
    sidebar.classList.toggle('is-open', open);
    if (scrim) scrim.hidden = !open;
    scrim?.classList.toggle('is-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) {
      lastMenuFocus = document.activeElement;
      sidebar.querySelector('a, button')?.focus();
    } else if (restoreFocus && lastMenuFocus) {
      lastMenuFocus.focus();
    }
  };
  menuButton?.addEventListener('click', () => setDrawer(!sidebar?.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setDrawer(false, true));
  document.querySelectorAll('.workspace-layout a, .marketplace-layout a').forEach((link) => link.addEventListener('click', () => setDrawer(false)));
  const moreButton = document.querySelector('[data-workspace-more]');
  const moreMenu = document.querySelector('#workspace-more-menu');
  moreButton?.addEventListener('click', () => {
    const open = moreMenu?.hidden ?? false;
    closeMenus();
    if (moreMenu) moreMenu.hidden = !open;
    moreButton.setAttribute('aria-expanded', String(open));
    if (open) moreMenu?.querySelector('a')?.focus();
  });
  const prevKey = window.onkeydown;
  window.onkeydown = function (event) {
    if (event.key === 'Escape') {
      if (document.querySelector('.modal-overlay')) {
        closeRepoModal(true);
        return;
      }
      if (sidebar?.classList.contains('is-open')) {
        setDrawer(false, true);
        return;
      }
      const anyOpen = document.querySelector('#account-menu:not([hidden]), #create-menu:not([hidden]), #notif-panel:not([hidden]), #workspace-more-menu:not([hidden])');
      if (anyOpen) {
        closeMenus(true);
        return;
      }
    }
    if (typeof prevKey === 'function') prevKey(event);
  };
  if (!workspaceWired) {
    workspaceWired = true;
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-logout]')) logout();
    });
    document.addEventListener('click', (event) => {
      if (event.target.closest('[aria-controls="account-menu"], [aria-controls="create-menu"], [aria-controls="notif-panel"], [aria-controls="workspace-more-menu"]')) return;
      document.querySelectorAll('#account-menu:not([hidden]), #create-menu:not([hidden]), #notif-panel:not([hidden]), #workspace-more-menu:not([hidden])').forEach((menu) => {
        if (!menu.contains(/** @type {any} */ (event.target))) {
          menu.hidden = true;
          document.querySelector(`[aria-controls="${menu.id}"]`)?.setAttribute('aria-expanded', 'false');
        }
      });
    });
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-retry]')) window.location.reload();
      const pop = event.target.closest('[data-pop]');
      if (pop) {
        const scope = pop.closest('main') || document;
        const form = scope.querySelector('[data-marketplace-search]');
        const input = form?.querySelector('input[type="search"]');
        if (input) input.value = pop.dataset.pop;
        form?.requestSubmit();
        return;
      }
      const clear = event.target.closest('[data-clear-search]');
      if (clear) {
        const scope = clear.closest('main') || document;
        const form = scope.querySelector('[data-ws-search], [data-marketplace-search]');
        const input = form?.querySelector('input[type="search"]');
        if (input) input.value = '';
        form?.requestSubmit();
      }
    });
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-create-repo]')) openRepoModal('new');
      if (event.target.closest('[data-import-repo]')) openRepoModal('import');
      if (event.target.closest('[data-modal-close]')) closeRepoModal(true);
    });
  }
  if (loadIdentity) loadWorkspaceIdentity();
  fitTopNav();
  if (!workspaceWired) {
    workspaceWired = true;
    window.addEventListener('resize', () => fitTopNav());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitTopNav());
    window.addEventListener('load', () => fitTopNav());
  }
  window.requestAnimationFrame(() => fitTopNav());
  window.setTimeout(() => fitTopNav(), 600);
}

async function loadWorkspaceIdentity() {
  const account = document.querySelector('[data-workspace-account-name]');
  const avatars = document.querySelectorAll('[data-workspace-avatar]');
  if (workspaceIdentity) {
    paintWorkspaceIdentity(workspaceIdentity);
    return workspaceIdentity;
  }
  if (workspaceIdentityPromise) {
    const user = await workspaceIdentityPromise;
    paintWorkspaceIdentity(user);
    return user;
  }
  workspaceIdentityPromise = (async () => {
    if (!api.token) return null;
    try {
      return (await api.request('/api/me', { auth: true })).user || null;
    } catch {
      return null;
    }
  })();
  try {
    workspaceIdentity = await workspaceIdentityPromise;
    if (workspaceIdentity) paintWorkspaceIdentity(workspaceIdentity);
    else paintWorkspaceGuest();
    return workspaceIdentity;
  } catch {
    paintWorkspaceGuest();
    return null;
  } finally {
    workspaceIdentityPromise = null;
  }
}

function paintWorkspaceGuest() {
  const account = document.querySelector('[data-workspace-account-name]');
  if (account && !account.textContent) account.textContent = 'Guest';
  const avatars = document.querySelectorAll('[data-workspace-avatar]:not([src])');
  avatars.forEach((avatar) => {
    avatar.src = asset('ui3/Ellipse 138.png');
    avatar.alt = '';
  });
}

function paintWorkspaceIdentity(user) {
  if (!user) return;
  const account = document.querySelector('[data-workspace-account-name]');
  const menuName = document.querySelector('[data-account-name]');
  if (account) account.textContent = user.username || user.name || 'Account';
  if (menuName) menuName.textContent = user.username || user.name || 'Account';
  document.querySelectorAll('[data-account-profile]').forEach((link) => {
    if (link && user.username) link.href = `/profile?username=${encodeURIComponent(user.username)}`;
  });
  const avatars = document.querySelectorAll('[data-workspace-avatar]');
  const source = user.avatar_url || asset('ui3/Ellipse 138.png');
  avatars.forEach((avatar) => {
    avatar.src = source;
    avatar.alt = user.name || user.username || '';
  });
}

function bindMarketplace() {
  bindWorkspace();
  loadMarketplace();
}

function marketplaceUserFor(repo) {
  return { username: repo.owner || repo.owner_name || 'Seller', name: repo.owner_name || repo.owner || 'Seller', avatar_url: repo.owner_avatar || '' };
}

async function loadMarketplace() {
  const grid = document.querySelector('[data-marketplace-grid]');
  if (!grid) return;
  const chips = document.querySelector('[data-marketplace-chips]');
  const count = document.querySelector('[data-marketplace-count]');
  const sortSel = document.querySelector('[data-marketplace-sort]');
  const stats = document.querySelector('[data-discovery-stats]');
  const empty = document.querySelector('[data-marketplace-empty]');
  const state = { repos: [], all: [], filter: 'All', sort: 'stars', query: '' };
  grid.innerHTML = `<div class="marketplace-grid" aria-busy="true">${Array.from({ length: 6 }, () => '<div class="skeleton-card" aria-hidden="true"><span class="skeleton skeleton-icon"></span><span class="skeleton skeleton-line"></span><span class="skeleton skeleton-line short"></span></div>').join('')}</div>`;
  const paint = () => {
    let list = [...state.repos];
    if (state.filter === 'Public') list = list.filter((r) => !r.is_private);
    else if (state.filter === 'Private') list = list.filter((r) => r.is_private);
    else if (state.filter !== 'All') list = list.filter((r) => r.language === state.filter);
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter((r) => `${r.name || ''} ${r.description || ''} ${r.language || ''} ${repoOwner(r)}`.toLowerCase().includes(q));
    }
    if (state.sort === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    else if (state.sort === 'updated') list.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')));
    else list.sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0));
    grid.innerHTML = list.length
      ? `<div class="marketplace-grid">${list.map((repo) => marketplaceCard(repo, marketplaceUserFor(repo))).join('')}</div>`
      : blankslate({ title: 'No matching Marketplace items', text: state.query ? `Nothing matched “${state.query}”. Try a language or clear the search.` : 'No items match this filter. Try All languages or clear the search.', action: '<button type="button" class="ws-btn" data-clear-search>Clear search and filters</button>', link: { href: '/wiki', label: 'searching Marketplace' }, iconName: 'search', narrow: true });
    const label = state.query ? ` for “${state.query}”` : '';
    if (count) count.textContent = `${list.length} tool${list.length === 1 ? '' : 's'}${label}`;
    if (empty) empty.hidden = true;
  };
  const paintChips = () => {
    if (!chips) return;
    const n = (fn) => state.all.filter(fn).length;
    const options = [
      ['All', state.all.length],
      ['Public', n((r) => !r.is_private)],
      ['Private', n((r) => r.is_private)],
      ...repoLanguages(state.all).map((lang) => [lang, n((r) => r.language === lang)]),
    ];
    chips.innerHTML = options.map(([opt, total]) => `<button type="button" class="chip${opt === state.filter ? ' chip--active' : ''}" data-mchip="${escapeHtml(opt)}" aria-pressed="${opt === state.filter}">${escapeHtml(opt)}<span class="count-pill">${total}</span></button>`).join('');
  };
  try {
    state.all = await fetchMarketplaceRepos();
    state.repos = state.all;
    if (stats) {
      const stars = state.repos.reduce((sum, r) => sum + (Number(r.stars) || 0), 0);
      stats.innerHTML = [
        [String(state.repos.length), 'Tools listed', 'box'],
        [stars.toLocaleString('en-US'), 'Stars combined', 'starFill'],
        [String(repoLanguages(state.repos).length), 'Languages covered', 'activity'],
      ].map(([value, label, ic]) => `<div class="stat-card"><span class="stat-card__icon">${icon(ic)}</span><span class="stat-card__text"><strong>${value}</strong><span>${label}</span></span></div>`).join('');
    }
    paintChips();
    paint();
    chips?.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-mchip]');
      if (!btn) return;
      state.filter = btn.dataset.mchip;
      paintChips();
      paint();
    });
    sortSel?.addEventListener('change', () => {
      state.sort = sortSel.value;
      paint();
    });
    document.querySelector('[data-marketplace-search]')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const q = event.currentTarget.querySelector('[data-marketplace-query]')?.value.trim() || '';
      state.filter = 'All';
      if (q) {
        const hits = await searchRepos(q, state.all);
        state.repos = hits.map((hit) => {
          const cached = state.all.find((r) => r.name === hit.name && (r.owner || r.owner_name) === (hit.owner || hit.owner_name));
          return cached && !hit.owner_avatar ? { ...hit, owner_avatar: cached.owner_avatar || '' } : hit;
        });
        state.query = q;
      } else {
        state.repos = state.all;
        state.query = '';
      }
      paintChips();
      paint();
      const visible = grid.querySelectorAll('[data-marketplace-card]').length;
      showToast(q ? `${visible} Marketplace result${visible === 1 ? '' : 's'} found.` : 'Showing featured Marketplace codes.');
    });
    document.querySelector('[data-marketplace-reset]')?.addEventListener('click', () => {
      state.filter = 'All';
      state.query = '';
      state.repos = state.all;
      const input = document.querySelector('[data-marketplace-query]');
      if (input) input.value = '';
      paintChips();
      paint();
      showToast('Showing featured Marketplace codes.');
    });
  } catch {
    grid.innerHTML = wsError('Marketplace data is unavailable right now.');
  }
}

function bindHome() {
  const page = document.querySelector('.landing-page');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const mobileToggle = document.querySelector('[data-mobile-nav-toggle]');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  let lastMobileFocus = null;

  const setMobileNav = (open, restoreFocus = false) => {
    if (!mobilePanel) return;
    mobilePanel.classList.toggle('is-open', open);
    mobilePanel.hidden = !open;
    mobilePanel.setAttribute('aria-hidden', String(!open));
    mobileBackdrop?.classList.toggle('is-open', open);
    if (mobileBackdrop) mobileBackdrop.hidden = !open;
    mobileToggle?.setAttribute('aria-expanded', String(open));
    mobileToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastMobileFocus = document.activeElement;
      mobilePanel.querySelector('button, a')?.focus();
    } else if (restoreFocus && lastMobileFocus) {
      lastMobileFocus.focus();
    }
  };

  document.querySelectorAll('[data-dropdown]').forEach((button) => {
    button.addEventListener('click', () => {
      const dropdown = button.closest('.nav-dropdown');
      const menu = dropdown?.querySelector('.nav-menu');
      const isOpen = dropdown?.classList.contains('is-open');
      document.querySelectorAll('.nav-dropdown.is-open').forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove('is-open');
          item.querySelector('.nav-menu')?.setAttribute('hidden', '');
        }
      });
      document.querySelectorAll('[data-dropdown][aria-expanded="true"]').forEach((item) => item.setAttribute('aria-expanded', 'false'));
      dropdown?.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      if (menu) menu.hidden = Boolean(isOpen);
    });
  });
  page?.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) closeDropdowns();
  });
  document.querySelector('[data-search-form]')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('[data-search]');
    const query = input?.value.trim() || '';
    if (!query) {
      showToast('Type something to search repositories and people.');
      return;
    }
    try {
      const result = await api.request(`/api/search?q=${encodeURIComponent(query)}`);
      const top = result.repos[0];
      showToast(top
        ? `${top.owner}/${top.name} · ${top.stars} stars`
        : `${result.users.length} users, 0 repositories found for “${query}”.`);
    } catch {
      showToast(`Searching for “${query}”.`);
    }
  });
  document.querySelector('[data-copy-ci]')?.addEventListener('click', async () => {
    const snippet = 'name: CI\n\non:\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test';
    try {
      await navigator.clipboard.writeText(snippet);
      showToast('Workflow snippet copied to clipboard.');
    } catch {
      showToast('Copy is unavailable in this browser.');
    }
  });
  document.querySelector('[data-hero-signup]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const hint = form.querySelector('[data-hero-hint]');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (hint) hint.hidden = valid;
    if (!valid) {
      form.querySelector('[name="email"]')?.focus();
      return;
    }
    navigate(`/signup?email=${encodeURIComponent(email)}`);
  });
  document.querySelectorAll('.nav-menu a').forEach((link) => link.addEventListener('click', closeDropdowns));
  document.querySelectorAll('[data-toast]').forEach((button) => button.addEventListener('click', () => showToast(button.dataset.toast)));
  mobileToggle?.addEventListener('click', () => setMobileNav(!mobilePanel?.classList.contains('is-open')));
  document.querySelectorAll('[data-mobile-nav-close]').forEach((button) => button.addEventListener('click', () => setMobileNav(false, true)));
  document.querySelectorAll('[data-mobile-panel] a').forEach((link) => link.addEventListener('click', () => setMobileNav(false)));
  window.onkeydown = function (event) {
    if (event.key === 'Escape') {
      const openDropdown = document.querySelector('.nav-dropdown.is-open');
      if (openDropdown) {
        openDropdown.classList.remove('is-open');
        openDropdown.querySelector('[data-dropdown]')?.setAttribute('aria-expanded', 'false');
        openDropdown.querySelector('.nav-menu')?.setAttribute('hidden', '');
      }
      if (mobilePanel?.classList.contains('is-open')) setMobileNav(false, true);
      return;
    }
    if (mobilePanel?.classList.contains('is-open')) {
      trapFocus(mobilePanel, event);
      return;
    }
    if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault();
      document.querySelector('[data-search]')?.focus();
    }
  };
}

function closeDropdowns() {
  document.querySelectorAll('.nav-dropdown.is-open').forEach((item) => {
    item.classList.remove('is-open');
    item.querySelector('[data-dropdown]')?.setAttribute('aria-expanded', 'false');
    item.querySelector('.nav-menu')?.setAttribute('hidden', '');
  });
}

function trapFocus(container, event) {
  if (event.key !== 'Tab') return;
  const focusable = [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')].filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function showToast(message) {
  const toast = document.querySelector('[data-toast-region]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function bindSignIn() {
  window.onkeydown = null;
  const authPage = document.querySelector('.auth-page');
  const isSignup = authPage?.classList.contains('auth-page--signup');
  const form = document.querySelector('[data-auth-form]');
  const status = document.querySelector('[data-auth-status]');
  const passwordInput = document.querySelector('[data-password-input]');
  const toggle = document.querySelector('[data-password-toggle]');
  toggle?.addEventListener('click', () => {
    const visible = passwordInput.type === 'text';
    passwordInput.type = visible ? 'password' : 'text';
    toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
    toggle.setAttribute('aria-pressed', String(!visible));
    toggle.classList.toggle('is-visible', !visible);
  });
  document.querySelectorAll('[data-oauth]').forEach((btn) => btn.addEventListener('click', () => {
    showToast(`${btn.dataset.oauth} sign in is not connected yet. Use email for now.`);
  }));
  document.querySelector('[data-magic-link]')?.addEventListener('click', () => {
    const email = form?.querySelector('[name="email"]')?.value.trim() || '';
    showToast(email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? `If an account exists for ${email}, a sign in link is on its way.`
      : 'Enter your email above, then request a sign in link.');
  });
  const capsHint = document.querySelector('#caps-hint');
  passwordInput?.addEventListener('keyup', (event) => {
    if (!capsHint) return;
    const on = event.getModifierState && event.getModifierState('CapsLock');
    capsHint.hidden = !on;
  });
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('[name="email"]');
    const passwordField = form.querySelector('[name="password"]');
    const usernameInput = form.querySelector('[name="username"]');
    [emailInput, passwordField, usernameInput].forEach((input) => {
      input?.removeAttribute('aria-invalid');
    });
    const email = form.email.value.trim();
    const password = form.password.value;
    const username = isSignup && form.username ? form.username.value.trim() : '';
    const failField = (input, message) => {
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        status.textContent = message;
        status.setAttribute('role', 'alert');
        status.classList.add('is-visible');
        input.focus();
      }
    };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      failField(emailInput, 'Enter a valid email address, like you@example.com.');
      return;
    }
    if (isSignup && !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
      failField(usernameInput, 'Usernames use letters, numbers, and dashes only, up to 39 characters.');
      return;
    }
    if (!password) {
      failField(passwordField, 'Enter your password to continue.');
      return;
    }
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const submit = form.querySelector('[type="submit"]');
    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = isSignup ? 'Creating your account' : 'Signing in';
    try {
      const body = { email, password };
      if (isSignup) body.username = username;
      const result = await api.request(endpoint, { method: 'POST', body });
      api.token = result.token;
      workspaceIdentity = null;
      workspaceIdentityPromise = null;
      showToast(isSignup ? `Welcome to GitHub, ${result.user.username}. Verify your email to unlock everything.` : 'Signed in. Welcome back.');
      navigate('/home');
    } catch (error) {
      const unavailable = error.message === 'Failed to fetch' || error.message.includes('Request failed (502)');
      status.textContent = unavailable
        ? 'Authentication service is temporarily unavailable. Try again in a moment.'
        : `Sign in failed: ${error.message}`;
      status.setAttribute('role', 'alert');
      status.classList.add('is-visible');
      status.focus({ preventScroll: true });
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}

function paintHeatmap(entries, end, spanDays) {
  const heatmap = document.querySelector('[data-heatmap]');
  const months = document.querySelector('[data-months]');
  if (!heatmap) return { total: 0, columns: 0 };
  const counts = new Map(entries.map((entry) => [entry.date, Number(entry.count) || 0]));
  const endDate = new Date(`${end}T00:00:00`);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (spanDays - 1));
  const days = [];
  for (let cursor = new Date(startDate); cursor <= endDate; cursor.setDate(cursor.getDate() + 1)) {
    days.push(localDayKey(cursor));
  }
  const cells = [...Array(startDate.getDay()).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);
  const total = days.reduce((sum, date) => sum + (counts.get(date) || 0), 0);
  const columns = Math.ceil(cells.length / 7);
  const move = (dateStr, delta) => shiftDayKey(dateStr, delta);
  const leading = startDate.getDay();
  const weekdayOf = (dateStr) => new Date(`${dateStr}T00:00:00`).getDay();
  const columnOf = (dateStr) => Math.floor((leading + days.indexOf(dateStr)) / 7);
  const focusDate = (dateStr) => {
    heatmap.querySelectorAll('.heat-cell[data-date]').forEach((cell) => cell.setAttribute('tabindex', '-1'));
    const target = dateStr && heatmap.querySelector(`[data-date="${dateStr}"]`);
    if (target) {
      target.setAttribute('tabindex', '0');
      target.focus();
    } else {
      heatmap.querySelector(`[data-date="${currentDate()}"]`)?.setAttribute('tabindex', '0');
    }
  };
  const currentDate = () => document.activeElement?.dataset?.date || null;
  heatmap.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  heatmap.setAttribute('tabindex', '0');
  heatmap.setAttribute('role', 'group');
  heatmap.setAttribute('aria-label', `Contribution graph: ${total.toLocaleString('en-US')} contributions across ${columns} weeks. Arrow keys move by day and week. Home and End jump to the start and end of the weekday row. PageUp and PageDown jump to the start and end of the week column.`);
  heatmap.innerHTML = cells.map((date) => {
    if (!date) return '<span class="heat-cell heat-cell--blank" aria-hidden="true"></span>';
    const count = counts.get(date) || 0;
    return `<button type="button" class="heat-cell heat-cell--${levelFor(count)}" data-tip="${tipFor(count, date)}" aria-label="${tipFor(count, date)}" data-date="${date}" tabindex="-1"></button>`;
  }).join('');
  heatmap.querySelector('.heat-cell[data-date]')?.setAttribute('tabindex', '0');
  heatmap.onkeydown = (event) => {
    const current = document.activeElement?.dataset?.date;
    if (!current || !heatmap.contains(document.activeElement)) return;
    let next = null;
    if (event.key === 'ArrowRight') next = move(current, 7);
    else if (event.key === 'ArrowLeft') next = move(current, -7);
    else if (event.key === 'ArrowDown') next = move(current, 1);
    else if (event.key === 'ArrowUp') next = move(current, -1);
    else if (event.key === 'Home') next = days.find((d) => weekdayOf(d) === weekdayOf(current)) || null;
    else if (event.key === 'End') next = [...days].reverse().find((d) => weekdayOf(d) === weekdayOf(current)) || null;
    else if (event.key === 'PageUp') next = days.find((d) => columnOf(d) === columnOf(current)) || null;
    else if (event.key === 'PageDown') next = [...days].reverse().find((d) => columnOf(d) === columnOf(current)) || null;
    else return;
    event.preventDefault();
    if (next && heatmap.querySelector(`[data-date="${next}"]`)) focusDate(next);
  };
  if (months) {
    months.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    const labels = [];
    let previous = '';
    for (let column = 0; column < columns; column += 1) {
      const first = cells.slice(column * 7, column * 7 + 7).find(Boolean);
      const label = first ? monthLabel(new Date(`${first}T00:00:00`)) : '';
      labels.push(label !== previous ? label : '');
      if (label) previous = label;
    }
    months.innerHTML = labels.map((label) => `<span>${label}</span>`).join('');
  }
  const summary = document.querySelector('[data-contrib-summary]');
  if (summary) summary.textContent = '';
  return { total, columns };
}

let profileTopRepos = [];

function renderProfileRepos() {
  const grid = document.querySelector('[data-repo-grid]');
  if (!grid) return;
  const expanded = document.querySelector('.repositories-card')?.classList.contains('is-expanded');
  if (!profileTopRepos.length) {
    grid.innerHTML = `<p class="repository-empty">No public repositories yet. New repos will appear here sorted by stars.</p>`;
  } else {
    const monthYear = (iso) => {
      const d = new Date(`${String(iso || '').slice(0, 10)}T00:00:00`);
      return Number.isNaN(d.getTime()) ? '' : `Updated ${d.toLocaleString('en', { month: 'short', year: 'numeric' })}`;
    };
    grid.innerHTML = profileTopRepos.slice(0, expanded ? 6 : 2).map((repo) => `
    <div class="repository-tile"><div class="repository-title"><span class="repo-tile__badge">${repoBadgeHtml(repo, icon('bookOpen'))}</span><strong title="${escapeHtml(repo.name)}">${escapeHtml(repo.name)}</strong><span class="repo-tag">${repo.is_private ? 'Private' : 'Public'}</span></div><p>${escapeHtml(repo.description || '')}</p><div class="repo-meta"><span class="lang">${repo.language ? escapeHtml(repo.language) : 'No language'}</span><span class="repo-meta__stars" title="${Number(repo.stars).toLocaleString('en-US')} stars">${icon('starFill')}${formatCompact(Number(repo.stars) || 0)}</span><span title="${Number(repo.forks).toLocaleString('en-US')} forks">${icon('fork')}${formatCompact(Number(repo.forks) || 0)} forks</span><span>${monthYear(repo.updated_at)}</span></div></div>
  `).join('');
  }
  const toggle = document.querySelector('[data-repo-toggle]');
  if (toggle) {
    toggle.hidden = profileTopRepos.length <= 2;
    toggle.textContent = expanded ? 'Show less' : `View more (${profileTopRepos.length - 2} more)`;
    toggle.setAttribute('aria-expanded', String(Boolean(expanded)));
  }
  const sub = document.querySelector('[data-repo-sub]');
  if (sub) sub.textContent = expanded ? 'Top 6 by stars' : 'Top 2 by stars';
}

function paintRepos(repos) {
  profileTopRepos = [...(Array.isArray(repos) ? repos : [])].sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0)).slice(0, 6);
  renderProfileRepos();
}

function paintProfile(profile) {
  const user = profile.user;
  const set = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };
  set('[data-profile-name]', user.name);
  const uname = document.querySelector('[data-profile-username]');
  if (uname) {
    uname.textContent = user.username;
    uname.dataset.username = user.username;
  }
  const joined = document.querySelector('[data-profile-joined]');
  if (joined && user.created_at) {
    const d = new Date(String(user.created_at).includes('T') ? user.created_at : `${String(user.created_at).slice(0, 10)}T00:00:00`);
    if (!Number.isNaN(d.getTime())) {
      joined.innerHTML = `Joined <time datetime="${escapeHtml(String(user.created_at).slice(0, 10))}">${escapeHtml(d.toLocaleString('en', { month: 'short', year: 'numeric' }))}</time>`;
    }
  }
  set('[data-profile-greeting]', `Hi, I am ${user.name || user.username}`);
  const bio = document.querySelector('[data-profile-bio]');
  if (bio) bio.textContent = user.bio || 'This profile has no bio yet. Add a bio to tell others about yourself.';
  const achCount = document.querySelector('[data-achievement-count]');
  if (achCount) achCount.textContent = String(badges.length);
  set('[data-profile-repo-count]', String(profile.stats.repoCount));
  set('[data-profile-stars]', formatCompact(profile.stats.totalStars));
  set('[data-profile-email]', user.email || '');
  set('[data-profile-location]', user.location || '');
  set('[data-profile-website]', user.website || '');
  const followers = document.querySelector('[data-profile-followers]');
  if (followers) {
    followers.textContent = `${formatCompact(user.followers)} followers`;
    followers.setAttribute('aria-label', `${Number(user.followers).toLocaleString('en-US')} followers`);
  }
  const following = document.querySelector('[data-profile-following]');
  if (following) {
    following.textContent = `${formatCompact(user.following)} following`;
    following.setAttribute('aria-label', `${Number(user.following).toLocaleString('en-US')} following`);
  }
  set('[data-profile-readme]', `${user.username} / README.md`);
  const emailRow = document.querySelector('[data-profile-email-row]');
  const locationRow = document.querySelector('[data-profile-location-row]');
  const websiteRow = document.querySelector('[data-profile-website-row]');
  if (emailRow && !user.email) emailRow.remove();
  if (locationRow && !user.location) locationRow.remove();
  if (websiteRow && !user.website) websiteRow.remove();
  const avatars = document.querySelectorAll('[data-profile-avatar]');
  const avatarSource = user.avatar_url || asset('ui3/Ellipse 138.png');
  avatars.forEach((avatar) => {
    avatar.src = avatarSource;
    avatar.alt = user.name || user.username || '';
  });
  const social = document.querySelector('[data-social-row]');
  if (social) {
    const ig = String(user.instagram_url || '').trim();
    const li = String(user.linkedin_url || '').trim();
    const tiles = [];
    if (ig) tiles.push(`<a href="${escapeHtml(ig)}" target="_blank" rel="noreferrer" aria-label="Instagram profile"><img src="${asset('ui3/image 27.png')}" alt="" /></a>`);
    if (li) tiles.push(`<a href="${escapeHtml(li)}" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><img src="${asset('ui3/image 25.png')}" alt="" /></a>`);
    if (user.email) tiles.push(`<a href="mailto:${escapeHtml(user.email)}" aria-label="Email ${escapeHtml(user.email)}"><img src="${asset('ui3/image 26.png')}" alt="" /></a>`);
    social.innerHTML = tiles.join('') || '<p class="marketplace-loading">No public contact links yet.</p>';
  }
  const url = document.querySelector('[data-profile-url]');
  if (url) {
    url.href = `https://github.com/${encodeURIComponent(user.username)}`;
    url.textContent = 'View on GitHub';
  }
  const editBtn = document.querySelector('[data-edit-profile]');
  if (editBtn) editBtn.hidden = !(workspaceIdentity?.username && workspaceIdentity.username === user.username);
  const skills = document.querySelector('[data-skill-badges]');
  if (skills) {
    const counts = {};
    (profile.repos || []).forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    skills.innerHTML = top.map(([lang]) => {
      const path = deviconBadges[lang];
      const img = path ? `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg" alt="" loading="lazy" onerror="this.remove()" />` : '';
      return `<li>${img}<span>${escapeHtml(lang)}</span></li>`;
    }).join('');
    skills.hidden = top.length === 0;
  }
  paintRepos(profile.repos);
  document.title = user.name ? `${user.username} (${user.name})` : user.username;
}

async function paintContributions(username, year) {
  const result = await getContributions(username, year);
  const todayStr = localDayKey(new Date());
  const end = year ? (`${year}-12-31` > todayStr ? todayStr : `${year}-12-31`) : todayStr;
  const span = year
    ? Math.max(1, Math.round((new Date(`${end}T00:00:00`).getTime() - new Date(`${year}-01-01T00:00:00`).getTime()) / 86400000) + 1)
    : 364;
  const { total } = paintHeatmap(result.contributions, end, span);
  const title = document.querySelector('[data-profile-contrib-title]');
  if (title) title.textContent = year ? `${Number(total).toLocaleString('en-US')} contributions in ${year}` : `${Number(total).toLocaleString('en-US')} contributions in the last year`;
  return total;
}

function bindProfile(requestedUsername) {
  window.onkeydown = null;
  bindWorkspace();
  const sidebar = document.querySelector('[data-profile-sidebar]');
  const sidebarBackdrop = document.querySelector('[data-profile-sidebar-close]');
  const menuButtons = document.querySelectorAll('[data-profile-menu]');
  let lastProfileFocus = null;
  const setSidebar = (open, restoreFocus = false) => {
    sidebar?.classList.toggle('is-open', open);
    if (sidebarBackdrop) sidebarBackdrop.hidden = !open;
    sidebarBackdrop?.classList.toggle('is-open', open);
    menuButtons.forEach((button) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close profile navigation' : 'Open profile navigation');
    });
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      lastProfileFocus = document.activeElement;
      sidebar?.querySelector('button, a')?.focus();
    } else if (restoreFocus && lastProfileFocus) {
      lastProfileFocus.focus();
    }
  };
  menuButtons.forEach((button) => button.addEventListener('click', () => setSidebar(!sidebar?.classList.contains('is-open'))));
  sidebarBackdrop?.addEventListener('click', () => setSidebar(false, true));
  window.onkeydown = function (event) {
    if (!sidebar?.classList.contains('is-open')) {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        event.preventDefault();
        document.querySelector('[data-search]')?.focus();
      }
      return;
    }
    if (event.key === 'Escape') {
      setSidebar(false, true);
      return;
    }
    trapFocus(sidebar, event);
  };
  document.querySelectorAll('[data-profile-section]').forEach((button) => button.addEventListener('click', () => {
    if (button.disabled) return;
    document.querySelectorAll('[data-profile-section]').forEach((item) => item.classList.remove('profile-nav__item--active'));
    button.classList.add('profile-nav__item--active');
    const label = document.querySelector('[data-mobile-section]');
    if (label) label.textContent = button.dataset.profileSection || '';
    const target = button.dataset.scroll ? document.getElementById(button.dataset.scroll) : document.querySelector('#profile-main');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSidebar(false);
  }));
  document.querySelectorAll('.badge').forEach((badge) => badge.addEventListener('click', () => {
    const name = badge.dataset.badgeName || badge.getAttribute('aria-label') || 'Achievement';
    const tier = badge.dataset.badgeTier ? ` · ${badge.dataset.badgeTier} tier` : '';
    const desc = badge.dataset.badgeDesc ? ` ${badge.dataset.badgeDesc}` : '';
    showToast(`${name}${tier}.${desc}`);
  }));
  document.querySelector('[data-copy-profile]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard.');
    } catch {
      showToast('Copy is unavailable in this browser.');
    }
  });
  document.querySelector('[data-follow]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const name = document.querySelector('[data-profile-username]')?.dataset.username || '';
    if (!api.token) {
      navigate('/login');
      return;
    }
    const following = button.classList.contains('is-following');
    try {
      const target = `/api/users/${encodeURIComponent(name)}/follow`;
      await api.request(target, { method: following ? 'DELETE' : 'POST', auth: true });
      button.classList.toggle('is-following', !following);
      button.textContent = following ? 'Follow' : 'Following';
      button.setAttribute('aria-pressed', String(!following));
      const refreshed = await api.request(`/api/users/${encodeURIComponent(name)}`);
      const followers = document.querySelector('[data-profile-followers]');
      if (followers) followers.textContent = `${formatCompact(refreshed.user.followers)} followers`;
    } catch {}
  });
  document.querySelector('[data-repo-toggle]')?.addEventListener('click', () => {
    document.querySelector('.repositories-card')?.classList.toggle('is-expanded');
    renderProfileRepos();
  });
  document.querySelector('[data-year-select]')?.addEventListener('change', async (event) => {
    const name = document.querySelector('[data-profile-username]')?.dataset.username || '';
    try {
      await paintContributions(name, event.currentTarget.value || null);
    } catch {}
  });
  loadProfile(requestedUsername);
}

async function loadProfile(requestedUsername) {
  try {
    let username = requestedUsername;
    if (!username && api.token) {
      const identity = workspaceIdentity || await loadWorkspaceIdentity();
      username = identity?.username;
    }
    if (!username) {
      showToast('Sign in to view your profile, or open a profile link with a username.');
      return;
    }
    const profile = await getProfile(username);
    paintProfile(profile);
    const select = document.querySelector('[data-year-select]');
    if (select) {
      const currentYear = new Date().getFullYear();
      const firstYear = Number(String(profile.user.created_at || currentYear).slice(0, 4)) || currentYear;
      select.innerHTML = '';
      const all = document.createElement('option');
      all.value = '';
      all.textContent = 'Last 12 months';
      select.appendChild(all);
      for (let year = currentYear; year >= firstYear; year -= 1) {
        const option = document.createElement('option');
        option.value = String(year);
        option.textContent = String(year);
        select.appendChild(option);
      }
    }
    await paintContributions(profile.user.username, null);
  } catch {}
}

window.addEventListener('popstate', render);
function heatTip() {
  let tip = document.querySelector('.heat-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'heat-tip';
    tip.setAttribute('aria-hidden', 'true');
    tip.hidden = true;
    document.body.append(tip);
  }
  return tip;
}
document.addEventListener('mouseover', (event) => {
  const cell = event.target.closest?.('.heat-cell');
  const tip = heatTip();
  if (!cell || !cell.dataset.tip) {
    tip.hidden = true;
    return;
  }
  tip.textContent = cell.dataset.tip;
  tip.style.visibility = 'hidden';
  tip.hidden = false;
  const rect = cell.getBoundingClientRect();
  const w = tip.offsetWidth;
  const h = tip.offsetHeight;
  const gap = 10;
  let left = rect.left + rect.width / 2 - w / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
  let top = rect.top - h - gap;
  let place = 'above';
  if (top < 8) {
    top = rect.bottom + gap;
    place = 'below';
  }
  tip.style.left = `${Math.round(left)}px`;
  tip.style.top = `${Math.round(top)}px`;
  tip.dataset.place = place;
  tip.style.visibility = '';
});
document.addEventListener('scroll', () => {
  const tip = document.querySelector('.heat-tip');
  if (tip) tip.hidden = true;
}, true);
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || link.target === '_blank' || link.getAttribute('href')?.startsWith('#')) return;
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;
  event.preventDefault();
  navigate(`${url.pathname}${url.search}`);
});

render();
