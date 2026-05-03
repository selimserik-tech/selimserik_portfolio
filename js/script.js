/**
 * Portfolio Selim Serik 2026
 * Script voor:
 * 1. Visualiseren van lesevaluaties via Chart.js
 * 2. Tonen van klikbare bijlagen op bewijsstukken.html
 */

document.addEventListener("DOMContentLoaded", function () {

    /**
     * 1. Chart.js - Lesevaluaties
     */
    const ctx = document.getElementById("myChart");

    if (ctx && typeof Chart !== "undefined") {
        const evaluationChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["BPV-Begeleiding", "SLB-Begeleiding", "Vakinhoudelijk/Lesgeven"],
                datasets: [{
                    label: "Gemiddelde Score (1-5)",
                    data: [4.6, 4.3, 4.4],
                    backgroundColor: [
                        "#38bdf8",
                        "#0ea5e9",
                        "#0284c7"
                    ],
                    borderColor: "#f8fafc",
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: "white",
                            font: { size: 14 }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            afterLabel: function (context) {
                                const labels = [
                                    "Zie Bijlage 11: BPV-Evaluatie",
                                    "Zie Bijlage 13: SLB-Evaluatie",
                                    "Zie Bijlage 5: Collega Feedback"
                                ];
                                return labels[context.dataIndex];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            color: "white",
                            stepSize: 1
                        },
                        grid: {
                            color: "#334155"
                        },
                        title: {
                            display: true,
                            text: "Waardering studenten",
                            color: "white"
                        }
                    },
                    x: {
                        ticks: {
                            color: "white",
                            font: { weight: "bold" }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                onClick: function (e) {
                    const points = evaluationChart.getElementsAtEventForMode(
                        e,
                        "nearest",
                        { intersect: true },
                        true
                    );

                    if (points.length) {
                        const firstPoint = points[0];
                        const label = evaluationChart.data.labels[firstPoint.index];

                        if (label === "BPV-Begeleiding") {
                            window.open("assets/Lesevaluatie BPV-begeleider 2024-2025.pdf", "_blank");
                        } else if (label === "SLB-Begeleiding") {
                            window.open("assets/Lesevaluatie SLB-docent 2025-2026.pdf", "_blank");
                        } else if (label === "Vakinhoudelijk/Lesgeven") {
                            window.open("assets/360-graden-feedback-formulier - Gerald Muller.pdf", "_blank");
                        }
                    }
                }
            }
        });
    }

    /**
     * 2. Bijlage-viewer op bewijsstukken.html
     */
    const attachmentButtons = document.querySelectorAll(".attachment-btn");
    const attachmentViewer = document.getElementById("attachmentViewer");
    const selectedAttachmentTitle = document.getElementById("selectedAttachmentTitle");
    const selectedAttachmentPath = document.getElementById("selectedAttachmentPath");
    const viewerSection = document.getElementById("bijlage-viewer-section");
    const openAttachmentNewTab = document.getElementById("openAttachmentNewTab");

    if (openAttachmentNewTab) {
        openAttachmentNewTab.style.display = "none";
    }

    if (attachmentButtons.length && attachmentViewer && viewerSection) {
        attachmentButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const file = button.getAttribute("data-file");
                const title = button.getAttribute("data-title");

                if (!file) {
                    return;
                }

                attachmentViewer.src = file;

                if (selectedAttachmentTitle) {
                    selectedAttachmentTitle.textContent = title || "Geselecteerde bijlage";
                }

                if (selectedAttachmentPath) {
                    selectedAttachmentPath.textContent = file;
                }

                if (openAttachmentNewTab) {
                    openAttachmentNewTab.href = file;
                    openAttachmentNewTab.style.display = "inline-block";
                }

                viewerSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

});
