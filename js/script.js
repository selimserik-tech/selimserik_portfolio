document.addEventListener("DOMContentLoaded", function () {
    /**
     * Bijlage-viewer op bewijsstukken.html
     */
    const attachmentButtons = document.querySelectorAll(".attachment-btn");
    const attachmentViewer = document.getElementById("attachmentViewer");
    const selectedAttachmentTitle = document.getElementById("selectedAttachmentTitle");
    const openAttachmentNewTab = document.getElementById("openAttachmentNewTab");

    // Hide "Open in nieuw tabblad" link by default
    if (openAttachmentNewTab) {
        openAttachmentNewTab.style.display = "none";
    }

    attachmentButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const file = button.getAttribute("data-file");
            const title = button.getAttribute("data-title") || "Geselecteerde bijlage";

            if (!file) return;

            // Viewer instellen met sandbox
            attachmentViewer.src = file;
            attachmentViewer.setAttribute("sandbox", "allow-scripts allow-same-origin"); // voorkomt download

            // Update titel
            if (selectedAttachmentTitle) {
                selectedAttachmentTitle.textContent = title;
            }

            // Scroll naar viewer
            attachmentViewer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Verberg "Open in nieuw tabblad"
            if (openAttachmentNewTab) {
                openAttachmentNewTab.style.display = "none";
            }
        });
    });

    /**
     * Extra bescherming: rechtermuisknop en slepen uitschakelen op iframe
     */
    if (attachmentViewer) {
        attachmentViewer.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });

        attachmentViewer.addEventListener("dragstart", function (e) {
            e.preventDefault();
        });
    }
});
