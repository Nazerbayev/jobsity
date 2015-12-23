## Jobsity Angular Challenge

# Disclaimer:

El script de gulp no es de mi invención, viene de un fork que hice de éste [repositorio](https://github.com/paislee/healthy-gulp-angular) de [Caleb Sotelo](http://paislee.io).

A diferencia del repositorio inicial, en este eliminé la dependencia con Foundation CSS y eliminé tambien la dependencia con karma.
La dependencia con karma fue eliminada porque en la versión estable de NodeJS para el 19/12/2015 el paquete correspondiente a karma está arrojando errores de peer dependencies que no pueden ser solucionados.

# Instalación

Después de clonar el repositorio ejecutar:

`npm install`

Automáticamente descargará las dependencias de npm y ejecutará bower al finalizar.

Para iniciar el servidor, ejecutar:

`gulp`, `gulp default` o `gulp watch-dev`.

Los archivos procesados estarán en la carpeta dist.dev, para limpiar la carpeta utilizar el comando `gulp clean-dev`.

Si durante la ejecución de `gulp default` se observa un error parecido a:
`Error: libsass bindings not found. Try reinstalling node-sass`

La solución que me ha funcionado es reinstalar el paquete gulp-sass con los siguientes comandos:

`npm uninstall --save-dev gulp-sass`
`npm install --save-dev gulp-sass@2`

