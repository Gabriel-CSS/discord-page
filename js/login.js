
const url = "https://reqres.in/api/";
var _token = "";

document.getElementById("btn-login")
    .addEventListener("click", async () => {

        var entrada = document.getElementsByClassName("input")[0].value,
            senha = document.getElementsByClassName("input")[1].value,
            error_span = document.getElementById("error-span"),
            email_h5 = document.getElementsByTagName("h5")[0],
            senha_h5 = document.getElementsByTagName("h5")[1];

            error_span.innerHTML = "";
            email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE";
            senha_h5.innerHTML = "SENHA";
            email_h5.className = "";
            senha_h5.className = "";

            if(entrada === "" && senha === ""){
                senha_h5.className = "error";
                senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
                email_h5.className = "error";
                return email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Este campo é obrigatório";
            }
        
        var params = {
            // email: "eve.holt@reqres.in",
            // password: "cityslicka"
            email: entrada,
            password: senha
        }

        axios.post(`${url}login/`, params)
            .then((res) => {
                if(res.status === 200){
                    var res2 = res.data;
                    _token = res2.token;
                    error_span.innerHTML = "Logado com sucesso! TOKEN_ID: " + _token;
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                var error_msg = error.response.data.error;

                if(error_msg === "user not found"){
                    email_h5.className = "error";
                    return email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Usuário não encontrado";
                }
                if(error_msg === "Missing password"){
                    senha_h5.className = "error";
                    return senha_h5.innerHTML = "SENHA - Este campo é obrigatório";
                }
                if(error_msg === "Missing email or username"){
                    email_h5.className = "error";
                    return email_h5.innerHTML = "E-MAIL OU NÚMERO DE TELEFONE - Este campo é obrigatório";
                }
            })
    });