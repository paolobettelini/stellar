use noon::prelude::*;
use noon::nannou::wgpu::{Backends, DeviceDescriptor, Limits};
use std::cell::RefCell;

fn scene(win_rect: Rect) -> Scene {
    let mut scene = Scene::new(win_rect);

    let text = scene.text().with_font_size(50).with_text("Hello!").make();

    let rectangle = scene.rectangle().with_position(2.0, 0.0).make();

    let circle = scene.circle().with_position(-2.0, 0.0).make();

    let line = scene.line().from(-2.0, -2.0).to(2.0, 2.0).make();

    scene
        .play(vec![
            line.show_creation(),
            circle.show_creation(),
            rectangle.show_creation(),
            text.show_creation(),
        ])
        .lag(1.0);

    scene
        .play(vec![
            line.morph(circle),
            circle.morph(rectangle),
            rectangle.morph(text),
        ])
        .run_time(2.0)
        .lag(2.0);

    scene
}

pub async fn run_app() {
    // Since ModelFn is not a closure we need this workaround to pass the calculated model
    thread_local!(static MODEL: RefCell<Option<Scene>> = Default::default());

    app::Builder::new_async(|app| {
        Box::new(async move {
            let scene = scene(app.window_rect());
            MODEL.with(|m| m.borrow_mut().replace(scene));
            create_window(app).await;
            MODEL.with(|m| m.borrow_mut().take().unwrap())
        })
    })
    .backends(Backends::PRIMARY | Backends::GL)
    .update(update)
    //.event(event)
    .run_async()
    .await;
}

async fn create_window(app: &App) {
    let device_desc = DeviceDescriptor {
        limits: Limits {
            max_texture_dimension_2d: 8192,
            ..Limits::downlevel_webgl2_defaults()
        },
        ..Default::default()
    };

    let width = 900;
    let height = 500;

    app.new_window()
        .size(width, height)
        .device_descriptor(device_desc)
        .title("sad")
        .view(view)
        .build_async()
        .await
        .unwrap();
}

fn update(app: &App, scene: &mut Scene, _update: Update) {
    scene.update(app.time, app.window_rect());
    //println!("FPS = {}", app.fps());
}

fn view(app: &App, scene: &mut Scene, frame: Frame) {
    let draw = app.draw();
    //draw.background().color(BLACK);
    scene.draw(draw.clone());
    draw.to_frame(app, &frame).unwrap();
}