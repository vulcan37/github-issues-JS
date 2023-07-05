const baseUrl = "https://api.github.com/repositories/1296269/issues";
let currentPage = 1;

function displayIssues(issues) {
  const issueList = document.getElementById("issue-list");
  issueList.innerHTML = "";

  for (const issue of issues) {
    const listItem = document.createElement("li");
    listItem.textContent = issue.title;
    issueList.appendChild(listItem);
  }
}

function updatePageHeading() {
  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = `Page number ${currentPage}`;
}

function loadIssues(pageNumber) {
  const apiUrl = `${baseUrl}?page=${pageNumber}&per_page=5`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((issues) => {
      displayIssues(issues);
      updatePageHeading();
      document.getElementById("load_prev").disabled = pageNumber === 1;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("load_next").addEventListener("click", () => {
  currentPage += 1;
  loadIssues(currentPage);
});

document.getElementById("load_prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    loadIssues(currentPage);
  }
});

loadIssues(currentPage);