export const htmlElements: Record<string, HTMLElement | null> = {
    $btn: document.querySelector('#submitBtn'),
    $nextBtn: document.querySelector('#nextBtn'),
    $endBtn: document.querySelector('.form__end-btn'),
    $seeAllQuestionsBtn: document.querySelector('.question__seeall-btn'),
    $btnBlock: document.querySelector('.form__btn-block'),
    $answerForm: document.querySelector('#answer-form'),
    $questionControls: document.querySelector('.question__controls'),
    $questionForm: document.querySelector('.question__form'),
    $authBlock: document.querySelector('.authorization')!
}