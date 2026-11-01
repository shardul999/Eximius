/* Make the complete tables visible without scrolling */
.content-slide {
    overflow: hidden !important;
    justify-content: center;
    gap: 15px;
}

.table-wrap {
    width: 100%;
    max-height: none !important;
    height: auto;
    overflow: visible !important;
}

/* Compact table layout */
.team-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: 13px;
}

.team-table th,
.team-table td {
    padding: 9px 10px;
    line-height: 1.25;
    overflow-wrap: break-word;
}

/* Keep the section heading compact */
.section-heading {
    margin-bottom: 10px;
}

.section-heading h2 {
    font-size: clamp(30px, 3vw, 42px);
    margin-bottom: 6px;
}

.section-heading .body-copy {
    font-size: 14px;
    margin-bottom: 5px;
}
