const chai=require('chai');
const chaiHttp=require('chai-http');
const server=require('../app');

chai.use(chaiHttp);
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ2NjNlMDQwNDQ0ZTY0NDE4M2E4MTQiLCJmdWxsbmFtZSI6ImhheWF0aTIgYWxpIGtlbGXFnyIsInVzZXJuYW1lIjoiaGF5YXRpIiwiZW1haWwiOiJoYXlhdGkuYWxpa2VsZXNAZ21haWwuY29tIiwiYWdlIjoyMiwiaWF0IjoxNjA3ODg1ODE5LCJleHAiOjE2Mzk0MjE4MTl9.pZVNhpV8BtKS8SeYjqgCW5TkUqIeltmexxc8g58LEn4';
var postId='';
var userId='';
describe("post testing",()=>{
    it("post add testing",(done)=>{
        chai.request(server)
        .post('/post/new')
        .send({
            title:'deneme başlığıdır',
            explanation:'deneme açıklamasıdır açıklama uzunluğu 1000 karakter ile sınırlıdır'
        })
        .set("Authorization",token)
        .end((err,res)=>{
            chai.expect(res.status).to.equal(200);
            postId=res.body.data._id;
            userId=res.body.data.addUid;
            done();
        });
    });
    it("post edit testing",(done)=>{
        chai.request(server)
        .post('/post/edit')
        .send({
            title:'deneme düzenleme başlığıdır',
            explanation:'deneme düzenleme açıklamasıdır açıklama uzunluğu 1000 karakter ile sınırlıdır',
            postId:postId
        })
        .set("Authorization",token)
        .end((err,res)=>{
            chai.expect(res.status).to.equal(200);
            done();
        });
    });
    it("post set viewcount testing",(done)=>{
        chai.request(server)
            .post('/post/set/viewcount')
            .send({postId:postId})
            .set("Authorization",token)
            .end((err,res)=>{
                chai.expect(res.status).to.equal(200);
                done();
            });

    });
    it("post  get general latest list",(done)=>{
        chai.request(server)
            .get('/post/get/general/latest')
            .set('Authorization',token)
            .end((err,res)=>{
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
    it("post get user latest list",(done)=>{
        chai.request(server)
            .get('/post/get/user/list?uid='+userId)
            .set('Authorization',token)
            .end((err,res)=>{
                chai.expect(res.status).to.equal(200);
                done();
            });
    });
    it("post delete item",(done)=>{
        chai.request(server)
            .post('/post/delete')
            .send({postId:postId})
            .set("Authorization",token)
            .end((err,res)=>{
                chai.expect(res.status).to.equal(200);
                done();
            });
    });

});