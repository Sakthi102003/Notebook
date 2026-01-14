
import fs from 'fs';

try {
    // Read as utf-16le because powershell > file often does that on windows
    // Or just try regular utf8 and see if it fails
    let content;
    try {
        content = fs.readFileSync('waka_grand_total.json', 'utf8');
        // If it looks like binary or garbage, we might need different encoding
        if (content.charCodeAt(0) === 0xFFFE || content.charCodeAt(0) === 0xFEFF) {
            // BOM detection (simple check)
        }
    } catch (e) {
        console.log("Read error:", e.message);
    }

    const json = JSON.parse(content);
    console.log("Root keys:", Object.keys(json));

    // Wakatime "Activity" charts usually have a 'data' array of days
    if (json.data && Array.isArray(json.data)) {
        console.log("Data length:", json.data.length);

        // Usually the last item is "today" or "most recent"
        const last = json.data[json.data.length - 1];
        console.log("Last Item Date:", last.range.date);
        console.log("Last Item Text:", last.grand_total ? last.grand_total.text : "No grand_total");

        // Let's sum up the last 7 days? Or just show "Today"?
        // The user wants "Time", usually "Last 7 days" or "Total for this view"
        let totalSeconds = 0;
        json.data.forEach(day => {
            if (day.grand_total) totalSeconds += day.grand_total.total_seconds;
        });
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        console.log(`Total Calculated: ${hours} hrs ${minutes} mins`);
    }
} catch (err) {
    console.error("Error:", err.message);
}
