export function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');

  window.location.href = '/';
}
