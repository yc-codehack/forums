import nodemailer from "nodemailer";
const transport = {
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "photographylensoflight@gmail.com",
		pass: "jldzirlyikvpvqsw",
		// user: "jeweljservices@gmail.com",
		// pass: "oekrxgyaxzbsizmb",
	},
};

function sendEmail(receiverEmail, subject, text) {
	const transporter = nodemailer.createTransport(transport);
	const info = transporter.sendMail({
		from: "jeweljservices@gmail.com",
		to: receiverEmail,
		subject: subject,
		text: text,
	});
	console.log("mail sent");
}

export default sendEmail;
