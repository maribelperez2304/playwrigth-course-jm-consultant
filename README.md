### Run test by title -g(grep)

```
Ejecutar test por linea de comando un solo test

En la terminal ejecutar
npx playwright test saucedemo.spec.ts -g "test 1 POM"  
npx playwright test saucedemo.spec.ts --grep "test 1 POM"  

Todos los de la carpeta
npx playwright test

Repetir test
npx playwright test saucedemo.spec.ts -g "test 1 POM" --repeat-each 5
```

### Debug desde terminal
```
 npx playwright test saucedemo.spec.ts --grep "test 2 POM" --debug 

```