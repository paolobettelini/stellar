# Snippet Build Scripts

By default, snippets in the `snippets/` folder are just copied to the `data/` folder by the compiler. However, it is possible to add a custom build script `build.py` to the snippet directory to implement custom behavior. The build script will receive a single parameter representing the target folder where the files need to be written to.