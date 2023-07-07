function saveChanges(sectionId) {
  const editor = document.querySelector(`#${sectionId} .editor`);
  const template = document.querySelector(`#${sectionId} .template`);
  
  // Replace variables in the template with user input
  // Example:
  // const userInput = document.querySelector(`#${sectionId} .editor input`).value;
  // const editedTemplate = template.innerHTML.replace('[variable]', userInput);
  
  // Uncomment the lines above and customize them according to your specific variables
  
  // Update the template with the edited content
  // template.innerHTML = editedTemplate;
  
  // Hide the editor and show the template
  editor.style.display = 'none';
  template.style.display = 'block';
}

function closeSection(sectionId) {
  const section = document.querySelector(`#${sectionId}`);
  const template = section.querySelector('.template');
  const hidden = section.querySelector('.hidden');
  
  // Show the edited template and hide the hidden div
  template.style.display = 'block';
  hidden.style.display = 'none';
  
  // Move to the next section if available
  const nextSection = section.nextElementSibling;
  if (nextSection) {
    nextSection.scrollIntoView();
  } else {
    // Combine contents of all templates into a single document
    const allTemplates = document.querySelectorAll('.template');
    let combinedDocument = '';
    allTemplates.forEach((template) => {
      combinedDocument += template.innerHTML + '\n';
    });
    console.log(combinedDocument);
  }
}

// Add click event listeners to each section
const sections = document.querySelectorAll('.section');
sections.forEach((section) => {
  section.addEventListener('click', function() {
    const template = section.querySelector('.template');
    const hidden = section.querySelector('.hidden');
    
    // Show the hidden div and hide the template
    template.style.display = 'none';
    hidden.style.display = 'block';
  });
});