document.addEventListener('DOMContentLoaded', () => {
  const color1Input = document.getElementById('color1');
  const color2Input = document.getElementById('color2');
  const color3Input = document.getElementById('color3');
  const angleInput = document.getElementById('angle');
  const angleValueSpan = document.getElementById('angle-value');
  const previewBox = document.getElementById('preview-box');
  const heroSection = document.getElementById('hero-section');
  const cssOutput = document.getElementById('css-output');
  const copyButton = document.getElementById('copy-button');
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const angleItem = document.getElementById('angle-item');
  
  let gradientType = 'linear';
  
  function updateGradient() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const color3 = color3Input.value;
    let gradientCss;
    
    if (gradientType === 'linear') {
      const angle = angleInput.value;
      angleValueSpan.textContent = `${angle}°`;
      gradientCss = `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
    } else {
      gradientCss = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
    }
    
    previewBox.style.background = gradientCss;
    heroSection.style.background = gradientCss;
    cssOutput.value = `background: ${gradientCss};`;
  }
  
  // Event listeners for color and angle changes
  color1Input.addEventListener('input', updateGradient);
  color2Input.addEventListener('input', updateGradient);
  color3Input.addEventListener('input', updateGradient);
  angleInput.addEventListener('input', updateGradient);
  
  // Event listener for gradient type toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      gradientType = btn.dataset.type;
      
      if (gradientType === 'linear') {
        angleItem.classList.add('visible');
      } else {
        angleItem.classList.remove('visible');
      }
      
      updateGradient();
    });
  });
  
  // Initial call to set the default gradient on page load
  updateGradient();
  
  // Copy CSS button functionality (now free)
  copyButton.addEventListener('click', () => {
    cssOutput.select();
    cssOutput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssOutput.value);
    
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = originalText;
    }, 2000);
  });
});