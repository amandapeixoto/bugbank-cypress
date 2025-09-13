describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.visit('https://bugbank.netlify.app/')
    cy.contains('Registrar').click()
  })

  it('deve cadastrar um usuário com sucesso com saldo inicial', () => {

    cy.get('.card__register:visible', { timeout: 10000 }).should('be.visible');

    cy.get('.card__register:visible input[name="email"]').type('tstbugb1@bugbank.com', { force: true })
    cy.get('.card__register:visible input[name="name"]').type('Tst BugB', { force: true })
    cy.get('.card__register:visible input[name="password"]').type('951357', { force: true })
    cy.get('.card__register:visible input[name="passwordConfirmation"]').type('951357', { force: true })
    
    cy.get('#toggleAddBalance').click({ force: true })

    cy.get('.card__register:visible button[type="submit"]').click({ force: true })
    
    cy.contains('criada com sucesso').should('be.visible')
  })

  it('deve cadastrar um usuário com sucesso sem saldo inicial', () => {
    cy.get('.card__register:visible', { timeout: 10000 }).should('be.visible')

    cy.get('.card__register:visible input[name="email"]').type('tstbugb2@bugbank.com', { force: true})
    cy.get('.card__register:visible input[name="name"]').type('Tst BugB2', { force: true })
    cy.get('.card__register:visible input[name="password"]').type('159753', { force: true })
    cy.get('.card__register:visible input[name="passwordConfirmation"]').type('159753', { force: true })

    cy.get('.card__register:visible button[type="submit"]').click({ force: true })

    cy.contains('criada com sucesso').should('be.visible')
  })

  it('deve exibir mensagens de validação para campos obrigatórios', () => {
    const campos = ['email', 'password', 'passwordConfirmation']
    
    cy.get('.card__register:visible', { timeout: 10000 }).should('be.visible')

    campos.forEach((campo) => {
      cy.get(`.card__register:visible input[name="${campo}"]`)
      .focus()
      .blur()
      .siblings('.input__warging')
      .should('contain.text', 'É campo obrigatório')
    })

  })
})
