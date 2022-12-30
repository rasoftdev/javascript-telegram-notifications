(function ($) {

    //  Parametros para la api de telegram
    /** token: cuando se crea el bot en telegram este genera un token unico para el bot
     * chat_id: Es un valor numérico que obtendremos, por ejemplo ejecutando la siguiente petición desde el navegador: https://api.telegram.org/bot<token>/getUpdates,
     * se remplaza <token> por el token del bot
     * parse_mode: 'MarkdownV2'
    */
    const configTelegram = {
        baseURL: 'https://api.telegram.org/bot',
        token: '',
        chat_id: '',
        parse_mode: 'MarkdownV2',
    };

  /** 
   * @description Con esta función se envia en el mensaje al bot creado
   * @param {string} msn Mensaje a enviar
   * @return 
   */
    /**Ests funcion asíncrona llamada sendTelegram se utiliza para enviar un mensaje a través de Telegram. La función tiene un parámetro llamado msn, que se asume que es un objeto con algunos campos (name, email, subject y message).
    La función utiliza la configuración del bot de Telegram almacenada en un objeto llamado configTelegram, que incluye la URL base, el token de autenticación del bot, el ID del chat y el modo de parseo. Luego, la función construye una URL con esta información y agrega una serie de parámetros a ella para enviar un mensaje.
    El cuerpo del mensaje se construye a partir de los campos del objeto msn y luego se agrega al parámetro text. También se escapa cualquier carácter especial que pueda tener el mensaje utilizando una expresión regular.
    Finalmente, la función hace una llamada HTTP a la URL que construyó y devuelve la respuesta en formato JSON. Si hay algún error durante el proceso, la función devuelve el error en su lugar */

    async function sendTelegram(msn) {
        const { baseURL, token, chat_id, parse_mode } = configTelegram;
        const endPoint = 'sendMessage';
        const url = new URL(`${baseURL}${token}/${endPoint}`);
        const params = {
            chat_id: chat_id,
            parse_mode: parse_mode
        };
        let message = "CONTACTO\nNombre:\n" + msn.name + "\nCorreo:\n" + msn.email + "\nTema:\n" + msn.subject + "\nMensaje:\n" + msn.message;

        params['text'] = message.replace(/(\[[^\][]*]\(http[^()]*\))|[_*[\]()~>#+=|{}.!-]/gi,
            (x,y) => y ? y : '\\' + x);

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        return await ( await fetch(url)).json().catch(error => error);
    };

    $("#submitButton").on("click", function (event) {
        
        event.preventDefault();

        let dataTelegram = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
        }
        sendTelegram(dataTelegram);

        $('form')[0].reset();
        
    });
})(jQuery);