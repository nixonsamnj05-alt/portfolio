const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 240;
const currentFrame = index => (
  `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const imageSeq = { frame: 1 };

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

window.addEventListener("scroll", () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  
  render(frameIndex + 1);
});

function render(index) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[index - 1], 0, 0);
}

// Chatbot Logic
const resumeContent = `Name: Nixon Sam N J. Education: B.E. ECE from Government College of Engineering, Tirunelveli (CGPA 7.4). Skills: Python, Circuit Analysis, Embedded Systems. Project: Solar Tracking System using LDRs. Languages: Tamil, English.`;

async function askAI(query) {
    const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your key
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: `SYSTEM PROMPT: You are an assistant for Nixon Sam N J. Answer ONLY using this resume info: ${resumeContent}. If the user asks something else, say you don't know. USER QUERY: ${query}` }] }]
        })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    if(!input.value) return;

    history.innerHTML += `<div><b>You:</b> ${input.value}</div>`;
    const aiResponse = await askAI(input.value);
    history.innerHTML += `<div><b>AI:</b> ${aiResponse}</div>`;
    input.value = '';
    history.scrollTop = history.scrollHeight;
});
