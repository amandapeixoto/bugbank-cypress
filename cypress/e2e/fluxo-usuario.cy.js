describe('Cadastro e Login de usuário', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/')
    cy.contains('Registrar')
      .click()
  })

  it('deve cadastrar um usuário e logar com sucesso com saldo inicial', () => {

    //Cadastro de usuário
    cy.get('.card__register:visible', { timeout: 10000 })
      .should('be.visible');

    cy.get('.card__register:visible input[name="email"]')
      .type('tstbugb1@gmail.com', { force: true })
    cy.get('.card__register:visible input[name="name"]')
      .type('Tst BugB', { force: true })
    cy.get('.card__register:visible input[name="password"]')
      .type('951357', { force: true })
    cy.get('.card__register:visible input[name="passwordConfirmation"]')
      .type('951357', { force: true })
    
    cy.get('#toggleAddBalance')
      .click({ force: true })

    cy.get('.card__register:visible button[type="submit"]')
      .click({ force: true })
    
    cy.contains('criada com sucesso')
      .should('be.visible')

    cy.get('#btnCloseModal').click()

    //Login com o usuário cadastrado
    cy.get('.card__login input[name="email"]')
      .type('tstbugb1@gmail.com')
    cy.get('.card__login input[name="password"]')
      .type('951357')

    cy.get('.card__login button[type="submit"]')
      .click()

    //Verificação do saldo inicial
    cy.get('#textBalance span')
      .should('contain.text', '1.000,00')

    //Logout
    cy.get('#btnExit')
      .click()

  })

  it('deve cadastrar um usuário e logar com sucesso sem saldo inicial', () => {

    //Cadastro de usuário
    cy.get('.card__register:visible', { timeout: 10000 })
      .should('be.visible')

    cy.get('.card__register:visible input[name="email"]')
      .type('tstbugb2@gmail.com', { force: true})
    cy.get('.card__register:visible input[name="name"]')
      .type('Tst BugB2', { force: true })
    cy.get('.card__register:visible input[name="password"]')
      .type('159753', { force: true })
    cy.get('.card__register:visible input[name="passwordConfirmation"]')
      .type('159753', { force: true })

    cy.get('.card__register:visible button[type="submit"]')
      .click({ force: true })

    cy.contains('criada com sucesso')
      .should('be.visible')

    cy.get('#btnCloseModal').click()

    //Login com o usuário cadastrado
    cy.get('.card__login input[name="email"]')
      .type('tstbugb2@gmail.com')
    cy.get('.card__login input[name="password"]')
      .type('159753')

    cy.get('.card__login button[type="submit"]')
      .click()

    //Verificação do saldo inicial
    cy.get('#textBalance span')
      .should('contain.text', '0,00')

    //Logout
    cy.get('#btnExit')
      .click()
  })

  it('deve exibir mensagens de validação para campos obrigatórios', () => {
    const campos = ['email', 'password', 'passwordConfirmation']
    
    cy.get('.card__register:visible', { timeout: 10000 })
      .should('be.visible')

    campos.forEach((campo) => {
      cy.get(`.card__register:visible input[name="${campo}"]`)
        .focus()
        .blur()
        .siblings('.input__warging')
        .should('contain.text', 'É campo obrigatório')
    })

  })
})
