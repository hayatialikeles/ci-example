var chai= require("chai");
var ChaiHttp=require('chai-http');
const server=require('../app')

chai.use(ChaiHttp);
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let userData={
    uid:'',
    username:makeid(8),
    password:makeid(10),
    email:makeid(10)+'@gmail.com',
    age:20,
    fullname:'ahmet demir',
    token:''
};


describe('user router',()=>{
    it("register testing",function(done){
        chai.request(server).post('/users/register').send(
            {
                fullname:userData.fullname,
                username:userData.username,
                password: userData.password,
                email: userData.email,
                age: userData.age
            }
        ).end((err,res)=>{
            chai.expect(res.status).to.equal(200);
            userData.uid=res.body.data._id;
            done();
        });
    });
    it("auth testing",function(done){
            chai.request(server).post('/users/login').send(
                {
                    username:userData.username,
                    password: userData.password,
                }
            ).end((err,res)=>{
                    userData.token=res.body.token;
                    chai.expect(res.status).to.equal(200);
                    done();
                });
    });
    it("user list getting testing",function(done){
        chai.request(server)
        .get('/users/getUser')
        .send("Authorization",userData.token)
        .end((err,res)=>{
            chai.expect(res.status).to.equal(200);
            done();
        })
    });
    it("delete testing",function(done){
        chai.request(server).post('/users/delete')
        .send({uid:userData.uid})
        .set("Authorization",userData.token)
        .end((err,res)=>{
            chai.expect(res.statusCode).to.equal(200);
            done();
        });
    });
});