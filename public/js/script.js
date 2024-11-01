async function processInput() {
  const userInput = document.getElementById('userInput').value;

  if (!userInput.trim()) {
    alert('Please enter a description for the website.');
    return;
  }

  document.getElementById('generatedCode').textContent = '';
  document.getElementById('previewFrame').srcdoc = '';

  // Open an EventSource connection to handle the streaming response
  const eventSource = new EventSource(`/generate?prompt=${encodeURIComponent(userInput)}`);

  eventSource.onmessage = (event) => {
    const content = event.data;
    if (content === "[DONE]") {
      eventSource.close();
      return;
    }

    // Append the received content to the generated code output
    document.getElementById('generatedCode').textContent += content;
    document.getElementById('previewFrame').srcdoc += content;
  };

  eventSource.onerror = (error) => {
    console.error("Error generating website content:", error);
    alert("Error generating website content. Please check the server logs for details.");
    eventSource.close();
  };
}
