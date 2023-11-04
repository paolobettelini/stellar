let coursesEditor = document.getElementById('courses-editor');
let dependenciesEditor = document.getElementById('dependencies-editor');

var jsonUniverse = null;

function renderEditor(json) {
    jsonUniverse = json;

    // Popoulate editor

    for (let course of jsonUniverse.courses) {
        addCourseToEditor(course);
    }

    for (let dependency of jsonUniverse.dependencies) {
        addDependencyToEditor(dependency);
    }

    // "add" course button
    document.getElementById('add-course-btn').onclick = () => {
        let course = { "name": "name", "id": "id", "x": 0.1, "y": 0.1 };
        jsonUniverse.courses.push(course);
        renderCourse(course); // Add the single element
        addCourseToEditor(course);
    }

    // "add" dependency button
    document.getElementById('add-dependency-btn').onclick = () => {
        let dependency = { "from": "from", "to": "to" };
        jsonUniverse.dependencies.push(dependency);
        addDependencyToEditor(dependency);
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies); // Render all lines
    }

    // "download" button
    document.getElementById('download-universe').onclick = downloadUniverse;
}

function addCourseToEditor(course) {
    let xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.step = 0.02;
    xInput.style.width = "50px";
    xInput.value = course.x;
    xInput.oninput = () => {
        course.x = xInput.value;
        let id = `course-${course.id}`;
        let title = document.getElementById(id);
        title.style.left = course.x * canvas.width + "px";
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.step = 0.02;
    yInput.style.width = "50px";
    yInput.value = course.y;
    yInput.oninput = () => {
        course.y = yInput.value;
        let id = `course-${course.id}`;
        let title = document.getElementById(id);
        title.style.top = course.y * canvas.height + "px";
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = course.name;
    nameInput.oninput = () => {
        let id = `course-${course.id}`;
        let title = document.getElementById(id);
        course.name = nameInput.value;
        title.innerHTML = course.name;
        // Dependencies anchors may shift
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.value = course.id;
    idInput.oninput = () => {
        let oldId = `course-${course.id}`;
        let title = document.getElementById(oldId);
        course.id = idInput.value;
        title.id = `course-${course.id}`;
        // Dependencies connections may change
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.onclick = () => {
        let title = document.getElementById(`course-${course.id}`);
        content.removeChild(title.parentNode);
        let editorElement = document.getElementById(`editor-course-${course.name}`);
        coursesEditor.removeChild(editorElement);

        // Remove item
        let index = jsonUniverse.courses.indexOf(course);
        if (index !== -1) {
            // Remove the element using splice
            jsonUniverse.courses.splice(index, 1);
        }
    }

    let container = document.createElement('div');
    container.id = `editor-course-${course.name}`;

    container.appendChild(idInput);
    container.appendChild(nameInput);
    container.appendChild(xInput);
    container.appendChild(yInput);
    container.appendChild(deleteButton);

    coursesEditor.appendChild(container);
}

function addDependencyToEditor(dependency) {
    let fromInput = document.createElement('input');
    fromInput.type = 'text';
    fromInput.value = dependency.from;
    fromInput.oninput = () => {
        dependency.from = fromInput.value;
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let toInput = document.createElement('input');
    toInput.type = 'text';
    toInput.value = dependency.to;
    toInput.oninput = () => {
        dependency.to = toInput.value;
        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.onclick = () => {
        let editorElement = document.getElementById(`editor-dependency-${dependency.from + dependency.to}`);
        dependenciesEditor.removeChild(editorElement);

        // Remove item
        let index = jsonUniverse.dependencies.indexOf(dependency);
        if (index !== -1) {
            // Remove the element using splice
            jsonUniverse.dependencies.splice(index, 1);
        }

        clearCanvas();
        renderDependencies(jsonUniverse.dependencies);
    }
    
    let container = document.createElement('div');
    container.id = `editor-dependency-${dependency.from + dependency.to}`;

    container.appendChild(fromInput);
    container.appendChild(toInput);
    container.appendChild(deleteButton);

    dependenciesEditor.appendChild(container);
}

function downloadUniverse() {
    // Convert the JSON data to a prettified JSON string
    const jsonString = JSON.stringify(jsonUniverse, null, 2);

    // Create a Blob with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jsonUniverse.title}.json`;
    a.textContent = 'Download JSON';

    // Trigger a click event to download the file
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
}