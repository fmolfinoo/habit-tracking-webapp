const LoginRequest= details=>{
    let Response
    var id=""
    fetch("https://habitica.com/api/v3/user/auth/local/login", {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: details.username,
            password: details.password
        })
    }).then(res=>{
        return res.json()
    }).then(data=>{id=data.data.id}).catch(error=>console.log("ERROR",error))
    console.log(id)
    return id
}


//export default LoginRequest