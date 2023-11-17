/// <reference types= "cypress"/>
describe('login', () => {
  const msgPreencherCampos = 'span:contains(" Favor preencher o formuário com CPF e senha válidos")'
  const msgUsuarioInvalido = 'span:contains(" Verifique o login e senha digitados")'
  const msgUsuarioNaoEncontrado = 'span:contains(" Não foi possível encontrar o usuário")'

  beforeEach(() => {
    cy.visit('/')
  })
  
  it('home', () => {
    cy.title().should('eq', 'ECOA')
    cy.url().should('be.equal', 'https://app.dev.ecoa.itlean.com.br/login')

  })

  it('campos em branco', () => {
    cy.get('#mat-input-0').clear()
    cy.get('#mat-input-1').clear()
    cy.contains('Entrar').click()
    cy.get(msgPreencherCampos).should('exist')
      .should('have.text', ' Favor preencher o formuário com CPF e senha válidos')

  })

  it('senha invalida', () => {
    cy.get('#mat-input-0').type('68173699089')
    cy.get('#mat-input-1').type('123456')
    cy.contains('Entrar').click()
    cy.get(msgPreencherCampos).should('exist')
      .should('have.text', ' Favor preencher o formuário com CPF e senha válidos')

  })

  it('usuario invalido', () => {
    cy.get('#mat-input-0').type('35648975000')
    cy.get('#mat-input-1').type('75*F=qWnPUUd8rX%', {log: false})
    cy.contains('Entrar').click()
    cy.get(msgUsuarioInvalido).should('exist')
      .should('have.text', ' Verifique o login e senha digitados')



  })

  it('acessar esqueci senha', () => {
    cy.get('a').click()
    cy.get('div.titlePage > .titlePage').should('be.visible')
      .should('have.text', 'Esqueceu sua senha')
  })

  it('esqueci senha usuario invalido', () => {
    cy.get('a').click()
    cy.get('#mat-input-2').type('23313213213')
    cy.contains('Continuar').click()
    cy.get(msgUsuarioNaoEncontrado).should('be.visible')
      .should('have.text', ' Não foi possível encontrar o usuário')

  })

  it('esqueci senha usuario valido', () => {
    cy.get('a').click()
    cy.get('#mat-input-2').type('19168652089')
    cy.contains('Continuar').click()
    cy.get('div.titlePage > .titlePage')
      .should('have.text', 'Esqueceu sua senha')

  })

  it('login com sucesso', () => {
    cy.loginSuper()
    cy.url().should('include', '/home')
    cy.get('.name').should('have.text', 'ECOA SUPER')

  })

  it('sair da aplicacao', () => {
    cy.loginSuper()
    cy.get('.box-user .mdc-icon-button .mat-mdc-button-touch-target')
      .click()
    cy.contains('.btn-menu', 'Sair').should('be.visible')
      .click()
    cy.title().should('eq', 'ECOA')

  })


})
