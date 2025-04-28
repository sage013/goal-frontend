document.getElementById("goalForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent page refresh on form submit

    const goalTitle = document.getElementById("goalTitle").value;
    const goalDescription = document.getElementById("goalDescription").value;

    // Send data to backend
    fetch("http://13.219.77.49:3000/goals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: goalTitle,
            description: goalDescription
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Goal submitted successfully!");
        fetchGoals();  // Fetch updated goals after submission
    })
    .catch(error => {
        console.error("Error submitting goal:", error);
    });

    // Reset form after submission
    document.getElementById("goalForm").reset();
});

function fetchGoals() {
    fetch("http://13.219.77.49:3000/goals")
        .then(response => response.json())
        .then(data => {
            const goalsContainer = document.getElementById("goals-container");
            goalsContainer.innerHTML = '';  // Clear current goals

            // Loop through the goals array and display each goal
            data.forEach(goal => {
                const goalElement = document.createElement("div");
                goalElement.classList.add("goal");
                goalElement.innerHTML = `
                    <h3>${goal.title}</h3>
                    <p>${goal.description}</p>
                `;
                goalsContainer.appendChild(goalElement);
            });
        })
        .catch(error => {
            console.error("Error fetching goals:", error);
        });
}

// Fetch goals on page load
fetchGoals();

