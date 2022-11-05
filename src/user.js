export class user{
    constructor(username,password) {
        this.username=username;
        this.password=password;
        this.id=undefined
        this.apiToken=undefined
    }
    //This function send a login request to the server and save the id and api token to get more information from server
    async login(){
        const response=await fetch("https://habitica.com/api/v3/user/auth/local/login", {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password
            })
        }).then(res=>{
            return res.json()
        }).then(data=>{
            console.log(data)
            return data
        }).catch(error=>console.log("ERROR:",error))
        if(response.success) {
            this.id = response.data.id
            this.apiToken = response.data.apiToken
        }
        return response.success
    }
}

