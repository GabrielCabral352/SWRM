from flask import Flask, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import mysql.connector
import json


app = Flask(__name__)
CORS(app, resources={r"/api/*":{"origins":"*"}})
app.config["CORS HEADERS"] = 'Content-Type'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/swrm'
db = SQLAlchemy(app)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    nome = db.Column(db.String(70))
    cpf = db.Column(db.String(50))
    nasc = db.Column(db.String(50))
    sexo = db.Column(db.String(50))
    email = db.Column(db.String(50))
    senha = db.Column(db.String(50))

    def to_json(self):
        return {"id": self.id, "nome": self.nome, "cpf": self.cpf, "nascimento": self.nasc, "sexo": self.sexo, "email": self.email, "senha": self.senha}


# Selecionar Tudo
@app.route("/usuarios", methods=["GET"])
def seleciona_usuarios():
    usuarios_objetos = Usuario.query.all()
    usuarios_json = [usuario.to_json() for usuario in usuarios_objetos]

    return gera_response(200, "usuarios", usuarios_json)

# Selecionar Individual
@app.route("/usuario/<id>", methods=["GET"])
def seleciona_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()
    usuario_json = usuario_objeto.to_json()

    return gera_response(200, "usuario", usuario_json)

# Cadastrar
@app.route("/usuario", methods=["POST"])
@cross_origin()
def cria_usuario():
    body = request.get_json()

    try:
        usuario = Usuario(nome=body["nome"], cpf=body["cpf"], nasc=body["nascimento"], sexo=body["sexo"], email=body["email"], senha=body["senha"])
        db.session.add(usuario)
        db.session.commit()
        return gera_response(201, "usuario", usuario.to_json(), "Criado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao cadastrar")


# Atualizar
@app.route("/usuario/<id>", methods=["PUT"])
def atualiza_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()
    body = request.get_json()

    try:
        if('nome' in body):
            usuario_objeto.nome = body['nome']
        if('email' in body):
            usuario_objeto.email = body['email']
        
        db.session.add(usuario_objeto)
        db.session.commit()
        return gera_response(200, "usuario", usuario_objeto.to_json(), "Atualizado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao atualizar")

# Deletar
@app.route("/usuario/<id>", methods=["DELETE"])
def deleta_usuario(id):
    usuario_objeto = Usuario.query.filter_by(id=id).first()

    try:
        db.session.delete(usuario_objeto)
        db.session.commit()
        return gera_response(200, "usuario", usuario_objeto.to_json(), "Deletado com sucesso")
    except Exception as e:
        print('Erro', e)
        return gera_response(400, "usuario", {}, "Erro ao deletar")


def gera_response(status, nome_do_conteudo, conteudo, mensagem=False):
    body = {}
    body[nome_do_conteudo] = conteudo

    if(mensagem):
        body["mensagem"] = mensagem

    return Response(json.dumps(body), status=status, mimetype="application/json")


app.run()