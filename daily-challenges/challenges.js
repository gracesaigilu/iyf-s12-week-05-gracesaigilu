// Day 1: Color Changer
document.getElementById('color-btn').addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.style.color = randomColor;
    });
});

// Day 2: Dynamic Element Creator
let paraCount = 0;
document.getElementById('add-para-btn').addEventListener('click', () => {
    paraCount++;
    const container = document.getElementById('para-container');
    const p = document.createElement('p');
    p.textContent = `Paragraph #${paraCount} `;
    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => p.remove());
    
    p.appendChild(delBtn);
    container.appendChild(p);
});

// Day 3: Image Remover / Toggle
document.getElementById('toggle-img-btn').addEventListener('click', () => {
    const images = document.querySelectorAll('.toggle-img');
    images.forEach(img => {
        img.style.display = img.style.display === 'none' ? 'inline' : 'none';
    });
});

// Day 4: Content Copier
document.getElementById('copy-btn').addEventListener('click', () => {
    const sourceText = document.getElementById('source').textContent;
    document.getElementById('target').textContent = sourceText;
});

// Day 5: Dark Mode Toggle
document.getElementById('dark-mode-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
