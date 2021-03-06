class OTP{
   constructor(Model){
       this.Model = Model;
   }

    verify(userCode, userID) {
        return new Promise((resolve, reject) => {
            let isVerified = false;
            let message = 'Invalid OTP Code';

            //fetch otp
            this.Model.findOne({ otp: userCode, uid: userID })
            .then(doc=>{
                if(!doc) resolve({ isVerified, message });

                const { otp, expiry, created } = doc;

                //run tests
                if (this.isExpired(created, expiry)) {
                    //has expired
                    message = 'Session Expired';
                } else {
                    // return success
                    isVerified = true;
                    message = 'Verification successful';
                }

                resolve({ isVerified, message });
            })
               
            .catch((error) => {
                reject(error);
            });
        });
    }

    // generate and save otp
    create(uid) {
        return new Promise((resolve, reject) => {
            const newOTP = new this.Model({
                uid: uid,
                otp: this.generateCode(6),
                created: new Date().getTime(),
            });

            //save otp to database
            newOTP
                .save()
                .then((doc) => resolve(doc.otp))
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //Generates random OTP code
    generateCode(maxLength) {
        const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let code = '';

        for (let i = 0; i < maxLength; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }

        return code;
    }

    isMatched(userOTP, dbOTP) {
        return userOTP === dbOTP;
    }

    isExpired(createdAt, expiryMinutes) {
        let expiry = createdAt + (expiryMinutes * 1000 * 60);
        let now = new Date().getTime();
        return expiry < now;
    }
    
}



module.exports = OTP;
