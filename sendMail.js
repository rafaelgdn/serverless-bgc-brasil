import { transporter } from "./config/nodemailer-config";

export function main(event, context, callback) {
  const { email } = JSON.parse(event.body);
  transporter.sendMail({
    from: "Rafael de Carvalho <rafaeldecarvalho.ps@gmail.com>",
    to: email,
    subject: "Reserva do seu Minion realizada",
    text: "Teste",
    html: "<b>TESTE</b>"
  }).then(message => {
    console.log(message);
  }).catch(err => {
    console.log(err);
  });
}