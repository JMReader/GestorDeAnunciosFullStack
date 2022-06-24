export class Usuario {
    _id!: string;
    username!: string;
    password!: string;
    nombres!: string;
    apellido!: string;
    perfil!: string;

    Usuario(id: string = "", username: string = "", password: string = "", nombres: string = "",
        apellido: string = "", perfil: string = "") {
        this._id = id;
        this.username = username;
        this.password = password;
        this.nombres = nombres;
        this.apellido = apellido;
        this.perfil = perfil;
    }
}
