(function () {
    'use strict';

    angular.module('formApp')
        .config(translation);

    translation.$inject = ['$translateProvider'];
    function translation($translateProvider) {
        $translateProvider.translations('pl', {
            HOME_INSURANCE: 'Ubezpieczene nieruchomości',
            USER_PROFILE_INFORMATION: 'Dane użytkownika',
            PROPERTY_INFORMATION_FIRST: 'Dane nieruchomości 1/2',
            PROPERTY_INFORMATION_LAST: 'Dane nieruchomości 2/2',
            SINGLE: 'Panna / Kawaler',
            MARRIED: 'Zamężna / Żonaty',
            DIVORCED: 'Rozwiedziona / Rozwiedziony',
            WIDOW: 'Wdowa / Wdowiec',
            HOUSE: 'Dom',
            FLAT: 'Mieszkanie',
            OWN: 'Własność',
            RENT: 'Wynajem',
            NEXT_SECTION: 'Kolejna sekcja',
            FIRST_NAME: 'Imię',
            LAST_NAME: 'Nazwisko',
            DATE_OF_BIRTH: 'Data urodzenia',
            MARTIAL_STATUS: 'Stan cywilny',
            EMAIL: 'Email',
            PROPERTY_TYPE: 'Typ nieruchomości',
            BUILT_YEAR: 'Rok budowy',
            BEDROOMS_NUM: 'Liczba sypialni',
            BATHROOMS_NUM: 'Liczba łazienek',
            OWNERSHIP_TYPE: 'Typ własności',
            ADULTS_NUM: 'Ilość dorosłych',
            CHILDREN_NUM: 'Ilość dzieci',
            SMOKERS: 'Czy ktoś pali',
            LONG_TERM_UNOCCUPIED: 'Czy nieruchomość na długi okres pozostaje opuszczona',
            SHORT_TERM_UNOCCUPIED: 'Czy nieruchomość w ciągu dnia pozostaje opuszczona',
            FORM_END_THANKS: 'Dziękujemy za poświęcony czas',
            SUBMIT: 'Wyślij'
        });
    }
})();