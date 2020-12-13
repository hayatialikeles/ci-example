const chai=require('chai');
const chaiHttp=require('chai-http');
const server=require('../app');

chai.use(chaiHttp);
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmQ2NTliMTliZmYwNjYwNDhiYzkyODYiLCJmdWxsbmFtZSI6ImhheWF0aTIgYWxpIGtlbGXFnyIsInVzZXJuYW1lIjoiYWhtZXQ0IiwiZW1haWwiOiJoYXlhdGkuYWxpa2VsZXNAZ21haWwuY29tIiwiYWdlIjoyMiwiaWF0IjoxNjA3ODgzMjI0LCJleHAiOjE2MDc4ODM5NDR9.c0kk3_sEe7WwkQqEEX8txA9SmCXitrdGEbvCEsEwjsM';

describe("post testing",()=>{
    it("post add testing",(done)=>{
        chai.request(server)
        .post('/post/new/post')
        .send({
            title:'deneme başlığıdır',
            explanation:'deneme açıklamasıdır açıklama uzunluğu 1000 karakter ile sınırlıdır'
        })
        .set("Authorization",token)
        .end((err,res)=>{
            console.log(err);
            chai.expect(res.status).to.equal(200);
            done();
        });
    });
});