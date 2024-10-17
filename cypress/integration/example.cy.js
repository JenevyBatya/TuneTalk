describe('My First Test', () => {
  it('Visits the static index.html', () => {
    cy.visit('../../public/index.html') // Укажи абсолютный путь до твоего файла
    cy.contains('h1', 'Welcome to TuneTalk!')
  })
})