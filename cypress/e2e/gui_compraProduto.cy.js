describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo compra de produtos', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('[data-test="title"]').should('contain', 'Products')

        //Ordenando produto menor para o maior
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        //Validação da ordenação dos produtos
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')

        //Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //Checagem de quantidade de produtos do carrinho
        cy.get('[data-test="shopping-cart-link"]').should('have.text', '3')

        //Check no carrinho
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.VerificaProdutos()

        //Checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste primeiro nome')
        cy.get('[data-test="lastName"]').type('Teste ultimo nome')
        cy.get('[data-test="postalCode"]').type('54545454')
        cy.get('[data-test="continue"]').click()

        //Verificando produtos no checkout
        cy.VerificaProdutos()

        //Checagem no valor total
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
    });    
});