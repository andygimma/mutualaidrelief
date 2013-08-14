/*
 * Developer : Andy Gimma (andy.n.gimma@gmail.com)
 * Date : 08/14/13
 * All code (c)2013 Andy Gimma all rights reserved
 */

var expect = require('expect.js'),
Browser = require('zombie'),
browser = new Browser();

describe('Loads pages', function(){

    it('index page', function(done){

        browser.visit("http://localhost:8080", function () {
            expect(browser.text("title")).to.equal('Mutual Aid Relief');
            done();
        });
    });
});

// ----- Testing Mongoose And Other Controllers ----- //

// var customer = require('../lib/customers');
//
// describe("Customers", function(){
//   it("retrieves by email", function(done){
//     customer.findByEmail('test@test.com', function(doc){
//       doc.email.should.equal('test@test.com');
//       done();
//     });
//   });
// });




// ----- Testing Button Presses ----- //

// var Browser = require("zombie");
// var assert = require("assert");
// 
// // Load the page from localhost
// browser = new Browser()
// browser.visit("http://localhost:3000/", function () {
// 
//   // Fill email, password and submit form
//   browser.
//     fill("email", "zombie@underworld.dead").
//     fill("password", "eat-the-living").
//     pressButton("Sign Me Up!", function() {
// 
//       // Form submitted, new page loaded.
//       assert.ok(browser.success);
//       assert.equal(browser.text("title"), "Welcome To Brains Depot");
// 
//     })
// 
// });