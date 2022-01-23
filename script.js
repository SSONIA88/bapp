class Bank
{
    createAccount(){
        let accountNumber=bk_acno.value;
        let accountType=bk_actype.value;
        let personName=bk_pname.value;
        let password=bk_pwd.value;
        let balance=2000;
        let transHistory={
            creditTrans:0,
            debitTrans:0

        }


        var accounts={accountNumber,accountType,personName,password,balance,transHistory}
        localStorage.setItem(accounts.accountNumber,JSON.stringify(accounts));
       
        alert("Account Created");
      
        
    }
      //for authentication
   
       
authentication()
    { 
        var acno=bk_acno_entered.value;
        var password=bk_pwd_entered.value;
     console.log(acno);
     console.log(password);
     //this.validateAccountNumber(acno);
     this.authenticate(acno,password);
     
    }
    
    session={};
        validateAccountNumber(acno)
        { if(acno in localStorage)
           return true;
            
        }
       

          //for authentication
         authenticate(acno,password){
              
            if(acno in localStorage){
                var details=JSON.parse(localStorage.getItem(acno))
                console.log(details.password);
               let pwd=details.password;
                if(pwd==password)
                {
                    console.log("access granted");
                    this.session["user"]=acno;
                    console.log(this.session["user"]);
                   this.balanceEnquiry();
                }
                else
                console.log("invalid password");
            }
            else
            console.log("invalid a/c number");
        }
       

       loginReqd(){
            return "user" in this.session?true:false;
        }
        getBalance(accno){
            
            let userValue=JSON.parse(localStorage.getItem(accno))
            //console.log("Balance:",userValue.balance);
            return userValue.balance;
        }
        balanceEnquiry()
        {
            if("user" in this.session)
            {let loggeduser=this.session["user"];
            console.log(this.getBalance(loggeduser)) ;

            }
            else
           {console.log("invalid session u must login");} 
        }
        fundTransfer(){
            
            let to_acno=debitAcc.value;
            let amount=amountVal.value;
            this.fundTrans(to_acno,amount);
        }
            fundTrans(to_acno,amount)
            { 
                console.log(to_acno,amount);
                 if(this.loginReqd())
                {
                    if(this.validateAccountNumber(to_acno))
                    {   let loggeduser=this.session["user"];
                        let currentBal=this.getBalance(loggeduser)
                        console.log(currentBal);;
                        if(amount>currentBal)
                        { console.log("insufficient funds"); }
                        else
                        {   let amt=Number(amount);//to convert string to number
                            let accountDebit=JSON.parse(localStorage.getItem(loggeduser))
                            //console.log(typeof(amount));//output is a string
                            accountDebit.balance-=amt;
                            console.log(accountDebit);
                           // console.log(typeof(accountDebit.balance));
                            console.log("debitAccNo:",loggeduser,"debit AccBalance:",accountDebit.balance);
                            //...to push back...
                            accountDebit.transHistory.debitTrans=accountDebit.balance;
                           
                          localStorage.setItem(loggeduser,JSON.stringify(accountDebit))
                           // localStorage.setItem(loggeduser,JSON.)
                            
                         
                           let accountCredit=JSON.parse(localStorage.getItem(to_acno))
                           console.log(accountCredit.balance);
                           accountCredit.balance+=amt;
                             console.log("creditAccNO:",to_acno,"Credit AccBalance:",accountCredit.balance);
                             console.log(accountCredit);
                    //...to push back...
                    accountCredit.transHistory.creditTrans=accountCredit.balance;
                    localStorage.setItem(to_acno,JSON.stringify(accountCredit))
                            
                            
                            console.log("transaction completed"); 
                        }
                    }
                    else{
                        console.log("invalid to a/c number,doesn't exists");
                    }
                }
                else
               {console.log("invalid session u must login");} 
            }
       
      
        }
       
var obj=new Bank();


    
    



