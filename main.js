document.addEventListener("DOMContentLoaded", () => {
    const htmlInput = document.getElementById("html-input");
    const preview = document.getElementById("preview");
    const convertBtn = document.getElementById("convert-btn");
  
    // Update live preview
    htmlInput.addEventListener("input", () => {
      preview.innerHTML = htmlInput.value;
    });
  
    // Convert to PDF
    convertBtn.addEventListener("click", async () => {
      const htmlContent = htmlInput.value;
  
      if (!htmlContent.trim()) {
        alert("Please enter some HTML code.");
        return;
      }
  
      try {
        const response = await fetch("https://html2pdf.fly.dev/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ html: htmlContent }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to convert HTML to PDF.");
        }
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        // Trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        alert(error.message);
      }
    });
  });
  