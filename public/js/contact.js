async function mail(mailObject){
    const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(mailObject),
    };

    const res =  await fetch("/api/mail", requestOptions);
    const data = await res.json();

    return data;
}


async function sendMail(){
    try{
       const mailName = document.getElementById('mail-name').value.trim();
       const mailAddres = document.getElementById('mail-address').value.trim();
       const mailSubject = document.getElementById('mail-subject').value.trim();
       const mailBody = document.getElementById('mail-body').value.trim();

       console.log(document.getElementById('mail-name'));
        
       if(!mailName || !mailAddres || !mailSubject || !mailBody) return alert("please fill in all input");
        
       const mailObject = {name: mailName, email: mailAddres, subject: mailSubject, message: mailBody};

       const mailInfo = await mail(mailObject);
       const {data, message} = mailInfo;

       // check if mail data is present
       if(data){
            alert("Thank you for reaching out. I will respond as soon as possible");
            console.log(data);
       }
       else{
            // A mailing error occured
            alert(message);
       }
    }
    catch(e){
        // an error occured
        console.error(e);
    }
   
}