# Graffiti app

Aquí se recoge toda la información de la práctica y el uso de la tecnología cloud.
Con el servicio creado en este repositorio se podrá interactuar con la comunidad, publicando y opinando, sobre el arte del graffiti. 

Este repositorio se divide en dos subcarpetas, separando la parte de frontend y backend.

Los principales componentes utilizados para la arquitectura son: S3, API GATEWAY, LAMBDA, DYNAMODB Y COGNITO. La arquitectura utilizada es la siguiente:

![alt text](https://github.com/toisdel/PracticaAWS_DH/blob/main/Pra%CC%81cticaAWS.png?raw=true)

Requerimientos:
1. Poseer un usuario en AWS
2. Tener instalado en la maquina local aws y serverless


S3:

AWS S3 es uno de los servicios más fundamentales que ofrece Amazon. S3 también es utilizado por varios otros servicios de AWS, así como por los propios sitios web de Amazon.

El componente principal del despliegue de la web estática es S3, configurado como un repositorio público y de libre acceso donde se almacenará información digital de los graffitis y se encargará de interactuar con la API mediante ficheros javascript. Se ha decidido utilizar esta tecnología por su fàcil acceso y su almacenaje escalable a la información contenida. La factuaración de este componente se rige por la cantidad de archivos leídos por lo que su empleo en esta práctica resultará nulo. En el caso de establecer un dominio público al S3 el coste será prácticamente de 1 euro. 

Los principales archivos contenidos són del tipo html y javascript para gestionar el servicoio web estático.

Cognito:

AWS Cognito simplifica la autenticación y sincronización de usuarios en varios dispositivos. También admite funciones de usuario invitado. Una vez que su cliente esté satisfecho con la aplicación, los datos se pueden transferir sin problemas al grupo de usuarios con los datos anteriores sincronizados.

Este recurso de AWS se utiliza en la aplicación para guardar grupos de usuarios con sus autorizaciones. Estos grupos pueden ser distinguidos entre si por sus roles en la misma aplicación, en nuestro caso serán aquellos capaces de publicar graffitis o opinar en el chat del mismo. En el momento del registro del usuario, este deberá proporcionar el mail para registrarse o bien si ya lo está, entrar con su perfil. Esta herramiente ofrece muchos más atributos adicionales, no necesarios este caso de uso.

Lambda: 

El servicio lambda nos brinda la posibilidad de ejecutar código en la nube en distintos lenguajes. AWS Lambda admite lenguajes como Java, NodeJS, Python, C #, Go, Ruby y Powershell. AWS Lambda brinda la infraestructura para cargar el código. Se encarga de mantener el código y lo activa cada vez que ocurre el evento requerido. La facturación de AWS Lambda se realiza en función del uso de la memoria, la solicitud realizada y la ejecución, que se factura en incrementos de un mínimo de 100 ms. También es compatible con el marco serverless, lo que facilita la escritura y la implementación del código AWS Lambda.

Este recurso se interconectará con la API y DynamoDB de nuestra aplicación y realizará inserciones o lecturas con python3 (boto3) a la base de datos. Dispondremos de 5 funciones con los siguientes objetivos:
    1. Publicar un graffiti
    2. Publicar un mensaje en el chat de un graffiti
    3. Leer todos los graffitis publicados
    4. Leer un graffiti en concreto publicado
    5. Leer todos los mensajes del chat de un graffiti

API Gateway (API REST):

AWS API Gateway es un servicio capaz de interaccionar como una interfaz HTTP. Es un servicio muy útil para conectar aplicaciones sin servidor, como en nuestro caso, o también se puede integrar con aplicaciones heredadas o para enviar solicitudes HTTP directamente a otros servicios de AWS.

Este recurso será el enlace entre la web estática y las funciones lambda. Mediante los métodos, accesibles desde S3, de la API REST se llamaran las lambdas apropiadas para insertar o leer registros de la base de datos. También tendrá el control de acceso mediante autorizador de los usuarios capaces de realizar llamadas a la api.

DynamoDB:

Este componente permite realizar consultas pasando como esquema distintos atributos por lo que ha resultado muy útil para integrar el repositorio de graffitis publicados con su chat de mensajes correspondiente. No obstante, no es el modo más óptimo para reducir costes pero si suficiente para la demostración del empleo de una arquitectura cloud para un caso de uso real. También es una tecnología serverless por lo que la facturación solamente se basa en la cantidad de lecturas a la base de datos, a diferencia de la base de datos relacionas de AWS.

Atributos clave:    String id_graffiti          - Clave aleatoria
                    String fecha_publicacion    - Fecha de inserción de la fila
Atributos:          String id                   - Identificador del graffiti
                    String des_graffiti         - Descripción del graffiti (nulo cuando se trata de un mensaje)
                    String text                 - Comentario en el chat de un graffiti (nulo cuando se trata de un graffiti)

De esta forma podremos ver en una sola tabla y mediante consultas los chats de cada graffiti, por su id, o el mismo graffiti teniendo en cuenta los campos informados del esquema proporcionado.

Para navegar por la aplicación http://www.adsbyart.com.s3-website-eu-west-1.amazonaws.com/ es muy sencillo salvo en la opción de entrar al chat del graffiti que se debe hacer manualmente y sustituir en el enlace siguiente el id del graffiti:

http://www.adsbyart.com.s3-website-eu-west-1.amazonaws.com/postchatmsg.html?id_graffiti=ToniG1 

Ampliables:

- En está práctica no ha sido posible la incorporación de imágenes aunque está desarrollada pensando en la incorporación de las mismas. La imágenes de cada graffiti se guardaran con el nombre del ID en una carpeta del S3 para poder acceder a ella cuando sea preciso. También se deberá gestionar el contenido según el tiempo que lleve publicado el graffiti en el mismo servicio S3. EL reescalado de las imágenes se realizaría por código en los java script de los misma web que almacenará la imágen en S3 directamente sin tener que guardar su contenido en la base de datos.

- Finalmente no se ha podido implementar la seguridad por errores en la consulta desde java script aunque el autorizador funcionara correctamente. Este error en la consulta a la api se debe al tipo de integración definido. Una vez arreglado este error se deberá incorporar al script serverless.yml el código comentado para los métodos post:


          integration: lambda
          authorizer:
            name: authorizer2
            arn: arn:aws:cognito-idp:eu-west-1:174907913206:userpool/eu-west-1_Mm7XnPQJ1
            claims:
              - email
          -------------------
          integration: lambda
          authorizer:
            name: authorizer
            arn: arn:aws:cognito-idp:eu-west-1:174907913206:userpool/eu-west-1_Mm7XnPQJ1
            claims:
              - email

Diagrama del flujo de peticiones:

![alt text](https://github.com/toisdel/PracticaAWS_DH/blob/main/flowchart-adsbyart.png?raw=true)

Instrucciones para desplegar el servicio:

1. Clonar el repositorio

git clone https://github.com/toisdel/PracticaAWS_DH

2. Crear un bucket S3 (ejemplo www.adsbyart.com) y enlazarlo con AWS S3 en la màquina local. Este punto es opcional si se integra el mismo servicio S3 en el fichero serverless.yml.

aws configure

3. Entrar en el directorio Website y sincronizar el contenido del bucket con la carpeta Website con el siguiente comando:

aws s3 sync ./ s3://www.adsbyart.com

4. Entrar en el directorio graffitiAds y desplegar el servicio con:

sls deploy