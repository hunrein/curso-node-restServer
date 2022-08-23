# WebServer + RestServer

Recurden que deben ejecutar ```npminstall``` para reconstruir los módulos de Node.









Auth-Login: Para crear una ruta de autenticación hay 3 pasos a seguir, no tienen un orden específico.
    -Crear controlador.( Verificar si el correo existe, Verfificar si el usuario está activo, Verificar la contraseña, todos estos últimos contra la DB,  Generar el JWT con los pasos en el apartado debajo)

    -Crear ruta ( Se define la ruta del método hacia el login, se añaden las validaciones de los campos). Ver aporte en video 140 sobre validacion de formato de JSON

    -Especificarlo en el modelo del Server ( se crea el path para la autenticación en el constructor y se define la ruta en los routes)



Generar JWT
    Crear el helper que nos permitirá generarlo
