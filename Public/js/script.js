async function processInput() {
  const userInput = document.getElementById('userInput').value;
  
  if (!userInput.trim()) {
    alert('Please enter a description for the website.');
    return;
  }

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput })
    });

    if (!response.ok) throw new Error('Failed to generate website code.');

    const data = await response.json();
    const generatedCode = data.html_code;

    document.getElementById('generatedCode').textContent = generatedCode;
    document.getElementById('previewFrame').srcdoc = generatedCode;
  } catch (error) {
    alert('Error generating website: ' + error.message);
  }
}
