// https://github.com/tomoyanonymous/nannou-web-template/blob/master/src/sketch.rs

use std::cell::RefCell;

use nannou::prelude::*;
use nannou::wgpu::{Backends, DeviceDescriptor, Limits};

pub struct Model;

fn update(_app: &App, _model: &mut Model, _update: Update) {}

fn view(app: &App, _model: &Model, frame: Frame) {
    // Begin drawing
    let draw = app.draw();
    draw.background().color(WHITE);

    draw_circle(&draw, 0.0, 0.0, 200.0);

    // Write the result of our drawing to the window's frame.
    draw.to_frame(app, &frame).unwrap();
}

// Recursive function
fn draw_circle(draw: &Draw, x: f32, y: f32, r: f32) {
    let norm_radius = map_range(r, 2.0, 360.0, 0.0, 1.0);
    draw.ellipse()
        .x_y(x, y)
        .radius(r)
        .hsva(norm_radius, 0.75, 1.0, norm_radius)
        .stroke(BLACK);

    if r > 8.0 {
        // Four circles! left right, up and down
        draw_circle(&draw, x + r, y, r / 2.0);
        draw_circle(&draw, x - r, y, r / 2.0);
        draw_circle(&draw, x, y + r, r / 2.0);
        draw_circle(&draw, x, y - r, r / 2.0);
    }
}

pub async fn run_app(container_id: String) {
    // Since ModelFn is not a closure we need this workaround to pass the calculated model
    thread_local!(static MODEL: RefCell<Option<Model>> = Default::default());

    let model = Model {};
    MODEL.with(|m| m.borrow_mut().replace(model));

    app::Builder::new_async(move |app| {
        Box::new(async move {
            create_window(app, &container_id).await;
            MODEL.with(|m| m.borrow_mut().take().unwrap())
        })
    })
        .backends(Backends::PRIMARY | Backends::GL)
        .update(update)
        .run_async()
        .await;
}

async fn create_window(app: &App, container_id: &str) {
    let device_desc = DeviceDescriptor {
        limits: Limits {
            max_texture_dimension_2d: 8192,
            ..Limits::downlevel_webgl2_defaults()
        },
        ..Default::default()
    };

    app.new_window()
        .size(500, 500)
        .device_descriptor(device_desc)
        .title("nannou web test")
        // .raw_event(raw_event)
        // .key_pressed(key_pressed)
        // .key_released(key_released)
        // .mouse_pressed(mouse_pressed)
        // .mouse_moved(mouse_moved)
        // .mouse_released(mouse_released)
        // .mouse_wheel(mouse_wheel)
        // .touch(touch)
        .view(view)
        .build_async(Some(container_id))
        //.event(event)
        .await
        .unwrap();
}

/*
fn event(app: &App, model: &mut Model, event: WindowEvent) {
    match event {
        MouseMoved(location) => {
        }
        _ => {}
    }
}*/