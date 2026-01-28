function Sidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">CIET Learning</div>

      <button onclick="navigate('dashboard')"> Dashboard</button>
      <button onclick="navigate('training')"> Training</button>
      <button onclick="navigate('certificates')"> Certification</button>
           <button onclick="navigate('leaderboard')">Leaderboard</button>
      <button onclick="navigate('profile')">Profile</button>
 

    </aside>
  `;
}
