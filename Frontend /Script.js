const studentSection = document.getElementById("studentSection");
const adminSection = document.getElementById("adminSection");
const dashboard = document.getElementById("dashboard");
const complaintsDiv = document.getElementById("complaints");

/* OPEN ADMIN LOGIN */
function openAdmin() {
  studentSection.classList.add("hidden");
  dashboard.classList.add("hidden");
  adminSection.classList.remove("hidden");
}

/* SUBMIT COMPLAINT */
async function submitComplaint() {
  const name = document.getElementById("name").value.trim();
  const department = document.getElementById("department").value;
  const complaint = document.getElementById("complaint").value.trim();

  if (!name || !department || !complaint) {
    alert("Fill all fields");
    return;
  }

  const res = await fetch("/api/complaints", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, department, complaint })
  });

  const data = await res.json();
  console.log("Submit response:", data);

  alert("Complaint submitted successfully");
  document.getElementById("name").value = "";
  document.getElementById("complaint").value = "";
}

/* ADMIN LOGIN */
async function adminLogin() {
  const username = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value.trim();

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  console.log("Admin login:", data);

  if (data.success) {
    adminSection.classList.add("hidden");
    dashboard.classList.remove("hidden");
    loadComplaints();
  } else {
    alert("Invalid admin credentials");
  }
}

/* LOAD COMPLAINTS */
async function loadComplaints() {
  const res = await fetch("/api/complaints");
  const data = await res.json();

  console.log("Complaints loaded:", data);

  complaintsDiv.innerHTML = "";

  if (data.length === 0) {
    complaintsDiv.innerHTML = "<p>No complaints found</p>";
    return;
  }

  data.forEach(c => {
    complaintsDiv.innerHTML += `
      <div class="complaint-box">
        <b>${c.name}</b> (${c.department})<br>
        ${c.complaint}<br><br>
        <button onclick="deleteComplaint('${c._id}')">Delete</button>
      </div>
    `;
  });
}

/* DELETE COMPLAINT */
async function deleteComplaint(id) {
  await fetch(`/api/complaints/${id}`, { method: "DELETE" });
  loadComplaints();
}
