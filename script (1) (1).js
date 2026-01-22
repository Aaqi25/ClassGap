function showVal(skill) {
  document.getElementById(skill + "Val").innerText =
    document.getElementById(skill).value + "%";
}

function analyze() {
  const name = nameInput = document.getElementById("name").value;
  const role = document.getElementById("jobRole").value;

  const technicalSkills = {
    python: +python.value,
    sql: +sql.value,
    ml: +ml.value,
    html: +html.value,
    css: +css.value,
    js: +js.value,
    java: +java.value,
    dsa: +dsa.value
  };

  const softSkills = {
    communication: +communication.value,
    teamwork: +teamwork.value,
    problemSolving: +problemSolving.value
  };

  fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role, technicalSkills, softSkills })
  })
    .then(res => res.json())
    .then(showResult);
}

function showResult(data) {
  let html = `<h2>📍 Skill Improvement Roadmap</h2>`;

  if (data.roadmap.length === 0) {
    html += `<p class="success">🎉 You are job ready!</p>`;
  } else {
    html += `<ol>`;
    data.roadmap.forEach(r => {
      html += `<li><b>Week ${r.week}:</b> ${r.plan}</li>`;
    });
    html += `</ol>`;
  }

  document.getElementById("result").innerHTML = html;
}
