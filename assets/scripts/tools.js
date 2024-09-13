const myTags = [
  "JavaScript",
  "CSS",
  "HTML",
  "Docker",
  "Postman",
  "DBeaver",
  "Selenium",
  "Java",
  "git",
  "DevTools",
  "PostgreSQL",
  "Maven",
  "Gradle",
  "MySQL",
  "JUnit",
  "InteliJ IDEA",
  "Selenide",
  "VSCode",
  "Node.js",
  "Jest",
  "Playwright",
  "Puppeteer",
  "Cypress",
  "Jenkins",
  "Android Studio",
  "Xcode",
];

var tagCloud = TagCloud(".content", myTags, {
  radius: 460,
  maxSpeed: "fast",
  initSpeed: "fast",
  direction: 100,
  keep: true,
});

var colors = ["#778899"];
var random_color = colors[Math.floor(Math.random() * colors.length)];
var contentElement = document.querySelector(".content");
contentElement.style.color = random_color;