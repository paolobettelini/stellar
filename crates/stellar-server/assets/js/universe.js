let canvas;
let ctx;
let content;
let canvasContainer;

//// Rendering code ////

const DEFAULT_COURSE_COLOR = "#3498db";

export function render_universe(universe){
    canvas = document.getElementById('universe-canvas');
    ctx = canvas.getContext('2d');
    content = document.getElementById('universe-content');
    canvasContainer = document.getElementById('canvas-container');

    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = "3";

    let json = JSON.parse(universe);

    renderCourses(json.courses);
    renderDependencies(json.dependencies);
}

function renderCourses(courses) {
    for (let course of courses) {
        renderCourse(course);
    }
}

function renderCourse(course) {
    let title = document.createElement('a');
    let div = document.createElement('div');

    title.innerHTML = course.name;
    let titleId = `course-${course.id}`;
    title.id = titleId; // course-<id>;
    title.href = `/course/${course.id}`;
    div.appendChild(title);
    content.appendChild(div);

    title.style.position = "absolute";
    title.style.left = course.x * canvas.width + "px";
    title.style.top = course.y * canvas.height + "px";
    // Default color is blueish

    let color = course.color || DEFAULT_COURSE_COLOR;
    setCourseColor(title, color);
}

function setCourseColor(title, color) {
    title.style.backgroundColor = color;
    title.style.boxShadow = `0 0 10px ${color}83`;
    title.style.border = `2px solid ${color}`;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderDependencies(dependencies) {
    for (let dependency of dependencies) {
        renderDependency(dependency)
    }
}

function renderDependency(dependency) {
    let from = document.getElementById(`course-${dependency.from}`);
    let to = document.getElementById(`course-${dependency.to}`);

    let rectA = from.getBoundingClientRect();
    let pointA = {x: rectA.x + rectA.width, y: rectA.y + rectA.height * 0.5};

    let rectB = to.getBoundingClientRect();
    let pointB = {x: rectB.x, y: rectB.y + rectB.height * 0.5};

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);

    // If there aren't any control points, draw a straight line
    if (dependency.curve == undefined) {
        // Compute middle point
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);

        ctx.stroke();
        return;
    }

    for (let i = 0; i < dependency.curve.length; i += 4) {
        ctx.bezierCurveTo(
            dependency.curve[i] * canvas.width,
            dependency.curve[i + 1] * canvas.height,
            dependency.curve[i + 2] * canvas.width,
            dependency.curve[i + 3] * canvas.height,
            dependency.x, pointB.y
        );
    }

    ctx.stroke();
}