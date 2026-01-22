const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Job role requirements
const roleRequirements = {
  data_analyst: {
    technical: { python: 4, sql: 5, ml: 3 },
    soft: { communication: 4, problemSolving: 4 }
  },
  web_dev: {
    technical: { html: 4, css: 4, js: 4 },
    soft: { communication: 4, teamwork: 4 }
  },
  software_eng: {
    technical: { java: 4, dsa: 5 },
    soft: { problemSolving: 5, teamwork: 4 }
  },
  ml_eng: {
    technical: { python: 5, ml: 5 },
    soft: { problemSolving: 4, communication: 3 }
  }
};

app.post("/analyze", (req, res) => {
  const { name, role, technicalSkills, softSkills } = req.body;
  const required = roleRequirements[role];

  let techGaps = [];
  let softGaps = [];
  let roadmap = [];
  let week = 1;

  for (let skill in required.technical) {
    const cur = technicalSkills[skill] || 0;
    const need = required.technical[skill];
    if (cur < need) {
      techGaps.push({ skill, cur, need });
      roadmap.push({
        week: week++,
        plan: `Improve ${skill.toUpperCase()} (learn → practice → mini project)`
      });
    }
  }

  for (let skill in required.soft) {
    const cur = softSkills[skill] || 0;
    const need = required.soft[skill];
    if (cur < need) {
      softGaps.push({ skill, cur, need });
      roadmap.push({
        week: week++,
        plan: `Develop ${skill} through daily activities`
      });
    }
  }

  res.json({
    name,
    techGaps,
    softGaps,
    roadmap,
    ready: roadmap.length === 0
  });
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
