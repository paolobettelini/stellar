"use strict";

// This is the entry point of the universe page.
// Read the page from the URL and load it using AJAX
// E.g. "http://localhost:8080/universe/analysis";
let href = window.location.href;
let value = "/universe/";
let universeName = href.substring(value.length + href.indexOf(value));
let topBarTitle = document.getElementById('top-bar-title');

postData(`/universe/${universeName}`)
    .then(v => v.json())
    .then(renderUniverse);

//// Rendering code ////

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response;
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let content = document.getElementById('content');

let canvasContainer = document.getElementById('canvas-container');
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

ctx.strokeStyle = 'red';
ctx.lineWidth = "3";

function renderUniverse(universe) {
    topBarTitle.innerText = universe.title;

    renderCourses(universe.courses);
    renderDependencies(universe.dependencies);
}

function renderCourses(courses) {
    for (let course of courses) {
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
    }
}

function renderDependencies(dependencies) {
    for (let dependencie of dependencies) {
        let from = document.getElementById(`course-${dependencie.from}`);
        let to = document.getElementById(`course-${dependencie.to}`);

        let rectA = from.getBoundingClientRect();
        let pointA = {x: rectA.x + rectA.width, y: rectA.y + rectA.height * 0.5};

        let rectB = to.getBoundingClientRect();
        let pointB = {x: rectB.x, y: rectB.y + rectB.height * 0.5};

        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);

        // If there aren't any control points, draw a straight line
        if (dependencie.curve == undefined) {
            // Compute middle point
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);

            ctx.stroke();
            continue;
        }

        for (let i = 0; i < dependencie.curve.length; i += 4) {
            ctx.bezierCurveTo(
            dependencie.curve[i] * canvas.width,
            dependencie.curve[i + 1] * canvas.height,
            dependencie.curve[i + 2] * canvas.width,
            dependencie.curve[i + 3] * canvas.height,
            pointB.x, pointB.y
            );
        }

        ctx.stroke();
    }
}