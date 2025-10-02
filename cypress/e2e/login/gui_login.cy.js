describe('Teste Funcional de Login', () => {
    it('Deve realizar o Login com sucesso', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('[data-test="title"]').should('contain', 'Products')
    });

    it('Validando usuário incorreto', () => {
        cy.login_teste('Incorrect_user','secret_sauce')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Validando senha incorreta', () => {
        cy.login_teste('standard_user','incorrect_sauce')
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
    });
});