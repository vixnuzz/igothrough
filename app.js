const paths = [
  { title: "Data structures", category: "Code", tag: "THINK IN BUILDING BLOCKS", description: "Make sense of the structures behind the software you use every day.", level: "Start anywhere", lessons: "24 short lessons", symbol: "⌘", tint: "#e3edcf" },
  { title: "Python, gently", category: "Code", tag: "YOUR FIRST LINES OF CODE", description: "Learn a friendly, powerful language through small hands-on projects.", level: "Beginner friendly", lessons: "18 short lessons", symbol: "Py", tint: "#dce9f0" },
  { title: "Web development", category: "Build", tag: "FROM IDEA TO INTERFACE", description: "Put HTML, CSS, and JavaScript together to make something real.", level: "Beginner friendly", lessons: "32 short lessons", symbol: "◫", tint: "#f5e2d7" },
  { title: "Machine learning", category: "Explore", tag: "FIND THE SIGNAL", description: "Understand how computers learn patterns from examples and data.", level: "Build your base", lessons: "21 short lessons", symbol: "✳", tint: "#e9e1f2" },
  { title: "System design", category: "Build", tag: "THINK IN SYSTEMS", description: "Explore the choices that help services stay useful as they grow.", level: "Intermediate", lessons: "16 short lessons", symbol: "⤢", tint: "#e8edcf" },
  { title: "Product design", category: "Create", tag: "MAKE IT MAKE SENSE", description: "Turn a good question into a clear, thoughtful user experience.", level: "Start anywhere", lessons: "14 short lessons", symbol: "◉", tint: "#f3dfe0" },
  { title: "SQL & databases", category: "Code", tag: "GET TO KNOW YOUR DATA", description: "Ask better questions of data and learn how information is stored.", level: "Beginner friendly", lessons: "12 short lessons", symbol: "▤", tint: "#dceae1" },
  { title: "Cloud foundations", category: "Explore", tag: "BEYOND YOUR LAPTOP", description: "A practical introduction to cloud services and modern infrastructure.", level: "Build your base", lessons: "19 short lessons", symbol: "☁", tint: "#e2e6f5" },
  { title: "Algorithms", category: "Code", tag: "SOLVE WITH INTENTION", description: "Practice the patterns that make problem solving feel less mysterious.", level: "Build your base", lessons: "27 short lessons", symbol: "↗", tint: "#f1ebd4" }
];

const categories = ["All paths", "Code", "Build", "Explore", "Create"];
const topics = ["Python", "Data structures", "Web design", "Algorithms", "Machine learning", "System design"];
const grid = document.querySelector("#path-grid");
const tabs = document.querySelector("#filter-tabs");
const search = document.querySelector("#site-search");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
let activeCategory = "All paths";

function renderTabs() {
  tabs.innerHTML = categories.map(category => `<button type="button" class="filter-tab${category === activeCategory ? " active" : ""}" aria-pressed="${category === activeCategory}" data-category="${category}">${category}</button>`).join("");
}

function renderPaths() {
  const query = search.value.trim().toLowerCase();
  const visible = paths.filter(path => (activeCategory === "All paths" || path.category === activeCategory) && `${path.title} ${path.category} ${path.tag} ${path.description}`.toLowerCase().includes(query));
  count.textContent = `${String(visible.length).padStart(2, "0")} PATHS`;
  empty.hidden = visible.length > 0;
  grid.innerHTML = visible.map((path, index) => {
    const originalIndex = paths.indexOf(path) + 1;
    return `<article class="path-card"><div class="card-top"><span class="card-icon" style="background:${path.tint}">${path.symbol}</span><span class="card-index">${String(originalIndex).padStart(2, "0")} / 09</span></div><span class="card-tag">${path.tag}</span><h3>${path.title}</h3><p>${path.description}</p><div class="card-meta"><span>${path.level} · ${path.lessons}</span><a href="#courses" aria-label="Explore ${path.title}">↗</a></div></article>`;
  }).join("");
}

renderTabs();
renderPaths();
document.querySelector("#topic-chips").innerHTML = topics.map(topic => `<button type="button" class="topic-chip" data-search="${topic}">${topic}</button>`).join("");

tabs.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderTabs();
  renderPaths();
});
search.addEventListener("input", renderPaths);
document.querySelectorAll("[data-search]").forEach(button => button.addEventListener("click", () => {
  search.value = button.dataset.search;
  activeCategory = "All paths";
  renderTabs();
  renderPaths();
  document.querySelector("#paths").scrollIntoView({ behavior: "smooth" });
}));
document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#paths").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#clear-search").addEventListener("click", () => {
  search.value = "";
  activeCategory = "All paths";
  renderTabs();
  renderPaths();
  search.focus();
});

const themeToggle = document.querySelector(".theme-toggle");
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.innerHTML = theme === "dark"
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.3A8.4 8.4 0 0 1 8.7 3.8a8.5 8.5 0 1 0 11.5 11.5Z" /></svg>';
}
applyTheme(localStorage.getItem("igothrough-theme") || "light");
themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("igothrough-theme", next);
  applyTheme(next);
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.addEventListener("click", event => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const dialog = document.querySelector("#sign-in-dialog");
document.querySelectorAll(".sign-in").forEach(button => button.addEventListener("click", () => dialog.showModal()));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  dialog.close();
  const toast = document.querySelector("#toast");
  toast.textContent = "Thanks — sign-in will be ready in a future version.";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
});

document.querySelector("#reveal-answer").addEventListener("click", event => {
  const answer = document.querySelector("#answer-note");
  answer.hidden = !answer.hidden;
  event.currentTarget.innerHTML = answer.hidden ? 'Show me the answer <span aria-hidden="true">↗</span>' : 'Hide the answer <span aria-hidden="true">↗</span>';
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    search.focus();
  }
});

// Local learning library and page router. Progress is kept on this device.
const lessons = [
  { id: "python-basics", title: "Python: your first steps", topic: "Python", level: "Beginner", time: "8 min", summary: "Meet variables, values, and the small building blocks behind a Python program.", intro: "Python is a programming language designed to read clearly. A program is a set of instructions, and Python lets you write those instructions in a compact, expressive way.", sections: [{ title: "Values and variables", text: "A value is a piece of information. A variable gives that information a name so you can use it later.", code: 'name = "Ada"\nscore = 3\nprint(name, score)' }, { title: "Types you will meet often", text: "Strings hold text, integers hold whole numbers, floats hold decimal numbers, and booleans represent true or false. Python can infer a value’s type from how you write it.", code: 'message = "hello"  # string\ncount = 4          # integer\nratio = 0.5        # float\nready = True       # boolean' }, { title: "Make a decision", text: "An if statement runs a block only when its condition is true. Indentation marks which instructions belong to the block.", code: 'temperature = 22\nif temperature > 20:\n    print("A warm day")\nelse:\n    print("Bring a jacket")' }], quiz: { question: "Which value is a boolean?", choices: ["'False'", "0", "False", "'0'"], answer: 2, explanation: "False without quotes is a boolean. With quotes, it would be a string." } },
  { id: "arrays", title: "Arrays and lists", topic: "Data structures", level: "Beginner", time: "10 min", summary: "Store items in order and learn the operations you will use every day.", intro: "A list keeps a sequence of values in one place. You can read an item by its position, add new items, and loop through the sequence.", sections: [{ title: "Create a list", text: "Python lists use square brackets. Positions start at zero, so the first item is at index 0.", code: 'colors = ["green", "blue", "coral"]\nprint(colors[0])  # green' }, { title: "Walk through every item", text: "A for loop visits items one at a time. This is often clearer than manually reading each position.", code: 'for color in colors:\n    print(color)' }, { title: "Choose the right operation", text: "Appending is usually constant time. Inserting at the front shifts existing items, so it takes longer as the list grows.", code: 'colors.append("gold")\nfirst = colors.pop(0)' }], quiz: { question: "What is the index of the first item in a Python list?", choices: ["0", "1", "-1", "It has no index"], answer: 0, explanation: "Python uses zero-based indexing, so the first position is 0." } },
  { id: "two-pointers", title: "The two-pointer pattern", topic: "Algorithms", level: "Intermediate", time: "12 min", summary: "Solve sequence problems with two positions that move with purpose.", intro: "Two pointers are two indices into a sequence. By moving them according to what you learn at each step, you can often avoid checking every possible pair.", sections: [{ title: "Start at both ends", text: "For a sorted list, place one pointer at the beginning and one at the end. Compare their values and move the pointer that can bring the sum closer to your target.", code: 'left = 0\nright = len(values) - 1\nwhile left < right:\n    total = values[left] + values[right]\n    if total == target:\n        return [left, right]\n    if total < target:\n        left += 1\n    else:\n        right -= 1' }, { title: "Why it is faster", text: "Each step moves one pointer inward. The pointers move at most n times in total, so the scan is O(n), compared with O(n²) for trying every pair.", code: '([1, 3, 4, 6, 8], 10)  # -> [1, 4]' }, { title: "When to use it", text: "Look for sorted arrays, pairs with a target sum, palindromes, or tasks that compare values from opposite ends." }], quiz: { question: "How many times can the pointers move in a single pass?", choices: ["At most n times in total", "Exactly n² times", "Only once", "It depends on sorting"], answer: 0, explanation: "Together, the pointers move inward through the array at most n times." } },
  { id: "html-css", title: "A page with HTML and CSS", topic: "Web development", level: "Beginner", time: "9 min", summary: "Give a web page structure, then shape how it looks.", intro: "HTML describes what is on a page. CSS describes how those elements look and how they fit together. Browsers combine both to create the interface you see.", sections: [{ title: "Describe the content", text: "Elements such as headings, paragraphs, links, and buttons give the page its structure and meaning.", code: '<main>\n  <h1>Hello, web</h1>\n  <p>A page starts with structure.</p>\n  <a href="/about">Learn more</a>\n</main>' }, { title: "Style with selectors", text: "A CSS selector chooses elements. Declarations inside braces set their appearance.", code: 'h1 {\n  color: seagreen;\n  font-size: 2rem;\n}' }, { title: "Build for different screens", text: "Flexible layouts and media queries help content adapt to phones, tablets, and wide screens." }], quiz: { question: "Which language describes the visual presentation of a web page?", choices: ["HTML", "CSS", "SQL", "HTTP"], answer: 1, explanation: "CSS controls styles and layout; HTML provides the page structure." } },
  { id: "sql-joins", title: "SQL joins, made visual", topic: "Databases", level: "Beginner", time: "11 min", summary: "Combine related rows from two tables with a clear mental model.", intro: "A relational database stores information in tables. A join connects rows from two tables using a relationship such as a shared identifier.", sections: [{ title: "An inner join", text: "An inner join keeps rows where both tables have a matching key.", code: 'SELECT students.name, courses.title\nFROM students\nJOIN courses\n  ON students.course_id = courses.id;' }, { title: "A left join", text: "A left join keeps every row from the first table, adding matching information from the second table when it exists.", code: 'SELECT students.name, courses.title\nFROM students\nLEFT JOIN courses\n  ON students.course_id = courses.id;' }, { title: "Choose by the question", text: "Ask whether unmatched rows should remain in your result. If yes, a left join may fit. If not, an inner join is often the right starting point." }], quiz: { question: "Which join keeps all rows from the left table?", choices: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"], answer: 1, explanation: "A LEFT JOIN retains every row from its left-hand table." } },
  { id: "recursion", title: "Recursion without the mystery", topic: "Algorithms", level: "Intermediate", time: "13 min", summary: "Break a problem into smaller versions of itself and know when to stop.", intro: "A recursive function calls itself on a smaller problem. Every recursive solution needs a base case that stops the calls.", sections: [{ title: "Find the base case", text: "The base case handles the smallest input directly. Without it, the function keeps calling itself until it runs out of stack space.", code: 'def countdown(n):\n    if n == 0:       # base case\n        return\n    print(n)\n    countdown(n - 1)' }, { title: "Make progress", text: "Each recursive call should move closer to the base case. Here, n decreases by one each time.", code: 'countdown(3)\n# 3\n# 2\n# 1' }, { title: "Think about the call stack", text: "Each call pauses while its smaller call runs. Once the base case returns, the paused calls finish in reverse order." }], quiz: { question: "What prevents a recursive function from calling itself forever?", choices: ["A loop", "A base case", "A variable", "A return type"], answer: 1, explanation: "The base case provides a direct answer for the smallest input and stops recursion." } }
];
const courses = [
  { id: "dsa-roadmap", name: "A calmer DSA roadmap", area: "Computer science", duration: "6 weeks", lessons: 24, level: "Beginner to intermediate", color: "#e5efd4", mark: "01", description: "Build a reliable foundation in data structures, patterns, and problem solving—one manageable lesson at a time." },
  { id: "web-studio", name: "Build your first web studio", area: "Web development", duration: "4 weeks", lessons: 18, level: "Beginner", color: "#f4e1d7", mark: "02", description: "Make a portfolio site from scratch while learning semantic HTML, responsive CSS, and JavaScript." },
  { id: "python-fieldnotes", name: "Python field notes", area: "Programming", duration: "3 weeks", lessons: 16, level: "Beginner", color: "#dfe7f2", mark: "03", description: "A project-led tour of Python basics, collections, functions, and useful everyday scripts." },
  { id: "sql-starter", name: "SQL for curious people", area: "Data", duration: "2 weeks", lessons: 12, level: "Beginner", color: "#eee5f1", mark: "04", description: "Learn to query real-shaped data, make joins, and explain what your results mean." }
];
const problems = [
  { id: "two-sum", title: "Find a pair", topic: "Arrays", difficulty: "Easy", acceptance: "62%", statement: "Given an array of distinct numbers and a target, return the indices of the two values that add up to the target. Return the indices in ascending order.", example: "values = [2, 7, 11, 15], target = 9 → [0, 1]", functionName: "twoSum", starter: "function twoSum(values, target) {\n  // Return the two indices whose values add to target.\n  return [];\n}", cases: [{ input: [[2, 7, 11, 15], 9], output: [0, 1] }, { input: [[3, 2, 4], 6], output: [1, 2] }, { input: [[1, 5, 8, 12], 13], output: [0, 3] }], hint: "Try saving each value’s index in a map. For every number, check whether target - number has appeared already." },
  { id: "palindrome", title: "Almost a palindrome", topic: "Strings", difficulty: "Easy", acceptance: "74%", statement: "Return true when a string reads the same forward and backward after converting it to lowercase and ignoring spaces and punctuation.", example: 'text = "Never odd, or even" → true', functionName: "isPalindrome", starter: "function isPalindrome(text) {\n  // Normalize the string, then compare both ends.\n  return false;\n}", cases: [{ input: ["Never odd, or even"], output: true }, { input: ["A man, a plan, a canal: Panama"], output: true }, { input: ["igothrough"], output: false }], hint: "Keep only letters and digits, then compare the normalized string with its reverse." },
  { id: "binary-search", title: "Find the first fit", topic: "Binary search", difficulty: "Medium", acceptance: "51%", statement: "Given a sorted array and a target, return the index of the target. If it is not present, return -1. Aim for logarithmic time.", example: "values = [-4, 0, 3, 8, 12], target = 8 → 3", functionName: "binarySearch", starter: "function binarySearch(values, target) {\n  // Use left and right bounds to narrow the search.\n  return -1;\n}", cases: [{ input: [[-4, 0, 3, 8, 12], 8], output: 3 }, { input: [[1, 4, 7, 10], 3], output: -1 }, { input: [[5], 5], output: 0 }], hint: "Compare the middle item with the target. Each comparison lets you discard half of the remaining range." },
  { id: "reverse-words", title: "Reverse the words", topic: "Strings", difficulty: "Easy", acceptance: "68%", statement: "Reverse the order of the words in a sentence. Trim extra spaces so there is one space between words.", example: 'text = "  keep going  " → "going keep"', functionName: "reverseWords", starter: "function reverseWords(text) {\n  // Split, reverse, and join the words.\n  return text;\n}", cases: [{ input: ["keep going"], output: "going keep" }, { input: ["  one   more step "], output: "step more one" }], hint: "Split on whitespace, remove empty parts, reverse the array, and join with one space." },
  { id: "max-streak", title: "Longest growing streak", topic: "Arrays", difficulty: "Medium", acceptance: "43%", statement: "Return the length of the longest run of consecutive increasing values. The run must stay in the original order.", example: "values = [1, 3, 5, 4, 7] → 3", functionName: "longestStreak", starter: "function longestStreak(values) {\n  // Track the current run and the best run.\n  return 0;\n}", cases: [{ input: [[1, 3, 5, 4, 7]], output: 3 }, { input: [[8, 7, 6]], output: 1 }, { input: [[]], output: 0 }], hint: "Walk once from left to right. Extend the current run when the next number is larger; otherwise restart it." },
  { id: "valid-brackets", title: "Balanced brackets", topic: "Stacks", difficulty: "Medium", acceptance: "58%", statement: "Given a string containing only (), [], and {}, decide whether each opening bracket closes in the correct order.", example: 'text = "{[()]}" → true', functionName: "validBrackets", starter: "function validBrackets(text) {\n  // A stack can remember the opening brackets.\n  return false;\n}", cases: [{ input: ["{[()]}"] , output: true }, { input: ["([)]"], output: false }, { input: [""], output: true }], hint: "Push opening brackets onto a stack. For every closing bracket, check that the top of the stack is its matching pair." }
];
const reads = [
  { title: "How to learn a hard thing without burning out", category: "Learning", time: "5 min", text: "A practical note on choosing a small next step, setting a steady pace, and leaving room for rest." },
  { title: "Big O, explained with everyday choices", category: "Computer science", time: "7 min", text: "Compare a quick lookup, a list scan, and a nested search using examples you can picture." },
  { title: "The tiny details that make a page feel clear", category: "Design", time: "6 min", text: "Spacing, labels, and feedback can make a useful interface feel welcoming and easy to follow." },
  { title: "What happens after you press Enter?", category: "Web development", time: "8 min", text: "Follow a browser request from a typed address through DNS, a connection, and a server response." }
];
const routeRoot = document.createElement("div");
routeRoot.id = "route-root";
routeRoot.hidden = true;
document.querySelector("#main").prepend(routeRoot);
const completedKey = "igothrough-completed";
const enrolledKey = "igothrough-enrolled";
const savedKey = "igothrough-saved";
const getList = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const setList = (key, list) => localStorage.setItem(key, JSON.stringify([...new Set(list)]));
const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const arrow = '<span aria-hidden="true">↗</span>';
const cardLink = (href, label) => `<a class="button button-dark" href="${href}">${label} ${arrow}</a>`;
const pageHead = (eyebrow, title, intro) => `<div class="app-page-head"><div class="eyebrow eyebrow-muted"><span class="eyebrow-dot"></span>${eyebrow}</div><h1>${title}</h1><p>${intro}</p></div>`;

function tutorialCard(item) {
  const done = getList(completedKey).includes(item.id);
  return `<article class="library-card"><div class="library-card-top"><span class="library-tag">${esc(item.topic)}</span><span class="library-time">${done ? "✓ COMPLETED" : esc(item.time.toUpperCase())}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p><div class="library-card-foot"><span>${esc(item.level)} · ${esc(item.time)} read</span><a href="#lesson/${item.id}">Read lesson ${arrow}</a></div></article>`;
}
function courseCard(item) {
  const enrolled = getList(enrolledKey).includes(item.id);
  return `<article class="course-card"><div class="course-art" style="--course-color:${item.color}"><span>${item.mark}</span><i>${item.area}</i><b>${item.mark === "01" ? "↗" : item.mark === "02" ? "◫" : item.mark === "03" ? "Py" : "▤"}</b></div><div class="course-info"><span class="library-tag">${esc(item.area.toUpperCase())}</span><h2>${esc(item.name)}</h2><p>${esc(item.description)}</p><div class="course-meta"><span>${esc(item.duration)}</span><span>${item.lessons} lessons</span><span>${esc(item.level)}</span></div><a class="course-detail-link" href="#course/${item.id}">View curriculum ${arrow}</a><button type="button" class="button ${enrolled ? "button-enrolled" : "button-dark"}" data-enroll="${item.id}">${enrolled ? "✓ In your library" : "Add to my learning"} ${arrow}</button></div></article>`;
}
function problemCard(item) {
  return `<a class="problem-card" href="#problem/${item.id}"><span class="problem-number">#${String(problems.indexOf(item) + 1).padStart(2, "0")}</span><span class="problem-content"><strong>${esc(item.title)}</strong><small>${esc(item.topic)} · ${item.acceptance} accepted</small></span><span class="difficulty difficulty-${item.difficulty.toLowerCase()}">${item.difficulty}</span><span class="problem-arrow">↗</span></a>`;
}
function renderTutorials(query = "") {
  const normalized = query.toLowerCase();
  const list = lessons.filter(item => `${item.title} ${item.topic} ${item.summary}`.toLowerCase().includes(normalized));
  routeRoot.innerHTML = `${pageHead("TUTORIAL LIBRARY", "Learn something <em>useful.</em>", "Clear, focused lessons for the questions you have today—and the ones you will have tomorrow.")}<div class="library-toolbar"><div class="library-tabs"><button class="library-filter active" data-topic="all">All topics</button>${[...new Set(lessons.map(x => x.topic))].map(topic => `<button class="library-filter" data-topic="${esc(topic)}">${esc(topic)}</button>`).join("")}</div><label class="library-search"><span>⌕</span><input id="library-search" value="${esc(query)}" placeholder="Search lessons" /></label></div><div class="library-grid" id="lesson-grid">${list.map(tutorialCard).join("")}</div><p class="library-empty" id="lesson-empty" ${list.length ? "hidden" : ""}>No lessons match that search. Try another topic.</p><div class="inline-callout"><div><span class="eyebrow eyebrow-muted">READY TO PRACTICE?</span><h2>Make the idea stick.</h2><p>Try a small challenge and put what you learned to work.</p></div><a class="button button-dark" href="#practice">Browse practice ${arrow}</a></div>`;
}
function renderLesson(id) {
  const item = lessons.find(lesson => lesson.id === id);
  if (!item) return renderTutorials();
  const done = getList(completedKey).includes(id);
  routeRoot.innerHTML = `<div class="reader-layout"><aside class="reader-rail"><a class="back-link" href="#tutorials">← All tutorials</a><div class="reader-rail-label">IN THIS LESSON</div><nav>${item.sections.map((section, i) => `<a href="#section-${i + 1}">${esc(section.title)}</a>`).join("")}<a href="#quick-check">Quick check</a></nav><div class="reader-progress"><span>YOUR PROGRESS</span><b>${done ? "100%" : "0%"}</b><i><u style="width:${done ? "100%" : "8%"}"></u></i></div></aside><article class="lesson-article"><div class="eyebrow eyebrow-muted"><span class="eyebrow-dot"></span>${esc(item.topic.toUpperCase())} · ${esc(item.level.toUpperCase())} · ${esc(item.time.toUpperCase())}</div><h1>${esc(item.title)}</h1><p class="lesson-deck">${esc(item.summary)}</p><div class="lesson-byline"><span class="author-avatar">ig</span><span>igothrough editorial<br /><small>Made for learning at your pace</small></span><button class="save-lesson" data-save="${id}">${getList(savedKey).includes(id) ? "★ Saved" : "☆ Save"}</button></div><p class="lesson-intro">${esc(item.intro)}</p>${item.sections.map((section, i) => `<section class="lesson-section" id="section-${i + 1}"><h2>${esc(section.title)}</h2><p>${esc(section.text)}</p>${section.code ? `<pre class="code-block"><span class="code-language">EXAMPLE</span><code>${esc(section.code)}</code></pre>` : ""}</section>`).join("")}<section class="quick-check" id="quick-check"><span class="eyebrow eyebrow-muted">QUICK CHECK</span><h2>${esc(item.quiz.question)}</h2><div class="quiz-options">${item.quiz.choices.map((choice, i) => `<button type="button" class="quiz-option" data-choice="${i}">${String.fromCharCode(65 + i)} <span>${esc(choice)}</span></button>`).join("")}</div><p class="quiz-feedback" id="quiz-feedback" aria-live="polite"></p></section><div class="lesson-finish"><div><span class="eyebrow eyebrow-muted">THAT’S A WRAP</span><h2>${done ? "You have this one." : "One more step forward."}</h2><p>Mark the lesson complete to keep your learning dashboard up to date.</p></div><button class="button ${done ? "button-enrolled" : "button-dark"}" data-complete="${id}">${done ? "✓ Completed" : "Mark complete"}</button></div><div class="next-lesson"><span>UP NEXT</span><a href="#practice">Take the idea into practice ${arrow}</a></div></article></div>`;
  routeRoot.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
    const correct = Number(button.dataset.choice) === item.quiz.answer;
    routeRoot.querySelectorAll("[data-choice]").forEach(choice => choice.classList.toggle("chosen", choice === button));
    const feedback = routeRoot.querySelector("#quiz-feedback");
    feedback.className = `quiz-feedback ${correct ? "correct" : "incorrect"}`;
    feedback.textContent = `${correct ? "That’s right." : "Not quite."} ${item.quiz.explanation}`;
  }));
}
function renderCourses() {
  routeRoot.innerHTML = `${pageHead("LEARNING PATHS", "Go from curious to <em>capable.</em>", "Guided courses give your learning a shape. Pick a subject, follow the milestones, and keep your progress in one place.")}<div class="course-banner"><span class="eyebrow eyebrow-light">A GOOD FIRST MOVE</span><h2>Small steps.<br />Real momentum.</h2><p>Each path is broken into short lessons and hands-on practice, so you always know what comes next.</p><a href="#dashboard" class="button button-lime">View my learning ${arrow}</a><span class="banner-orbit">igo</span></div><div class="app-section-title"><div><span class="eyebrow eyebrow-muted">THE COURSE SHELF</span><h2>Pick up a new thread.</h2></div><span>${courses.length} LEARNING PATHS</span></div><div class="courses-list">${courses.map(courseCard).join("")}</div>`;
}
const courseLessonIds = { "dsa-roadmap": ["arrays", "two-pointers", "recursion"], "web-studio": ["html-css", "python-basics"], "python-fieldnotes": ["python-basics", "arrays", "recursion"], "sql-starter": ["sql-joins", "arrays"] };
function renderCourse(id) {
  const course = courses.find(item => item.id === id);
  if (!course) return renderCourses();
  const ids = courseLessonIds[id] || [];
  const completed = getList(completedKey);
  const done = ids.filter(lessonId => completed.includes(lessonId)).length;
  const enrolled = getList(enrolledKey).includes(id);
  routeRoot.innerHTML = `<div class="reader-layout course-reader"><aside class="reader-rail"><a class="back-link" href="#courses">← All learning paths</a><div class="reader-rail-label">PATH OVERVIEW</div><nav><a href="#course/${id}">About this path</a><a href="#course-curriculum">Curriculum</a><a href="#practice">Practice room</a></nav><div class="reader-progress"><span>PATH PROGRESS</span><b>${Math.round(done / Math.max(1, ids.length) * 100)}%</b><i><u style="width:${done / Math.max(1, ids.length) * 100}%"></u></i></div></aside><article class="lesson-article"><div class="course-art course-detail-art" style="--course-color:${course.color}"><span>${course.mark}</span><i>${esc(course.area)}</i><b>${course.mark === "01" ? "↗" : course.mark === "02" ? "◫" : course.mark === "03" ? "Py" : "▤"}</b></div><div class="eyebrow eyebrow-muted"><span class="eyebrow-dot"></span>${esc(course.area.toUpperCase())} · ${esc(course.level.toUpperCase())}</div><h1>${esc(course.name)}</h1><p class="lesson-deck">${esc(course.description)}</p><div class="course-detail-metrics"><span>${course.lessons} short lessons</span><span>${esc(course.duration)}</span><span>${ids.length} sample lessons available</span></div><button type="button" class="button ${enrolled ? "button-enrolled" : "button-dark"}" data-enroll="${id}">${enrolled ? "✓ Added to your learning" : "Add this path to my learning"} ${arrow}</button><section id="course-curriculum" class="curriculum"><div class="app-section-title compact"><div><span class="eyebrow eyebrow-muted">THE CURRICULUM</span><h2>Take it one lesson at a time.</h2></div><span>${done} / ${ids.length} DONE</span></div>${ids.map((lessonId, index) => { const lesson = lessons.find(x => x.id === lessonId); if (!lesson) return ""; const isDone = completed.includes(lessonId); return `<a class="curriculum-row" href="#lesson/${lessonId}"><span>${isDone ? "✓" : String(index + 1).padStart(2, "0")}</span><div><strong>${esc(lesson.title)}</strong><small>${esc(lesson.summary)}</small></div><i>${isDone ? "DONE" : esc(lesson.time.toUpperCase())}</i><b>↗</b></a>`; }).join("")}</section><div class="inline-callout course-callout"><div><span class="eyebrow eyebrow-muted">NEED A CHANGE OF PACE?</span><h2>Try a problem instead.</h2><p>Practice is another way to learn the same idea.</p></div><a class="button button-dark" href="#practice">Go to practice ${arrow}</a></div></article></div>`;
}
function renderPractice(filter = "All") {
  const list = problems.filter(problem => filter === "All" || problem.difficulty === filter);
  routeRoot.innerHTML = `${pageHead("PRACTICE ROOM", "Think it through. <em>Then try.</em>", "Short problems, useful hints, and a quiet place to work through the tricky bit.")}<div class="practice-summary"><div><strong>${problems.length}</strong><span>problems to explore</span></div><div><strong>${getList("igothrough-solved").length}</strong><span>you have solved</span></div><div><strong>JS</strong><span>local browser runner</span></div></div><div class="practice-list-head"><div><span class="eyebrow eyebrow-muted">THE PRACTICE SET</span><h2>Find your next challenge.</h2></div><div class="problem-filters">${["All", "Easy", "Medium"].map(level => `<button class="problem-filter ${filter === level ? "active" : ""}" data-level="${level}">${level}</button>`).join("")}</div></div><div class="problem-list">${list.map(problemCard).join("")}</div><p class="runner-note">Solutions run in a temporary browser worker on your device. Your code stays in this browser.</p>`;
}
function renderProblem(id) {
  const item = problems.find(problem => problem.id === id);
  if (!item) return renderPractice();
  routeRoot.innerHTML = `<div class="problem-workspace"><div class="problem-pane"><a class="back-link" href="#practice">← Practice room</a><div class="problem-title-row"><span class="difficulty difficulty-${item.difficulty.toLowerCase()}">${item.difficulty}</span><span>${item.acceptance} acceptance</span><button data-save-problem="${id}">${getList(savedKey).includes(id) ? "★" : "☆"} Save</button></div><h1>${esc(item.title)}</h1><p class="problem-statement">${esc(item.statement)}</p><div class="example-box"><b>Example</b><code>${esc(item.example)}</code></div><details class="hint-box"><summary>Need a nudge?</summary><p>${esc(item.hint)}</p></details><div class="problem-topics"><span>${esc(item.topic)}</span><span>Time: O(n) target</span></div><div class="problem-nav"><span>YOUR NEXT STEP</span><a href="#lesson/${item.topic === "Arrays" ? "arrays" : item.topic === "Strings" ? "python-basics" : "two-pointers"}">Review a related lesson ${arrow}</a></div></div><section class="editor-pane"><div class="editor-top"><span><i></i> igothrough playground</span><select id="editor-language" aria-label="Programming language"><option>JavaScript</option></select><button type="button" id="reset-code">Reset</button></div><div class="editor-file"><span>solution.js</span><span>UTF-8 · JavaScript</span></div><label for="solution-code" class="sr-only">Write your solution in JavaScript</label><textarea id="solution-code" spellcheck="false" aria-label="JavaScript solution editor">${esc(item.starter)}</textarea><div class="editor-actions"><button type="button" class="button button-quiet" id="run-samples">Run samples</button><button type="button" class="button button-dark" id="submit-solution">Submit solution ${arrow}</button></div><div class="run-results" id="run-results" aria-live="polite"><span class="results-placeholder">Your sample results will show up here.</span></div><p class="runner-note">JavaScript runs in a temporary worker with a time limit. Python and server-side judging aren’t connected in this preview.</p></section></div>`;
  const editor = routeRoot.querySelector("#solution-code");
  const resultBox = routeRoot.querySelector("#run-results");
  routeRoot.querySelector("#reset-code").addEventListener("click", () => { editor.value = item.starter; resultBox.innerHTML = '<span class="results-placeholder">Editor reset to the starter code.</span>'; });
  routeRoot.querySelector("[data-save-problem]").addEventListener("click", event => {
    const saved = getList(savedKey); const wasSaved = saved.includes(id); setList(savedKey, wasSaved ? saved.filter(x => x !== id) : [...saved, id]); event.currentTarget.textContent = wasSaved ? "☆ Save" : "★ Saved";
  });
  const run = () => runProblem(item, editor.value, resultBox);
  routeRoot.querySelector("#run-samples").addEventListener("click", run);
  routeRoot.querySelector("#submit-solution").addEventListener("click", run);
}
function runProblem(item, code, resultBox) {
  resultBox.innerHTML = '<span class="results-placeholder">Running sample cases…</span>';
  if (!window.Worker || !window.Blob || !window.URL.createObjectURL) {
    resultBox.innerHTML = '<span class="run-fail">This browser does not support the local JavaScript runner.</span>';
    return;
  }
  const workerSource = `onmessage = (event) => { const { code, functionName, cases } = event.data; try { const fn = new Function(code + "\\n; return typeof " + functionName + " === 'function' ? " + functionName + " : null;")(); if (typeof fn !== 'function') throw new Error('Define the expected function: ' + functionName); const results = cases.map((test, index) => { const actual = fn(...test.input); return { index: index + 1, pass: JSON.stringify(actual) === JSON.stringify(test.output), expected: JSON.stringify(test.output), actual: JSON.stringify(actual) }; }); postMessage({ results }); } catch (error) { postMessage({ error: String(error && error.message || error) }); } };`;
  let worker;
  try { worker = new Worker(URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }))); }
  catch { resultBox.innerHTML = '<span class="run-fail">The browser blocked the local worker. Open this project through a local web server to run code.</span>'; return; }
  const timer = setTimeout(() => { worker.terminate(); resultBox.innerHTML = '<span class="run-fail">Time limit exceeded. Check for an infinite loop and try again.</span>'; }, 1800);
  worker.onmessage = event => {
    clearTimeout(timer); worker.terminate();
    if (event.data.error) { resultBox.innerHTML = `<span class="run-fail">${esc(event.data.error)}</span>`; return; }
    const results = event.data.results;
    resultBox.innerHTML = `<div class="result-summary ${results.every(x => x.pass) ? "all-pass" : "some-fail"}">${results.filter(x => x.pass).length} / ${results.length} sample cases passed${results.every(x => x.pass) ? " — nice work." : " — keep going."}</div>${results.map(item => `<div class="result-case"><span class="${item.pass ? "case-pass" : "case-fail"}">${item.pass ? "✓" : "×"} Case ${item.index}</span><code>expected ${esc(item.expected)} · got ${esc(item.actual)}</code></div>`).join("")}`;
    if (results.every(x => x.pass)) setList("igothrough-solved", [...getList("igothrough-solved"), item.id]);
  };
  worker.onerror = () => { clearTimeout(timer); worker.terminate(); resultBox.innerHTML = '<span class="run-fail">The worker stopped unexpectedly. Check the function syntax and try again.</span>'; };
  worker.postMessage({ code, functionName: item.functionName, cases: item.cases });
}
function renderArticles() {
  routeRoot.innerHTML = `${pageHead("IDEAS & EXPLANATIONS", "A few things worth <em>thinking about.</em>", "Field notes from the world of code, design, learning, and the choices we make along the way.")}<div class="article-feature"><div class="article-feature-art"><span>FIELD<br />NOTES</span><b>04</b><i>✳</i></div><div class="article-feature-copy"><span class="library-tag">EDITOR’S PICK · LEARNING</span><h2>How to learn a hard thing without burning out</h2><p>A sustainable pace is a skill of its own. Here are a few ways to make steady progress without turning every day into a test.</p><a class="text-link" href="#article/learning-without-burnout">Read the story ${arrow}</a></div></div><div class="app-section-title"><div><span class="eyebrow eyebrow-muted">THE READING ROOM</span><h2>More ideas to carry with you.</h2></div></div><div class="article-grid">${reads.map((article, index) => `<a class="article-card" href="#article/${index === 0 ? "learning-without-burnout" : `note-${index + 1}`}"><span class="article-card-index">NOTE ${String(index + 1).padStart(2, "0")}</span><span class="library-tag">${esc(article.category.toUpperCase())}</span><h3>${esc(article.title)}</h3><p>${esc(article.text)}</p><span class="article-card-foot">${esc(article.time)} read ${arrow}</span></a>`).join("")}</div>`;
}
function renderArticle(id) {
  const index = id === "learning-without-burnout" ? 0 : Math.max(1, Number(id.replace("note-", "")) - 1);
  const article = reads[index] || reads[0];
  routeRoot.innerHTML = `<article class="long-read"><a class="back-link" href="#articles">← All articles</a><div class="eyebrow eyebrow-muted"><span class="eyebrow-dot"></span>${esc(article.category.toUpperCase())} · ${esc(article.time.toUpperCase())} READ</div><h1>${esc(article.title)}</h1><p class="lesson-deck">${esc(article.text)}</p><div class="lesson-byline"><span class="author-avatar">ig</span><span>igothrough editorial<br /><small>Notes for the road ahead</small></span></div><p>Learning is not a race against a clock. It is a practice of noticing what you understand, finding the edge of what you do not, and making one useful move toward it.</p><h2>Make the next step small enough</h2><p>When a topic feels too large, choose a question you can answer in one sitting. A small finished lesson gives you a clearer map than a huge plan you never begin.</p><blockquote>Consistency is easier to keep when each session has a clear beginning and a kind ending.</blockquote><h2>Leave room for the idea to settle</h2><p>Try a problem, explain a concept in your own words, or come back tomorrow and see what you remember. The pauses are part of the process; they help knowledge become yours.</p><h2>Measure what matters</h2><p>Count the questions you can now ask, the examples you can now explain, and the confidence you have gained. Progress is often quieter than a streak counter.</p><a class="button button-dark" href="#tutorials">Choose a short lesson ${arrow}</a></article>`;
}
function renderDashboard() {
  const completed = getList(completedKey); const enrolled = getList(enrolledKey); const saved = getList(savedKey); const solved = getList("igothrough-solved");
  const current = courses.find(course => enrolled.includes(course.id));
  routeRoot.innerHTML = `${pageHead("YOUR LEARNING SPACE", "A place to pick <em>up again.</em>", "Your reading list, practice wins, and learning paths—all gathered here on this device.")}<div class="dashboard-stats"><div><strong>${completed.length}</strong><span>lessons completed</span></div><div><strong>${solved.length}</strong><span>practice problems solved</span></div><div><strong>${saved.length}</strong><span>items saved for later</span></div></div>${current ? `<section class="continue-card"><div><span class="eyebrow eyebrow-light">PICK UP WHERE YOU LEFT OFF</span><h2>${esc(current.name)}</h2><p>${current.lessons} focused lessons · ${esc(current.duration)}</p></div><a class="button button-lime" href="#tutorials">Continue learning ${arrow}</a></section>` : `<section class="continue-card"><div><span class="eyebrow eyebrow-light">YOUR NEXT CHAPTER IS WAITING</span><h2>Choose a learning path.</h2><p>Pick a course that sounds interesting and add it to your learning space.</p></div><a class="button button-lime" href="#courses">Explore courses ${arrow}</a></section>`}<div class="dashboard-columns"><section><div class="app-section-title compact"><div><span class="eyebrow eyebrow-muted">YOUR LIBRARY</span><h2>Saved for later</h2></div></div>${saved.length ? `<div class="saved-list">${saved.map(id => { const lesson = lessons.find(x => x.id === id); const problem = problems.find(x => x.id === id); return lesson ? `<a href="#lesson/${id}">${esc(lesson.title)} <span>Lesson ↗</span></a>` : problem ? `<a href="#problem/${id}">${esc(problem.title)} <span>Problem ↗</span></a>` : ""; }).join("")}</div>` : `<p class="dashboard-empty">Nothing saved yet. Use the ☆ button on a lesson or problem to keep it here.</p>`}</section><section><div class="app-section-title compact"><div><span class="eyebrow eyebrow-muted">KEEP THE MOMENTUM</span><h2>Up next</h2></div></div><div class="up-next"><a href="#practice"><span>01</span><div><strong>Try a practice problem</strong><small>Build confidence by doing.</small></div>${arrow}</a><a href="#tutorials"><span>02</span><div><strong>Read a short tutorial</strong><small>Follow a thread that interests you.</small></div>${arrow}</a><a href="#articles"><span>03</span><div><strong>Visit the reading room</strong><small>Pick up a new idea.</small></div>${arrow}</a></div></section></div><div class="app-section-title"><div><span class="eyebrow eyebrow-muted">COMPLETED LESSONS</span><h2>Your little wins.</h2></div></div><div class="completed-chips">${completed.length ? completed.map(id => { const item = lessons.find(x => x.id === id); return item ? `<a href="#lesson/${id}">✓ ${esc(item.title)}</a>` : ""; }).join("") : `<span class="dashboard-empty">Your completed lessons will appear here.</span>`}</div>`;
}
function renderSearch(query) {
  const q = query.toLowerCase();
  const foundLessons = lessons.filter(x => `${x.title} ${x.topic} ${x.summary}`.toLowerCase().includes(q));
  const foundProblems = problems.filter(x => `${x.title} ${x.topic} ${x.statement}`.toLowerCase().includes(q));
  const foundCourses = courses.filter(x => `${x.name} ${x.area} ${x.description}`.toLowerCase().includes(q));
  const foundArticles = reads.map((x, i) => ({ ...x, id: i === 0 ? "learning-without-burnout" : `note-${i + 1}` })).filter(x => `${x.title} ${x.category} ${x.text}`.toLowerCase().includes(q));
  routeRoot.innerHTML = `${pageHead("SEARCH RESULTS", `Looking for <em>${esc(query)}</em>?`, "Search across tutorials, courses, practice problems, and reading notes.")}<label class="library-search search-page-box"><span>⌕</span><input id="search-page-input" value="${esc(query)}" placeholder="Search igothrough" /></label><div class="search-results-group"><h2>Tutorials <span>${foundLessons.length}</span></h2>${foundLessons.map(x => `<a href="#lesson/${x.id}">${esc(x.title)} <small>${esc(x.topic)}</small>${arrow}</a>`).join("") || `<p>No matching tutorials.</p>`}</div><div class="search-results-group"><h2>Practice <span>${foundProblems.length}</span></h2>${foundProblems.map(x => `<a href="#problem/${x.id}">${esc(x.title)} <small>${esc(x.topic)} · ${x.difficulty}</small>${arrow}</a>`).join("") || `<p>No matching problems.</p>`}</div><div class="search-results-group"><h2>Courses <span>${foundCourses.length}</span></h2>${foundCourses.map(x => `<a href="#courses">${esc(x.name)} <small>${esc(x.area)}</small>${arrow}</a>`).join("") || `<p>No matching courses.</p>`}</div><div class="search-results-group"><h2>Articles <span>${foundArticles.length}</span></h2>${foundArticles.map(x => `<a href="#article/${x.id}">${esc(x.title)} <small>${esc(x.category)}</small>${arrow}</a>`).join("") || `<p>No matching articles.</p>`}</div>`;
  routeRoot.querySelector("#search-page-input").addEventListener("keydown", event => { if (event.key === "Enter") location.hash = `search/${encodeURIComponent(event.currentTarget.value.trim())}`; });
}
function renderRoute() {
  const route = decodeURIComponent(location.hash.slice(1));
  if (!routeRoot.hidden && /^[a-zA-Z0-9_-]+$/.test(route) && routeRoot.querySelector(`#${route}`)) {
    routeRoot.querySelector(`#${route}`).scrollIntoView({ behavior: "smooth" });
    return;
  }
  const isAppRoute = /^(tutorials|practice|courses|course\/|articles|dashboard|lesson\/|problem\/|article\/|search\/)/.test(route);
  routeRoot.hidden = !isAppRoute;
  [...document.querySelector("#main").children].filter(child => child !== routeRoot).forEach(child => { child.hidden = isAppRoute; });
  if (!isAppRoute) { document.title = "igothrough — Learn by going through it"; return; }
  const [page, ...rest] = route.split("/"); const id = rest.join("/");
  if (page === "tutorials") renderTutorials();
  else if (page === "lesson") renderLesson(id);
  else if (page === "practice") renderPractice();
  else if (page === "problem") renderProblem(id);
  else if (page === "courses") renderCourses();
  else if (page === "course") renderCourse(id);
  else if (page === "articles") renderArticles();
  else if (page === "article") renderArticle(id);
  else if (page === "dashboard") renderDashboard();
  else if (page === "search") renderSearch(id);
  document.title = `${page[0].toUpperCase()}${page.slice(1)} — igothrough`;
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", renderRoute);
renderRoute();

routeRoot.addEventListener("input", event => {
  if (event.target.id !== "library-search") return;
  const topic = routeRoot.querySelector(".library-filter.active")?.dataset.topic || "all";
  const query = event.target.value.toLowerCase();
  const visible = lessons.filter(item => (topic === "all" || item.topic === topic) && `${item.title} ${item.topic} ${item.summary}`.toLowerCase().includes(query));
  routeRoot.querySelector("#lesson-grid").innerHTML = visible.map(tutorialCard).join("");
  routeRoot.querySelector("#lesson-empty").hidden = visible.length > 0;
});
routeRoot.addEventListener("click", event => {
  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) {
    routeRoot.querySelectorAll("[data-topic]").forEach(button => button.classList.toggle("active", button === topicButton));
    const topic = topicButton.dataset.topic; const query = routeRoot.querySelector("#library-search").value.toLowerCase();
    const visible = lessons.filter(item => (topic === "all" || item.topic === topic) && `${item.title} ${item.topic} ${item.summary}`.toLowerCase().includes(query));
    routeRoot.querySelector("#lesson-grid").innerHTML = visible.map(tutorialCard).join(""); routeRoot.querySelector("#lesson-empty").hidden = visible.length > 0;
  }
  const levelButton = event.target.closest("[data-level]");
  if (levelButton) renderPractice(levelButton.dataset.level);
  const enrollButton = event.target.closest("[data-enroll]");
  if (enrollButton) { const id = enrollButton.dataset.enroll; setList(enrolledKey, [...getList(enrolledKey), id]); if (location.hash.startsWith("#course/")) renderCourse(id); else renderCourses(); }
  const completeButton = event.target.closest("[data-complete]");
  if (completeButton) { const id = completeButton.dataset.complete; setList(completedKey, [...getList(completedKey), id]); renderLesson(id); }
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) { const id = saveButton.dataset.save; const saved = getList(savedKey); const present = saved.includes(id); setList(savedKey, present ? saved.filter(value => value !== id) : [...saved, id]); renderLesson(id); }
});
document.querySelector("#search-form").addEventListener("submit", event => {
  event.preventDefault();
  const query = search.value.trim();
  if (query) location.hash = `search/${encodeURIComponent(query)}`;
  else location.hash = "tutorials";
});
