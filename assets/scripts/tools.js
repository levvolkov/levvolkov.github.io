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
  "Allure Report", // !!!
  "Node.js",
  "Jest",
  "Playwright",
  "Puppeteer",
  "Cypress",
  "Jenkins",
  "Android Studio",
  "Xcode",
  "TestFlight",
  "Appium",
  "Espresso",
  "BlazeMeter",
  "JMeter",
  "Grafana",
];

var tagCloud = TagCloud(".topics", myTags, {
  radius: 460,
  maxSpeed: "fast",
  initSpeed: "fast",
  direction: 100,
  keep: true,
});

var colors = ["#778899"];
var random_color = colors[Math.floor(Math.random() * colors.length)];
var contentElement = document.querySelector(".topics");
contentElement.style.color = random_color;