function analyzeSkills() {

    /* ===============================
       1. Get Student Details
    =============================== */
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("jobRole").value;

    if (name === "" || role === "") {
        alert("Please enter your name and select a job role.");
        return;
    }

    /* ===============================
       2. Collect Skill Values
    =============================== */
    const technicalSkills = {
        Python: Number(document.getElementById("python").value || 0),
        Java: Number(document.getElementById("java").value || 0),
        SQL: Number(document.getElementById("sql").value || 0),
        "Data Structures": Number(document.getElementById("dsa").value || 0),
        "Machine Learning": Number(document.getElementById("ml").value || 0),
    };

    const softSkills = {
        Communication: Number(document.getElementById("communication").value || 0),
        Teamwork: Number(document.getElementById("teamwork").value || 0),
        "Problem Solving": Number(document.getElementById("problemSolving").value || 0),
    };

    /* ===============================
       3. Job Role Requirements
    =============================== */
    const roleRequirements = {
        data_analyst: {
            technical: {
                Python: 4,
                SQL: 5,
                "Machine Learning": 3,
            },
            soft: {
                Communication: 4,
                "Problem Solving": 4,
            },
        },

        web_dev: {
            technical: {
                Java: 4,
                "Data Structures": 3,
            },
            soft: {
                Communication: 4,
                Teamwork: 4,
            },
        },

        software_eng: {
            technical: {
                Java: 4,
                "Data Structures": 5,
            },
            soft: {
                "Problem Solving": 5,
                Teamwork: 4,
            },
        },

        ml_eng: {
            technical: {
                Python: 5,
                "Machine Learning": 5,
                "Data Structures": 4,
            },
            soft: {
                "Problem Solving": 4,
                Communication: 3,
            },
        },
    };

    const requiredSkills = roleRequirements[role];

    /* ===============================
       4. Skill Gap Analysis
    =============================== */
    let techGaps = [];
    let softGaps = [];

    for (let skill in requiredSkills.technical) {
        if (technicalSkills[skill] < requiredSkills.technical[skill]) {
            techGaps.push({
                skill: skill,
                required: requiredSkills.technical[skill],
                current: technicalSkills[skill],
            });
        }
    }

    for (let skill in requiredSkills.soft) {
        if (softSkills[skill] < requiredSkills.soft[skill]) {
            softGaps.push({
                skill: skill,
                required: requiredSkills.soft[skill],
                current: softSkills[skill],
            });
        }
    }

    /* ===============================
       5. Generate Result Output
    =============================== */
    let resultHTML = `<h3>Skill Gap Analysis</h3>`;
    resultHTML += `<p><strong>Student:</strong> ${name}</p>`;

    // Technical Skills Result
    resultHTML += `<h4>Technical Skills</h4>`;
    if (techGaps.length === 0) {
        resultHTML += `<p class="success">✔ All required technical skills are met.</p>`;
    } else {
        resultHTML += `<ul>`;
        techGaps.forEach(item => {
            resultHTML += `<li>${item.skill} → Required: ${item.required}, Yours: ${item.current}</li>`;
        });
        resultHTML += `</ul>`;
    }

    // Soft Skills Result
    resultHTML += `<h4>Soft Skills</h4>`;
    if (softGaps.length === 0) {
        resultHTML += `<p class="success">✔ Soft skills are at expected level.</p>`;
    } else {
        resultHTML += `<ul>`;
        softGaps.forEach(item => {
            resultHTML += `<li>${item.skill} → Required: ${item.required}, Yours: ${item.current}</li>`;
        });
        resultHTML += `</ul>`;
    }

    // Final Verdict
    if (techGaps.length === 0 && softGaps.length === 0) {
        resultHTML += `<p class="success">🎉 You are well prepared for this role!</p>`;
    } else {
        resultHTML += `<p class="warning">⚠ Focus on improving the highlighted skills.</p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
}
