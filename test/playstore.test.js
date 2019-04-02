const sort = require('../playstore');
const expect = require('chai').expect;
const request = require('supertest');


describe('test playstore function',()=>{
    it('GET /apps should get you everything',()=>{
        return request(sort).get('/apps').expect(200);
    });

    it('GET with a sort on rating',()=>{
        return request(sort).get('/apps').query({sort:'rating'}).expect(200)
            .expect('Content-Type',/json/).then(res=>{
                expect(res.body).to.be.an('array');
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length - 1) {
                sorted = sorted && res.body[i].rating < res.body[i + 1].rating;
                i++;
                }
            });
    });

    it('GET with a sort on apps',()=>{
        return request(sort).get('/apps').query({sort:'app'}).expect(200)
            .expect('Content-Type',/json/).then(res=>{
                expect(res.body).to.be.an('array');
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length - 1) {
                sorted = sorted && res.body[i].App < res.body[i + 1].App;
                i++;
                }
            });
    });

    it('GET with a filter on genre',()=>{
        return request(sort).get('/apps').query({genres:'Action'}).expect(200)
            .expect('Content-Type',/json/).then(res=>{
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
+               expect(res.body[0].Genres.includes('Action')).to.be.true;
            });
    });

});