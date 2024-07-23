// script.js
document.addEventListener("DOMContentLoaded", function () {
  const projectName = document.getElementById("project-name");
  const projectClass = document.getElementById("project-class");
  const projectSkills = document.getElementById("project-skills");
  const projectTools = document.getElementById("project-tools");
  const projectDescription = document.getElementById("project-description");
  const portfolioDetails = document.getElementById("portfolio-details");
  const portfolioContainer = document.getElementById("portfolio-container");
  const portfolioImageSwiper = document.getElementById(
    "portfolio-image-container"
  );
  const imageWrapper = document.getElementById("swiper-wrapper");
  // Get the current URL
  const currentUrl = window.location.href;
  // Create a URL object
  const url = new URL(currentUrl);
  // Get search parameters from the URL object
  const searchParams = new URLSearchParams(url.search);
  const projectKey = searchParams.get("projectKey");

  if (!projectKey) {
    portfolioDetails.innerHTML = "<p>Project not found.</p>";
    return;
  }

  // Fetch JSON file containing portfolio data
  fetch("./portfolio/portfolioData.json")
    .then((response) => response.json())
    .then((data) => {
      let project;
      project = data.projects.find(
        (p) => p.key.toLowerCase() === projectKey.toLowerCase()
      );

      // Clear previous content
      portfolioContainer.innerHTML = "";
      imageWrapper.innerHTML = "";

      // If project found, render it
      if (project) {
        // Add Project Images
        const swiper = new Swiper(".swiper-container", {
          loop: true, // Enable looping
          autoplay: {
            delay: 5000,
          },
          speed: 600,
          slidesPerView: 1,
          slidesPerGroup: 1,

          pagination: {
            el: ".swiper-pagination", // Pagination container
            dynamicBullets: true,
          },
        });

        //TODO: Turn this into a function
        project.images.forEach((image) => {
          var imageDiv = document.createElement("div");
          imageDiv.classList.add("swiper-slide");
          const img = document.createElement("img");
          img.src = image;
          img.alt = "Image";

          imageDiv.appendChild(img);
          imageWrapper.appendChild(imageDiv);
        });
        swiper.update();

        // Add Project Info
        const projectDiv = document.createElement("div");

        // Populate project details
        projectDiv.innerHTML = `
                <div
                    class="portfolio-info"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <h3 id="project-name">${project.name}
                    </h3>
                    <ul>
                    <li id="project-class"><strong>Class</strong>: ${project.class}</li>
                    <li id="project-skills">
                        <strong>Skills</strong>: ${project.skills}
                    </li>
                    <li id="project-tools">
                        <strong>Tools</strong>: ${project.tools}
                    </li>
                    </ul>
                </div>
                <div
                    class="portfolio-description"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <h2>Description</h2>
                    <p id="project-description">${project.description}
                    </p>
                </div>
            `;
        // Append project div to portfolio container
        portfolioContainer.appendChild(projectDiv);
      } else {
        // Display message if project not found
        portfolioDetails.innerHTML = "<p>Project not found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});
