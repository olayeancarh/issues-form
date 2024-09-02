document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:5000/issues";

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const createBtn = document.getElementById("create-btn");
  const updateBtn = document.getElementById("update-btn");
  const issuesList = document.getElementById("issues-list");

  let currentIssueId = null;

  const fetchIssues = async () => {
    try {
      const response = await fetch(apiUrl);
      const issues = await response.json();
      renderLists(issues);
    } catch (error) {
      console.log("Failed to fetch issues: ", error);
    }
  };

  const createIssue = async () => {
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (title && description) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        if (response.ok) {
          titleInput.value = "";
          descriptionInput.value = "";
          fetchIssues();
        }
      } catch (error) {
        console.log("Failed to create issue: ", error);
      }
    } else {
      alert("Fill issue properly");
    }
  };

  const updateItem = async () => {
    const title = titleInput.value;
    const description = descriptionInput.value;

    if (title && description) {
        try {
            const response = await fetch(`${apiUrl}/${currentIssueId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                titleInput.value = '';
                descriptionInput.value = '';
                currentItemID = null;
                createBtn.classList.remove('d-none');
                updateBtn.classList.add('d-none');
                fetchIssues();
            } else {
                console.error('Failed to update item:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    } else {
      alert("Fill issue properly");
    }
}

  const deleteIssue = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchIssues();
      } else {
        console.log("Failed to delete issue, tr again");
      }
    } catch (error) {
      console.log("Failed to delete issue: ", error);
    }
  };

  const editForm = async (issue) => {
    console.log(issue);
    currentIssueId = issue.id;
    titleInput.value = issue.title;
    descriptionInput.value = issue.description;

    createBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
  };

  const renderLists = (issue) => {
    issuesList.innerHTML = "";
    issue.forEach((list) => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      const card = document.createElement("div");
      card.className = "card";

      const cardBody = document.createElement("div");
      cardBody.className =
        "card-body d-flex justify-content-between align-items-center";

      const listText = document.createElement("div");
      listText.textContent = `${list.title} - ${list.description}`;

      const btnGroup = document.createElement("div");

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-warning btn-sm me-2";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        editForm(list);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger btn-sm";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        deleteIssue(list.id);
      });

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(deleteBtn);

      cardBody.appendChild(listText);
      cardBody.appendChild(btnGroup);
      card.appendChild(cardBody);
      li.appendChild(card);
      issuesList.appendChild(li);
    });
  };

  createBtn.addEventListener("click", createIssue);
  updateBtn.addEventListener('click', updateItem);
  fetchIssues();
});
