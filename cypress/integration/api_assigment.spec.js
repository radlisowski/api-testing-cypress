describe("API PUT requast Test suit", () => {
    it(`TC001 Validate that the PUT requests returns 
        correct Response and Data`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //checking the responce and that teh object got cresated as intended
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property("name", "entity1")
            expect(res.body.data).has.property("entity_type", "application")
            expect(res.body.data).has.property("description", "description of entity 1")
            expect(res.body.data).has.property("is_verified", true)
            expect(res.body.data).has.property("department_id", 3)
        }).then((res) => {
            //storing the id so can make a put to the same entity
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url:  "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "name": "entity11",
                    "entity_type": "file",
                    "description": "updated description of entity 1",
                    "is_verified": false,
                    "department_id": 7
                }
            }).then((res) => {
                //checking the response from seerver and that changes have been saved
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property("name", "entity11")
                expect(res.body.data).has.property("entity_type", "file")
                expect(res.body.data).has.property("description", "updated description of entity 1")
                expect(res.body.data).has.property("is_verified", false)
                expect(res.body.data).has.property("department_id", 7)
            })
        })
    })
    it(`TC002 Validating updating “entity_id” rejection form Server`, () => {
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "updated description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                }   
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            const newEntityId = entityId + 1;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "entity_id": newEntityId
                },
                failOnStatusCode: false
            }).then((res) => {
                //chckiing the response from the server looking for Unatorized
                expect(res.status).to.eq(401)
            })
        })
    });
    it(`TC003 Validating Update (PUT) requests should fail if invalid data is supplied 
        in the request (“is_verified” is expecting Boolean, passing Integer).`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "is_verified": 7
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400)
            })
        })
    }) 
    it(`TC004 Validating Update (PUT) requests should fail if invalid data is supplied 
        in the request (“department_id” property is expecting Integer, passing Boolean).`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)  
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "department_id": true,
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400)
            })
        })
    })
    it(`TC005 Validating Update (PUT) requests should fail if invalid data is 
        supplied in the request (“name” property is expecting String, passing Boolean).`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)  
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "name": true,
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400)
            })
        })
    })
    it(`TC006 Validating Update (PUT) requests should fail if invalid data is 
        supplied in the request (entity_type property is expecting String, passing Boolean).`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)  
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "entity_type": false,
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400)
            })
        })
    })
    it(`TC007 Validating Update (PUT) requests should fail if invalid data is 
        supplied in the request (description property is expecting String, passing Boolean).`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)  
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                body: {
                    "description": true,
                },
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(400)
            })
        })
    })
    it(`TC008 Validating Update (PUT) requests should fail 
        if no data is supplied in the request.`, () => {
        //posting the entity to have a test subject
        cy.request({
            method: "POST",
            url: "https://worldentities.org/api/entities",
            body: { 
                "name" : "entity1", 
                "entity_type": "application", 
                "description": "description of entity 1", 
                "is_verified": true, 
                "department_id": 3 
                } 
        }).then((res) => {
            //confirming that the entiry got created
            expect(res.status).to.eq(201)  
        }).then((res) => {
            const entityId = res.body.data.entity_id;
            cy.request({
                method: "PUT",
                url: "https://worldentities.org/api/entities/" +entityId,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.eq(422)
            })
        })
    })
})