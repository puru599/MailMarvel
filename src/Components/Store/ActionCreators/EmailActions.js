export const SendEmailAction = (
  fromEmail,
  fromIdToken,
  toEmail,
  subject,
  message
) => {
  return async () => {
    const SendEmailAction = async (
      fromEmail,
      fromIdToken,
      toEmail,
      subject,
      message
    ) => {
      try {
        const response = await fetch(
          "https://react-mail-box-client-default-rtdb.firebaseio.com/email.json",
          {
            method: "POST",
            body: JSON.stringify({
              fromEmail: fromEmail,
              fromIdToken: fromIdToken,
              toEmail: toEmail,
              subject: subject,
              message: message,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    SendEmailAction(fromEmail, fromIdToken, toEmail, subject, message);
  };
};
