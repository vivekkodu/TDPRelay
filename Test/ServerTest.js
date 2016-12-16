'use strict'; 

const Code = require('code'); 
const Lab = require('lab');
const Net = require('net');
const Async = require('async');
var consoleMock = require('console-mock');

const lab = exports.lab = Lab.script(); 
const expect = Code.expect; 
const describe = lab.describe; 
const it = lab.it; 
const before = lab.before;

describe('ServerTest :: TCP test server', () => {
	let server;
	before((done) => {
		server = require("../server.js");
		
    done();
  });
  
  it('Test port is opening', (done) => {
	const Client = new Net.Socket();
	Client.connect(1337, '127.0.0.1', () => {
			console.log("Test");
		});
	const info = console.info;
      console.info = (log) => {
        console.info = info;
		expect(log).to.be.a.string();
		expect(log).equal('Client connected');
		done();
      };	  
  });

})