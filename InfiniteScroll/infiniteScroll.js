let commentsData = [];
let currentIndex = 10;
let container = document.getElementById("container");

async function loadComments() {
  await fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "GET",
  }).then(async (data) => {
    commentsData = await data.json();
    appendComments(commentsData.slice(0, currentIndex));
  });
}

function appendComments(data) {
  data.forEach((comment) => {
    let commentEle = document.createElement("div");
    commentEle.setAttribute("class", "comment");
    const name = document.createElement("h1");
    const body = document.createElement("p");
    name.innerText = comment.name;
    body.innerText = comment.body;
    commentEle.appendChild(name);
    commentEle.appendChild(body);
    container.appendChild(commentEle);
  });
}

function handleScroll() {
  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 10
  )
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10
    ) {
      loadMoreComments();
    }
}

function loadMoreComments() {
  if (currentIndex >= commentsData?.length) return;
  let nextBatch = commentsData.slice(currentIndex, currentIndex + 10);
  appendComments(nextBatch);
  currentIndex += 10;
}

container.addEventListener("scroll", handleScroll);

loadComments();
