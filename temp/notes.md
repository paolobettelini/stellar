# TODO
- Controllare che i pdf generati siano UGUALI ai pdf grandi (sembrano diversi)
- Change "note" to "snippet"
- ma se c'è un \pagebreak nel mezzo di una section?

# Notes


## Installazione manim-web
Per creare animazioni avere latex installato <br>
installare dart
```bash
sudo pacman -S dart
dart pub global activate manim_web
# Se non c'è già <br>
export PATH="$PATH":"$HOME/.pub-cache/bin"
# Siccome non trova il comando pub fai a mano dart pub 
dart pub global activate webdev
manim_web init --directory manim_dart
cd manim_dart
# In pubspec.yaml mettere X altrimenti non va la "non-nullable" language feature <br>
sdk: ">=2.12.0 <3.0.0">
dart pub upgrade manim_web
```

## Mettere il codice in example.dart
```bash
manimweb dev --file src/example.dart --html src/example.html
# Per buildare staticamente
webdev build -o web:build
# Buildando l'animazione può essere fatta servendo build/
```
Serve solamente `example.dart.js`

## Per farlo funzionare dato il file example.dart.js
Nel file sostituire `"canvas-container"` con un nome univoco `"canvas-container-1"`.
Nel file html mettere
```html
<div id="canvas-container-1"></div> <br>
<script src="example.dart.js"></script> <br>
```

## Per settare il colore
```dart
camera.backgroundColor = Color(r: 0.0862745, g: 0.09804, b: 0.1372549, a: 1);
```

# To split parse documents into atoms
```bash
cd notes-parser
cargo run -- -i ../data/source/Differentiation.tex -o ../data/snippets/
cd ../data/snippets/
find . -type f -name "*.tex" -exec tectonic {} \;
```

# Run the server
```bash
cd notes-server
cargo r --release # check the hardcoded paths for now
```
