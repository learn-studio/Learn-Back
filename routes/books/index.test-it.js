'use strict';

var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var request = require('supertest');
var app = require('../../server'); 

describe('BookRoute', function() {
  request(app)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '1')
      .expect(200, "ok")
      .end(function(err, res){
         if (err) throw err;
      });
});