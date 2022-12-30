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
    async function sendTelegram(msn = '') {
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