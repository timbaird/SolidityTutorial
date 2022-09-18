const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {
    let counter;

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy("counter test", 1)
    })

    describe('Constructor', () => {
        it('sets the inital count', async () =>{
            const result = await counter.count()
            expect(result).to.equal(1)
        })

        it('sets the inital name', async () =>{
            const result = await counter.name()
            expect(result).to.equal("counter test")
        })
    }) // end constructor describe

    describe('Functions', ()=>{

        describe ('increment()', ()=>{
            it('increments the count', async ()=> {
                let transaction = await counter.increment();
                await transaction.wait()
                expect(await counter.count()).to.equal(2)
        
                transaction = await counter.increment();
                await transaction.wait()
                expect(await counter.count()).to.equal(3)
            })
        })

        describe('decrement()', ()=>{
            it('decrements the count', async ()=> {
                let transaction = await counter.decrement();
                await transaction.wait()
        
                expect(await counter.count()).to.equal(0)
            })

            it('reverts if attempting to decrement below 0', async ()=> {
                // reduces from starting 1 to 0
                let transaction = await counter.decrement();
                await transaction.wait()
        
                // do it again
                //this should cause an error as uint cannot go below 0
                await expect(counter.decrement()).to.be.reverted
            })
        })

        describe('getCount()', () =>{
                it('gets the count', async () =>{
                    const result = await counter.getCount()
                    expect(result).to.equal(1)
                })
        })

        describe('getName()', () =>{
                it('gets the name', async () =>{
                    expect(await counter.getName()).to.equal("counter test")
                })
        })

        describe('setName()', () =>{
            it('sets the name', async () =>{
                let transaction = await counter.setName("bollocks");
                await transaction.wait()

                expect(await counter.name()).to.equal("bollocks")
            })
    })



    }) // end functions describe

}) // end counter describe
