Per creare animazioni: <br>
avere latex installato <br>
installare dart <br>
sudo pacman -S dart <br>
dart pub global activate manim_web <br>
# Se non c'è già <br>
export PATH="$PATH":"$HOME/.pub-cache/bin" <br>
# Siccome non trova il comando pub fai a mano dart pub <br>
dart pub global activate webdev <br>
 <br>
manim_web init --directory manim_dart <br>
cd manim_dart <br>
# In pubspec.yaml mettere X altrimenti non va la "non-nullable" language feature <br>
  sdk: ">=2.12.0 <3.0.0" <br>
dart pub upgrade manim_web <br>

# Mettere il codice in example.dart  <br>
manimweb dev --file src/example.dart --html src/example.html <br>
# Per buildare staticamente <br>
webdev build -o web:build <br>
# Buildando l'animazione può essere fatta servendo build/  <br>
Serve solamente example.dart.js<br>

# Per farlo funzionare dato il file example.dart.js <br>
Nel file sostituire "canvas-container" con un nome univoco "canvas-container-1" <br>
Nel file html mettere <br>
    <div id="canvas-container-1"></div> <br>
    <script src="example.dart.js"></script> <br>
