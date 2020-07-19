import * as AWS from 'aws-sdk';
AWS.config.loadFromPath('src/AWS/ses.json');
AWS.config.update({
    region: 'us-east-1',
});
const ses: AWS.SES = new AWS.SES();

export default class Utils {
    public static test() {
        console.log("utilininin");
    }



    public static awsSendMail(mailContent, mailIds) {
        const params: any = {
            Destination: {
                ToAddresses: mailIds,
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: mailContent.body,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: mailContent.subject,
                },
            }
        };

        if (mailContent.source && mailContent.source.length) {
            params.Source = mailContent.source;
        }

        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.log('aws send mail Error', err)
                return {
                    success: false,
                    error: err
                };
            } else {
                console.log('Mail send to ', mailIds)
                return {
                    success: true
                };
            }
        });


    }
}
