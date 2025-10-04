describe('API - Teste Funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                    "email": "fulano@qa.com",
                    "password": "teste"
                }
        }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
        })
    });

    it('Validar senha incorreta', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                    "email": "fulano@qa.com",
                    "password": "senha incorreta"
                },
                failOnStatusCode: false
        }).then((response)=>{
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    });
});