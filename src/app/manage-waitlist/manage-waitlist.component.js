const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const form = document.getElementById("waitlistForm");
const tableBody = document.getElementById("waitlistBody");
const API_BASE = "http://localhost:3000";

function togglePopup() {
  const isOpen = popup.style.display === "block";
  popup.style.display = isOpen ? "none" : "block";
  overlay.style.display = isOpen ? "none" : "block";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    eventName: document.getElementById("event").value,
    joinDate: document.getElementById("date").value,
  };
  

  const res = await fetch(`${API_BASE}/api/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.ok) {
    form.reset();
    togglePopup();
    loadTable();
  }
});

async function loadTable() {
  const res = await fetch(`${API_BASE}/api/waitlist`);
  const data = await res.json();

  tableBody.innerHTML = "";
  data.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.email}</td>
      <td>${entry.eventName}</td>
      <td>${new Date(entry.joinDate).toLocaleDateString()}</td>
      <td><button onclick="cancelEntry('${entry._id}')">Cancel</button></td>
    `;
    tableBody.appendChild(row);
  });
}

async function cancelEntry(id) {
  const res = await fetch(`${API_BASE}/api/cancel/${id}`, { method: "DELETE" });
  if (res.ok) {
    loadTable();
  }
}

loadTable();
