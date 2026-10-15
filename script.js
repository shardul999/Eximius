/* =========================================
   εXIMIUS — Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const slides = Array.from(document.querySelectorAll(".slide"));

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const currentNumber = document.getElementById("current-number");
    const totalNumber = document.getElementById("total-number");
    const progressBar = document.getElementById("progress-bar");
    const slideCaption = document.getElementById("slide-caption");

    let currentSlide = Math.max(
        0,
        slides.findIndex(slide => slide.classList.contains("active"))
    );

    // Slide captions
    const captions = [
        "Five people, one team",
        "Welcome to EXIMIUS",
        "Meet Shardul",
        "Meet Vedant",
        "Meet Anushka",
        "Meet Aditi",
        "Meet Samruddhi",
        "Escalation Matrix",
        "Team Chatter & Responsibilities",
        "Our Team Rules",
        "Our Specialities",
        "Contact Our Team",
        "Share Your Feedback"
    ];

    // Display the selected slide
    function showSlide(index) {
        if (slides.length === 0) return;

        currentSlide = Math.max(0, Math.min(index, slides.length - 1));

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
            slide.setAttribute(
                "aria-hidden",
                i === currentSlide ? "false" : "true"
            );
        });

        if (currentNumber) {
            currentNumber.textContent = currentSlide + 1;
        }

        if (totalNumber) {
            totalNumber.textContent = slides.length;
        }

        if (progressBar) {
            progressBar.style.width =
                ((currentSlide + 1) / slides.length) * 100 + "%";
        }

        if (slideCaption) {
            slideCaption.textContent =
                captions[currentSlide] || `Slide ${currentSlide + 1}`;
        }

        if (prevButton) {
            prevButton.disabled = currentSlide === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentSlide === slides.length - 1;
        }
    }

    // Previous and next buttons
    prevButton?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    // Header navigation and buttons with data-go
    document.querySelectorAll("[data-go]").forEach(button => {
        button.addEventListener("click", () => {
            const target = Number(button.dataset.go);

            if (Number.isInteger(target)) {
                showSlide(target);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener("keydown", event => {
        const element = event.target;

        // Don't interrupt typing in forms or editable cells
        const isTyping =
            element.matches("input, textarea, select") ||
            element.isContentEditable;

        if (isTyping) return;

        if (event.key === "ArrowRight" || event.key === "Enter") {
            event.preventDefault();
            showSlide(currentSlide + 1);
        } else if (
            event.key === "ArrowLeft" ||
            (event.key === "Enter" && event.shiftKey)
        ) {
            event.preventDefault();
            showSlide(currentSlide - 1);
        }
    });

    // Editable escalation matrix cells
    document.querySelectorAll("[contenteditable='true']").forEach(cell => {
        cell.setAttribute("role", "textbox");
        cell.setAttribute("aria-multiline", "true");
    });

    // Feedback form: opens the visitor's email application
    const feedbackForm = document.getElementById("feedback-form");
    const formStatus = document.getElementById("form-status");

    feedbackForm?.addEventListener("submit", event => {
        event.preventDefault();

        const name =
            document.getElementById("feedback-name")?.value.trim() || "";
        const type =
            document.getElementById("feedback-type")?.value || "General";
        const message =
            document.getElementById("feedback-message")?.value.trim() || "";

        if (!message) {
            if (formStatus) {
                formStatus.textContent = "Please enter your feedback.";
            }
            return;
        }

        // Replace this with your team's real email address
        const teamEmail = "yourteam@example.com";

        const subject = encodeURIComponent(
            `EXIMIUS Website Feedback - ${type}`
        );

        const body = encodeURIComponent(
            `Name: ${name || "Not provided"}\n` +
            `Feedback type: ${type}\n\n` +
            `Message:\n${message}`
        );

        if (formStatus) {
            formStatus.textContent =
                "Opening your email app to send the feedback...";
        }

        window.location.href =
            `mailto:${teamEmail}?subject=${subject}&body=${body}`;
    });

    // Initialise the website
    showSlide(currentSlide);
});